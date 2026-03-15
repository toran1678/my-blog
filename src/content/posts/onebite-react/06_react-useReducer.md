---
title: "useReducer & 최적화 & Context"
date: "2026-03-15"
category: "개발"
tags: [React]
excerpt: "useReducer를 통한 상태 관리 로직 분리 및 복잡한 상태 관리 최적화"
coverImage: "/my-blog/images/post_img/onebite-react/react-basic/react.png"
---

# \[ useReducer & 최적화 & Context ]

## useReducer: 상태 관리 로직 분리하기

> **useReducer**란 컴포넌트 내부에 새로운 State를 생성하는 React Hook입니다. 모든 `useState`는 `useReducer`로 대체가 가능하며, 동일하게 상태 관리 기능을 수행합니다.

### useReducer vs useState

가장 큰 차이점은 **상태 관리 코드를 컴포넌트 외부로 분리할 수 있다**는 점입니다.

#### useState를 사용할 때
![useState](/my-blog/images/post_img/onebite-react/react-useReducer/useState.png)
`useState`를 이용할 때는 `onCreate`와 같이 State를 직접 관리하는 코드들을 반드시 컴포넌트 내부에 작성해줘야 했습니다.

#### useReducer를 사용할 때
![useReducer](/my-blog/images/post_img/onebite-react/react-useReducer/useReducer.png)
반면 `useReducer`를 이용하면 컴포넌트 내부에서는 State 생성만 담당하고, 실제로 이 State를 관리하고 변화시키는 코드들은 `reducer`라는 별도의 함수를 통해 **컴포넌트 외부에서 관리**할 수 있게 됩니다.

---

### 왜 useReducer가 필요한가요? (Todo 예제)

복잡한 상태 변화 로직이 많은 컴포넌트를 예로 들어보겠습니다.

```jsx
function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  // 새로운 Todo를 추가하는 로직
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodos([newTodo, ...todos]);
  };

  // Todo의 상태를 수정하는 로직
  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId
          ? { ...todo, isDone: !todo.isDone }
          : todo
      )
    );
  };

  // Todo를 삭제하는 로직
  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Exam />
    </div>
  );
}
```

위의 `onCreate`, `onUpdate`, `onDelete`처럼 상태 관리 코드들이 길어지게 되면 다음과 같은 문제점이 발생합니다.

1.  **가독성 저하**: 컴포넌트의 주 역할인 UI 렌더링 로직보다 상태 관리 로직이 더 많아져 코드를 파악하기 힘들어집니다.
2.  **유지보수 어려움**: 컴포넌트 내부가 비대해지면서 코드를 수정하거나 관리하기가 까다로워집니다.

이럴 때 `useReducer`를 사용해 상태 관리 로직을 외부로 분리하면 컴포넌트를 훨씬 깔끔하게 유지할 수 있습니다.

---

### useReducer 기초 예제: 카운터

간단한 카운터 예제를 통해 `useReducer`의 동작 방식을 이해해 봅시다.

```jsx
import { useReducer } from "react";

// reducer: 상태를 실제로 변화시키는 '변환기' 역할을 하는 함수
function reducer(state, action) {
  // state: 현재의 상태 값
  // action: 상태가 어떻게 변화되길 원하는지에 대한 정보가 담긴 객체
  switch(action.type) {
    case "INCREASE": 
      return state + action.data;
    case "DECREASE": 
      return state - action.data;
    default: 
      return state;
  }
}

const Exam = () => {
  // dispatch: 상태 변화가 있어야 한다는 사실을 알리는(발송하는) 함수
  // useReducer(리듀서_함수, 초기_값)
  const [state, dispatch] = useReducer(reducer, 0);
  
  const onClickPlus = () => {
    // 액션 객체를 전달하며 상태 변화를 요청함
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };
  
  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };
  
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
}
```

- **dispatch**: "상태를 이렇게 바꿔줘!"라고 외치는 발송인 역할을 합니다.
- **Action 객체**: 무엇을(`type`), 어떤 데이터로(`data`) 바꿀지에 대한 상세 명세서입니다.
- **reducer**: 전달받은 액션 객체를 보고 실제로 상태를 새롭게 만들어내는 공장과 같은 역할을 합니다.

---

## TodoList 앱 업그레이드 (useReducer)

앞서 배운 `useReducer`를 실제 TodoList 앱에 적용하여 상태 관리 로직을 외부로 분리해 봅시다.

```jsx
import "./App.css";
import { useRef, useReducer } from "react"; // useState 대신 useReducer 사용
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const mockData = [
  // 초기 데이터 생략
];

// 1. 상태 변화 로직을 담은 reducer 함수를 컴포넌트 외부에 정의합니다.
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, isDone: !item.isDone }
          : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // 2. useReducer를 호출하여 todos 상태와 dispatch 함수를 생성합니다.
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    // 3. 상태 변화가 필요할 때 액션 객체를 담아 dispatch를 호출합니다.
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++, // idRef.current로 접근해야 함
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todos={todos}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
```

이렇게 `useReducer`를 사용하면 `App` 컴포넌트 내부의 복잡한 상태 업데이트 로직을 `reducer` 함수로 완전히 덜어낼 수 있어, 컴포넌트의 코드가 훨씬 간결해지고 구조가 명확해집니다.

---

## 최적화 (Optimization)

**최적화**란 웹 서비스의 성능을 개선하는 모든 행위를 일컫습니다. 아주 단순한 방법부터 고도의 기술이 필요한 방법까지 매우 다양합니다.

### 일반적인 웹 서비스 최적화 방법
- 서버의 응답 속도 개선
- 이미지, 폰트, 코드 파일 등의 정적 파일 로딩 방식 개선
- 불필요한 네트워크 요청 줄이기 등

### React 앱 내부의 최적화 방법
리액트 앱을 개발할 때는 주로 다음과 같은 관점에서 최적화를 진행합니다.
1.  **불필요한 연산 방지**: 컴포넌트 리렌더링 시마다 불필요하게 반복되는 무거운 연산 줄이기
2.  **불필요한 함수 재생성 방지**: 렌더링 때마다 함수가 매번 다시 만들어지는 것을 방지
3.  **불필요한 리렌더링 방지**: 부모가 변하더라도 자식이 굳이 렌더링될 필요가 없는 경우 방지

---

## useMemo: 불필요한 연산 방지

> **useMemo**란 "메모이제이션(Memoization)" 기법을 기반으로 불필요한 연산을 최적화하는 리액트 훅입니다.

### 메모이제이션(Memoization)이란?
![memoization](/my-blog/images/post_img/onebite-react/react-useReducer/memoization.png)
프로그래밍에서 동일한 연산을 반복적으로 수행해야 할 때, 매번 결과값을 새롭게 계산하는 것이 아니라 **최초로 한 번 계산했을 때의 결과값을 메모리에 보관**해둔 다음, 같은 연산이 필요해지면 저장되어 있던 결과값을 바로 꺼내오는 기법을 말합니다.

### 실습 예제: 통계 데이터 분석

```jsx
import { useMemo, useState } from "react";

// ...중략

const { totalCount, doneCount, notDoneCount } = useMemo(() => {
  console.log("분석 함수 호출!");
  const totalCount = todos.length;
  const doneCount = todos.filter((todo) => todo.isDone).length;
  const notDoneCount = totalCount - doneCount;
  
  return {
    totalCount,
    doneCount,
    notDoneCount,
  };
}, [todos]); 
// 의존성 배열(deps)인 [todos]가 변경될 때만 콜백 함수를 다시 실행하여 결과값을 계산합니다.
```

---

## React.memo: 불필요한 리렌더링 방지

> **React.memo**는 컴포넌트를 인수로 받아 최적화된 컴포넌트로 만들어 반환하는 고차 컴포넌트(HOC)입니다.

![reactmemo](/my-blog/images/post_img/onebite-react/react-useReducer/reactmemo.png)

최적화된 컴포넌트는 자신이 받는 **props를 기준으로 메모이제이션**됩니다. 부모 컴포넌트가 리렌더링되더라도 자신이 전달받는 props가 바뀌지 않았다면 리렌더링을 건너뛰게 됩니다.

### Header 컴포넌트 적용 예시
`Header`는 props를 아예 받지 않으므로 한 번 렌더링되면 다시 그려질 이유가 없습니다.

```jsx
import { memo } from "react";

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default memo(Header); // props 변화가 없으므로 최초 렌더링 후 리렌더링되지 않음
```

### 커스텀 비교 함수 사용하기
객체나 함수 타입의 props는 얕은 비교(`shallow copy`)를 하기 때문에 내용이 같아도 참조값이 바뀌면 리렌더링이 발생합니다. 이럴 때는 `memo`의 두 번째 인수로 비교 함수를 전달할 수 있습니다.

```jsx
// 고차 컴포넌트 (Higher Order Component)
export default memo(TodoItem, (prevProps, nextProps) => {
  // 반환값에 따라 리렌더링 여부 결정
  // true 반환 -> Props가 안 바뀌었다고 판단 -> 리렌더링 X
  // false 반환 -> Props가 바뀌었다고 판단 -> 리렌더링 O
  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;

  return true;
});
```

---

## useCallback: 불필요한 함수 재생성 방지

컴포넌트 내부에 선언된 함수들은 컴포넌트가 리렌더링될 때마다 매번 새롭게 생성됩니다. 만약 이 함수를 자식 컴포넌트에게 props로 넘겨준다면, 자식 입장에서는 내용이 같아도 '새로운 props'를 받았다고 인식하여 불필요한 리렌더링이 발생할 수 있습니다. 

이를 방지하기 위해 **함수 자체를 메모이제이션**하는 훅이 바로 `useCallback`입니다.

```jsx
const onCreate = useCallback((content) => {
  dispatch({
    type: "CREATE",
    data: {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    },
  });
}, []); // 마운트 시점에 한 번만 생성하고 이후에는 재사용함
```

---

## 최적화 가이드: 언제, 무엇을 최적화할까요?

### 1. 최적화 시점
일반적으로 **기능 구현을 먼저 완성한 뒤**, 마지막 단계에서 최적화를 진행하는 것을 권장합니다.
- 개발 도중에 최적화를 너무 미리 해버리면(Early Optimization), 기능을 수정하거나 추가할 때 최적화 로직이 꼬여서 오히려 오류를 발생시키거나 유지보수를 힘들게 할 수 있습니다.

### 2. 최적화 대상 선별
**모든 컴포넌트나 함수에 최적화를 적용하는 것은 좋지 않습니다.**
- 최적화 기법(`memo`, `useMemo` 등) 자체도 연산을 필요로 하며 메모리를 소모합니다. (props 비교 연산, 결과값 저장 등)
- 아주 단순한 UI를 렌더링하는 컴포넌트라면, 최적화 연산을 거치는 것보다 그냥 다시 리렌더링하는 것이 더 빠를 수도 있습니다.

### 권장 최적화 대상
- 유저의 입력이나 행동에 따라 **개수가 아주 많아질 수 있는 컴포넌트** (예: Todo 리스트의 아이템)
- 함수나 연산이 굉장히 많아 코드가 **무거운 컴포넌트**
- 자식 컴포넌트를 아주 많이 포함하고 있어 리렌더링 파급 효과가 큰 **부모 컴포넌트**

---

## React Context

**React Context**란 컴포넌트 간의 데이터를 전달하는 또 다른 방법입니다. 기존의 Props가 가지고 있는 단점을 해결할 수 있는 강력한 도구입니다.

### Props의 단점: Props Drilling
기존의 Props는 **부모 -> 자식** 방향으로만 데이터를 전달할 수 있었습니다.

![props_drilling](/my-blog/images/post_img/onebite-react/react-useReducer/context.png)

만약 `App -> ChildA -> ChildB` 구조에서 `App`의 데이터를 `ChildB`로 직접 전달하고 싶어도, 중간에 있는 `ChildA`가 다리 역할을 해줘야만 합니다. 서비스 규모가 커져 컴포넌트 계층이 깊어지면(`A -> B -> C -> D -> E`), 데이터를 필요로 하지 않는 중간 컴포넌트들까지 모두 props를 전달해야 하는 번거로움이 발생하는데, 이를 **Props Drilling**이라고 합니다.

Context는 이러한 문제를 해결하기 위해 **데이터 보관소** 역할을 하는 객체를 생성하여, 어떤 컴포넌트든 필요한 데이터를 다이렉트로 꺼내 쓸 수 있게 해줍니다.

![context_concept](/my-blog/images/post_img/onebite-react/react-useReducer/context2.png)

위 이미지처럼 특정 컴포넌트 그룹은 A Context를, 다른 그룹은 B Context를 사용하도록 설정하여 데이터를 효율적으로 공급할 수 있습니다.

---

## Context 사용하기

### 1. Context 생성
`createContext`를 사용하여 새로운 Context를 생성합니다. 보통 컴포넌트 외부에 선언합니다.

```jsx
import { createContext } from "react";

// Context 객체 생성
export const TodoContext = createContext();
```

### 2. Provider 설정
Context 객체 안에는 `Provider`라는 프로퍼티가 있습니다. 이 Provider로 전달받을 컴포넌트들을 감싸주면 됩니다.

```jsx
// App.jsx
return (
  <div className="App">
    <Header />
    <TodoContext.Provider value={{
      todos,
      onCreate,
      onUpdate,
      onDelete
    }}>
      <Editor />
      <List />
    </TodoContext.Provider>
  </div>
);
```

![context_provider](/my-blog/images/post_img/onebite-react/react-useReducer/context3.png)

`Provider`의 `value` props를 통해 하위 컴포넌트들에게 전달할 데이터를 객체 등으로 묶어서 보냅니다. 이제 이 아래에 있는 모든 컴포넌트들은 `TodoContext`에 저장된 데이터를 다이렉트로 공급받을 수 있습니다.

![context_value](/my-blog/images/post_img/onebite-react/react-useReducer/context4.png)

### 3. useContext로 데이터 꺼내기
컴포넌트에서 Context에 보관된 데이터를 사용할 때는 `useContext` 훅을 사용합니다.

```jsx
// Editor.jsx
import { useContext } from "react";
import { TodoContext } from "../App";

const Editor = () => {
  const { onCreate } = useContext(TodoContext);
  // ...
```

---

## Context 분리하기 (최적화)

Context를 적용하면 코드가 깔끔해지지만, 한 가지 문제가 발생할 수 있습니다. 바로 **불필요한 리렌더링**입니다.

![context_render_issue](/my-blog/images/post_img/onebite-react/react-useReducer/context5.png)

`Editor`, `List`, `TodoItem` 컴포넌트들이 `TodoContext`가 공급하는 데이터를 사용하도록 설정했습니다. 하지만 이렇게 하면 기존에 적용해두었던 최적화(`memo`)가 제대로 작동하지 않는 것처럼 보일 수 있습니다.

그 이유는 `Provider` 컴포넌트도 결국 React의 컴포넌트이기 때문입니다. 새로운 Todo를 추가하거나 기존 Todo를 수정/삭제하면 `App` 컴포넌트의 `TodoState`가 변경되어 `App`이 리렌더링됩니다. 이때 `Provider`에게 `value` Props로 전달하는 객체(`{ todos, onCreate, onUpdate, onDelete }`)가 매번 새롭게 생성됩니다.

이전에 `TodoItem` 등에 `memo`를 적용해두었더라도, `useContext`로 불러오는 값이 변경되면 Props가 변경된 것과 동일하게 리렌더링이 발생합니다. 결과적으로 Context를 통해 전달하는 객체 자체가 다시 만들어지면서 하위 컴포넌트들의 최적화가 풀리게 되는 것입니다.

이 문제는 **Context를 두 개로 분리**하여 해결할 수 있습니다.

![split_context](/my-blog/images/post_img/onebite-react/react-useReducer/context6.png)

1.  **TodoStateContext**: 변경될 가능성이 있는 `todos` 상태값만 공급
2.  **TodoDispatchContext**: 절대 변경되지 않는 함수들(`onCreate`, `onUpdate`, `onDelete`)만 공급

![split_provider](/my-blog/images/post_img/onebite-react/react-useReducer/context7.png)

`TodoStateContext`와 `TodoDispatchContext`를 각각 생성하여 계층 구조를 만듭니다. `todos` 상태는 `TodoStateContext.Provider`를 통해 공급하고, `onCreate`, `onUpdate`, `onDelete`와 같은 함수들은 `TodoDispatchContext.Provider`를 통해 하위 컴포넌트로 전달합니다.

-   **Editor 컴포넌트**: `TodoDispatchContext`에서 `onCreate` 함수를 꺼내 사용합니다.
-   **TodoItem 컴포넌트**: `TodoDispatchContext`에서 `onUpdate`, `onDelete` 함수를 꺼내 사용합니다.
-   **List 컴포넌트**: `todos` 상태가 필요하므로 `TodoStateContext`에서 값을 가져옵니다.

이렇게 컨텍스트를 분리하면 `todos` 상태가 업데이트되어 `TodoStateContext`가 리렌더링되더라도, `TodoDispatchContext`를 사용하는 컴포넌트들(`Editor`, `TodoItem`)은 공급받는 함수 객체가 변경되지 않았으므로 불필요한 리렌더링이 발생하지 않습니다. (`memo`를 적용한 경우)

### 최적화 적용 예시

```jsx
// App.jsx
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);

  // 함수들이 재생성되지 않도록 useMemo로 묶어줍니다.
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}
```

- `TodoStateContext`에서는 `todos`를 직접 전달합니다.
- `TodoDispatchContext`에서는 `useMemo`로 메모이제이션한 함수 객체를 전달합니다.
- 이제 `todos` 상태가 업데이트되어 `List` 컴포넌트가 리렌더링되더라도, `Editor`나 `TodoItem`처럼 `TodoDispatchContext`만 사용하는 컴포넌트들은 함수 객체가 그대로이므로 불필요한 리렌더링을 방지할 수 있습니다.

---

### Reference

- 인프런 강의: [한 입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지] - 이정환
