import { User } from "./user.model";

export interface UserData {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data: User[];
}
