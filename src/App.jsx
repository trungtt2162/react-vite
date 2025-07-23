import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
// import TodoImage from './components/todo/TodoImage'
import TodoNew from './components/todo/TodoNew'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Dalat" },
    // { id: 2, name: "Saigon" }
  ]
  );
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const addNewTodo = (name) => {
    const randomNumber = randomIntFromInterval(1, 100);
    const newTodo = {
      id: randomNumber,
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }
  return (
    <div className="todo-container">
      <div className="todo-tittle">TO DO LIST</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        todoList={todoList}
      />
      <div className="todo-img">
        <img className='logo' src={reactLogo} />
      </div>
    </div>
  )
}

export default App 
