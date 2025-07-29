import { createAsyncThunk } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";
import { ICategory } from "../../../../types";

export const addCategoryApi = createAsyncThunk(
    "category/addCategoryApi",
    async (payload: ICategory) => {
        try {
            const response = await fetch("/mockdata/masterdata.xlsx");
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

            const worksheet = workbook.Sheets["Category"];

            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            jsonData.push(payload);

            //check payload for new data
            const updatedSheet = XLSX.utils.json_to_sheet(jsonData);
            workbook.Sheets["Category"] = updatedSheet;

            XLSX.writeFile(workbook, "/mockdata/masterdata.xlsx");

            return jsonData;
        } catch (error) {
            return error;
        }
    }
);
