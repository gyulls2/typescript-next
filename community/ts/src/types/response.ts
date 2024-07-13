import { ListType } from "./request";

interface User {
  _id: number;
  name: string;
  profile?: Image;
}

interface Image {
  originalname: string;
  name: string;
  path: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BaseResponse {
  ok: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface FileResponse extends BaseResponse {
  item: Image[];
}

export interface SignupResponse extends BaseResponse {
  item: {
    email: string;
    name: string;
    type: "user" | "seller";
    _id: number;
    loginType: string;
    createdAt: string;
    updatedAt: string;
    phone?: string;
    address?: string;
    extra?: Record<string, unknown>;
  };
}

export interface LoginResponse extends BaseResponse {
  item: {
    _id: number;
    email: string;
    name: string;
    type: string;
    loginType: string;
    createdAt: string;
    updatedAt: string;
    profileImage?: Image;
    token: Token;
  };
}

export interface Post {
  type: ListType;
  title: string;
  content: string;
  image?: string;
  tag?: string;
  views: number;
  user: User;
  _id: number;
  createdAt: string;
  updatedAt: string;
  repliesCount: number;
}

export interface PostResponse extends BaseResponse {
  item: Post;
}

export interface ListResponse extends BaseResponse {
  item: Post[];
  pagination: Pagination;
}

export interface Comment {
  _id: number;
  user_id: number;
  user: {
    _id: number;
    name: string;
    profile: string;
  };
  content: string;
  like: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse extends BaseResponse {
  item: Comment;
}

export interface CommentListResponse extends BaseResponse {
  item: Comment[];
  pagination: Pagination;
}
