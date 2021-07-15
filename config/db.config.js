const mongoose = require("mongoose");

const connectionPromise = mongoose
  .connect("mongodb://localhost:27017/pokemonDB", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Conectado ao banco com sucesso!");
  })
  .catch((err) => {
    console.log("Erro de conexão com o banco");
    throw new Error(err);
  });

module.exports = connectionPromise;
