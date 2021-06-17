import React, { useState } from "react";
import useGET from './../../utils/useHttp'
const Pokemones = () => {
    const [nombre, setNombre] = useState(""); //hook del nombre
    const [pokeFiltered, setPokeFiltered] = useState([]); //hook del poke filtrado
    const [pokemons, error, loading] = useGET("http://localhost:9000/characters");
    const handlerInput = (e) => {
        setNombre(e.target.value);
    }
    const filtrado = () => {
        const poke = pokemons.filter(poke => poke.name === nombre);
        setPokeFiltered(poke); //seteo el poke filtrado
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white">Pokemons:</h2>
                </div>
                <div className="col-12">
                    <input type="text" className="form-control" placeholder="Ingrese el nombre del pokemon" onChange={handlerInput} />
                    <div className="d-grid gap-2">
                        <button onClick={filtrado} className="btn btn-info mt-4 mb-4">Buscar!</button>
                    </div>
                </div>
                {error ? <h1 className="text-center text-white">Error</h1> :
                    [
                        (loading ?
                            <h1 className="text-center text-white" key="1">CARGANDO ...</h1>
                            : (
                                [
                                    pokeFiltered.length > 0 ? ( //si hay un poke filtrado me muestra una card con el filtrado sino me muestra todos los pokes, si escribo mal el poke en el input me devuelve todos

                                        pokeFiltered.map(pokemon => (
                                            <div className="col-4 mb-4" key={pokemon.id}>
                                                <div className="card">
                                                    <img src={pokemon.image} className="card-img-top" alt="no se encontro la imagen" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{pokemon.name}</h5>
                                                        <p className="card-text">id : {pokemon.id}</p>
                                                        {pokemon.types.map(type => (
                                                            <p className="card-text" key={type.slot}>tipo : {type.type.name}</p>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    ) : (

                                        pokemons.map(pokemon => (
                                            <div className="col-4 mb-4" key={pokemon.id}>
                                                <div className="card">
                                                    <img src={pokemon.image} className="card-img-top" alt="no se encontro la imagen" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{pokemon.name}</h5>
                                                        <p className="card-text">id : {pokemon.id}</p>
                                                        {pokemon.types.map(type => (
                                                            <p className="card-text" key={type.slot}>tipo : {type.type.name}</p>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    )
                                ]
                            )
                        )
                    ]
                }

            </div>
        </>
    );
}

export default Pokemones;