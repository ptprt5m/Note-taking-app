import "./styles.css";

import React, { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import "tailwindcss/tailwind.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const note = {
      id: notes.length + 1,
      title: title,
      content: content,
      date: format(new Date(), "d MMM y', 'HH:mm:ss", { locale: ru }),
    };
    setNotes([note, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleNoteDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="max-w-6xl m-auto py-16 flex flex-col gap-16">
      <form
        onSubmit={handleNoteSubmit}
        className="flex flex-col items-center w-full max-h-96 gap-5"
      >
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Заголовок"
          required
          className="border border-slate-400 rounded-lg w-full max-w-xs py-2 px-5"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Содержание"
          required
          className="border border-slate-400 rounded-lg w-full max-w-xs py-2 px-5"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-lg py-2 px-5 transition hover:opacity-75">Создать заметку</button>
      </form>
      <div className="notes flex flex-wrap w-full gap-5 md:gap-10 justify-center">
        {notes.map((note) => (
          <div key={note.id} className="note flex flex-col w-2/5 md:w-1/4 m-auto bg-slate-50 border border-slate-300 rounded-xl p-3 shadow-md gap-5 overflow-hidden">
            <div className='w-full gap-1 flex flex-col'>
              <p className='text-xs font-light text-slate-400'>{note.date}</p>
              <h2 className='font-medium'>{note.title}</h2>
              <p className='text-sm font-light h-[60px] line-clamp-3'>{note.content}</p>
            </div>
            <button onClick={() => handleNoteDelete(note.id)} className="bg-red-500 text-white text-sm rounded-lg py-1 px-3 transition hover:opacity-75 m-auto">Удалить</button>
          </div>
        ))}
        <div className="note w-2/5 md:w-1/4 m-auto"></div>
        <div className="note w-2/5 md:w-1/4 m-auto"></div>
      </div>
    </div>
  );
}

export default App;
