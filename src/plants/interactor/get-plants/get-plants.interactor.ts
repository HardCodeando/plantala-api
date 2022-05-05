import { Injectable } from '@nestjs/common';
import { PlantBookService } from 'src/plantbook/infrastructure/services/plantbook.service';
import { PlantDetail } from 'src/plants/domain/models/plant-details.model';
import { Plant } from 'src/plants/domain/models/plant.model';
import { PlantIRepository } from 'src/plants/domain/repositories/plant.irepository';

import { GetPlantsInput } from './get-plants.input';
import { GetPlantsOutput } from './get-plants.output';

@Injectable()
export class GetPlantsInteractor {
  constructor(
    private readonly plantIRepository: PlantIRepository,
    private readonly plantBookService: PlantBookService,
  ) {}

  async handle(getPlantInput: GetPlantsInput): Promise<GetPlantsOutput> {
    let plants = await this.plantIRepository.getPlant(getPlantInput.commonName);

    if (plants.length === 0) {
      const plantsResponse = await this.plantBookService.getPlants(
        getPlantInput.commonName,
      );

      const plantsInfo = plantsResponse.map((item) => {
        const plant = new Plant(
          item.binomialNomenclature,
          item.commonName,
          item.imageUrl,
        );

        const plantDetail = new PlantDetail(
          item.binomialNomenclature,
          item.commonName,
          item.maxTemp,
          item.minTemp,
          item.maxLightLux,
          item.minLightLux,
          item.maxEnvHumid,
          item.minEnvHumid,
          item.imageUrl,
        );

        return { plantDetail, plant };
      });

      await this.plantIRepository.savePlantInfo(plantsInfo);
      plants = plants.concat(plantsInfo.map((e) => e.plant));
    }

    return {
      plants: plants.map((e) => ({
        id: e.id,
        binomialNomenclature: e.binomialNomenclature,
        commonName: e.commonName,
        imageUrl: e.imageUrl,
      })),
    };
  }
}
