export type GetPlantsElementOutput = {
  id: number;
  binomialNomenclature: string;
  commonName: string;
  imageUrl: string;
};

export type GetPlantsOutput = {
  plants: GetPlantsElementOutput[];
};
