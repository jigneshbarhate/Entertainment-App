import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchTrending = async () => {
  const { data } = await tmdbApi.get('/trending/all/day');
  return data.results;
};

export const fetchMovies = async (page = 1) => {
  const { data } = await tmdbApi.get(`/discover/movie?page=${page}`);
  return data.results;
};

export const fetchTvSeries = async (page = 1) => {
  const { data } = await tmdbApi.get(`/discover/tv?page=${page}`);
  return data.results;
};

export const fetchDetails = async (type, id) => {
  const { data } = await tmdbApi.get(`/${type}/${id}?append_to_response=credits,videos`);
  return data;
};

export const searchMedia = async (query) => {
  const { data } = await tmdbApi.get(`/search/multi?query=${query}`);
  return data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
};

export default tmdbApi;
