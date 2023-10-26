import { IUser } from "./User";

export type IThreadPost = {
  content: string;
  image?: string;
  user: number;
}

export type IThreadCard = {
  id?: number;
  user: IUser;
  posted_at?: string;
  content?: string;
  image?: string;
  likes_count?: number;
  replies_count?: number;
  is_liked: boolean;
}
