import { useState } from 'react'
import axios from 'axios'

function App() {

  const [movieName, setMovieName] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;
  const fetchMovieData = async (e) => {
    e.preventDefault(); 
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`);
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error);
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
    </>
  )
}

export default App
