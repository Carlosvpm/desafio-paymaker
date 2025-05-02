import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { printSchema } from "graphql";
import * as fs from "fs";
import * as path from "path";

/**
 * Script para gerar o schema GraphQL a partir das entidades existentes
 * Este script tenta iniciar a aplicação NestJS para extrair o schema,
 * mas continua mesmo se houver problemas de conexão com o banco de dados
 */
async function generateSchema() {
  try {
    console.log("Iniciando geração do schema GraphQL...");

    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn"],
      abortOnError: false,
    });

    try {
      await app.init();
      console.log("Aplicação iniciada com sucesso.");
    } catch (initError) {
      console.warn(
        `Aviso: Erro na inicialização completa da aplicação: ${initError.message}`
      );
      console.log("Continuando com a geração do schema...");
    }

    try {
      const gqlSchemaHost = app.get(GraphQLSchemaHost);
      const schema = gqlSchemaHost.schema;

      const schemaString = printSchema(schema);

      const outputPath = path.resolve(process.cwd(), "schema.gql");

      fs.writeFileSync(outputPath, schemaString);

      console.log(`Schema GraphQL gerado com sucesso em: ${outputPath}`);

      try {
        await app.close();
      } catch (closeError) {
        console.warn(
          `Aviso: Erro ao fechar a aplicação: ${closeError.message}`
        );
      }

      return true;
    } catch (schemaError) {
      console.error(`Erro ao extrair schema GraphQL: ${schemaError.message}`);
      console.error("Não foi possível gerar o schema das entidades");
      return false;
    }
  } catch (error) {
    console.error(`Erro na geração do schema: ${error.message}`);
    return false;
  }
}

generateSchema()
  .then((success) => {
    if (success) {
      console.log("Processo concluído com sucesso!");
      process.exit(0);
    } else {
      console.error("Processo concluído com erros.");
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error(`Erro fatal: ${error.message}`);
    process.exit(1);
  });
