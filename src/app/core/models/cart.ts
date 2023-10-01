import { Medicine } from './medicine';
import { User } from './user';

export interface Cart {
  userId?: string;
  medicines?: Medicine[];
  totalPrice: number;
}
