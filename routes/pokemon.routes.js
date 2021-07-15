const express = require("express");

const PokemonModel = require("../models/Pokemon.model");

// Criando um novo roteador, que vai receber todas as definições de rotas. O roteador pode então ser importado pela instância do app Express junto com suas definições de rota
const router = express.Router();

// 1. A GET /pokemon route, that serves an array of objects containing data about all the Pokemons
router.get("/pokemon", async (req, res, next) => {
  try {
    const result = await PokemonModel.find();

    console.log("Rota GET /pokemon", result);

    // Enviando a resposta HTTP contendo todos os pokemons para o cliente
    return res.status(200).json(result);
  } catch (err) {
    // O next envia o que ele recebe de argumento para a próxima rota da sequência. Como aqui ocorreu um erro, quem receberá os dados da next será nosso middleware de captura de erros
    next(err);
  }
});

// 2. An GET /pokemon/:id route, that serves an object of a specific Pokemon (search in the array using the provided id)
router.get("/pokemon/:id", async (req, res, next) => {
  // ATENÇÃO: os parâmetros SEMPRE são strings. Cuidado ao compará-los com tipos numéricos.
  try {
    const result = await PokemonModel.findOne({ id: Number(req.params.id) });
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 3. A GET /search route, where the user can search Pokemons by name or type (when searching by type, should return all the pokemon found with that type)
router.get("/search", async (req, res, next) => {
  // Caso a url seja `?name=jigglypuff` o objeto `query` será o seguinte:
  // {
  //   name: "jigglypuff";
  // }
  try {
    const result = await PokemonModel.find({
      $or: [{ name: req.query.name }, { types: req.query.types }],
    });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 4. A POST /pokemon route, that inserts the new Pokemon into the existing list of all Pokemons (don't worry about persisting the data to the disk, we're gonan learn that later)

router.post("/pokemon", async (req, res, next) => {
  try {
    const formData = req.body;

    const lastAddedPokemon = await PokemonModel.findOne({}, null, {
      sort: { id: -1 },
      limit: 1,
    });

    formData.id = lastAddedPokemon.id + 1;
    console.log(formData);
    const addedPokemon = await PokemonModel.create(formData);

    return res.status(200).json(addedPokemon);
  } catch (err) {
    next(err);
  }
});

// 5. A PUT /pokemon/:id route, that updates an existing Pokemon with the provided data

router.put("/pokemon/:id", async (req, res, next) => {
  try {
    // Encontrar o Pokemon com o id do parametro de rota
    const id = req.params.id;

    const updatedPokemon = await PokemonModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true, runValidators: true } // A opção runValidators executa as validações (required, unique, default, enum, etc...) também na atualização
    );

    if (!updatedPokemon) {
      return res.status(404).json({ msg: "Pokemon not found." });
    }

    return res.status(200).json(updatedPokemon);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 6. A DELETE /pokemon/:id route, that deletes an existing Pokemon and returns a success message

router.delete("/pokemon/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletionResult = await PokemonModel.deleteOne({ _id: id });

    console.log(deletionResult);

    if (deletionResult.n === 0) {
      return res.status(404).json({ msg: "Pokemon not found." });
    }

    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
