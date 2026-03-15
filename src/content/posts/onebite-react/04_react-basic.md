---
title: "React 입문"
date: "2026-02-28"
category: "개발"
tags: [React]
excerpt: "React 입문 핵심 요약"
coverImage: "/my-blog/images/post_img/onebite-react/react-basic/react.png"
---

# \[ React 입문 ]

## React 컴포넌트 (Component)

> React에서 컴포넌트(Component)는 UI를 구성하는 **최소 단위**이자, 재사용 가능한 **코드 덩어리**

### 컴포넌트의 두 가지 방식

React에는 두 가지 형태의 컴포넌트가 있지만, 현재는 **함수형 컴포넌트**가 표준으로 사용됩니다.

### 클래스형 컴포넌트

예전에는 상태 관리나 생명 주기 기능을 위해 사용했지만, 문법이 복잡하다는 단점이 있었습니다.

### 함수형 컴포넌트 (현재의 표준)

자바스크립트 함수를 작성하듯 만들 수 있어 훨씬 간결하고 가독성이 좋습니다.
**Hooks**의 등장 이후 모든 기능을 함수형에서 구현할 수 있게 되었습니다.

```javascript
// 간단한 함수형 컴포넌트 예시
function Welcome() {
  return <h1>안녕하세요. 반갑습니다.</h1>;
}

// 화살표 함수로도 생성 가능
const header = () => {
  return <h1>header</h1>;
};

// Welcome 컴포넌트 사용 방법
function App() {
  return (
    <>
      <Welcome />
    </>
  );
}
```

### 컴포넌트 작성 시 지켜야 할 규칙

1. **이름은 반드시 대문자로 시작 (PascalCase):** React는 소문로 시작하면 일반 HTML 태그(`div`, `span` 등)로 인식하고, **대문자로 시작해야** 사용자 정의 컴포넌트로 인식합니다.
2. **하나의 태그로 감싸기:** 컴포넌트가 여러 요소를 반환할 때는 반드시 하나의 부모 요소로 감싸야 합니다. (Fragment `<></>`를 활용하면 의미 없는 div 생성을 방지할 수 있습니다.)

### 컴포넌트의 계층 구조

React 앱은 수많은 컴포넌트가 중첩된 **'컴포넌트 트리'** 구조로 이루어져 있습니다.
이때 컴포넌트 간의 상대적인 위치에 따라 부모, 자식, 조상 등의 명칭을 사용합니다.

1. **부모 컴포넌트 (Parent Component)**
   다른 컴포넌트를 포함하고 있는 컴포넌트

- 자식 컴포넌트에게 데이터를 전달할 수 있는 권한을 가짐 (Props 전달)

2. **자식 컴포넌트 (Child Component)**
   다른 컴포넌트 안에 불려가서 사용되는 컴포넌트

- 부모가 주는 데이터(Props)를 받아 화면에 그리거나 로직을 수행

3. **조상 컴포넌트 (Ancestor Component)**
   나를 감싸고 있는 모든 컴포넌트

## JSX로 UI 표현하기

> JSX(JavaScript XML): 확장된 자바스크립트 문법으로, UI 구조를 HTML과 유사하게 시각적으로 작성할 수 있게 해줍니다.

원래 React는 `React.createElement()`라는 복잡한 함수를 사용해야 하지만, JSX 덕분에 마치 HTML을 쓰듯 편하게 코딩할 수 있습니다.
하지만 자바스크립트 문법이 섞여 있는 만큼 **반드시 지켜야 할 규칙**이 있습니다.

### JSX 작성 시 반드시 지켜야 할 4가지 규칙

#### 1. 중괄호 `{ }` 내부에는 '자바스크립트 표현식'만 가능

JSX 안에서 자바스크립트를 쓸 때는 `if`문이나 `for`문 같은 **문장**을 직접 넣을 수 없습니다. 값을 반환하는 **표현식**만 가능합니다.

- **가능:** 변수명, 연산(`1+1`), 삼항 연산자, 함수 호출
- **불가능:** `if`, `for`, `switch` (이들은 중괄호 밖에서 미리 처리하거나 삼항 연산자로 대체해야 합니다.)
-

```jsx
<h2>{name}</h2> {/* 변수 출력 */}
<p>결과: {1 + 2 + 3}</p> {/* 연산 */}
<p>{name.toUpperCase()}</p> {/* 함수 호출 결과 */}
```

#### 2. 숫자, 문자열, 배열 값만 화면에 렌더링됨

중괄호 안에 넣은 데이터 중 화면에 실제로 그려지는 타입은 정해져 있습니다.

- **렌더링 가능:** 숫자, 문자열, 배열(배열 요소들을 이어 붙여서 출력)
- **렌더링 불가:** 불리언(`true`/`false`), `null`, `undefined` (화면에 아무것도 안 보임)
- **주의:** **객체(Object)** 자체를 중괄호에 넣으면 에러가 발생합니다! 반드시 `obj.name`처럼 내부의 값을 꺼내서 써야 합니다.

#### 3. 모든 태그는 반드시 닫혀 있어야 함

HTML에서는 `<img>`나 `<input>`을 닫지 않아도 큰 문제가 없었지만, JSX에서는 반드시 `/`를 넣어 닫아줘야 합니다.

- **예시:** `<input />`, `<br />`, `<img>` (X) → `<img />` (O)

#### 4. 최상위 태그는 반드시 하나여야 함

컴포넌트는 여러 개의 태그를 반환할 수 있지만, 반드시 **하나의 부모 태그**로 감싸져 있어야 합니다. (React가 DOM 트리 구조를 효율적으로 파악하기 위해서입니다.)

- **해결책:** 의미 없는 `<div>`를 쓰기 싫다면 빈 태그인 **Fragment**(`<> ... </>`)를 사용하세요.

### JSX 문법 더 깊게 활용하기

#### 1. camelCase 프로퍼티 명명 규칙

JSX는 HTML이 아닌 자바스크립트 객체에 가깝습니다. 따라서 속성명은 자바스크립트 관례에 따르는 **카멜 케이스(camelCase)**로 작성해야 합니다.

- `class` → `className`
- `onclick` → `onClick`
- `tabindex` → `tabIndex`

#### 2. 인라인 스타일은 '객체'로 전달

HTML의 문자열 방식과 달리, **자바스크립트 객체** 형태로 스타일을 정의합니다.

```jsx
function App() {
  const style = {
    backgroundColor: "black",
    color: "white",
  };
  return <div style={style}>스타일 적용 완료!</div>;
}
```

#### 3. 조건부 렌더링

JSX 내부에서 `if`문은 직접 사용할 수 없습니다. 대신 **삼항 연산자**나 **AND 연산자(`&&`)**를 활용합니다.

- **삼항 연산자:** 조건에 따라 다른 내용을 보여줄 때
- **AND 연산자:** 조건이 맞을 때만 보여주고 싶을 때

```jsx
function App() {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? <p>환영합니다!</p> : <p>로그인이 필요합니다.</p>}
      {isLoggedIn && <button>로그아웃</button>}
    </div>
  );
}
```

### JSX에서 스타일을 설정하는 두 가지 방법

#### 1. 인라인 스타일 (Inline Style)

요소에 직접 스타일 속성을 설정합니다. 이때 주의할 점은 스타일 값을 **자바스크립트 객체**로 전달해야 한다는 것입니다.

```jsx
const Main = () => {
  return (
    <div
      style={{
        backgroundColor: "red", // background-color (X) -> camelCase 사용
        borderBottom: "5px solid blue",
      }}
    >
      안녕하세요.
    </div>
  );
};
```

> 왜 중괄호가 두 개인가요?
> 외부 `{ }`는 자바스크립트 문법을 쓰겠다는 의미이고, 내부 `{ }`는 객체를 나타내는 기호입니다. 즉, `style={ 객체 }` 형태가 되는 것이죠

#### 2. 외부 CSS 파일 적용 (className)

가장 권장되는 방식입니다. 별도의 `.css` 파일을 만들어 스타일을 정의하고 불러와서 사용합니다.

```css
/* Main.css */
.logout {
  background-color: red /* CSS 파일에서는 원래 문법 그대로 사용! */
  border-bottom: 5px solid green;
}
```

```jsx
import "./Main.css";

const Main = () => {
  // HTML의 'class' 대신 'className'을 사용해야 합니다.
  return <div className="logout">로그아웃</div>;
};
```

### 조건부 렌더링 활용

자바스크립트의 `if`문을 활용해 조건에 따라 다른 UI를 보여줄 수 있습니다.

```jsx
const Main = () => {
  const user = {
    name: "김선빈",
    isLogin: true,
  };

  // 로그인 상태에 따라 다른 결과(JSX)를 반환합니다.
  if (user.isLogin) {
    return <div className="logout">로그아웃</div>;
  } else {
    return <div className="login">로그인</div>;
  }
};
```

## Props - 컴포넌트에 값 전달하기

> Props(Properties): 부모 컴포넌트가 자식 컴포넌트에게 전달하는 **데이터(값)**입니다.

React의 컴포넌트는 재사용이 가능한 코드 조각입니다. 하지만 컴포넌트가 항상 똑같은 모습만 보여준다면 활용도가 매우 떨어지게 됩니다. 이때 **Props**를 사용하면 하나의 컴포넌트에 다양한 데이터를 전달하여, 형태는 같지만 내용이 다른 다채로운 UI를 만들어낼 수 있습니다.

![props](/my-blog/images/post_img/onebite-react/react-basic/props.png)
위 이미지를 살펴보면, 부모 컴포넌트인 `App`에서 자식 컴포넌트인 `Button`을 3번 사용하고 있습니다.
이때 각각 `text`와 `img`라는 이름으로 서로 다른 값을 전달하여 **하나의 버튼 컴포넌트를 3가지 용도(메일, 카페, 블로그)로 재사용**하는 것을 볼 수 있습니다.

### 1. 부모에서 자식으로 Props 전달하기

Props를 전달하는 방법은 매우 간단합니다. HTML 태그에 속성을 부여하듯 작성하면 됩니다.

```jsx
// 부모 컴포넌트 (App)
function App() {
  return (
    <div className="button-group">
      {/* Button 컴포넌트에 text와 img 값을 전달 */}
      <Button text="메일" img="mail.png" />
      <Button text="카페" img="cafe.png" />
      <Button text="블로그" img="blog.png" />
    </div>
  );
}
```

- **주의할 점:** 문자열을 전달할 때는 큰따옴표(`""`)를 사용하지만, 숫자, 불리언(boolean), 객체, 배열 등 **문자열 외의 자바스크립트 값을 전달할 때는 반드시 중괄호 `{}`**로 감싸주어야 합니다. (예: `age={25}`, `isLogin={true}`)

### 2. 자식 컴포넌트에서 Props 받아서 사용하기

부모가 전달한 속성들은 하나의 **객체(Object)** 형태로 묶여서 자식 컴포넌트의 첫 번째 매개변수로 전달됩니다.
보통 이 매개변수 이름을 `props`라고 짓습니다.

```jsx
// 자식 컴포넌트 (Button)
function Button(props) {
  // props 객체 안에는 { text: "메일", img: "mail.png" } 형태의 데이터가 들어있습니다.
  return (
    <button className="custom-btn">
      <img src={props.img} alt={props.text} />
      <span>{props.text}</span>
    </button>
  );
}
```

> 실무에서는 '구조 분해 할당'을 많이 씁니다.

매번 `props.`를 붙여서 값을 꺼내 쓰면 코드가 길어지고 번거롭습니다. 그래서 실무에서는 매개변수를 받는 단계에서 바로 객체의 구조를 분해하여 사용하는 방식이 현재의 표준처럼 쓰입니다.

```jsx
// 구조 분해 할당을 사용하여 더 깔끔해진 코드
function Button({ text, img }) {
  return (
    <button className="custom-btn">
      <img src={img} alt={text} />
      <span>{text}</span>
    </button>
  );
}
```

### 3. Props의 기본값 설정하기 (defaultProps)

만약 부모 컴포넌트에서 특정 Props를 넘어주지 않았다면 해당 값은 `undefined`가 됩니다. 이를 방지하기 위해 Props의 기본값을 설정할 수 있습니다. 기본값을 설정하는 방법은 크게 두 가지가 있습니다.

#### 방법 1. `defaultProps` 사용하기 (전통적인 방식)

컴포넌트 바깥에서 `.defaultProps` 속성을 사용해 기본값을 객체 형태로 지정하는 방법입니다. 과거부터 많이 사용되어 온 방식이었지만, 지금은 사용되지 않습니다.

```jsx
function Button({ text, img }) {
  return (
    <button className="custom-btn">
      <img src={img} alt={text} />
      <span>{text}</span>
    </button>
  );
}

// 컴포넌트 선언 외부에서 defaultProps 객체를 연결해 줍니다.
Button.defaultProps = {
  text: "기본 버튼",
  img: "default.png",
};
```

#### 방법 2. 매개변수 기본값 (Default Parameters) 사용하기 (현재의 표준)

최근에는 자바스크립트의 문법인 **'매개변수 기본값'**을 구조 분해 할당과 함께 사용하는 방식을 훨씬 더 권장합니다.

```jsx
// 매개변수를 받는 괄호 안에서 바로 기본값을 할당해 버립니다.
function Button({ text = "기본 버튼", img = "default.png" }) {
  return (
    <button className="custom-btn">
      <img src={img} alt={text} />
      <span>{text}</span>
    </button>
  );
}
```

### 알아두면 유용한 Props 활용 팁

#### 1. 스프레드 연산자(`...`)로 Props 한 번에 전달하기

컴포넌트에 전달해야 할 Props가 3~4개를 넘어가면 태그가 너무 길어지고 가독성이 떨어질 수 있습니다. 이럴 때는 관련된 값들을 하나의 **객체(Object)**로 묶어둔 뒤, 자바스크립트의 **스프레드 연산자(`...`)**를 사용해 한꺼번에 전달하면 코드가 훨씬 깔끔해집니다.

```jsx
function App() {
  // 1. 전달할 Props들을 하나의 객체로 묶어줍니다.
  const buttonProps = {
    text: "메일",
    color: "red",
    a: 1,
    b: 2,
    c: 3,
  };

  return (
    <>
      {/* 2. 스프레드 연산자(...)를 사용해 객체를 통째로 넘겨줍니다. */}
      <Button {...buttonProps} />
      {/* 위 코드는 아래처럼 하나씩 넘겨주는 것과 완벽하게 동일하게 동작합니다. */}
      {/* <Button text="메일" color="red" a={1} b={2} c={3} /> */}
      <Button text="카페" />
      <Button text="블로그" />
    </>
  );
}
```

#### 2. HTML 요소 및 React 컴포넌트 전달하기 (`children`)

Props에는 문자열, 숫자, 불리언 같은 일반적인 데이터뿐만 아니라 **HTML 태그**나 다른 **React 컴포넌트**도 전달할 수 있습니다.

```jsx
// 자식 컴포넌트
function Button({ children }) {
  return <button>{children}</button>;
}

// 부모 컴포넌트
function App() {
  return (
    <Button>
      {/* 이 안의 모든 HTML과 컴포넌트가 Button의 'children'으로 전달됩니다! */}
      <div>자식 요소</div>
      <Header />
    </Button>
  );
}
```

## 이벤트 핸들링 (Event Handling)

> **이벤트 핸들링이란?** 사용자가 버튼을 클릭하거나, 입력창에 타이핑을 하는 등 웹 페이지에서 특정 **'이벤트'가 발생했을 때, 이를 감지하고 원하는 동작을 실행하도록 처리하는 것**을 말합니다.

React에서 이벤트를 처리할 때는 앞서 배운 JSX 규칙에 따라 `onclick` 대신 카멜 케이스인 `onClick`처럼 작성해야 합니다. 이벤트를 연결하는 방식은 크게 두 가지로 나눌 수 있습니다.

### 1. 이벤트 핸들러(함수) 연결하기

#### 1. 태그 내부에 직접 작성하기 (인라인 방식)

코드가 짧고 단순할 때 중괄호 `{ }`안에 화살표 함수를 직접 넣어 사용할 수 있습니다.

```jsx
const Button = ({ text }) => {
  return (
    <button
      onClick={() => {
        console.log(text);
      }}
    >
      {text}
    </button>
  );
};
```

#### 2. 함수를 분리해서 선언 후 연결하기 (권장)

코드가 길어지는 경우가 많을 때는 컴포넌트 내부에서 미리 함수를 만들어두고 이름만 전달하는 방식을 많이 사용합니다.

```jsx
const Button = ({ text, color = "black" }) => {
  // 1. 이벤트가 발생했을 때 실행할 함수를 미리 만듭니다.
  const onClickButton = () => {
    console.log(text);
  };

  return (
    <button
      onClick={onClickButton} // 클릭했을 때
      onMouseEnter={onClickButton} // 마우스를 올렸을 때
    >
      {text} 버튼
    </button>
  );
};
```

> **주의:** `onClick={onClickButton()}`처럼 소괄호를 붙이면 렌더링될 때 함수가 바로 실행되어 버립니다. 반드시 **함수 이름**만 전달해야 합니다!

### 2. 이벤트 객체 (Event Object)

이벤트 핸들러 함수는 호출될 때 React로부터 **이벤트 객체**라는 것을 매개변수로 전달받습니다. 이 객체 안에는 **어떤 요소에서 이벤트가 발생했는지, 마우스 좌표는 어디인지** 등 이벤트와 관련된 모든 상세 정보가 담겨 있습니다. 보통 매개변수 이름을 `e` 또는 `event`로 짓습니다.

```jsx
const onClickButton = (e) => {
  console.log(e); // 브라우저 콘솔에서 다양한 이벤트 정보를 확인할 수 있습니다.
};
```

### 3. React의 특별한 이벤트 객체: SyntheticBaseEvent

위에서 `console.log(e)`를 찍어보면 일반적인 자바스크립트 이벤트 객체가 아니라, **`SyntheticBaseEvent (합성 이벤트 객체)`**라는 것이 출력됩니다. React는 왜 굳이 자신만의 이벤트 객체를 만들어 쓸까요?

바로 **'크로스 브라우징 이슈(Cross Browsing Issue)'를 해결하기 위해서**입니다.

#### 크로스 브라우징 이슈란?

세상에는 크롬, 사파리, 엣지, 파이어폭스 등 다양한 웹 브라우저가 존재합니다. 브라우저마다 제조사가 다르다 보니, **내부적으로 이벤트를 처리하는 방식이나 이벤트 객체의 스펙이 조금씩 다릅니다.**
![SyntheticBaseEvent](/my-blog/images/post_img/onebite-react/react-basic/SyntheticBaseEvent.png)

- 예를 들어, 크롬에서는 이벤트가 발생한 요소를 `e.target`으로 가져오는데, 만약 다른 브라우저에서 이를 `e.ETarget`으로 부른다면 어떨까요? (예시일 뿐 실제 작동 방식은 더 복잡합니다.)
- 개발자는 브라우저마다 다른 코드를 수십 줄씩 작성해야 하는 끔찍한 상황에 부딪히게 됩니다.

#### 합성 이벤트(Synthetic Event)의 역할

React는 이 문제를 해결하기 위해 **모든 브라우저의 고유한 이벤트 객체들을 하나로 통일한 '합성 이벤트 객체'**를 만들었습니다.

- 브라우저의 종류와 상관없이 언제나 동일한 인터페이스(통일된 규칙)를 제공합니다.
- 개발자는 브라우저 호환성을 신경 쓸 필요 없이, React가 제공하는 표준 방식대로만 편하게 코딩하면 됩니다.

## State - 상태 관리하기

> **State(상태)란?** 컴포넌트 내부에서 변화할 수 있는 **동적인 값**을 의미합니다.

React에서는 이 State의 값에 따라 화면에 렌더링되는 UI가 결정됩니다. 예를 들어, 전구 컴포넌트가 있다고 가정해 보겠습니다.

- State가 `OFF`일 때는 화면에 꺼진 전구를 보여줍니다.
- 사용자가 스위치를 눌러 State가 `ON`으로 바뀌면, React는 상태 변화를 감지하고 자동으로 화면을 다시 그려 켜진 전구를 보여줍니다.

이처럼 State가 변할 때마다 컴포넌트가 화면을 다시 그리는 과정을 **리렌더(Re-Render)** 또는 **리렌더링(Re-Rendering)**이라고 부릅니다.

![state](/my-blog/images/post_img/onebite-react/react-basic/state.png)
위 사진처럼 하나의 컴포넌트 안에서 여러 개의 독립적인 State를 만들어 관리할 수도 있습니다. 전구의 점등 상태(`isLightOn`), 고장 유무(`isBroken`), 오염 여부(`isDirty`) 등을 각각의 State로 저장해 두는 식입니다.

### 1. useState로 State 생성하기

React에서 State를 만들 때는 `useState`라는 내장 함수(Hook)를 사용합니다.

```jsx
import { useState } from "react";

function App() {
  const state = useState(0);
  console.log(state); // 콘솔창 확인
  return <></>;
}
```

위 코드를 실행하고 콘솔창을 확인해보면 **두 개의 요소가 들어있는 배열**이 출력됩니다.

1. **첫 번째 요소 (`state[0]`):** 현재 State의 **값**입니다. `useState(0)`처럼 괄호 안에 숫자를 넣으면 그 값이 초기값이 됩니다.
2. **두 번째 요소 (`state[1]`):** State의 값을 변경할 때 사용하는 **상태 변화 함수**입니다.

이 배열을 실무에서는 아래와 같이 **'배열 구조 분해 할당'**을 이용해 훨씬 간결하게 꺼내서 사용합니다.

```jsx
function App() {
  // state 변수 이름과 상태 변화 함수 이름을 자유롭게 지어줍니다.
  // 통상적으로 함수 이름 앞에는 'set'을 붙입니다.
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1); // 버튼을 누를 때마다 count 값이 1씩 증가
        }}
      >
        +
      </button>
    </>
  );
}
```

### 2. State 활용 예제: 전구 스위치 만들기

State를 활용해 버튼을 누를 때마다 켜짐/꺼짐이 바뀌는 간단한 토글 기능을 구현해 보겠습니다.

```jsx
import { useState } from "react";

function LightSwitch() {
  const [light, setLight] = useState("OFF");

  return (
    <div>
      <h1>전구 상태: {light}</h1>
      <button
        onClick={() => {
          // 현재 light 값이 "ON"이면 "OFF"로, 아니면 "ON"으로 변경합니다.
          setLight(light === "ON" ? "OFF" : "ON");
        }}
      >
        {light === "ON" ? "끄기" : "켜기"}
      </button>
    </div>
  );
}
```

### 왜 let을 안 쓰고 굳이 State를 쓸까요?

React를 처음 배우면 가장 많이 하는 질문입니다. _"어차피 값이 변하는 거면 그냥 `let count = 0;` 처럼 변수를 쓰면 안 되나요?"_
**결론부터 말하자면, 일반 변수는 값이 바뀌어도 화면이 업데이트(리렌더링)되지 않습니다.**

```jsx
// 잘못된 예시: 일반 변수 사용
let count = 0;
const onClick = () => {
  count = count + 1;
  console.log(count); // 내부 값은 오르지만, 화면의 숫자는 절대 안 바뀜!
};
```

React 컴포넌트는 오직 **자신의 State가 변경될 때만** 화면을 다시 그려야(Re-rendering) 한다고 인식합니다. 따라서 화면의 UI와 직접적으로 연결되어 실시간으로 변해야 하는 데이터라면, 반드시 일반 변수가 아닌 **State**로 관리해야 합니다.

## State를 Props로 전달하기

부모 컴포넌트에서 만든 State는 자식 컴포넌트에게 Props로 전달할 수 있습니다. 자식 컴포넌트는 전달받은 Props의 값이 바뀌면 화면을 다시 그립니다(리렌더링).

```jsx
// 자식 컴포넌트: props로 light 값을 전달받음
const Bulb = ({ light }) => {
  console.log("Bulb 컴포넌트 리렌더링 발생!"); // 콘솔에서 언제 호출되는지 확인 용도
  return (
    <div>
      {light === "ON" ? (
        <h1 style={{ backgroundColor: "orange" }}>ON</h1>
      ) : (
        <h1 style={{ backgroundColor: "gray" }}>OFF</h1>
      )}
    </div>
  );
};

// 부모 컴포넌트
function App() {
  const [count, setCount] = useState(0);
  const [light, setLight] = useState("OFF");
  return (
    <div>
      {/* Bulb 컴포넌트에 light state를 전달 */}
      <Bulb light={light} />
      <button
        onClick={() => {
          setLight(light === "ON" ? "OFF" : "ON");
        }}
      >
        {light === "ON" ? "끄기" : "켜기"}
      </button>
      {/* 테스트용 카운터 */}
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
```

### 컴포넌트가 리렌더링(Re-rendering) 되는 3가지 상황

위 코드에서 끄기/켜기 버튼을 누르면 `light` 값이 변하므로 `<Bulb />`가 리렌더링되는 것은 당연합니다. **하지만 테스트용 카운터의 `+` 버튼을 눌러 `count` 값을 변경해도 `<Bulb />`가 다시 렌더링되는 것을 확인할 수 있습니다.**
그 이유는 React 컴포넌트가 다음 3가지 상황에서 리렌더링을 발생시키기 때문입니다.

1. 자신이 관리하는 **State**가 바뀌었을 때
2. 자신이 부모로부터 제공받는 **Props**의 값이 변경될 때
3. **부모 컴포넌트가 리렌더링될 때** (가장 주의해야 할 점)

위 코드에서는 `count` State가 변경되면 부모인 `App` 컴포넌트 전체가 리렌더링(1번 조건)됩니다. 따라서 자식인 `Bulb` 컴포넌트는 자신의 Props(`light`)가 전혀 바뀌지 않았음에도 부모를 따라 강제로 리렌더링(3번 조건)되는 것입니다.

### 해결 방법: 컴포넌트 분리하기

이렇게 부모 컴포넌트 때문에 발생하는 불필요한 연산을 막으려면, 연관이 없는 State들은 서로 다른 컴포넌트로 분리해 주는 것이 좋습니다.

카운터 기능을 담당하는 State와 UI를 통째로 덜어내어 `<Counter />`라는 새로운 컴포넌트로 만들어 보겠습니다.

```jsx
// 카운터 기능을 별도의 컴포넌트로 분리
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
```

이제 `App` 컴포넌트에서 분리한 `<Counter />`를 불러와서 사용하면 깔끔하게 해결됩니다.

```jsx
// 최적화된 부모 컴포넌트
function App() {
  const [light, setLight] = useState("OFF");
  return (
    <div>
      <Bulb light={light} />
      <button
        onClick={() => {
          setLight(light === "ON" ? "OFF" : "ON");
        }}
      >
        {light === "ON" ? "끄기" : "켜기"}
      </button>
      {/* 분리된 컴포넌트 사용 */}
      <Counter />
    </div>
  );
}
```

`<Counter />`의 `+` 버튼을 눌러도 `App` 컴포넌트는 리렌더링되지 않으며, 자연스럽게 `<Bulb />` 컴포넌트 역시 불필요한 렌더링을 멈추게 됩니다.

## State로 사용자 입력 관리하기 1

회원가입 폼처럼 사용자가 입력한 데이터를 수집해야 할 때, React에서는 **State**를 활용하여 입력창의 값을 관리합니다. 코드를 살펴보면 크게 3가지 단계로 동작하는 것을 알 수 있습니다.

```jsx
import { useState } from "react";
// 간단한 회원가입 폼
// 이름, 생년월일, 국적, 자기소개 수집
const Register = () => {
  // 이름, 생년월일, 국적, 자기소개 등 수집해야 할 정보가 4개이므로,
  // `useState`도 4번 호출하여 각각의 상태를 만들었습니다. (초기값은 데이터 성격에 맞게 설정합니다.)
  const [name, setName] = useState("이름");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState(""); // 매개변수로 이벤트 객체 `e`를 받아오며, 핵심은 `e.target.value`입니다.
  // 이를 통해 사용자가 방금 입력한 최신 값을 가져오고, 상태 변화 함수를 호출해 State를 업데이트합니다.
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };
  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeBio = (e) => {
    setBio(e.target.value);
  };
  return (
    <div>
      {/* value={state}: 입력창에 보여지는 텍스트를 State의 값으로 고정합니다. */}
      {/* onChange={함수}: 입력이 발생할 때마다 State를 새로운 값으로 바꿉니다. */}
      <div>
        <input value={name} onChange={onChangeName} placeholder={"이름"} />
      </div>
      <div>
        <input value={birth} type="date" onChange={onChangeBirth} />
      </div>
      <div>
        <select value={country} onChange={onChangeCountry}>
                    <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
      </div>
      <div>
        <textarea value={bio} onChange={onChangeBio} />
      </div>
    </div>
  );
};
export default Register;
```

이렇게 React의 State가 HTML 입력 폼의 값을 완벽하게 통제하고 동기화하는 방식을 **'제어 컴포넌트(Controlled Component)'**라고 부릅니다. `<input>`, `<select>`, `<textarea>` 모두 태그 모양은 다르지만 이 규칙은 똑같이 적용됩니다.

### 이 코드의 아쉬운 점은?

위 코드는 제대로 작동하지만, 한 가지 단점이 있습니다. 바로 **입력 항목이 늘어날수록 중복되는 코드가 너무 많아진다**는 것입니다.
만약 회원가입 항목이 비밀번호, 주소, 전화번호 등 10개로 늘어난다면 `useState`와 `onChange` 함수를 10개씩 만들어야 하므로 코드가 엄청나게 길어질 것입니다.

## State로 사용자 입력 관리하기 2

앞서 살펴본 방식은 입력 항목이 늘어날수록 `useState`와 이벤트 핸들러가 끝없이 늘어나는 문제가 있었습니다. 이를 개선하기 위해, 여러 개의 State를 **하나의 객체(Object)**로 묶어 관리하는 효율적인 방법을 알아보겠습니다.

### 효율적인 예시 코드

```jsx
import { useState } from "react";
const Register = () => {
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });
  const onChange = (e) => {
    setInput({
      ...input, // 프로퍼티 키 자리에 대괄호를 열고 변수명을 쓰면
      // 프로퍼티의 키로 사용
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
           {" "}
      <div>
               {" "}
        <input
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={"이름"}
        />
             {" "}
      </div>
           {" "}
      <div>
             {" "}
        <input
          name="birth"
          value={input.birth}
          type="date"
          onChange={onChange}
        />
             {" "}
      </div>
           {" "}
      <div>
               {" "}
        <select name="country" value={input.country} onChange={onChange}>
                    <option value=""></option>         {" "}
          <option value="kr">한국</option>         {" "}
          <option value="us">미국</option>         {" "}
          <option value="uk">영국</option>       {" "}
        </select>
             {" "}
      </div>
           {" "}
      <div>
        {" "}
        <textarea name="bio" value={input.bio} onChange={onChange} />{" "}
      </div>
         {" "}
    </div>
  );
};
export default Register;
```

### 1. 여러 State를 하나의 객체로 묶기

```jsx
const [input, setInput] = useState({
  name: "",
  birth: "",
  country: "",
  bio: "",
});
```

각각 따로 놀던 이름, 생년월일, 국적, 자기소개 State를 `input`이라는 하나의 객체 안에 프로퍼티(속성)로 모았습니다.

### 2. 각 입력 태그에 name 속성 달아주기 (이름표 붙이기)

```jsx
<input name="name" value={input.name} onChange={onChange} />
<input name="birth" value={input.birth} type="date" onChange={onChange} />
```

하나로 합쳐진 이벤트 핸들러가 **"지금 사용자가 어떤 입력창에 글씨를 쓰고 있는지"** 알아내려면 각 입력창마다 고유한 이름표가 필요합니다. 그래서 모든 `<input>`, `<select>`, `<textarea>` 태그에 `name` 속성을 추가해 주었습니다.
이 `name` 속성의 값은 객체 State의 키(Key) 이름과 똑같이 맞춰야 합니다.

### 3. 통합 이벤트 핸들러

```jsx
const onChange = (e) => {
  setInput({
    ...input, // 기존의 input 객체 값들을 그대로 복사해 옴
    [e.target.name]: e.target.value,
  });
};
```

이 코드의 핵심이라고 할 수 있는 부분입니다.

- **`...input` (스프레드 연산자):** 기존에 입력해 둔 다른 항목들의 값이 날아가지 않도록, 변경하기 전에 기존 객체의 내용을 그대로 복사해 옵니다.
- **`[e.target.name]: e.target.value`:** 자바스크립트의 **'계산된 프로퍼티 이름(Computed Property Name)'**이라는 문법입니다. 대괄호 `[ ]` 안에 변수를 넣으면, 그 변수의 값이 객체의 키(Key)로 사용됩니다.

### 어떻게 작동할까요?

만약 사용자가 생년월일(`name="birth"`) 입력창에 "2000-01-01"을 입력했다면, 위 코드는 내부적으로 아래와 같이 작동합니다.

1. `e.target.name`은 `"birth"`가 됩니다.
2. `e.target.value`는 `"2000-01-01"`이 됩니다.
3. 즉, `[e.target.name]: e.target.value`는 `birth: "2000-01-01"`로 치환되어, `input` 객체 내의 `birth` 항목만 업데이트하게 됩니다.

## useRef - 컴포넌트의 변수 생성하기

> useRef란? Reference(참조)의 줄임말로, 컴포넌트 내부에서 특정한 값을 저장하거나 DOM 요소에 직접 접근할 때 사용하는 React Hook입니다.

`useRef`를 호출하면 내부에 `current`라는 프로퍼티(속성)를 갖는 객체가 생성됩니다. 이 `current`에 원하는 값을 저장하고 변경할 수 있습니다.

### useState vs useRef vs 일반 변수 (let)

가장 큰 특징은 **`useRef`로 저장한 값은 아무리 변경해도 컴포넌트의 리렌더링을 유발하지 않는다**는 점입니다.

| 특징                | `useState` | `useRef` | 일반 변수 (`let`) |
| ------------------- | ---------- | -------- | ----------------- |
| 값 변경 시 리렌더링 | O          | X        | X                 |
| 리렌더링 시 값 유지 | O          | O        | X                 |

#### `useRef`의 또 다른 핵심: DOM 요소 직접 조작

![useRef](/my-blog/images/post_img/onebite-react/react-basic/useRef.png)

위 사진처럼 `useRef`를 이용하면 컴포넌트가 화면에 렌더링하는 특정 DOM 요소(예: `<input>`, `<textarea>` 등)에 직접 접근할 수 있습니다.

바닐라 자바스크립트에서 `document.getElementById`를 사용하던 것처럼, `useRef`를 통해 **해당 요소에 강제로 포커스(Focus)를 주거나, 요소의 스타일을 순간적으로 변경시키는 등의 직접적인 조작**이 가능해집니다.

### 1. 리렌더링을 유발하지 않는 '조용한 변수'로 사용하기

화면에 즉각적으로 보여줄 필요는 없지만, 컴포넌트 내부에서 계속 기억하고 추적해야 하는 데이터가 있을 때 `useRef`를 사용합니다.

```jsx
import { useRef, useState } from "react";

const RefExample = () => {
  const refObj = useRef(0); // { current: 0 } 객체 생성
  const [render, setRender] = useState(false); // 리렌더링용 state

  console.log("컴포넌트 렌더링 됨!");

  return (
    <>
      {/* 이 버튼을 눌러도 컴포넌트는 다시 렌더링되지 않습니다. */}
      <button
        onClick={() => {
          refObj.current++;
          console.log("현재 ref 값:", refObj.current);
        }}
      >
        ref + 1
      </button>

      {/* 강제로 리렌더링을 발생시키면, 그동안 쌓인 ref 값을 화면에 반영할 수 있습니다. */}
      <button onClick={() => setRender(!render)}>렌더링 시키기</button>
    </>
  );
};
```

- **활용 예시:** 사용자가 폼에 입력한 횟수를 추적하거나, 타이머(setTimeout, setInterval)의 ID 값을 저장할 때 아주 유용합니다.

```jsx
// 폼 입력 횟수 추적하기 (리렌더링 없이)
const countRef = useRef(0);

const onChange = (e) => {
  countRef.current++;
  console.log("입력 횟수:", countRef.current);

  setInput({
    ...input,
    [e.target.name]: e.target.value,
  });
};
```

### 2. DOM 요소에 직접 접근하기 (Focus, Style 조작)

바닐라 자바스크립트에서는 특정 요소에 접근할 때 `document.getElementById`나 `querySelector`를 사용했습니다. React에서는 이 역할을 `useRef`가 대신합니다.

특정 요소에 포커스를 주거나, 스크롤 위치를 조작하거나, 스타일을 강제로 변경해야 할 때 사용합니다.

```jsx
import { useRef, useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  // 1. Ref 객체 생성
  const inputRef = useRef();

  const onSubmit = () => {
    if (name === "") {
      // 3. 생성한 Ref 객체의 current 프로퍼티로 해당 DOM 요소에 접근하여 focus() 실행
      inputRef.current.focus();
      return;
    }
    alert("제출 완료!");
  };

  return (
    <div>
      {/* 2. 접근하고자 하는 DOM 요소의 ref 속성에 생성한 Ref 객체를 연결 */}
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={"이름을 입력하세요"}
      />
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};
```

### 왜 굳이 `useRef`를 쓸까요? 일반 변수(`let`)를 쓰면 안 될까요?

#### 1. 컴포넌트 내부에 `let` 변수를 선언할 경우

React 컴포넌트는 리렌더링될 때마다 함수가 처음부터 다시 실행됩니다. 즉, 내부에 선언된 `let` 변수도 매번 초기값으로 **리셋(초기화)**되어 버리기 때문에 우리가 원하는 값을 누적해서 기억할 수 없습니다.

#### 2. 컴포넌트 외부에 `let` 변수를 전역으로 선언할 경우

"그럼 함수 밖(외부)에 선언하면 리셋되지 않잖아?"라고 생각할 수 있습니다.
단일 컴포넌트라면 문제없어 보이지만, **해당 컴포넌트를 화면에 여러 개 띄울 때 치명적인 버그가 발생**합니다.

여러 개의 컴포넌트 인스턴스가 단 하나의 전역 변수를 **공유**하게 되므로, 1번 컴포넌트에서 값을 수정하면 2번 컴포넌트에도 영향을 미치게 됩니다.

### `useRef`의 장점

`useRef`로 생성한 값은 컴포넌트가 아무리 리렌더링되어도 값을 안전하게 **유지**하며, 컴포넌트를 여러 개 생성하더라도 각 컴포넌트마다 **독립적인** 공간을 가지기 때문에 다른 컴포넌트에 영향을 주지 않습니다.

## React Hooks

> **React Hooks란?** 기존 클래스 컴포넌트의 고유 기능들(상태 관리, DOM 접근 등)을 함수 컴포넌트에서도 마치 '낚아채듯(Hook)' 가져와 사용할 수 있게 해주는 기능들의 모음입니다.

### Hooks는 왜 등장했을까?

Hooks가 도입되기 전인 2017년 무렵의 React는 컴포넌트를 두 가지 방식으로 나누어 사용했습니다.

- **Class 컴포넌트:** State, Ref 등 모든 기능을 쓸 수 있었지만, 문법이 복잡하고 코드가 길어지는 치명적인 단점이 있었습니다.
- **Function 컴포넌트:** 문법이 간결하고 읽기 편했지만, 상태(State)를 가질 수 없어 단순히 UI 화면만 렌더링하는 껍데기 역할에 불과했습니다.

_"함수 컴포넌트의 깔끔한 문법에 클래스 컴포넌트의 강력한 기능을 더할 순 없을까?"_
수많은 개발자들의 이러한 바람에 공감한 React 개발팀은, 함수 컴포넌트에서도 다양한 기능을 뽑아 쓸 수 있도록 **React Hooks**를 세상에 내놓게 되었습니다.

이러한 Hook들은 모두 이름 앞에 `use`라는 접두사가 붙는 특징이 있습니다. (`useState`, `useRef` 등)

### React Hooks 사용 시 반드시 지켜야 할 3가지 규칙

Hooks는 아주 편리하지만, React의 핵심 동작 원리와 얽혀 있기 때문에 엄격한 규칙이 존재합니다.

1. 오직 '함수 컴포넌트'나 '커스텀 훅' 내부에서만 호출 가능합니다.

- 일반적인 자바스크립트 함수 내부나 클래스 컴포넌트에서는 사용할 수 없습니다.

2. 조건문(`if`)이나 반복문(`for`) 내부에서는 호출할 수 없습니다. (조건부 호출 불가)

- 컴포넌트가 리렌더링 될 때마다 Hooks는 항상 **동일한 순서**로 호출되어야 합니다. 조건에 따라 Hook이 실행되거나 무시되면 React의 내부 상태 추적이 꼬이게 됩니다. 무조건 컴포넌트 최상단에서 호출해야 합니다.

3. 나만의 커스텀 훅(Custom Hook)을 직접 만들 수 있습니다.

- 제공되는 기본 Hook들을 조합하여, 내 프로젝트에 딱 맞는 새로운 기능을 만들 수 있습니다.

### 나만의 커스텀 훅 만들기 (Custom Hook)

#### 1. 커스텀 훅 정의하기 (`useInput.jsx`)

`use` 접두사를 붙여 함수를 만들고, 내부에서 기본 Hook(`useState`)을 사용합니다.

```jsx
// src/hooks/useInput.jsx
import { useState } from "react";

function useInput() {
  // 상태와 상태를 변화시키는 핸들러 로직을 이 안에 다 모아둡니다.
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  // 외부에서 쓸 수 있도록 값과 함수를 배열로 반환합니다.
  return [input, onChange];
}

export default useInput;
```

#### 커스텀 훅 가져다 쓰기 (`HookExam.jsx`)

이제 컴포넌트에서는 복잡한 로직을 신경 쓸 필요 없이, 만들어둔 `useInput`을 불러오기만 하면 됩니다.

```jsx
// src/components/HookExam.jsx
import useInput from "../hooks/useInput";

const HookExam = () => {
  // 커스텀 훅을 호출하면 상태와 핸들러가 세트로 튀어나옵니다!
  const [input, onChange] = useInput();
  const [input2, onChange2] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} placeholder="첫 번째 입력" />
      <input value={input2} onChange={onChange2} placeholder="두 번째 입력" />
    </div>
  );
};

export default HookExam;
```

컴포넌트 내부 코드가 획기적으로 짧아졌고, 입력창이 10개, 100개로 늘어나도 `useInput()`만 호출하면 되니 재사용성이 극대화되었습니다.

### Reference

- 인프런 강의: [한 입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지] - 이정환
