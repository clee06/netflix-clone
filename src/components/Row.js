import React, { useState, useEffect } from 'react'
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {            
    // create a state for movies
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]); // if [] is blank, code runs once when the component loads 

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    // console.table(movies);

    const handleClick = (movie) => {
        // handle if trailer is already opened -> close the trailer
        if(trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));

            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">

            <h2>{title}</h2>
            
            <div className="row__posters">
                
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        // className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        // src={`${base_url}${
                        //     isLargeRow ? movie.poster_path : movie.backdrop_path 
                        // }`} 
                        className="row__poster"
                        src={`${base_url}${movie.poster_path}`}
                        alt={movie.name} />
                ))}
            </div>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
