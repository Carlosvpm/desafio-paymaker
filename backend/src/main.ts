import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { syncSchema } from "./schema-sync";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global do ValidationPipe
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

  app.enableCors(); // Habilita CORS para comunicação com o frontend
  await app.listen(3000);
  console.log(`Aplicação rodando em: http://localhost:3000/graphql`);

  // Sincroniza o schema GraphQL após inicialização
  await syncSchema();
  console.log("Schema GraphQL sincronizado com o volume compartilhado");

  // Configura sincronização periódica do schema (a cada 30 segundos)
  setInterval(async () => {
    try {
      await syncSchema();
    } catch (error) {
      console.error("Erro na sincronização periódica do schema:", error);
    }
  }, 30000); // 30 segundos
}
bootstrap();
