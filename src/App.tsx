import React, { useReducer, useRef,useCallback } from 'react';

import './App.css';

interface Todo{
  id: number;
  text: string;
}
type ActionType = {type:'ADD'; text: string} | {type:'REMOVE'; id: number}

function App() {
  const reducer = (state:Todo[], action:ActionType) =>{
    switch(action.type){
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
        case 'REMOVE':
          return state.filter(({id})=> id !== action.id);
    }

  }

  const [todos, dispatch] = useReducer(reducer, []);

  const onAddTodo = useCallback( ()=>{
    if(newToDoRef.current){
      dispatch({
        type: 'ADD',
        text: newToDoRef.current.value,
      })
      newToDoRef.current.value = "";
    }
  }, [])

  

   const newToDoRef = useRef<HTMLInputElement>(null);
   
  return (
    <div className="App">
      {/* <Lists/> */}
      <input type="text"  ref={newToDoRef}/>
      <button onClick={onAddTodo}>ADD</button>
      {
        todos.map((todo)=>(
          <div key={todo.id}>
            {todo.text}
            <button onClick ={() => dispatch({type:"REMOVE", id:todo.id})}>Remove</button>
          </div>
        ))
      }
    </div>
  );
}

export default App;
