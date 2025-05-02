import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { printSchema } from "graphql";
import * as fs from "fs";
import * as path from "path";

/**
 * Script para gerar o schema GraphQL explicitamente
 * Este script é útil para garantir que o schema seja atualizado
 * a partir das entidades declaradas
 */
async function generateSchema() {
  // Inicializa a aplicação NestJS
  const app = await NestFactory.create(AppModule, { logger: ["error"] });
  await app.init();

  // Obtém o schema GraphQL gerado pelo NestJS
  const gqlSchemaHost = app.get(GraphQLSchemaHost);
  const schema = gqlSchemaHost.schema;

  // Converte o schema para string
  const schemaString = printSchema(schema);

  // Define o caminho para o arquivo de saída
  const outputPath = path.resolve(__dirname, "schema.gql");

  // Escreve o schema no arquivo
  fs.writeFileSync(outputPath, schemaString);
  console.log(`Schema GraphQL gerado com sucesso em: ${outputPath}`);

  await app.close();
  process.exit(0);
}

// Executa o script
generateSchema().catch((err) => {
  console.error("Erro ao gerar o schema GraphQL:", err);
  process.exit(1);
});
