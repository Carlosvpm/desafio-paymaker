"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  REMOVE_USER,
} from "@/graphql/queries";
import {
  UsersData,
  User,
  CreateUserInput,
  UpdateUserInput,
} from "@/graphql/types";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Consulta para buscar usuários
  const { data, loading, error, refetch } = useQuery<UsersData>(GET_USERS);

  // Mutação para criar usuário
  const [createUser, { loading: createLoading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setIsFormVisible(false);
      refetch();
    },
  });

  // Mutação para atualizar usuário
  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setIsFormVisible(false);
      setSelectedUser(null);
      refetch();
    },
  });

  // Mutação para remover usuário
  const [removeUser, { loading: removeLoading }] = useMutation(REMOVE_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleOpenForm = () => {
    setSelectedUser(null);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setIsFormVisible(false);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormVisible(true);
  };

  const handleCreateUser = (data: CreateUserInput) => {
    createUser({
      variables: {
        createUserInput: data,
      },
    });
  };

  const handleUpdateUser = (data: UpdateUserInput) => {
    updateUser({
      variables: {
        updateUserInput: data,
      },
    });
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      removeUser({
        variables: {
          id,
        },
      });
    }
  };

  const handleSubmit = (data: CreateUserInput | UpdateUserInput) => {
    if ("id" in data) {
      handleUpdateUser(data as UpdateUserInput);
    } else {
      handleCreateUser(data as CreateUserInput);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">
              Erro ao carregar dados
            </h1>
            <p className="mt-2 text-lg text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciamento de Usuários
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Um simples CRUD de usuários com Next.js, NestJS e GraphQL
          </p>
        </div>

        <div className="mt-8">
          {isFormVisible ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedUser ? "Editar Usuário" : "Criar Usuário"}
                </h2>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
              </div>

              <UserForm
                user={selectedUser ?? undefined}
                onSubmit={handleSubmit}
                isLoading={createLoading || updateLoading}
              />
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleOpenForm}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Novo Usuário
              </button>
            </div>
          )}

          {loading ? (
            <div className="text-center mt-8">
              <p className="text-gray-600">Carregando usuários...</p>
            </div>
          ) : (
            <UserList
              users={data?.users || []}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              isDeleting={removeLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
