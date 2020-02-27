export interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: Object[];
  price: number;
  quantity: number;
  // TODO [1]
  // image?
  // youtube url
  // nutrients
}