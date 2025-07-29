import { createAsyncThunk } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";

export  const getQnAListApi = createAsyncThunk(
  "qna/getQnAListApi",
  async (payload : string, thunkApi) => {
    try {
      const response = await fetch("/mockdata/mockdata.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

      const worksheet = workbook.Sheets[payload];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      return jsonData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
