import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTrains = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI)=> {
      try {
        const response = await fetch('https://gist.githubusercontent.com/GlennMiller1991/152583a1bf1e057e8db06f5949ae3dda/raw/f84adf51092706ae0e7c0abc7589ad49800d8112/trains.json')
        return response.json();
      } catch (e) {
          return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
      }
  }
)