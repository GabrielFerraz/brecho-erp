export class CreateProductDto {
  name: string;
  code: string;
  purchase_price?: number;
  sell_price: number;
  min_price?: number;
  max_price?: number;
  weight: number;
  supplier: number;
  brand?: number;
  categories?: number[];
  tags?: number[];
}
