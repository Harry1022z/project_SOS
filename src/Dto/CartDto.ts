class CartDto {
    private _userId: string;   
    private _productId: string;
    private _quantity: number; 
  
    constructor(userId: string, productId: string, quantity: number) {
      this._userId = userId;
      this._productId = productId;
      this._quantity = quantity;
    }
  
    get userId() { return this._userId; }
    get productId() { return this._productId; }
    get quantity() { return this._quantity; }
  }
  
  export default CartDto;
  