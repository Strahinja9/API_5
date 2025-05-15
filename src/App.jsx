import { useState } from 'react'
import axios from 'axios'

function App() {
  // States
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies]= useState([]);
  const [errors, setErrors]= useState();

  // API consts
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiAdress = import.meta.env.VITE_OMDB_API;

  // API
  const fetchMovieData = async (e) => {
    e.preventDefault(); 
  try {
    const response = await axios.get(`${apiAdress}?apikey=${apiKey}&s=${movieName}`);
    setMovies(response.data.Search)
    console.log(response.data.Search)
    
  } catch (error) {
    setErrors('Error:', error);
    throw error;
  }
};



  return (
    <>
      <form onSubmit={fetchMovieData}>
        <label>Naziv filma</label>
        <input type="text" onInput={ e => setMovieName(e.target.value)} value={movieName} />
        <button type='submit'>Pretrazi film</button>
      </form>
      
      {
        movies.map((movie) => (
            <ul key={movie.imdbID}>
            <li>{movie.Title}</li>
            <li>{movie.Actors}</li>
            </ul>
        ))
      }

      <p>{errors}</p>

    </>
  )
}

export default App
