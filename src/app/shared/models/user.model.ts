export interface IUser {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  name: string;
  avatarUrl: string;
  bio?: string;
  posts?: number;
  followers?: string[];
  following?: string[];
}
