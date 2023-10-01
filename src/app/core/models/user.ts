import { Cart } from './cart';
import { Medicine } from './medicine';

export interface User {
  userName: string;
  email: string;
  password: string;
  address?:string;
  avatar?: string;
  isAdmin?: boolean;
  role?: string;
  _id: string;
  cart?: Cart;
  tokens?: [
    {
      token: string;
      _id: string;
    }
  ];
}
