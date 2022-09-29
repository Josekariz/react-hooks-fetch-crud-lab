import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  // create a fetch request
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("  http://localhost:4000/questions")
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, []);

  /// delete Item
  function handleDelItem(delItem) {
    const newItems = items.filter((item) => item.id !== delItem.id);
    setItems(newItems);
  }
  /// patch request
  function handleItemChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {items.map((item) => (
          <QuestionItem
            key={item.id}
            question={item}
            onItemChange={handleItemChange}
            onDelItem={handleDelItem}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
