export type UserBase = {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserResponse = {
  user: UserBase;
  jwt: string;
}

export type User = UserBase & { token: string };
