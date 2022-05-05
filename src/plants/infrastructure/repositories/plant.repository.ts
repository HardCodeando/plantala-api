import { InjectRepository } from '@nestjs/typeorm';
import { PlantDetailEntity } from 'src/database/entity/plant-detail.entity';
import { PlantEntity } from 'src/database/entity/plant.entity';
import { PlantDetail } from 'src/plants/domain/models/plant-details.model';
import { Plant } from 'src/plants/domain/models/plant.model';
import { PlantIRepository } from 'src/plants/domain/repositories/plant.irepository';
import { Connection, Repository } from 'typeorm';

export class PlantRepository implements PlantIRepository {
  constructor(
    @InjectRepository(PlantEntity)
    private readonly plantRepository: Repository<PlantEntity>,
    private readonly connection: Connection,
  ) {}

  async savePlants(plants: Plant[]): Promise<void> {
    const plantEntities = plants.map((plant) => {
      const plantEntity = new PlantEntity();
      plantEntity.binomialNomenclature = plant.binomialNomenclature;
      plantEntity.commonName = plant.commonName;
      plantEntity.imageUrl = plant.imageUrl;
      return plantEntity;
    });
    this.plantRepository.save(plantEntities);
  }

  async savePlantInfo(
    plantInfos: Array<{ plant: Plant; plantDetail: PlantDetail }>,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const task = async (plant: Plant, plantDetail: PlantDetail) => {
      const plantEntity = new PlantEntity();
      plantEntity.binomialNomenclature = plant.binomialNomenclature;
      plantEntity.commonName = plant.commonName;
      plantEntity.imageUrl = plant.imageUrl;
      const newPlant = await queryRunner.manager.save(plantEntity);

      const plantDetailEntity = new PlantDetailEntity();
      plantDetailEntity.binomialNomenclature = plantDetail.binomialNomenclature;
      plantDetailEntity.commonName = plantDetail.commonName;
      plantDetailEntity.imageUrl = plantDetail.imageUrl;
      plantDetailEntity.maxEnvHumid = plantDetail.maxEnvHumid;
      plantDetailEntity.minEnvHumid = plantDetail.minEnvHumid;
      plantDetailEntity.maxLightLux = plantDetail.maxLightLux;
      plantDetailEntity.minLightLux = plantDetail.minLightLux;
      plantDetailEntity.maxTemp = plantDetail.maxTemp;
      plantDetailEntity.minTemp = plantDetail.minTemp;
      plantDetailEntity.plant = newPlant;
      await queryRunner.manager.save(plantDetailEntity);
    };

    try {
      await Promise.all(
        plantInfos.map((value) => task(value.plant, value.plantDetail)),
      );
      console.log('save');

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.error(err);
      console.log(plantInfos);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async savePlant(plant: Plant): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getPlant(commonName: string): Promise<Plant[]> {
    const plantEntities: PlantEntity[] = await this.plantRepository
      .createQueryBuilder('plant')
      .where(
        'plant.common_name like :name OR plant.binomial_nomenclature like :name',
        { name: `%${commonName}%` },
      )
      .getMany();

    console.log(plantEntities);
    console.log(commonName);

    return plantEntities.map(
      (e) => new Plant(e.binomialNomenclature, e.commonName, e.imageUrl, e.id),
    );
  }
}
