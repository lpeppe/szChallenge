import { User } from "./user.model";
/**
 * User data returned from the backend
 */
export interface UserData {
  /**
   * The total number or users
   */
  total: number;
  /**
   * Number of users per page
   */
  perPage: number;
  /**
   * Current page index
   */
  page: number;
  /**
   * Last page index
   */
  lastPage: number;
  /**
   * Users in the page
   */
  data: User[];
}
