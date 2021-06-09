import {IUser} from '@shared/models/user.model';

export interface IPost {
  _id: string;
  photo: string[];
  images?: File[];
  content: string;
  hashtag: string;
  likes: string[];
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
  postedBy: IOwner;
}

export interface IComment {
  _id?: string;
  text: string;
  postedBy: IOwner;
}

export interface IOwner {
  _id?: string;
  avatarUrl?: string;
  name?: string;
  username?: string;
}

export function parseIOwner(user: IUser): IOwner {
  return {
    _id: user._id,
    avatarUrl: user.avatarUrl,
    name: user.name,
    username: user.username
  };
}
