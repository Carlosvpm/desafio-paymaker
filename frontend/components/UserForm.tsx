"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, CreateUserInput, UpdateUserInput } from "@/graphql/types";

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserInput | UpdateUserInput) => void;
  isLoading: boolean;
}

export default function UserForm({ user, onSubmit, isLoading }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput | UpdateUserInput>({
    defaultValues: user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          cpf: user.cpf,
        }
      : {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {user && <input type="hidden" {...register("id")} value={user.id} />}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome
        </label>
        <input
          id="name"
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          {...register("name", { required: "Nome é obrigatório" })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Telefone
        </label>
        <input
          id="phone"
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          {...register("phone")}
        />
      </div>

      <div>
        <label
          htmlFor="cpf"
          className="block text-sm font-medium text-gray-700"
        >
          CPF
        </label>
        <input
          id="cpf"
          type="cpf"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          {...register("cpf")}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Carregando..." : user ? "Atualizar" : "Criar"}
        </button>
      </div>
    </form>
  );
}
