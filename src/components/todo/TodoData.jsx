import './todo.css'

const TodoData = (props) => {
    const { todoList } = props;
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        {index + 1}. {item.name}
                        <button className='button'
                            style={{ cursor: "pointer" }}
                        // onClick={handleClick}
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