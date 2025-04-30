import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { GraphQLFormattedError } from "graphql";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || "user",
      password: process.env.DATABASE_PASSWORD || "password",
      database: process.env.DATABASE_NAME || "user_crud",
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: true, // Não usar em produção
      logging: process.env.NODE_ENV === "development",
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: true,
      introspection: true,
      formatError: (formattedError: GraphQLFormattedError) => {
        const originalError = (formattedError as any).extensions?.originalError;

        if (originalError) {
          return {
            message:
              originalError.message?.toString() || formattedError.message,
            code:
              (formattedError as any).extensions?.code ||
              "INTERNAL_SERVER_ERROR",
            locations: formattedError.locations,
            path: formattedError.path,
          };
        }
        return formattedError;
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
