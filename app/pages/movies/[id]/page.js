"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const router = useRouter();
  const { query } = router;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.page) {
      fetch(`https://api.themoviedb.org/3/movie/${query.page}?api_key=1549e92d47be72d14413d096b261b8c6`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [query.page]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4">Error: {error.message}</div>;
  if (!movie) return <div className="text-center p-4">No movie found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <p>{movie.overview}</p>
      {/* Display additional movie details here */}
    </div>
  );
};

export default MovieDetails;
