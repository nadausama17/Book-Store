import { Cart } from './cart';
import { Book } from './book';

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
  favoriteBooks?: Book[];
  tokens?: [
    {
      token: string;
      _id: string;
    }
  ];
}
