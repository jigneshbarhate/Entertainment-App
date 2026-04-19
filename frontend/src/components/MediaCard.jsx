import { MdBookmarkBorder, MdBookmark, MdPlayArrow, MdMovie, MdTv } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBookmark, deleteBookmark } from '../redux/bookmarkSlice';
import { toast } from 'react-toastify';

const MediaCard = ({ item, isBookmarked, isTrending = false }) => {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmarks);
  
  // Try to find if this item exists in our redux bookmarks list
  const savedBookmark = bookmarks.find((b) => b.mediaId === item.id);

  const title = item.title || item.name;
  const rawReleaseDate = item.release_date || item.first_air_date || item.releaseDate;
  const year = rawReleaseDate ? rawReleaseDate.substring(0, 4) : 'N/A';
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv') || item.mediaType; 
  
  const trendingPath = item.backdrop_path || item.backdropPath || item.poster_path || item.posterPath;
  const normalPath = item.poster_path || item.posterPath || item.backdrop_path || item.backdropPath;
  
  const imagePath = isTrending 
    ? (trendingPath ? `https://image.tmdb.org/t/p/w780/${trendingPath}` : 'https://placehold.co/780x440/10141e/FFF?text=No+Image')
    : (normalPath ? `https://image.tmdb.org/t/p/w500/${normalPath}` : 'https://placehold.co/500x750/10141e/FFF?text=No+Poster');

  const handleBookmarkToggle = async () => {
    if (savedBookmark || isBookmarked) {
      // It's bookmarked, so remove it
      const idToDelete = savedBookmark ? savedBookmark._id : item._id;
      if (idToDelete) {
         dispatch(deleteBookmark(idToDelete)).unwrap().then(() => {
           toast.success('Removed from bookmarks');
         }).catch(err => toast.error(err));
      }
    } else {
      // Add bookmark
      const bookmarkData = {
        mediaId: item.id,
        mediaType,
        title,
        posterPath: item.poster_path,
        releaseDate: item.release_date || item.first_air_date,
        rating: item.vote_average
      };

      dispatch(createBookmark(bookmarkData)).unwrap().then(() => {
         toast.success('Added to bookmarks');
      }).catch(err => {
         toast.error(err);
      });
    }
  };

  const isMarked = !!savedBookmark || isBookmarked;

  const PlayOverlay = () => (
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none rounded-lg">
      <div className="flex items-center gap-3 bg-white/25 rounded-full p-2 pr-6">
        <div className="bg-white text-dark-bg rounded-full p-1.5 md:p-2">
          <MdPlayArrow size={24} />
        </div>
        <span className="text-white font-medium text-sm md:text-lg">Play</span>
      </div>
    </div>
  );

  const BookmarkButton = () => (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleBookmarkToggle();
      }}
      className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 rounded-full bg-dark-bg/50 flex items-center justify-center hover:bg-white transition-colors z-20 group/bookmark"
    >
      {isMarked ? (
        <MdBookmark size={16} className="text-white group-hover/bookmark:text-dark-bg transition-colors" />
      ) : (
        <MdBookmarkBorder size={16} className="text-white group-hover/bookmark:text-dark-bg transition-colors" />
      )}
    </div>
  );

  if (isTrending) {
    return (
      <Link to={`/${mediaType}/${item.id}`} className="relative block w-full h-[140px] md:h-[230px] rounded-lg overflow-hidden group cursor-pointer">
        <img src={imagePath} alt={title} className="w-full h-full object-cover" loading="lazy" />
        <PlayOverlay />
        <BookmarkButton />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[5]"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
          <div className="flex items-center text-xs md:text-sm text-white/75 font-light mb-1 space-x-2">
            <span>{year}</span>
            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            <span className="flex items-center gap-1.5">
              {mediaType === 'movie' ? <MdMovie size={16}/> : <MdTv size={16}/>}
              <span className="capitalize">{mediaType === 'movie' ? 'Movie' : 'TV Series'}</span>
            </span>
            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            <span>PG</span>
          </div>
          <h3 className="text-white text-sm md:text-2xl font-medium leading-tight truncate">{title}</h3>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex flex-col group cursor-pointer w-full">
      <Link to={`/${mediaType}/${item.id}`} className="contents">
        <div className="relative rounded-lg overflow-hidden w-full aspect-[2/3] mb-2 md:mb-3">
          <img src={imagePath} alt={title} className="w-full h-full object-cover" loading="lazy" />
          <PlayOverlay />
          <BookmarkButton />
        </div>
      </Link>
      
      <Link to={`/${mediaType}/${item.id}`} className="flex flex-col flex-1">
        <div className="flex items-center text-[11px] md:text-[13px] text-white/75 font-light mb-1 space-x-1.5 md:space-x-2">
          <span>{year}</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span className="flex items-center gap-1">
            {mediaType === 'movie' ? <MdMovie size={14}/> : <MdTv size={14}/>}
            <span className="capitalize">{mediaType === 'movie' ? 'Movie' : 'TV Series'}</span>
          </span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span>PG</span>
        </div>
        <h3 className="text-white text-sm md:text-lg font-medium leading-tight truncate">{title}</h3>
      </Link>
    </div>
  );
};

export default MediaCard;
