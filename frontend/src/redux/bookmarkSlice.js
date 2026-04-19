import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
  bookmarks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user bookmarks
export const getBookmarks = createAsyncThunk('bookmarks/getAll', async (_, thunkAPI) => {
  try {
    const response = await api.get('/bookmarks');
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new bookmark
export const createBookmark = createAsyncThunk('bookmarks/create', async (bookmarkData, thunkAPI) => {
  try {
    const response = await api.post('/bookmarks', bookmarkData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete bookmark
export const deleteBookmark = createAsyncThunk('bookmarks/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/bookmarks/${id}`);
    return id;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    resetBookmarks: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookmarks = action.payload;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookmarks.push(action.payload);
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookmarks = state.bookmarks.filter((bookmark) => bookmark._id !== action.payload);
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
