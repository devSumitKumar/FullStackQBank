import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../apiClient/axiosInstance";


export const getCategoryApi = createAsyncThunk(
  "category/getCategoryList",
  async () => {
    try {
      const response = await axiosInstance().get("category/getCategoryList");
      //handle successs and failure here and sedn the response to the reducer
      return response.data.data;

    } catch (error) {
      return error;
    }
  });
