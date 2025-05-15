import { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  // States
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies]= useState([]);
  const [errors, setErrors]= useState();

  // API consts
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiAdress = import.meta.env.VITE_OMDB_API;

  // API
  const fetchMovieData = async (e) => {
    e.preventDefault(); 

     if (movieTitle.trim() === "") {
    setErrors("Enter the name of the movie");
    setMovies([]);
    return;
  }

  try {
    const response = await axios.get(`${apiAdress}?apikey=${apiKey}&s=${movieTitle}&type=movie`);
    console.log(response.data)
    if(response.data.Response === "False") {
      setMovies([])
      setErrors(response.data.Error)
      
    } else {
      setMovies(response.data.Search)
      setErrors('')
    }
    
    
    
  } catch (error) {
    setErrors(error.message);
    setMovies([]);
    
  }
};



  return (
    <>
 
      <form onSubmit={fetchMovieData}>
        <label>Naziv filma</label>
        <input className='mx-2' type="text" onInput={ e => setMovieTitle(e.target.value)} value={movieTitle} />
        <button className='btn btn-primary' type='submit'>Pretrazi film</button>
      </form>
      <section className='d-flex flex-row justify-content-between gap-5 flex-wrap'>
      { 
        movies.map((movie) => (
            
            <div style={{width:"250px"}} className='d-flex flex-column justify-content-between' key={movie.imdbID}>
            <h4 style={{textAlign:"center"}}>{movie.Title} - {movie.Year}</h4>
            <img style={{maxWidth:"100%"}} src={movie.Poster}></img>
            
            </div>
            
        ))
      }

           {errors && (
              <div className="alert alert-danger mt-3">
                {errors}
              </div>
            )}
      </section>

 

      

    </>
  )
}

export default App
