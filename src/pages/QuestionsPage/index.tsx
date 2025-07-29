import { useState, useMemo } from "react";
import NoteCard from "../../components/NoteCard";
import SearchBar from "../../components/SearchBar";
import { useParams } from "react-router-dom";
import useGetQuestionsList from "../../hooks/servicecalls/useGetQuestionsList";

export default function QuestionsPage() {
  const { category } = useParams();

  const { questionsList } = useGetQuestionsList({ category: category || "" });
  const [searchTerm, setSearchTerm] = useState("");

  const qnaValues = useMemo(() => {
    if (!searchTerm) return questionsList;

    return questionsList.filter(
      (note) =>
        note.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [questionsList, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{category} Notes</h1>

      <SearchBar onSearch={setSearchTerm} placeholder="Search React notes..." />

      {qnaValues.length === 0 ? (
        <div className="text-center py-10">
          {searchTerm ? (
            <p className="text-gray-500 dark:text-gray-400">
              No {category} notes match your search.
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No {category} notes found.
            </p>
          )}
        </div>
      ) : (
        <div>
          {qnaValues.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
