import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { printSchema } from "graphql";
import * as fs from "fs";
import * as path from "path";

/**
 * Script para exportar o schema GraphQL para o volume compartilhado.
 * Este script é executado periodicamente para manter o frontend atualizado.
 */
export async function syncSchema() {
  try {
    // Obtém o schema GraphQL
    const app = await NestFactory.create(AppModule, { logger: ["error"] });
    await app.init();

    const gqlSchemaHost = app.get(GraphQLSchemaHost);
    const schema = gqlSchemaHost.schema;
    const schemaString = printSchema(schema);

    // Define o caminho para o arquivo de saída no volume compartilhado
    const sharedPath =
      process.env.SCHEMA_SHARED_PATH ||
      path.resolve(__dirname, "../schema-shared/schema.graphql");
    const sharedDir = path.dirname(sharedPath);

    // Certifica-se de que o diretório existe
    if (!fs.existsSync(sharedDir)) {
      fs.mkdirSync(sharedDir, { recursive: true });
    }

    // Verifica se o schema mudou antes de escrever
    let currentSchema = "";
    try {
      if (fs.existsSync(sharedPath)) {
        currentSchema = fs.readFileSync(sharedPath, "utf-8");
      }
    } catch (e) {
      console.error("Erro ao ler o schema atual:", e);
    }

    // Escreve o schema apenas se ele mudou
    if (currentSchema !== schemaString) {
      fs.writeFileSync(sharedPath, schemaString);
      console.log(`Schema GraphQL atualizado em: ${sharedPath}`);
    }

    await app.close();
    return true;
  } catch (error) {
    console.error("Erro ao sincronizar o schema GraphQL:", error);
    return false;
  }
}

// Executa diretamente se chamado como script
if (require.main === module) {
  syncSchema()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
