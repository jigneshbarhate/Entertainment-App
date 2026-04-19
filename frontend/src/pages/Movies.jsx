import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MediaCard from '../components/MediaCard';
import { fetchMovies, searchMedia } from '../services/tmdb';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const search = async () => {
        try {
          const data = await searchMedia(query);
          setSearchResults(data.filter(item => item.media_type === 'movie' || item.title));
        } catch (error) {
          console.error(error);
        }
      };
      
      const timeoutId = setTimeout(search, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  if (loading) {
     return <div className="flex justify-center items-center h-full text-white">Loading...</div>;
  }

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} placeholder="Search for movies" />

      {query ? (
        <section>
          <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8">Found {searchResults.length} results for '{query}'</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-10">
            {searchResults.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : (
        <section>
          <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8">Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-10">
            {movies.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Movies;
