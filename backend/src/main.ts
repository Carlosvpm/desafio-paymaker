import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { printSchema } from "graphql";
import * as fs from "fs";
import * as path from "path";

async function generateSchema(app) {
  try {
    const gqlSchemaHost = app.get(GraphQLSchemaHost);
    const schema = gqlSchemaHost.schema;
    const schemaString = printSchema(schema);
    const outputPath = path.resolve(process.cwd(), "schema.gql");
    fs.writeFileSync(outputPath, schemaString);
    console.log(`Schema GraphQL gerado com sucesso em: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Erro ao gerar schema GraphQL: ${error.message}`);
    return false;
  }
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );

    app.enableCors();
    await app.listen(3000);
    console.log(`Aplicação rodando em: http://localhost:3000/graphql`);
    console.log("Gerando schema GraphQL...");
    await generateSchema(app);
  } catch (error) {
    console.error(`Erro ao iniciar a aplicação: ${error.message}`);
    process.exit(1);
  }
}

bootstrap();
