import { User } from "./user.model";

export class Token {
  token!: string;
  refreshToken?: string;
  user!: User;
}
