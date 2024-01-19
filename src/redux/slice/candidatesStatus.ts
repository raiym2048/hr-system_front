import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../../services/commonVariables'

export const putCandidatesStatus = createAsyncThunk(
  'statusCandidates/putCandidatesStatus',
  async ({ status, vacanciesId, usersId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/job_seeker/setStatusForJobSeeker/${vacanciesId}/${usersId}?status=${status}`
      )
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getFetchCandidates = createAsyncThunk(
  'statusCandidates/getFetchCandidates',
  async (vacanciesId: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/job_seeker/list/responded/${vacanciesId}`)
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getCandidatesSearch = createAsyncThunk(
  'statusCandidates/getCandidatesSearch',
  async ({ user, value }: any, { rejectWithValue }) => {
    console.log(value)
    console.log(user.user.id)
    try {
      const response = await axios.get(
        `${baseUrl}/vacancy/list/job_seekers/responded/vacancies/search/${user.user.id}?search=${value}`
      )
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getCandidatesFilter = createAsyncThunk(
  'statusCandidates/getCandidatesFilter',
  async ({ user, res, creation }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/vacancy/list/job_seekers/responded/vacancies/filter/${user}?days${res}?statusOfJobSeeker${creation}`
      )
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

interface AllVacanciesData {
  statusUser: string
  isLoader: boolean
  error: string
  isEmpty: boolean
  statusLoader: boolean
  candidatesVacancies: []
}

const initialState: AllVacanciesData = {
  statusUser: '',
  isLoader: false,
  error: '',
  isEmpty: false,
  statusLoader: false,
  candidatesVacancies: [],
}

const statusCandidates = createSlice({
  name: 'statusCandidates',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(putCandidatesStatus.pending, (state) => {
        state.isLoader = true
      })
      .addCase(putCandidatesStatus.fulfilled, (state, action) => {
        state.isLoader = false
        state.error = ''
        state.statusUser = action.payload
      })
      .addCase(putCandidatesStatus.rejected, (state) => {
        state.isLoader = false
        state.error = 'error'
      })
      .addCase(getFetchCandidates.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getFetchCandidates.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.candidatesVacancies = action.payload
      })
      .addCase(getFetchCandidates.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })
      .addCase(getCandidatesSearch.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getCandidatesSearch.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.candidatesVacancies = action.payload
      })
      .addCase(getCandidatesSearch.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })
      .addCase(getCandidatesFilter.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getCandidatesFilter.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.candidatesVacancies = action.payload
      })
      .addCase(getCandidatesFilter.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })
  },
})

export default statusCandidates.reducer
