import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchTrains } from './action-creators'

export type SpeedLimit = {
  name: string;
  speedLimit: number;
}

export type Train = {
  name:string;
  description: string;
  speedLimits: SpeedLimit[];
}

type TrainsState = {
  isLoading: boolean
  data: Train[]
  selectedTrainIndex: number |null
  error?: string
}

const initialState: TrainsState = {
  isLoading: false,
  data: [],
  selectedTrainIndex: null,
  error:''
}

type EditSpeedLimit = {
  indexSpeed: number
  value: number
}

export const trainsSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {

    selectTrain: (state, action: PayloadAction<number>)=>{
      state.selectedTrainIndex = action.payload
    },

    changeTrainSpeed: (state, action: PayloadAction<EditSpeedLimit>)=>{
      if (state.selectedTrainIndex!==null){
        state.data[state.selectedTrainIndex].speedLimits[action.payload.indexSpeed].speedLimit = action.payload.value
      }
    },
  },

  extraReducers: {
    [fetchTrains.fulfilled.type]: (state, action: PayloadAction<Train[]>) => {
        state.isLoading = false;
        state.error = ''
        state.data = action.payload
    },
    [fetchTrains.pending.type]: (state) => {
        state.isLoading = true;
    },
    [fetchTrains.rejected.type]: (state,  action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload
    },
  }
})

export const { selectTrain, changeTrainSpeed } = trainsSlice.actions

export default trainsSlice.reducer