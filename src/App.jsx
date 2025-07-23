import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
// import TodoImage from './components/todo/TodoImage'
import TodoNew from './components/todo/TodoNew'
import reactLogo from './assets/react.svg'

const App = () => {
  const name = "TTT";
  const age = "23";
  const data = {
    address: "DaLat",
    country: "Viet Nam"
  };
  return (
    <div className="todo-container">
      <div className="todo-tittle">TO DO LIST</div>
      <TodoNew />
      <TodoData
        name={name}
        age={age}
        data={data}
      />
      <div className="todo-img">
        <img className='logo' src={reactLogo} />
      </div>
    </div>
  )
}

export default App 
