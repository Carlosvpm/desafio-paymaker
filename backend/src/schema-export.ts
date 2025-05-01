import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { printSchema } from "graphql";
import * as fs from "fs";
import * as path from "path";

/**
 * Script para exportar o schema GraphQL gerado pelo NestJS.
 * Isso permite que o frontend tenha acesso ao schema atualizado para gerar tipos TypeScript.
 *
 * Execute com: npm run export-schema
 */
async function exportSchema() {
  // Inicializa a aplicação NestJS
  const app = await NestFactory.create(AppModule);
  await app.init();

  // Obtém o schema GraphQL
  const gqlSchemaHost = app.get(GraphQLSchemaHost);
  const schema = gqlSchemaHost.schema;

  // Converte o schema para string usando a função printSchema do graphql
  const schemaString = printSchema(schema);

  // Define os caminhos para os arquivos de saída
  const outputPath = path.resolve(__dirname, "../schema.graphql");
  const frontendOutputPath = path.resolve(
    __dirname,
    "../../frontend/schema.graphql"
  );

  // Escreve o schema no diretório do backend
  fs.writeFileSync(outputPath, schemaString);
  console.log(`Schema GraphQL exportado para: ${outputPath}`);

  // Verifica se o diretório do frontend existe e escreve o schema lá também
  if (fs.existsSync(path.resolve(__dirname, "../../frontend"))) {
    fs.writeFileSync(frontendOutputPath, schemaString);
    console.log(
      `Schema GraphQL copiado para o frontend: ${frontendOutputPath}`
    );
  } else {
    console.log(
      "Diretório do frontend não encontrado. O schema não foi copiado."
    );
  }

  await app.close();
  process.exit(0);
}

exportSchema().catch((err) => {
  console.error("Erro ao exportar o schema GraphQL:", err);
  process.exit(1);
});
