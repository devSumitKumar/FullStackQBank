import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notesReducer from './slices/notesSlice';
import themeReducer from './slices/themeSlice';
import categoryReducer from './slices/category/getCategory/getCategorySlice';
import  getQnAListReducer  from './slices/qna/getQnAlist/getQnAListSlice';
import loader from './slices/loaderSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    theme: themeReducer,
    category : categoryReducer,
    questions: getQnAListReducer,
    loader: loader  
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
