import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetails } from '../services/tmdb';
import { MdStar, MdLanguage, MdAccessTime, MdCalendarToday, MdInfo, MdOpenInNew, MdPlayArrow, MdArrowBack } from 'react-icons/md';
import { FaImdb } from 'react-icons/fa';

const Details = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const result = await fetchDetails(type, id);
        setData(result);
        
        // Find trailer
        const video = result.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (video) {
          setTrailer(`https://www.youtube.com/watch?v=${video.key}`);
        }
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getDetails();
  }, [type, id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <div className="w-12 h-12 border-4 border-red-netflix border-t-transparent rounded-full animate-spin"></div>
        <p className="text-greyish-blue font-light animate-pulse">Fetching details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
        <p className="text-xl">Media not found</p>
        <button onClick={() => navigate(-1)} className="text-red-netflix hover:underline">Go Back</button>
      </div>
    );
  }

  const title = data.title || data.name;
  const rating = data.vote_average?.toFixed(1) || 'N/A';
  const year = (data.release_date || data.first_air_date)?.substring(0, 4) || 'N/A';
  const runtime = type === 'movie' ? `${data.runtime} min.` : data.episode_run_time?.[0] ? `${data.episode_run_time[0]} min.` : 'N/A';
  const posterPath = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
  const backdropPath = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null;
  const status = data.status || 'N/A';
  const language = data.spoken_languages?.[0]?.english_name || data.original_language?.toUpperCase() || 'N/A';

  return (
    <div className="relative animate-in fade-in duration-700">
      {/* Backdrop overlay for desktop */}
      <div 
        className="hidden md:block absolute top--8 left--8 right--8 h-[60vh] opacity-10 blur-sm mask-gradient z-0 overflow-hidden"
        style={{ backgroundImage: backdropPath ? `url(${backdropPath})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', maskImage: 'linear-gradient(to bottom, black, transparent)' }}
      ></div>

      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 text-greyish-blue hover:text-white transition-colors group z-10 relative"
      >
        <MdArrowBack size={24} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 relative z-10 px-0 md:px-4">
        {/* Left: Poster */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
            <img src={posterPath} alt={title} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 flex flex-col pt-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 leading-tight">{title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
             <div className="flex items-center gap-1 text-2xl font-medium text-white">
                <span>{rating}</span>
                <MdStar className="text-yellow-400 mb-1" />
             </div>
             <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MdStar key={star} size={20} className={star <= Math.round(data.vote_average/2) ? "text-white" : "text-greyish-blue/30"} />
                ))}
             </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="flex flex-col gap-1">
              <span className="text-greyish-blue text-sm uppercase tracking-wider font-medium">Length</span>
              <div className="flex items-center gap-2 text-white">
                <MdAccessTime size={18} className="text-red-netflix" />
                <span>{runtime}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-greyish-blue text-sm uppercase tracking-wider font-medium">Language</span>
              <div className="flex items-center gap-2 text-white">
                <MdLanguage size={18} className="text-red-netflix" />
                <span>{language}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-greyish-blue text-sm uppercase tracking-wider font-medium">Year</span>
              <div className="flex items-center gap-2 text-white">
                <MdCalendarToday size={18} className="text-red-netflix" />
                <span>{year}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-greyish-blue text-sm uppercase tracking-wider font-medium">Status</span>
              <div className="flex items-center gap-2 text-white">
                <MdInfo size={18} className="text-red-netflix" />
                <span>{status}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
             <span className="text-greyish-blue text-sm uppercase tracking-wider font-medium w-full mb-1">Genres</span>
             {data.genres?.map((genre) => (
               <span key={genre.id} className="glass-panel px-3 py-1 rounded text-sm text-white font-light border border-white/10">
                 {genre.name}
               </span>
             ))}
          </div>

          <div className="mb-10">
             <h3 className="text-xl font-medium text-white mb-3">Synopsis</h3>
             <p className="text-greyish-blue font-light leading-relaxed max-w-3xl">
               {data.overview || 'No synopsis available.'}
             </p>
          </div>

          <div className="mb-12">
             <h3 className="text-xl font-medium text-white mb-3">Casts</h3>
             <div className="flex flex-wrap gap-2">
                {data.credits?.cast?.slice(0, 15).map((person) => (
                  <span key={person.id} className="px-3 py-1 rounded-full text-xs text-white border border-white/20 hover:border-red-netflix transition-colors cursor-default">
                    {person.name}
                  </span>
                ))}
             </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto pb-8">
             {data.homepage && (
               <a 
                 href={data.homepage} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 rounded-lg bg-greyish-blue/20 text-white hover:bg-white hover:text-dark-bg transition-all font-medium border border-white/10"
               >
                 <span>Website</span>
                 <MdOpenInNew size={18} />
               </a>
             )}
             {data.imdb_id && (
               <a 
                 href={`https://www.imdb.com/title/${data.imdb_id}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 rounded-lg bg-greyish-blue/20 text-white hover:bg-[#F5C518] hover:text-black transition-all font-medium border border-white/10"
               >
                 <span>IMDb</span>
                 <FaImdb size={22} />
               </a>
             )}
             {trailer && (
               <a 
                 href={trailer} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-8 py-3 rounded-lg bg-red-netflix text-white hover:bg-white hover:text-dark-bg transition-all font-medium shadow-lg shadow-red-netflix/20 ml-0 lg:ml-auto"
               >
                 <MdPlayArrow size={24} />
                 <span>Watch Trailer</span>
               </a>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
