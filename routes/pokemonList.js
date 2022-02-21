const express = require("express")
const router = express.Router()

const allPokemon = require("../data");


router.get("/", (req,res) => {
    res.json(allPokemon)
})

router.get("/:id", (req,res) => {
    const { id } = req.params;
    var pokemonReturn = {}
    console.log(id)
    for(let i = 0 ; i < allPokemon.length ; i++){
        if(allPokemon[i].id == id){
            pokemonReturn = allPokemon[i]
        }
    }
    res.json(pokemonReturn)
})

router.get("/search/:id", (req,res) => {
    const { id } = req.params;
    var pokemonReturn = []
    console.log(id)
    for(var i = 0 ; i < allPokemon.length ; i++){
        
        if(allPokemon[i].name == id){
            pokemonReturn.push(allPokemon[i])
        }
        for(let f = 0 ; f<allPokemon[i].types.length ; f++){
            if(allPokemon[i].types[f] == id){
                pokemonReturn.push(allPokemon[i])
            }
        }
    }
    res.json(pokemonReturn)
})

router.post("/post", ( req , res ) => {
    const numId = allPokemon.length + 1
    console.log(req.body)
    const newPokemon = {
        "id" : numId,
        ...req.body      
    }
    allPokemon.push(newPokemon)
    return res.status(201).json(allPokemon[allPokemon.indexOf(newPokemon)]);
})

router.put("/edit/:id" , ( req , res ) => {
    const {id} = req.params
    for(let i = 0 ; i < allPokemon.length ; i++){
        if(allPokemon[i].id == id){
            var antigo = allPokemon[i]
            allPokemon[i] = {
                ...antigo,
                ...req.body
            }
        }
    }
    return res.status(201).json(allPokemon[Number(id)-1])
})

router.delete("/del/:id" , (req,res) => {
    const {id} = req.params
    for(let i = 0 ; i < allPokemon.length ; i++){
        if(allPokemon[i].id == id){
            allPokemon.splice(i,1)
        }
    }
    return res.status(201).send("ok")
})


module.exports = router