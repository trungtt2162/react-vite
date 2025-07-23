import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props;
    const [inputValue, setInputValue] = useState("");
    const handleClick = () => {

        addNewTodo(inputValue);
        setInputValue("");
    }
    const handleOnChange = (name) => {
        setInputValue(name);
    }
    return (
        <div className="todo-button">
            <input type="text"
                onChange={(event) => { handleOnChange(event.target.value) }}
                value={inputValue}
            />
            <button className='button'
                style={{ cursor: "pointer" }}
                onClick={handleClick}>

                Add
            </button>
            <div>
                My input is: {inputValue}
            </div>
        </div>
    );
}
export default TodoNew;