import { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState("");

    // 컴포넌트가 리렌더링될 때 한번 함수를 만들고 재사용할 수 있도록 useCallback을 사용한다.
    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue("") // value 값 초기화

            // submit 이벤트는 브라우저에서 새로고침을 발생하기에 이를 방지하기 위함
            e.preventDefault();
        },
        [onInsert, value],
    )
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
                type="text"
                placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="submit"><MdAdd /></button>
        </form>
    )
}

export default TodoInsert;