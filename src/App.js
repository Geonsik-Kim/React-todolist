import React, { useReducer, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos(){
  const array = [];
  for(let i=1; i<=2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array
}

function todoReducer(todos, action){
  switch (action.type){
    case "INSERT": // 새로 추가
    // {type: "INSERT", todo: { id: 1. text: "todo". checked: false } }
      return todos.concat(action.todo);
    case "REMOVE": // 제거
    // { type: "REMOVE", id: 1 }
      return todos.filter(todo => todo.id !== action.id);
    case "TOGGLE": // 토글
    // { type: "REMOVE", id: 1 }
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;

  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고윳값으로 사용돌 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  /* 
    useCallback
    첫 번째 파라미터 : 생성하고 싶은 함수
    두 번째 파라미터 : 배열 (어떤 값이 바뀌었을 때 함수를 생성해야 하는지)
    
    함수 내부에서 상태 값에 의존해야 할 때는 그 값은 반드시 두 번째 파라미터 안에 포함시켜 주어야 한다.
  */
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      }
      dispatch({ type: "INSERT", todo })
      nextId.current += 1;
    },
    [],
  );

  const onRemove = useCallback(
    id => {
      dispatch({ type: "REMOVE", id})
    },
    [],
  );

  const onToggle = useCallback(
    id => {
      dispatch({ type: "TOGGLE", id})
    },
    [],
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  )
}

export default App;
