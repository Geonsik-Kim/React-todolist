# React-todolist
## 01. 많은 데이터 렌더링하기
useState의 기본값에 함수를 넣어 주었다.  
useState(createBulkTodos())라고 작성하면 리렌더링될 때마다 createBulkTodos 함수가 호출되지만, useState(createBulkTodos)처럼 파라미터를 함수 형태로 넣어주면 컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수가 실행된다.

<br>
<br>

## 02. React DevTool를 사용한 성능 모니터링
리액트 개발자 도구 > Components 탭 > Profiler 탭

<br>
<br>

## 03. 느려지는 원인 분석
컴포넌트는 다음과 같은 상황에서 리렌더링이 발생한다.
1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. forceUpdate 함수가 실핼될 때

<br>
<br>

## 04 React.memo를 사용하여 컴포넌트 성능 최적화
ex) export default React.memo(TodoListItem)

<br>
<br>

## 05. onToggle. onRemove 함수가 바뀌지 않게 하기
React.memo를 사용하는 것만으로는 컴포넌트 최적화가 끝나지 않는다.  
현재 프로젝트에서는 todos 배열이 업데이트되면 onRemove와 onToggle 함수도 새롭게 바뀌기 때문이다.  
onRemove와 onToggle 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 todos를 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어진다.  

이렇게 함수가 계속 만들어지는 상황을 방지하는 방법은 두 가지이다.
- useState의 함수형 업데이트 기능을 사용하기
- useReducer 사용하기

### 05.1 useState의 함수형 업데이트
setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의 해주는 업데이트 함수를 넣는다.

함수형 업데이트란?
```javascript
const [number, setNumber] = useState(0);
//prevNumbers는 현재 number 값을 가르킨다.
const onIncrease = useCallback(
    () => setNumber(prevNumber => prevNumber + 1),
    [],
);
```
setNumber(number+1)을 하는 것이 아니라, 위 코드처럼 어떻게 업데이트할지를 정의해 주는 업데이트 함수를 넣어 준다.  
그러면 useCallback을 사용할 때 두 번째 파라미터로 넣는 배열에 number를 넣지 않아도 된다.

<br>

### 05.2 useReducer 사용하기
useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어 주어야 한다.  
지금은 그 대신 두 번째 파라미터에 undefined를 넣고, 세 번째 파라미터에 초기 상태를 만들어 주는 함수인 createBulkTodos를 넣어 주었다.
이렇게 하면 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수를 호출한다.

useReducer를 사용하는 방법은 기존 코드를 많이 고쳐야 한다는 단점이 있지만, 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있다.

<br>
<br>

## 06. 불변성의 중요성
리액트 컴포넌트에서 상태를 업데이트할 때 불변성을 지키는 것은 매우 중요하다.
```javascript
const onToggle = useCallback(id => {
    setTodos(todos => 
        todos.map(todo => 
            todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        )
    )
}, []);
```
기존 데이터를 직접 수정하는 것이 아닌 새로운 배열을 만든 다음에 새로운 객체를 만들어서 필요한 부분을 교체해 주는 방식이다.

업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들기 때문에, React.memo를 사용했을 때 props가 바뀌었는지 혹은 바뀌지 않았는지를 알아내서 리렌더링 성능을 최적화해 줄 수 있다.

이렇게 기존의 값을 수정하지 않으면서 새로운 값을 만들어 내는 것을 __"불변성을 지킨다"__ 고 한다.

<br>
<br>

## 07. TodoList 컴포넌트 최적화하기
리스트에 관련된 컴포넌트를 최적화할 때는 리스트 내부에서 사용하는 컴포넌트도 최적화해야 하고, 리스트로 사용되는 컴포넌트 자체도 최적화해 주는 것이 좋다.

<br>
<br>

## 08. react-virtualized를 사용한 렌더링 최적화
react-virtualized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있다.  
그리고 스크롤이되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링시킨다.