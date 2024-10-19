import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import { validationResult } from 'express-validator';
import UserDto from '../Dto/UserDto';
import db from '../config/database'; 


const userService = new UserServices(db);

const register = async (req: Request, res: Response) => {
  try {

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { email, password, name } = req.body;

    const newUser = new UserDto(email, password, name);

  
    const user = await userService.register(newUser);

    return res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
};


export default register;
