//custom hooks para peticiones http
import {useState, useEffect} from "react";
import axios from "axios";

const useGET = (url) => {
    const [pokemones, setPokemones] = useState([]); //los pokes vienen en arrays
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const get = async() => {
               try {
                   const {data} = await axios.get(url);
                   setPokemones(data);
                   setLoading(false);    
               } catch (err) {
                    setError(true);
               }
                
        }
        get();
    }, [url])
    return [pokemones, error, loading] //por alguna razon tarda en venir dle localhost asi que implemente un loading
}

export default useGET;