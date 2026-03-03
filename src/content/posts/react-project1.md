---
title: "React Counter App & LifeCycle"
date: "2026-03-03"
tags: [React]
excerpt: "React Counter App & LifeCycle"
coverImage: "/my-blog/images/post_img/react-project1/counterApp.png"
---

# \[ React Project 1 & LifeCycle ]

이번 포스팅에서는 간단한 카운터 앱(Counter App)을 만들면서 리액트의 **계층 구조**와 **State Lifting(상태 끌어올리기)** 개념에 대해 알아보겠습니다.

## 1. 컴포넌트 간의 데이터 전달 (Props)
리액트에서 컴포넌트 간에 데이터를 주고받으려면 **Props**를 이용해야 합니다. 하지만 이 Props에는 중요한 특징이 있습니다. 
바로 **"부모에서 자식 방향으로만 데이터를 전달할 수 있다"**는 점입니다.

> Props는 하향식(Top-down)으로만 흐르기 때문에, 형제 컴포넌트끼리는 직접 데이터를 전달해줄 수 없습니다.

예를 들어, 현재 화면을 그리는 `Viewer` 컴포넌트와 버튼을 통해 숫자를 조작하는 `Controller` 컴포넌트가 형제 관계에 있다고 가정해 보겠습니다. 
이때 `Viewer` 컴포넌트 내부에서 상태를 변경하는 `setCount` 함수를 `Controller`에게 직접 넘겨줄 수 없습니다.

## 2. 컴포넌트 계층 구조와 State Lifting

이러한 리액트의 특징 때문에 프로젝트를 구성할 때 몇 가지 꼭 짚고 넘어가야 할 점이 있습니다.

1. **계층 구조 형성**: 리액트에서 화면을 구성할 때 여러 개의 컴포넌트들이 서로 부모와 자식 관계를 이루며 계층 구조를 형성합니다.
2. **부모-자식 관계의 필요성**: 특정 컴포넌트가 다른 컴포넌트에게 데이터를 전달하려면 반드시 두 컴포넌트는 서로 부모와 자식 관계를 가지고 있어야 합니다.
3. **공통 부모 컴포넌트의 역할**: 그렇기 때문에 하나의 State를 여러 컴포넌트에서 관리(공유)하게 될 경우, 이 State는 반드시 **이런 컴포넌트들의 공통 부모가 되는 곳**에서 만들어야 합니다.

![컴포넌트 계층 구조](/my-blog/images/post_img/react-project1/image1.png)

이렇게 State를 계층 구조상에서 **위로 끌어올려서** 그 아래에 있는 컴포넌트들이 모두 공유할 수 있도록 만드는 방법을 리액트에서는 **State Lifting(상태 끌어올리기)**이라고 표현합니다.

![State Lifting 동작 원리](/my-blog/images/post_img/react-project1/image2.png)

![데이터 흐름 및 상태 관리](/my-blog/images/post_img/react-project1/image3.png)

따라서 프로젝트를 설계할 때 **해당 State를 어떤 컴포넌트에 위치시킬 것인지**를 잘 고려해서 결정해야 합니다.

## 3. 카운터 앱 (Counter App) 구현하기

State Lifting 개념을 적용하여 간단한 카운터 앱을 구현해 보겠습니다.
전체적인 구조는 최상위 부모인 `App` 컴포넌트가 `count` State를 가지고 있고, 이를 자식 컴포넌트인 `Viewer`와 `Controller`에게 Props로 전달하는 형태입니다.

![Counter App 완성 화면](/my-blog/images/post_img/react-project1/counterApp.png)

### Controller 컴포넌트
버튼을 클릭하여 부모로부터 전달받은 `onClickButton` 함수를 호출해 값을 변경합니다.

```jsx title="src/components/Controller.jsx"
const Controller = ({ onClickButton }) => {
  return (
    <div>
      <button onClick={() => {
        onClickButton(-1);
      }}>-1</button>
      <button onClick={() => {
        onClickButton(-10);
      }}>-10</button>
      <button onClick={() => {
        onClickButton(-100);
      }}>-100</button>
      <button onClick={() => {
        onClickButton(100);
      }}>+100</button>
      <button onClick={() => {
        onClickButton(10);
      }}>+10</button>
      <button onClick={() => {
        onClickButton(1);
      }}>+1</button>
    </div>
  );
}

export default Controller;
```

### Viewer 컴포넌트
부모로부터 현재 카운트 값인 `count`를 Props로 전달받아 화면에 렌더링합니다.

```jsx title="src/components/Viewer.jsx"
const Viewer = ({ count }) => {
  return (
    <div>
      <div>현재 카운트 :</div>
      <h1>{count}</h1>
    </div>
  );
}

export default Viewer;
```

### App 컴포넌트 (공통 부모)
`count` 상태를 관리하며, 변경 함수인 `onClickButton`을 만들어 하위 컴포넌트인 `Controller`와 `Viewer`에게 나누어 줍니다.
이것이 바로 상태를 위로 끌어올리는 **State Lifting**이 적용된 모습입니다.

```jsx title="src/App.jsx"
import './App.css'
import Viewer from './components/Viewer'
import Controller from './components/Controller'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);

  const onClickButton = (value) => {
    setCount(count + value);
  }

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App
```

이렇게 공통 부모 컴포넌트에 State를 두면 형제 컴포넌트 간에도 마치 상태를 공유하는 것처럼 유기적으로 데이터를 조작하고 화면에 나타낼 수 있습니다.

## 4. 라이프사이클 (LifeCycle)
**라이프사이클(LifeCycle)**이란 우리말로 "생애 주기"를 뜻하는 단어입니다.

![LifeCycle](/my-blog/images/post_img/react-project1/lifeCycle.png)

인간의 라이프사이클이 탄생부터 시작해서 죽음에 이르는 단계를 거치듯, **리액트의 컴포넌트도 비슷한 라이프사이클을 가집니다.** (물론 애기 컴포넌트, 청소년 컴포넌트, 성인 컴포넌트 같은 것은 아닙니다)

![React LifeCycle](/my-blog/images/post_img/react-project1/reactLifeCycle.png)

컴포넌트의 라이프사이클은 크게 **Mount**, **Update**, **UnMount**라는 세 가지 단계로 구분할 수 있습니다.

1. **Mount (탄생)**: 컴포넌트가 처음으로 화면에 나타나는(렌더링 되는) 순간입니다.
   - *예: 서버에서 초기 데이터를 불러오는 작업 등을 수행할 수 있습니다.*
2. **Update (변화)**: 컴포넌트의 State나 Props가 변경되어 화면에 다시 렌더링(리렌더링) 될 때를 의미합니다.
   - *예: 어떤 값이 변경되었는지 콘솔에 출력하는 등 값의 변경에 따른 추가 작업을 처리할 수 있습니다.*
3. **UnMount (죽음)**: 컴포넌트가 화면에서 사라지는(렌더링에서 제외되는) 순간을 의미합니다.
   - *예: 컴포넌트가 사용하던 메모리를 정리하거나, 설정된 타이머를 해제하는 등의 작업을 수행할 수 있습니다.*

이처럼 각 단계에 맞춰 필요한 코드를 실행하는 것을 **라이프사이클 제어**라고 하며, 리액트에서는 이를 `useEffect`라는 Hook을 통해 구현할 수 있습니다.

## 5. useEffect 사용하기
`useEffect`는 리액트 컴포넌트의 **사이드 이펙트(Side Effect)**를 제어하기 위한 대표적인 React Hook입니다.

사이드 이펙트란 원래 "부작용"이라는 뜻이지만, 리액트 프로그래밍에서는 값이 변경됨에 따라 발생하는 **"부수적인 효과"**, 혹은 **"파생되는 효과"** 정도로 해석하는 것이 더 정확합니다.
즉, **"어떤 값이 변했을 때, 거기에 맞춰 추가로 실행되어야 하는 동작"**을 정의할 때 사용됩니다.

`useEffect`를 사용하면 컴포넌트가 **Mount** 되었을 때, 특정한 값이 **Update** 되었을 때, 그리고 화면에서 **UnMount** 될 때 원하는 코드를 실행할 수 있습니다.

```jsx
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // count나 input 값이 변경될 때마다 실행 (Update)
  useEffect(() => {
    console.log(`count: ${count} / input: ${input}`);
  }, [count, input]);

  const onClickButton = (value) => {
    setCount(count + value);
  };

  // ... (생략)
```

위의 예제 코드에서 `useEffect`는 의존성 배열(Dependency Array)에 들어있는 `count`와 `input`의 값이 변할 때마다 내부에 있는 콜백 함수를 실행하여 변경된 값을 콘솔에 출력합니다.

### onClickButton 함수 내부에서 그냥 console.log를 쓰면 안 되나요?

종종 초보자들이 State를 변경하는 함수(예: `onClickButton`) 안에서, 상태 변경 직후에 결과를 확인하기 위해 바로 `console.log`를 찍어보는 경우가 있습니다.
하지만 원하던 `count` 값이 아닌 이전 값이 출력되는 것을 볼 수 있습니다.

그 이유는 리액트의 **상태 변화 함수는 비동기(Asynchronous)로 동작하기 때문**입니다.
`setCount`를 호출했다고 해서 그 즉시 바로 `count` 값이 업데이트되는 것이 아니라, 리액트가 효율적인 렌더링을 위해 **상태 변화들을 한꺼번에 모아서 처리**합니다.
따라서 `setCount` 바로 다음 줄에 `console.log`를 찍게 되면, 아직 변경이 완료되지 않은 **이전의 State 값**을 출력하게 되는 것입니다.

이런 상황을 방지하고 "값이 실제로 완전히 바뀐 직후"에 특정한 행동을 하고 싶다면, 반드시 **`useEffect`를 활용하여 해당 State의 변화를 감지하고 실행**해야 합니다.

## 6. useEffect로 라이프사이클 제어하기

`useEffect`를 활용하면 컴포넌트의 각 생애 주기(Mount, Update, UnMount)에 맞춰 원하는 코드를 실행할 수 있습니다.

### 1) 마운트 (탄생)
컴포넌트가 처음 화면에 나타날 때 딱 한 번만 실행하고 싶은 코드가 있다면, 의존성 배열(`deps`) 자리에 **빈 배열(`[]`)**을 전달하면 됩니다.
```jsx
// 1. 마운트 : 탄생
// 두 번째 인자인 의존성 배열을 비워두면 처음 렌더링될 때 한 번만 실행됨
useEffect(() => {
  console.log("mount");
}, []);
```

### 2) 업데이트 (변화, 리렌더링)
컴포넌트가 다시 그려질 때(리렌더링)마다 실행하고 싶을 때는, 의존성 배열을 **아예 생략**하면 됩니다. 
하지만 최초 마운트 시점은 제외하고 **순수하게 업데이트되는 순간에만** 코드를 실행하고 싶다면, 다음과 같이 `useRef`를 활용한 팁(Tip)을 사용할 수 있습니다.

```jsx
// 2-1. 업데이트 (기본 형태)
// 의존성 배열(deps) 자체를 생략하면 렌더링될 때마다 실행됨
useEffect(() => {
  console.log("update");
});

// 2-2. 마운트 시점은 제외하고 오직 업데이트 순간에만 실행하고 싶을 때
import { useEffect, useRef } from "react";

const isMount = useRef(false);

useEffect(() => {
  // 최초 렌더링(마운트) 시에는 isMount를 true로 바꾸고 곧바로 return (아무것도 실행하지 않음)
  if(!isMount.current){
    isMount.current = true;
    return;
  }
  // 이후 업데이트 때부터 실행
  console.log("update");
});
```

### 3) 언마운트 (죽음)
컴포넌트가 화면에서 사라질 때 실행하고 싶은 코드는 `useEffect` 내부에서 **함수를 반환(return)**하도록 작성합니다. 이 반환되는 함수를 **클린업(Cleanup) 함수** 또는 정리 함수라고 부릅니다.

```jsx
// 3. 언마운트 : 죽음
import { useEffect } from "react";

const Even = () => {
  useEffect(() => {
    // 반환(return)되는 이 함수가 클린업 함수입니다.
    // 컴포넌트가 UnMount 될 때 실행됩니다.
    return () => {
      console.log("unmount");
    };
  }, []); // 마운트/언마운트 시점에만 관여하므로 빈 배열
  
  return <div>짝수입니다.</div>
};

export default Even;

// 부모 컴포넌트 어딘가에서: {count % 2 === 0 ? <Even /> : null}
```

## 7. React 개발자 도구 (React Developer Tools) 사용하기

리액트로 개발을 하다 보면, 이 컴포넌트가 지금 어떤 State 값을 가지고 있는지, 부모로부터 어떤 Props를 전달받았는지 눈으로 확인하고 싶을 때가 많습니다. 이때 유용하게 사용할 수 있는 것이 바로 크롬 확장 프로그램인 **React Developer Tools**입니다.

[크롬 웹스토어에서 React Developer Tools 설치하러 가기](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko&pli=1)

확장 프로그램을 설치한 후, 브라우저의 **"확장 프로그램 관리"** 탭(퍼즐 모양 아이콘)으로 이동하여 몇 가지 설정을 해주어야 합니다.
- 세부 정보에서 **"사용"**이 켜져 있는지 확인
- **"사이트 액세스"**를 **"모든 사이트에서"**로 설정
- **"파일 URL에 대한 액세스 허용"**도 체크

설정이 완료되었다면 개발자 도구(`F12`)를 열어보세요! 기존 탭들 옆에 이전에 없던 `Components`와 `Profiler`라는 새로운 탭이 생긴 것을 확인할 수 있습니다.

![Components 탭 화면](/my-blog/images/post_img/react-project1/components.png)

`Components` 탭에 들어가면, 현재 화면이 어떤 리액트 컴포넌트 계층 구조로 이루어져 있는지, 각 컴포넌트의 State와 Props 값은 무엇인지 직관적으로 보여줍니다.

![Developer Tools 설정 화면 1](/my-blog/images/post_img/react-project1/developerTools1.png)
![Developer Tools 설정 화면 2](/my-blog/images/post_img/react-project1/developerTools2.png)

또한 위 화면처럼 우측 상단의 톱니바퀴 아이콘(설정)을 눌러 **`Highlight updates when components render.`** 옵션을 체크해 보세요! 

이 옵션을 켜두면 화면에서 컴포넌트의 리렌더링이 발생할 때마다 해당 영역에 **랜덤한 색깔의 테두리(하이라이트)**가 잠깐 나타났다 사라지게 됩니다. 
이를 통해 현재 **불필요하게 리렌더링이 발생하고 있는 컴포넌트가 무엇인지** 아주 쉽고 직관적으로 파악할 수 있어 성능 최적화(Optimization)를 진행할 때 매우 유용합니다.


### Reference

- 인프런 강의: [한 입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지] - 이정환
