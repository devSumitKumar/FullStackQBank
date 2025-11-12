import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../apiClient/axiosInstance";
import { saveQuestionReuestType } from "../../../../types";

export const addQuestionsAPI = createAsyncThunk(
    "category/saveCategory",
    async (payload: saveQuestionReuestType) => {
        try {
           const response = await axiosInstance().post("question/saveQuestion", payload);
           console.log("Category added successfully:", response.data);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);
