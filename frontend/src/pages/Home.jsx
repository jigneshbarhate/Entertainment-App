import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MediaCard from '../components/MediaCard';
import { fetchTrending, searchMedia } from '../services/tmdb';
import { getBookmarks } from '../redux/bookmarkSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const [query, setQuery] = useState('');
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
    
    const getTrending = async () => {
      try {
        const data = await fetchTrending();
        setTrending(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getTrending();
  }, [dispatch]);

  useEffect(() => {
    if (query.trim()) {
      const search = async () => {
        try {
          const data = await searchMedia(query);
          setSearchResults(data);
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
      <SearchBar query={query} setQuery={setQuery} />

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
        <>
          <section className="mb-10">
            <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8">Trending</h2>
            <div className="flex overflow-x-auto gap-4 md:gap-10 pb-4 scrollbar-hide">
              {trending.slice(0, 10).map((item) => (
                <div key={item.id} className="min-w-[240px] md:min-w-[470px]">
                   <MediaCard item={item} isTrending={true} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8">Recommended for you</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-10">
              {trending.slice(10).map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
