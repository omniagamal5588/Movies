"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedAsc, setSortedAsc] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1549e92d47be72d14413d096b261b8c6`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSort = () => {
    const sortedMovies = [...movies].sort((a, b) => {
      if (sortedAsc) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setMovies(sortedMovies);
    setSortedAsc(!sortedAsc);
  };

const handleViewDetails = (id) => {
  router.push(`/movies/${id}`);
};


  if (loading) return <div className="text-center p-4  bg-red-50">Loading...</div>;
  if (error) return <div className="text-center p-4  bg-red-50">Error: {error.message}</div>;
  if (movies.length === 0) return <div className="text-center p-4  bg-red-50">No movies found.</div>;

  return (
    <div className="container mx-auto p-4 bg-red-40"> 
     <h1 className="text-4xl text-center font-bold text-gray-800" style={{ fontFamily: 'cursive' }} >Movies Website</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl  font-bold text-gray-800" style={{ fontFamily: 'cursive' }}>I hope you enjoy</h2>
        <button
          onClick={handleSort}
          className="btn btn-primary bg-indigo-900 text-white hover:bg-blue-600 transition duration-300"
        >
          Sort by Title {sortedAsc ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-rose-200 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{movie.title}</h2>
               
              <button
                onClick={() => handleViewDetails(movie.id)}
                className="btn bg-indigo-900   text-white hover:bg-gray-900 transition duration-300"
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesTable;
