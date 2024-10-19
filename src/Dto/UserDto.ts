class UserDto {
    private _id: string;
    private _email: string;
    private _password: string;
  
    constructor(id: string, email: string, password: string) {
      this._id = id;
      this._email = email;
      this._password = password;
    }
  
    get id() { return this._id; }
    get email() { return this._email; }
    get password() { return this._password; }
  }
  
  export default UserDto;
  