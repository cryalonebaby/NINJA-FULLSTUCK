import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// async functions to server
// get all heroes
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async (pageNumber) => {
  const { data } = await axios.get(`/api/heroes?page=${pageNumber}`)
  return data
})

// get one hero
export const fetchOneHero = createAsyncThunk('heroes/fetchOneHero', async (id) => {
  const { data } = await axios.get(`/api/heroes/${id}`)
  return data
})

// create hero
export const createHero = createAsyncThunk('heroes/createHero', async (hero) => {
  const { data } = await axios.post(`/api/heroes`, {
    nickname: hero.nickname,
    real_name: hero.real_name,
    origin_description: hero.origin_description,
    superpowers: hero.superpowers,
    catch_phrase: hero.catch_phrase,
    images: hero.images
  })
  return data
})

// update hero
export const updateHero = createAsyncThunk('heroes/updateHero', async (hero) => {
  const { data } = await axios.put(`/api/heroes/${hero.id}`, hero)
  return data
})

// delete hero
export const deleteHero = createAsyncThunk('heroes/deleteHero', async (id) => {
  const { data } = await axios.delete(`/api/heroes/${id}`)
  return data
})

// Initial State for Slice
const initialState = {
  items: [],
  status: 'loading',
  pagesAmount: 0,
  currentPage: 1,
  currentHero: null,
  notificationText: '',
}

// generate slice with async middlewares 
export const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHeroes.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
      state.pagesAmount = 0;
      state.currentPage = 1;
    },
    [fetchHeroes.fulfilled]: (state, action) => {
      state.items = action.payload.heroes;
      state.status = 'loaded';
      state.pagesAmount = action.payload.pages;
      state.currentPage = action.payload.current;
      state.notificationText = ''
    },
    [fetchHeroes.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
      state.pagesAmount = 0;
      state.currentPage = 1;
      state.notificationText = 'Error with getting heroes!'
    },
    [fetchOneHero.fulfilled]: (state, action) => {
      state.hero = action.payload;
      state.status = 'loaded';
      state.notificationText = ''
    },
    [fetchOneHero.rejected]: (state) => {
      state.hero = null;
      state.status = 'error';
      state.notificationText = 'Error with getting current hero!'
    },
    [updateHero.pending]: (state) => {
      state.items = []
      state.status = 'loading'
      state.pagesAmount = 0
      state.currentPage = 1
      state.notificationText = 'Updating the hero...'
    },
    [updateHero.fulfilled]: (state) => {
      state.status = 'loaded'
      state.notificationText = 'Successfully updated the hero'
    },
    [updateHero.rejected]: (state) => {
      state.status = 'error'
      state.notificationText = 'Error with updating the hero!'
    },
    [deleteHero.fulfilled]: (state) => {
      state.status = 'loaded'
      state.notificationText = 'Successfully deleted!'
    },
    [deleteHero.rejected]: (state) => {
      state.status = 'error'
      state.notificationText = 'Error with deleting the hero!'
    },
    [createHero.fulfilled]: (state) => {
      state.status = 'loaded'
      state.notificationText = 'Successfully created!'
    },
    [createHero.rejected]: (state) => {
      state.status = 'error'
      state.notificationText = 'Error with creating new hero!'
    },
  }
})

export const heroesReducer = heroesSlice.reducer