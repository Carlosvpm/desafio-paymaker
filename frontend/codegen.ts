import { CodegenConfig } from "@graphql-codegen/cli";
import * as fs from "fs";
import * as path from "path";

// Verifica se o arquivo schema.graphql existe localmente
const localSchemaPath = path.resolve(__dirname, "schema.graphql");
const schemaExists = fs.existsSync(localSchemaPath);

// Obtém a URL do GraphQL das variáveis de ambiente ou usa valor padrão
const graphqlUrl =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/graphql";

const config: CodegenConfig = {
  // Usa o arquivo local se existir, ou a URL remota como fallback
  schema: schemaExists ? localSchemaPath : graphqlUrl,
  documents: ["graphql/**/*.ts"],
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        avoidOptionals: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

// Log para depuração
console.log(
  `📄 Usando schema de: ${schemaExists ? localSchemaPath : graphqlUrl}`
);

export default config;
