import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from '../axios'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'


export default function Row({ title, fetchURL }) {
  const [movies, setMovies] = useState([])
  const [movieId, setMovieId] = useState('')
  const [showComponent, setShowComponent] = useState(false)
  const opts = {
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL)
      setMovies(request.data.results)
      return
    }
    fetchData()
  }, [fetchURL])

  function displayTrailer(title, release_date, id) {
    console.log(title, release_date.substr(0, 4))
    movieTrailer(title, { year: release_date, id: true }).then((response) => {
      console.log(response)
      setMovieId(response)
      showComponent ? setShowComponent(false) : setShowComponent(true)
    })


  }

  return (
    <div>
      <h2 className="row__title">{title}</h2>
      <div className="row">
        {movies.map(function (movie) {
          return (
            movie.poster_path && (
              <img
                className="row__image"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title ? movie.title : movie.name}
                onClick={() =>
                  displayTrailer(
                    movie.title ? movie.title : movie.name,
                    movie.release_date
                      ? movie.release_date
                      : movie.first_air_date,
                    movie.id
                  )
                }
              />
            )
          )
        })}
      </div>
      {showComponent ? (
        movieId ? (
          <YouTube videoId={movieId} opts={opts} />
        ) : (
          <p className="row__message">No Trailer Found</p>
        )
      ) : null}
    </div>
  )
}
