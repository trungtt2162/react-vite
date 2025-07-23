import './todo.css'

const TodoData = (props) => {
    const { todoList, deleteTodo } = props;


    const handleClick = (todoDeleteId) => {
        deleteTodo(todoDeleteId);
    }

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        {item.id}. {item.name}
                        <button className='button'
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default TodoData;