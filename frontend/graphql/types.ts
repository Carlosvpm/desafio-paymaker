export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersData {
  users: User[];
}

export interface UserData {
  user: User;
}

export interface CreateUserInput {
  name: string;
  email: string;
  phone?: string;
}

export interface CreateUserResponse {
  createUser: User;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface UpdateUserResponse {
  updateUser: User;
}

export interface RemoveUserResponse {
  removeUser: boolean;
}
