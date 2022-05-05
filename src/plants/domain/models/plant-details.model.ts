export class PlantDetail {
  readonly id?: number;
  plantId?: number;

  constructor(
    readonly binomialNomenclature: string,
    readonly commonName: string,
    readonly maxTemp: number,
    readonly minTemp: number,
    readonly maxLightLux: number,
    readonly minLightLux: number,
    readonly maxEnvHumid: number,
    readonly minEnvHumid: number,
    readonly imageUrl: string,
    id?: number,
    plantId?: number,
  ) {
    this.id = id;
    this.plantId = plantId;
  }
}
