import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../apiClient/axiosInstance";

export const getQnAListApi = createAsyncThunk(
  "qna/getQnAListApi",
  async (payload: string, thunkApi) => {
    try {
      const response = await axiosInstance().get(`question/getQuestionList/categoryId:${payload}` );
      console.log("Category added successfully:", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
