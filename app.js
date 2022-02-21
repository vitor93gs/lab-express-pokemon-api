const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file


const app = express();
app.use(express.json())


app.get("/" , (req, res) => {
    console.log("AQUI")
    res.json({ message:"MAIN" })
})

const pokemonRouter = require("./routes/pokemonList")
app.use("/pokemon", pokemonRouter)


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
