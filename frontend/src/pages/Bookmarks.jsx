import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MediaCard from '../components/MediaCard';
import { useSelector, useDispatch } from 'react-redux';
import { getBookmarks } from '../redux/bookmarkSlice';

const Bookmarks = () => {
  const [query, setQuery] = useState('');
  const { bookmarks, isLoading } = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  const filteredBookmarks = bookmarks.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const bookmarkedMovies = filteredBookmarks.filter(item => item.mediaType === 'movie');
  const bookmarkedTv = filteredBookmarks.filter(item => item.mediaType === 'tv');

  if (isLoading && bookmarks.length === 0) {
    return <div className="flex justify-center items-center h-full text-white">Loading...</div>;
  }

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} placeholder="Search for bookmarked shows" />

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-greyish-blue">
            <p className="text-xl md:text-2xl font-light">You haven't bookmarked anything yet.</p>
        </div>
      ) : (
        <>
          {bookmarkedMovies.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8">Bookmarked Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-10">
                {bookmarkedMovies.map((item) => (
                  <MediaCard key={item._id} item={{...item, id: item.mediaId}} isBookmarked={true} />
                ))}
              </div>
            </section>
          )}

          {bookmarkedTv.length > 0 && (
            <section>
              <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8">Bookmarked TV Series</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-10">
                {bookmarkedTv.map((item) => (
                  <MediaCard key={item._id} item={{...item, id: item.mediaId}} isBookmarked={true} />
                ))}
              </div>
            </section>
          )}

          {filteredBookmarks.length === 0 && query && (
             <div className="flex flex-col items-center justify-center h-[20vh] text-greyish-blue">
                <p className="text-xl">No bookmarked items match '{query}'</p>
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bookmarks;
