import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({ todos: [] });
  const fetch = async () => {
    const todos = await axios("http://localhost:3334/api/todos");
    if(todos.data !== data.todos){
     setData({ todos: todos.data }); 
    }
  };
  useEffect(() => {
    fetch() ;
  });

  return (
    <div>
      {data.todos.map(todo => (
        <div key={todo.id}>
          <h1>{todo.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default App;
