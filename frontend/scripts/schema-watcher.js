const { spawn } = require("child_process");
const http = require("http");

// Pegar variáveis de ambiente passadas ou usar valores padrão
const BACKEND_HOST = process.env.NEXT_PUBLIC_GRAPHQL_HOST || "localhost";
const BACKEND_PORT = process.env.NEXT_PUBLIC_GRAPHQL_PORT || 3000;
const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  `http://${BACKEND_HOST}:${BACKEND_PORT}/graphql`;
const CHECK_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_SCHEMA_CHECK_INTERVAL || 5000
);

let lastSchemaHash = "";

console.log("🔄 Iniciando monitoramento do schema GraphQL...");
console.log(`📡 Conectando em: ${GRAPHQL_URL}`);

async function fetchSchema() {
  return new Promise((resolve, reject) => {
    const url = new URL(GRAPHQL_URL);

    const req = http.request(
      {
        method: "POST",
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        headers: {
          "Content-Type": "application/json",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    req.on("error", (error) => {
      console.error(
        "❌ Erro ao conectar com o servidor GraphQL:",
        error.message
      );
      resolve(null);
    });

    // Consulta de introspecção do schema GraphQL
    req.write(
      JSON.stringify({
        query: `
          {
            __schema {
              types {
                kind
                name
                description
                fields {
                  name
                  description
                  args {
                    name
                    description
                    type {
                      kind
                      name
                      ofType {
                        kind
                        name
                        ofType {
                          kind
                          name
                          ofType {
                            kind
                            name
                          }
                        }
                      }
                    }
                    defaultValue
                  }
                  type {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                        ofType {
                          kind
                          name
                        }
                      }
                    }
                  }
                }
                inputFields {
                  name
                  description
                  type {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                        ofType {
                          kind
                          name
                        }
                      }
                    }
                  }
                  defaultValue
                }
                interfaces {
                  kind
                  name
                }
                enumValues {
                  name
                  description
                }
                possibleTypes {
                  kind
                  name
                }
              }
              queryType {
                name
              }
              mutationType {
                name
              }
              subscriptionType {
                name
              }
              directives {
                name
                description
                locations
                args {
                  name
                  description
                  type {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                        ofType {
                          kind
                          name
                        }
                      }
                    }
                  }
                  defaultValue
                }
              }
            }
          }
        `,
      })
    );
    req.end();
  });
}

function hashSchema(schema) {
  let hash = 0;
  for (let i = 0; i < schema.length; i++) {
    const char = schema.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString();
}

function runCodegen() {
  console.log("🔄 Gerando tipos a partir do schema atualizado...");

  // Usa o comando simplificado para geração de tipos
  const codegenProcess = spawn("npm", ["run", "generate-schema"], {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      NEXT_PUBLIC_GRAPHQL_URL: GRAPHQL_URL,
    },
  });

  codegenProcess.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Tipos gerados com sucesso!");
    } else {
      console.error(`❌ Falha ao gerar tipos. Código de saída: ${code}`);
    }
  });
}

async function checkSchema() {
  try {
    console.log(
      `[${new Date().toISOString()}] Verificando schema em ${GRAPHQL_URL}...`
    );
    const schemaData = await fetchSchema();

    if (!schemaData) {
      console.log("⏳ Aguardando servidor GraphQL ficar disponível...");
      setTimeout(checkSchema, CHECK_INTERVAL);
      return;
    }

    const currentHash = hashSchema(schemaData);

    if (currentHash !== lastSchemaHash) {
      console.log("🔍 Mudanças detectadas no schema GraphQL!");
      lastSchemaHash = currentHash;
      runCodegen();
    } else {
      console.log("✓ Nenhuma mudança no schema detectada.");
    }
  } catch (error) {
    console.error("❌ Erro ao verificar schema:", error);
  }

  setTimeout(checkSchema, CHECK_INTERVAL);
}

// Inicia o processo de verificação do schema
checkSchema();
