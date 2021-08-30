import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트의 기초 알아보기",
      checked: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링 해보기",
      checked: true,
    },
    {
      id: 3,
      text: "일정 관리 앱 만들어보기",
      checked: false,
    }
  ])

  // 고윳값으로 사용돌 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

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
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  )

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} />
    </TodoTemplate>
  )
}

export default App;
