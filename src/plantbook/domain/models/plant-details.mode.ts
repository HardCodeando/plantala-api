export class PlantDetails {
  constructor(
    readonly id: number,
    readonly binomialNomenclature: string,
    readonly commonName: string,
    readonly maxTemp: number,
    readonly minTemp: number,
    readonly maxLightLux: number,
    readonly minLightLux: number,
    readonly maxEnvHumid: number,
    readonly minEnvHumid: number,
    readonly imageUrl: string,
  ) {}
}
