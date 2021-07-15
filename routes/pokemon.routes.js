const express = require("express");

const PokemonModel = require("../models/Pokemon.model");

// Criando um novo roteador, que vai receber todas as definições de rotas. O roteador pode então ser importado pela instância do app Express junto com suas definições de rota
const router = express.Router();

// 1. A GET /pokemon route, that serves an array of objects containing data about all the Pokemons
router.get("/pokemon", async (req, res) => {
  try {
    const result = await PokemonModel.find();

    console.log("Rota GET /pokemon", result);

    // Enviando a resposta HTTP contendo todos os pokemons para o cliente
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    // Status 500 significa "Internal server error"
    return res.status(500).json({ msg: err });
  }
});

// 2. An GET /pokemon/:id route, that serves an object of a specific Pokemon (search in the array using the provided id)
router.get("/pokemon/:id", async (req, res) => {
  // ATENÇÃO: os parâmetros SEMPRE são strings. Cuidado ao compará-los com tipos numéricos.
  try {
    const result = await PokemonModel.findOne({ id: Number(req.params.id) });
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// 3. A GET /search route, where the user can search Pokemons by name or type (when searching by type, should return all the pokemon found with that type)
router.get("/search", async (req, res) => {
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
    return res.status(500).json({ msg: err });
  }
});

// 4. A POST /pokemon route, that inserts the new Pokemon into the existing list of all Pokemons (don't worry about persisting the data to the disk, we're gonan learn that later)

router.post("/pokemon", async (req, res) => {
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
    return res.status(500).json({ msg: err });
  }
});

// 5. A PUT /pokemon/:id route, that updates an existing Pokemon with the provided data

router.put("/pokemon/:id", (req, res) => {
  const formData = req.body;

  // Encontrar o Pokemon com o id do parametro de rota
  const id = req.params.id;

  const foundPokemon = allPokemon.find((currentPokemon) => {
    return currentPokemon.id === Number(id);
  });

  if (foundPokemon) {
    // Atualiza o elemento da array com os dados do corpo (body) da requisição
    const index = allPokemon.findIndex((currentPokemon) => {
      return currentPokemon.id === Number(id);
    });

    if (index > -1) {
      allPokemon[index] = { ...foundPokemon, ...formData };

      return res.json(allPokemon[index]);
    } else {
      return res.json({ msg: "Pokemon not found." });
    }
  }

  return res.json({ msg: "Pokemon not found." });
});

// 6. A DELETE /pokemon/:id route, that deletes an existing Pokemon and returns a success message

router.delete("/pokemon/:id", (req, res) => {
  const id = req.params.id;

  const index = allPokemon.findIndex((currentPokemon) => {
    return currentPokemon.id === Number(id);
  });

  if (index > -1) {
    allPokemon.splice(index, 1);
    return res.json({ msg: "Pokemon successfully removed." });
  }

  return res.json({ msg: "Pokemon not found." });
});

module.exports = router;
