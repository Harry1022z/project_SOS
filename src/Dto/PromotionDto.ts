class PromotionDto {
    private _id?: string;      
    private _name: string;     
    private _discount: number; 
    private _startDate: string;
    private _endDate: string;  
  
    constructor(name: string, discount: number, startDate: string, endDate: string, id?: string) {
      this._name = name;
      this._discount = discount;
      this._startDate = startDate;
      this._endDate = endDate;
      this._id = id;    
    }
  
    get id() { return this._id; }
    get name() { return this._name; }
    get discount() { return this._discount; }
    get startDate() { return this._startDate; }
    get endDate() { return this._endDate; }
  }
  
  export default PromotionDto;
  