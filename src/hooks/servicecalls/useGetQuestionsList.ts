import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { getQnAListApi } from "../../store/slices/qna/getQnAlist/getQnAListApi";
import { Note } from "../../types";

interface IGetQuestionsProps {
  category: string;
}

export default function useGetQuestionsList(props: IGetQuestionsProps) {
  const [questionsList, setQuestionsList] = useState<Array<Note>>([]);
  const dispatch = useDispatch<AppDispatch>();

  const fetchQuestionList = async () => {
    try {
      const response = await dispatch(getQnAListApi(props.category)).unwrap();
      setQuestionsList(response as Array<Note>);
    } catch (error) {
      console.error("Failed to fetch category list:", error);
    }
  };

  useEffect(() => {
    fetchQuestionList();
  }, [dispatch, props.category]);

  return { questionsList };
}
