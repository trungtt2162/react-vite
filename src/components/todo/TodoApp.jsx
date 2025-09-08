import TodoData from './TodoData'
import TodoNew from './TodoNew'
import reactLogo from '../../assets/react.svg'
import { useState } from 'react'
const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Dalat" },
        // { id: 2, name: "Saigon" }
    ]
    );
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const deleteTodo = (todoDeleteID) => {
        const newTodoList = todoList.filter((todoList) => todoList.id !== todoDeleteID)
        setTodoList(newTodoList);
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

            <div className="todo-tittle">LEARN REACT WITH TAN TRUNG</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />


            {todoList.length === 0 ? <div className="todo-img">
                <img className='logo' src={reactLogo} />
            </div> :

                <TodoData
                    todoList={todoList}
                    deleteTodo={deleteTodo}
                />

            }

        </div>
    )
}

export default TodoApp;