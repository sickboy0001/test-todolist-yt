import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ChangeEvent, FormEvent, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [inputValue,setInputvalue] = useState('');
  const [todos , setTodos] = useState<Todo[]>([]) ;
  
  type Todo = {
    inputValue:string;
    id:number;
    checked:boolean;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputvalue(e.target.value);

  };

  const handleSubmit =(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(inputValue);
    //
    const newTodo : Todo ={
      inputValue : inputValue,
      id:todos.length,
      checked:false,
    };

    setTodos([newTodo, ...todos]);
    setInputvalue("");
  
  }

  const handleEdit = (id:number,inputValue:string) => {
    const newTodos = todos.map((todo) =>
    {
      if(todo.id ===id){
        todo.inputValue = inputValue
      }
      return todo;
    });
    setTodos(newTodos);

  }
  function handleChecked(id: number, checked: boolean): void {
    const newTodos = todos.map((todo) =>
    {
      if(todo.id ===id){
        todo.checked = !todo.checked
      }
      return todo;
    });
    setTodos(newTodos);
  }

  function handleDelete(id: number): void {
    const deletedTodos = todos.filter((todo)=>todo.id!==id);
    const newTodos = deletedTodos.map((todo,index) =>
    {
      todo.id = index
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="ThisApp"> 
      <div>

        <h2>TodoList With TypeScript</h2>
        <form onSubmit={(e)=>handleSubmit(e)} >
          <input type="text" onChange={(e)=>handleChange(e)} className='inputText'/>
          <input type="submit" value="作成" className='submitButton'/>    

        </form>
        <ul className='todoList'>
          {todos.map((todo)=>(
              <li key={todo.id}> 
                <input type="text" 
                onChange={(e)=>handleEdit(todo.id,e.target.value)} 
                className='inputText'
                value={todo.inputValue}
                disabled={todo.checked}
                />
                <input type="checkbox" 
                onChange={(e)=>handleChecked(todo.id,todo.checked)} 
                className='inputText'
                value={todo.inputValue}
                />
                <button onClick={() => handleDelete(todo.id)}>削</button>
              </li>
            ) 
          )}

        </ul>
      </div>
    </div>

    )
}
