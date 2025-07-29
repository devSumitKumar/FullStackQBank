import { createAsyncThunk } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";

export const getCategoryApi = createAsyncThunk(
  "category/getCategoryApi",
  async () => {
    try {
      const response = await fetch("/mockdata/masterdata.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
      const worksheet = workbook.Sheets["Category"];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      return jsonData;
    } catch (error) {
      return error;
    }
  }
);

