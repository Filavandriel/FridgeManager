import { ProductType } from "./productsTypes";

const PRODUCTS_LIST: ProductType[] = [
  {
    category: "diary",
    expirationDate: new Date(),
    id: 1,
    name: "milk"
  },
  {
    category: "fishes",
    expirationDate: new Date(),
    id: 2,
    name: "salmon"
  },
  {
    category: "vegetables",
    expirationDate: new Date(),
    id: 3,
    name: "caper"
  }
];

export function fetchProducts() {
  return PRODUCTS_LIST;
}
