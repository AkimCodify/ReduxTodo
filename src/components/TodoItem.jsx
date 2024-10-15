import React, { useState } from 'react';

const TodoItem = ({todo, deleteTodo, editTodo}) => {
    const [show, setShow] = useState(false)
    const [value, setValue] = useState(todo.task)
    const handleEdit = () => {
        let newTodoObj = {
            task: value,
            completed: false
        }
        editTodo(newTodoObj, todo)
        setShow(!show)
    }
    return (
        <li>
            <span>{todo.task}</span>
            <button
              onClick={(e) => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
            <button onClick={() => {
              setShow(!show)
              }}>Edit</button>
            {show ? (
              <div>
                <input type="text" value={value} onChange={(e) => {
                    setValue(e.target.value)
                }}/>
                <button onClick={handleEdit}>Save</button>
              </div>
            ) : (
              ""
            )}
          </li>
    );
};

export default TodoItem;