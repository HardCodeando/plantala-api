import { PlantDetail } from '../models/plant-details.model';
import { Plant } from '../models/plant.model';

export abstract class PlantIRepository {
  abstract getPlant(commonName: string): Promise<Plant[]>;
  abstract savePlant(plant: Plant): Promise<void>;
  abstract savePlants(plantIds: Plant[]): Promise<void>;
  abstract savePlantInfo(
    plantInfos: Array<{ plant: Plant; plantDetail: PlantDetail }>,
  );
}
