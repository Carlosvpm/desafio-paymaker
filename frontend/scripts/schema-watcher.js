const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");

const BACKEND_HOST = "backend";
const BACKEND_PORT = 3000;
const CHECK_INTERVAL = 5000;
let lastSchemaHash = "";

console.log("🔄 Iniciando monitoramento do schema GraphQL...");
console.log(`📡 Conectando em: http://${BACKEND_HOST}:${BACKEND_PORT}/graphql`);

async function fetchSchema() {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        method: "POST",
        hostname: BACKEND_HOST,
        port: BACKEND_PORT,
        path: "/graphql",
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

  const codegenProcess = spawn("npm", ["run", "codegen"], {
    stdio: "inherit",
    shell: true,
  });

  codegenProcess.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Tipos gerados com sucesso!");
    } else {
      console.error(`❌ Falha ao gerar tipos. Código de saída: ${code}`);
    }
  });
}

const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

async function checkSchema() {
  try {
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
    }
  } catch (error) {
    console.error("❌ Erro ao verificar schema:", error);
  }

  setTimeout(checkSchema, CHECK_INTERVAL);
}

checkSchema();
