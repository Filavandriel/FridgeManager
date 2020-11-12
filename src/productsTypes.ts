export type ProductWithoutIdType = {
  category: string;
  expirationDate: Date;
  name: string;
};

export type ProductType = ProductWithoutIdType & {
  id: number;
};
