const express = require("express");

const db = require("./config/db.config");
const pokemonRouter = require("./routes/pokemon.routes");

const PORT = 4000;

const app = express();

// Configurando o Express para aceitar requisições com o body do tipo JSON
app.use(express.json());

// Inicializar a conexão com o banco de dados
async function init() {
  try {
    // Esperando a conexão com o banco
    await db;

    // Configurar a instância do Express para usar o roteador definido no arquivo 'pokemon.routes'
    app.use("/", pokemonRouter);
    // Middleware de captura de erros
    app.use((err, req, res) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: err });
      }
    });

    app.listen(PORT, () =>
      console.log(`Server up and running at port ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
}

init();
