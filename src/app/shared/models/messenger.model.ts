import {IUser} from '@shared/models/user.model';

export interface IConversation {
  _id: string;
  members: IUser[];
  date: string;
}

export interface IMessage {
  _id: string;
  conversationId: string;
  msg: string;
  senderId: string;
  Date: string;
}
