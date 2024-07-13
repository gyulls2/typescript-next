
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  type: "user" | "seller";
  profileImage?: FileList| File | string;
  phone?: string;
  address?: string;
  extra?: Record<string, unknown>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PostRequest {
  type?: ListType;
  title: string;
  content: string;
}

export interface CommentRequest {
  content: string;
  like?: number;
}
