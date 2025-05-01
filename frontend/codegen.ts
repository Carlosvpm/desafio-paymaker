import { CodegenConfig } from "@graphql-codegen/cli";
import * as fs from "fs";
import * as path from "path";

// Verifica se o arquivo schema.graphql existe localmente
const localSchemaPath = path.resolve(__dirname, "schema.graphql");
const schemaExists = fs.existsSync(localSchemaPath);

const config: CodegenConfig = {
  // Usa o arquivo local se existir, ou a URL remota como fallback
  schema: schemaExists
    ? localSchemaPath
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql",
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

export default config;
