export class Plant {
  readonly id?: number;

  constructor(
    readonly binomialNomenclature: string,
    readonly commonName: string,
    readonly imageUrl: string,
    id?: number,
  ) {
    this.id = id;
  }
}
