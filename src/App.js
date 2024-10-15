import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./components/TodoItem";


function App() {
  useEffect(() => {
    getTodos()
  }, [])
  const dispatch = useDispatch()
  const state = useSelector((state) => state.todoReducer.todos)
  const [value, setValue] = useState('')
  
  const getTodos = async () => {
    const {data} = await axios.get("http://localhost:8000/todos");
    dispatch({
      type: "GET_TODOS",
      payload: data,
    });
  }
  const addTodo = async () => {
    const newTodo = {
      task: value,
      completed: false
    }
    const {data} = await axios.post("http://localhost:8000/todos", newTodo)
    dispatch({
      type: "ADD_TODO",
      payload: data
    })
  }
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`)
    getTodos()
  }
  const editTodo = async (filteredTodo, todo) => {
    await axios.put(`http://localhost:8000/todos/${todo.id}`, filteredTodo)
    getTodos()
  }
  return (
    <div className="App">
      <h1>Add Todo</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => {
          addTodo()
          setValue('')
        }}>Add</button>
      </form>
      <h1>Todo List</h1>
      <ul>
        {state.map((el) => (
          <TodoItem todo={el} key={el.id} deleteTodo={deleteTodo} editTodo={editTodo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
