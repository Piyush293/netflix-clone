import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from '../axios'
import requests from '../requests'

export default function Banner() {
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      )
    }
    fetchData()
  }, [])

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `linear-gradient(transparent, transparent, transparent, #111), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <h1 className="banner__title">{movie.name}</h1>
      <div className="banner__buttons">
        <button>Play</button>
        <button>My List</button>
      </div>
      <p className="banner__description">
        {movie.overview && movie.overview.substr(0, 150)}
        {movie.overview && movie.overview.length >= 150 && '...'}
      </p>
    </div>
  );
}
