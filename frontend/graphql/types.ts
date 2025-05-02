// Este arquivo fornece tipos padrão que serão usados até que o codegen seja executado
// Após executar o codegen, os aplicativos devem importar tipos diretamente de './generated'

// Tipos de fallback caso o codegen ainda não tenha sido executado
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  cpf: string;
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
  cpf: string;
}

export interface CreateUserResponse {
  createUser: User;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
}

export interface UpdateUserResponse {
  updateUser: User;
}

export interface RemoveUserResponse {
  removeUser: boolean;
}
