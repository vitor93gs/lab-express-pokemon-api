const mongoose = require("mongoose");

const PokemonSchema = mongoose.Schema({
  id: { type: Number, min: 0, required: true, unique: true },
  name: { type: String, trim: true, required: true, unique: true },
  types: {
    type: [String],
    required: true,
    enum: [
      "fire",
      "water",
      "grass",
      "electric",
      "ground",
      "rock",
      "normal",
      "ice",
      "steel",
      "flying",
      "dark",
      "poison",
      "ghost",
      "bug",
      "fairy",
      "dragon",
      "fighting",
    ],
    height: { type: Number, min: 0 },
    weight: { type: Number, min: 0 },
    sprite: { type: String, trim: true },
  },
});

module.exports = mongoose.model("Pokemon", PokemonSchema);
