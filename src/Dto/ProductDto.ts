class ProductDto {
  private _name: string;
  private _description: string;
  private _price: number;
  private _discountPercentage: number;
  private _stock: number;
  private _category: string;
  private _imageUrl: string;

  constructor(name: string, description: string, price: number, discountPercentage: number, stock: number, category: string, imageUrl: string) {
    this._name = name;
    this._description = description;
    this._price = price;
    this._discountPercentage = discountPercentage;
    this._stock = stock;
    this._category = category;
    this._imageUrl = imageUrl;
  }

  get name() { return this._name; }
  get description() { return this._description; }
  get price() { return this._price; }
  get discountPercentage() { return this._discountPercentage; }
  get stock() { return this._stock; }
  get category() { return this._category; }
  get imageUrl() { return this._imageUrl; }
}

export default ProductDto;
