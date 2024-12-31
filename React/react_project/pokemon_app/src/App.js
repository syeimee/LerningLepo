import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon"
import Card from './component/Card/Card';
import Navbar from './component/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"
  /*--------------------
  loadingがtrueの時はloading画面を表示
  falseの時は完了を表示
  -------------------*/
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl,setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadingPokemon(res.results);
      //useEffectが実行されたときには、次のURLを格納する
      setNextUrl(res.next); 
      setPrevUrl(res.previous);
      setLoading(false);
    }
    fetchPokemonData();
  }, [])

  //ロードされたURLをさらに処理
  const loadingPokemon = async (data) => {
    //全てのポケモンに対して.allを行う
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);

  }

  const handleNextPage = async () =>{
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }
  const handlePrevPage = async () =>{
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }
  return (
    <>
      <Navbar/>  
      <div className="App">
        {loading ? (<h1>NOW LOADING...</h1>) : (

          <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
          
          <div className="btn">
            <button onClick = {handlePrevPage}>前へ</button>
            <button onClick = {handleNextPage}>次へ</button>
          </div>
          </>
        )}
      </div>
    </>

  );
}

export default App;
