const express = require('express');
const router = express.Router();
const axios = require('axios'); //llamo a axios para ejecutar el get con el url de la pokeapi

const getAll = async (req, res) =>{
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=15"); // hago un get de la api con limite de 15 pokemones (destructuring de data llamo directo a data)
        const pokemons = data.results
        //hice el while al igual que en vue
        let i = 0;
        let pokeFinal = []
        while (i < pokemons.length) {
              const {data} = await axios.get(pokemons[i].url);
              // destructuro solo los elementos que necesito del pokemon no toda la data
              const {name, sprites, types, id } = data
              const {front_default : image} = sprites //paso solo el sprite front_default que es el unico que necesito y le doy el nombre image asi se entiende que es la imagen
              const destructuredPoke = {
                  name,
                  image,
                  types,
                  id
              }
              pokeFinal.push(destructuredPoke);
          i++
        }
        //devuelvo en un res.json con los valores de los pokemones con destructuring
        res.json(pokeFinal);
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // este status se podria usar despues por ejemplo para mostrar una pagina de error
    }
}

router.get('/', getAll); //entro a localhost:9000/characters y se ejecuta la funcion getAll que me devulve un json con todos mis pokemones
module.exports = router;