
const TodoData = (props) => {
    const { name, age, data } = props;
    return (
        <div className='todo-data'>
            <div>Name: {name}</div>
            <div>Age: {age}</div>
            <div>Address: {data.address}</div>
            <div>Country: {data.country}</div>
        </div>
    );
}

export default TodoData;