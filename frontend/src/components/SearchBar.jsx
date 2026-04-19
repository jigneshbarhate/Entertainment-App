import { MdSearch } from 'react-icons/md';

const SearchBar = ({ query, setQuery, placeholder }) => {
  return (
    <div className="flex items-center gap-4 bg-transparent mb-6 md:mb-8 w-full max-w-3xl">
      <MdSearch size={32} className="text-white" />
      <input
        type="text"
        placeholder={placeholder || 'Search for movies or TV series'}
        className="w-full bg-transparent border-none outline-none text-white text-lg md:text-2xl placeholder:text-greyish-blue font-light caret-red-netflix"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
