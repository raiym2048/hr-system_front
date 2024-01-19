import axios from 'axios'
import { AllVacanciesDataTS } from './../../app/api/allVacanciesData'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authorizationHeader, baseUrl } from '../../services/commonVariables'
import employerService from '../../services/employerService'

export const getFetchVacancies = createAsyncThunk(
  'allVacancies/getFetchVacancies',
  async (user: any, { rejectWithValue }) => {
    console.log(user)
    try {
      const result: any = await employerService.getVacanciesByEmployer()
      return result
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getAllVacanciesStatus = createAsyncThunk(
  'allVacancies/getAllVacanciesStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/vacancy/statusOfVacancy`)
      const data = response.data

      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
export const getAllVacanciesSearch = createAsyncThunk(
  'allVacancies/getAllVacanciesSearch',
  async ({ searchVacancies, user }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get<AllVacanciesDataTS[]>(
        `${baseUrl}/vacancy/employer/vacancies/search/${user.user.id}?search=${searchVacancies}`
      )
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const putNewVacanciesStatus = createAsyncThunk(
  'allVacancies/putNewVacanciesStatus',
  async ({ chosenId, newStatus, user, reset }: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/vacancy/newStatusForVacancy/${chosenId}?status=${newStatus}`,
        authorizationHeader.headers
      )
      const data = response.data
      dispatch(getFetchVacancies(user))
      reset()
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getAllVacanciesFilter = createAsyncThunk(
  'allVacancies/getAllVacanciesFilter',
  async ({ user, status, res, creation }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/vacancy/employer/vacancies/filter/${user.user.id}?respondedCount=${res}&byDate=${creation}&byStatusOfVacancy=${status}`
      )
      const data = response.data

      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

interface AllVacanciesData {
  vacancies: AllVacanciesDataTS[]
  statusVacancies: []
  newStatusVacancies: []
  isLoader: boolean
  error: string
  isEmpty: boolean
  statusLoader: boolean
  userId: number
}

const initialState: AllVacanciesData = {
  vacancies: [],
  statusVacancies: [],
  newStatusVacancies: [],
  isLoader: false,
  error: '',
  isEmpty: false,
  statusLoader: false,
  userId: 0,
}

const allVacancies = createSlice({
  name: 'allVacancies',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId === action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFetchVacancies.pending, (state) => {
        state.isLoader = true
      })
      .addCase(getFetchVacancies.fulfilled, (state, action) => {
        state.isLoader = false
        state.error = ''
        state.vacancies = action.payload
      })
      .addCase(getFetchVacancies.rejected, (state) => {
        state.isLoader = false
        state.error = 'error'
      })

      .addCase(getAllVacanciesStatus.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getAllVacanciesStatus.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.statusVacancies = action.payload
      })
      .addCase(getAllVacanciesStatus.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })

      .addCase(putNewVacanciesStatus.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(putNewVacanciesStatus.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.newStatusVacancies = action.payload
      })
      .addCase(putNewVacanciesStatus.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })

      .addCase(getAllVacanciesSearch.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getAllVacanciesSearch.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.vacancies = action.payload
      })
      .addCase(getAllVacanciesSearch.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })

      .addCase(getAllVacanciesFilter.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getAllVacanciesFilter.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.vacancies = action.payload
      })
      .addCase(getAllVacanciesFilter.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })
  },
})
export const { setUserId } = allVacancies.actions
export default allVacancies.reducer
