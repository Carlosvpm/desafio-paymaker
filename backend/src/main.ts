import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

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
  console.log(
    `Schema GraphQL atualizado automaticamente a partir das entidades declaradas`
  );
}
bootstrap();
