---
title: "React Project 3"
date: "2026-03-25"
category: "개발"
tags: [React]
excerpt: "감정 일기장 프로젝트"
coverImage: "/my-blog/images/post_img/onebite-react/react-project3/thumbnail.png"
---
# [ 감정 일기장 프로젝트 ]

이번 포스팅에서는 세 번째 프로젝트인 **감정 일기장(Emotion Diary)** 앱을 만들어보겠습니다. 이 프로젝트는 일기를 작성하고, 수정하고, 삭제하며 감정을 기록할 수 있는 간단한 다이어리 서비스입니다.

[데모 페이지 보러가기](https://toran1678.github.io/emotion-diary/)

## 1. 프로젝트 개요

감정 일기장 프로젝트는 다음과 같은 주요 페이지들로 구성되어 있습니다. 각 페이지는 각각의 기능을 담당하며 사용자에게 편리한 경험을 제공합니다.

### index 페이지
![index 페이지](/my-blog/images/post_img/onebite-react/react-project3/home.png|500)
모든 일기가 피드 형태로 나타나는 메인 페이지입니다. 작성된 모든 일기를 한눈에 확인할 수 있습니다.

### new 페이지
![new 페이지](/my-blog/images/post_img/onebite-react/react-project3/new.png|500)
새로운 일기를 작성할 수 있는 페이지입니다. 오늘의 감정과 일기 내용을 기록합니다.

### Edit 페이지
![Edit 페이지](/my-blog/images/post_img/onebite-react/react-project3/edit.png|500)
이미 작성된 일기를 수정할 수 있는 페이지입니다.

### 다이어리 페이지
![다이어리 페이지](/my-blog/images/post_img/onebite-react/react-project3/diary.png|500)
일기의 상세 내용을 확인할 수 있는 상세 페이지의 역할을 수행합니다.

---

## 2. 프로젝트 준비: 가독성과 최적화

프로젝트를 시작하기에 앞서, 폰트나 이미지 같은 정적 자산(Assets)을 효율적으로 관리하는 방법을 이해해야 합니다. 특히 Vite를 사용한다면 `public` 폴더와 `src/assets` 폴더 중 어디에 파일을 넣어야 할지 결정해야 합니다.

### 왜 폰트는 public에, 이미지는 src/assets에 넣나요?

이는 Vite가 내부적으로 진행하는 **이미지 최적화** 때문입니다. 

-   **public 폴더**: 이 폴더 안에 있는 이미지들은 URL 경로를 통해 직접 불러올 수 있으며, Vite의 자동 이미지 최적화가 동작하지 않습니다. 빌드 시 파일명이 그대로 유지됩니다.
-   **src/assets 폴더**: 이 폴더에 있는 이미지들은 코드상에서 `import` 문을 통해 불러와야 합니다. 빌드 시 Vite가 이미지 최적화를 진행하며, 브라우저 캐싱을 위해 파일명을 해싱하거나 **Data URI** 포맷으로 변환하기도 합니다.

### 이미지 최적화와 Data URI

실제로 배포 모드(`npm run build` 후 `npm run preview`)로 앱을 실행해 브라우저에서 이미지 주소를 확인해 보면 차이가 명확합니다.

-   `public` 폴더에서 불러온 이미지: `emotion1.png`와 같이 일반적인 경로로 표시됩니다.
-   `src/assets`에서 불러온 이미지: `data:image/png;base64...`와 같은 암호문 같은 포맷으로 표시됩니다.

이런 암호문 같은 포맷을 **Data URI**라고 부릅니다. 이는 이미지와 같은 외부 데이터를 문자열 형태로 브라우저의 메모리에 직접 캐싱하기 위해 사용되는 포맷입니다. 

Data URI를 사용하면 이미지가 브라우저 메모리에 저장되므로, 새로고침을 하더라도 다시 서버에 요청하지 않고 메모리에서 즉시 꺼내 쓸 수 있어 매우 효율적입니다. 하지만 이미지가 너무 많을 경우(수만 개 이상) 브라우저 메모리에 과부하를 줄 수 있으므로, 상황에 따라 `public` 폴더를 사용하는 것이 유리할 수도 있습니다.

---

## 3. 필수 개념: 페이지 라우팅과 SPA

우리가 정의한 여러 페이지들(Index, New, Edit 등) 사이를 이동하기 위해서는 **페이지 라우팅**이라는 개념을 이해해야 합니다.

**페이지 라우팅(Page Routing)**이란 경로에 따라 알맞은 페이지를 렌더링하는 과정을 의미합니다.

![페이지 라우팅](/my-blog/images/post_img/onebite-react/react-project3/pageRouting.png)

사용자가 브라우저를 통해 `/blog`와 같은 특정 주소로 요청을 보내면, 웹 서버가 해당 요청에 맞는 페이지를 찾아 브라우저에게 전달하고, 브라우저는 이를 화면에 그려내 사용자가 볼 수 있게 합니다. 이 전체 과정을 페이지 라우팅이라고 부릅니다.

### Multi Page Application (MPA)

전통적인 웹 서비스는 여러 개의 페이지를 준비해두는 **Multi Page Application (MPA)** 방식을 사용했지만, 리액트 앱은 하나의 페이지로 작동하는 **Single Page Application (SPA)** 방식을 따릅니다.

![MPA 동작 방식](/my-blog/images/post_img/onebite-react/react-project3/pageRouting2.png)

위 이미지처럼 `index.html`, `blog.html`, `setting.html` 등 모든 웹페이지를 각각의 HTML 파일로 준비해둡니다. 브라우저에서 특정 주소를 요청하면 서버는 그에 맞는 HTML 파일을 찾아 그대로 반환해줍니다. 브라우저는 받아온 HTML 페이지를 그대로 화면에 렌더링합니다.

이처럼 서버가 여러 개의 페이지를 미리 가지고 있는 방식을 **Multi Page Application (MPA)**라고 부릅니다. 또한, 서버 측에서 페이지를 미리 렌더링하여 완성된 HTML을 보내주기 때문에 **Server Side Rendering (SSR)** 방식이라고도 합니다.

#### MPA의 단점
1. **매끄럽지 못한 페이지 이동**: 페이지 이동 시마다 새로운 HTML 파일을 받아와야 하므로, 화면이 전체적으로 새로고침되며 "깜빡"이는 현상이 발생합니다. 
2. **비효율성**: 이전 페이지와 공통된 요소(헤더, 네비게이션 등)가 있더라도 매번 전체 페이지를 처음부터 다시 그려야 합니다.
3. **서버 부하**: 모든 페이지 요청을 서버가 일일이 처리해야 하므로, 사용자가 많아질수록 서버에 가해지는 부담이 커집니다.

![MPA의 비효율성](/my-blog/images/post_img/onebite-react/react-project3/pageRouting3.png)

---

### Single Page Application (SPA)

React App은 MPA의 단점을 보완한 **Single Page Application (SPA)** 방식으로 작동합니다.

이 방식에서는 이름 그대로 페이지가 오직 하나(`index.html`)뿐입니다. 어떤 경로로 요청하든 서버는 처음에 빈 껍데기뿐인 `index.html`을 보내줍니다. 그 후, 리액트 컴포넌트와 기능들이 담긴 자바스크립트 파일들을 묶어서 전달하는데, 이 과정을 **번들링(Bundling)**, 결과물인 자바스크립트 파일을 **번들 파일**이라고 합니다. (이 과정은 `vite`가 담당합니다.)

이렇게 전달받은 자바스크립트 파일을 브라우저에서 직접 실행하여 화면을 그려내는 방식을 **Client Side Rendering (CSR)**이라고 합니다. 서버 사이드 렌더링과는 반대되는 개념입니다.

```jsx
// main.jsx가 실행되면서 render 메서드 호출
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

![SPA와 CSR](/my-blog/images/post_img/onebite-react/react-project3/spa.png)

#### SPA의 장점
1. **효율적인 페이지 이동**: 페이지 이동 시 서버에 새로운 HTML을 요청하지 않고, 이미 받아온 리액트 앱 내에서 변경이 필요한 컴포넌트만 교체하여 화면을 업데이트합니다.
2. **매끄러운 사용자 경험**: 전체 페이지를 다시 불러오지 않으므로 화면 깜빡임이 없고, 앱처럼 빠르고 부드러운 전환이 가능합니다.
3. **서버 부하 감소**: 서버는 처음에만 파일을 제공하고 이후의 렌더링은 클라이언트(브라우저)가 담당하므로 서버의 부담이 줄어듭니다.

![SPA의 컴포넌트 교체](/my-blog/images/post_img/onebite-react/react-project3/spa2.png)

만약 블로그 페이지에서 세팅 페이지로 이동한다면, 리액트 앱은 화면의 모든 요소가 컴포넌트로 이루어져 있기 때문에 헤더와 같은 공통 요소는 그대로 두고, 변경이 필요한 아티클 부분만 세팅 컴포넌트로 갈아 끼워 신속하고 효율적으로 페이지를 업데이트합니다.

---

## 4. 실무 적용: React Router 설정

이론을 배웠으니, 실제로 우리 프로젝트에 라우팅 기능을 적용해 보겠습니다. 리액트에서 가장 대중적으로 사용되는 **React Router** 라이브러리를 활용합니다.

### 라이브러리 설치

먼저 터미널에서 다음 명령어를 입력하여 `react-router-dom` 라이브러리를 설치합니다.

```bash
npm i react-router-dom
```

### 1) BrowserRouter 설정

리액트 앱 전체에서 라우팅 기능을 사용할 수 있도록 `main.jsx`에서 `BrowserRouter`로 `App` 컴포넌트를 감싸줍니다.

```jsx title="src/main.jsx"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

### 2) Routes와 Route 설정

`App.jsx`에서 각 경로(`path`)에 따라 렌더링될 컴포넌트(`element`)를 설정합니다.

- **Routes**: 여러 개의 `Route` 컴포넌트를 감싸는 상위 컴포넌트입니다.
- **Route**: 특정 경로와 그에 대응하는 컴포넌트를 정의합니다. `*`은 정의되지 않은 모든 경로를 의미하며, 보통 'Not Found' 페이지를 연결할 때 사용합니다.

### 3) Link와 useNavigate

페이지를 이동할 때는 HTML의 `<a>` 태그 대신 리액트 라우터에서 제공하는 기능을 사용해야 SPA 방식의 매끄러운 이동이 가능합니다.

- **Link**: 클릭 시 특정 경로로 이동하는 링크를 생성합니다.
- **useNavigate**: 함수 내부에서 특정 조건에 따라 페이지를 이동시키고 싶을 때 사용하는 훅입니다.

```jsx title="src/App.jsx"
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// (Home, New, Diary, Notfound 컴포넌트 import 생략)

function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    // 특정 이벤트(클릭 등) 발생 시 페이지 이동
    nav("/new");
  };

  return (
    <>
      <nav>
        {/* Link를 이용한 페이지 이동 */}
        <Link to="/">Home</Link>
        <Link to="/new">New</Link>
        <Link to="/diary">Diary</Link>
      </nav>
      
      {/* useNavigate를 이용한 버튼 클릭 이동 */}
      <button onClick={onClickButton}>
        New 페이지로 이동
      </button>

      {/* 경로 매칭 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}
```

---

## 5. 동적 경로 (Dynamic Segments)

상세 페이지인 'Diary' 페이지는 어떤 일기를 클릭했느냐에 따라 주소가 달라져야 합니다. 이때 **동적 경로(Dynamic Segments)**를 사용합니다.

![동적 경로](/my-blog/images/post_img/onebite-react/react-project3/DynamicSegments.png)

예를 들어, 쇼핑몰 서비스에서 상품을 조회할 때 `1번 상품`의 주소는 `/product/1`, `2번 상품`은 `/product/2`와 같이 구성됩니다. 여기서 상품 ID처럼 상황에 따라 변하는 동적인 데이터를 포함하는 경로를 동적 경로라고 부릅니다.

리액트 라우터에서는 크게 두 가지 방식으로 동적인 데이터를 주소에 담을 수 있습니다.

1.  **URL Parameter**: `/` 뒤에 아이템의 ID 등을 명시하는 방식입니다. (`/product/1`) 주로 아이템의 ID처럼 변경되지 않는 고유한 값을 전달할 때 사용합니다.
2.  **Query String**: `?` 뒤에 변수명과 값을 명시하는 방식입니다. (`/search?q=검색어`) 주로 검색어처럼 자주 변경되거나 필터링이 필요한 값을 전달할 때 사용합니다.

---

## 6. 웹 스토리지 (Web Storage)

일기 데이터를 브라우저의 기본 내장 DB에 저장하면 새로고침하더라도 사라지지 않습니다. 이를 **웹 스토리지(Web Storage)**라고 합니다.

- 별도의 프로그램이나 라이브러리 설치가 필요 없습니다.
- 자바스크립트 내장 함수만으로 간편하게 접근할 수 있습니다.

### 기본 사용법
- **값 저장**: `localStorage.setItem(key, value)`
- **값 읽기**: `localStorage.getItem(key)`

### LocalStorage vs SessionStorage
두 방식은 동작하는 방식은 동일하지만 데이터를 보관하고 초기화하는 시점에 차이가 있습니다.

| 구분 | 전용 범위 | 데이터 유지 기간 |
| :--- | :--- | :--- |
| **SessionStorage** | 브라우저 탭 별 | 탭이 종료되거나 꺼지면 데이터 삭제 |
| **LocalStorage** | 사이트 주소 별 | 사용자가 직접 삭제하기 전까지 데이터 보관 |

우리의 다이어리는 사용자가 브라우저를 껐다 켜도 데이터가 유지되어야 하므로 `localStorage`가 적합합니다.

---

## 7. 프로젝트 공유와 오픈 그래프

프로젝트를 완성하고 다른 사람에게 공유할 때 사용하는 기술이 바로 **오픈 그래프(Open Graph)**입니다.


오픈 그래프는 웹 사이트의 링크를 공유할 때 **썸네일, 제목 등의 정보를 노출**하는 기술입니다. 카카오톡이나 페이스북에 링크를 올렸을 때 미리보기 이미지가 나오는 것이 바로 이 덕분입니다. 프로젝트의 완성도를 높이는 마지막 단계라고 볼 수 있습니다.

### 사용 예시

오픈 그래프는 보통 HTML의 `<head>` 태그 내부에 `<meta>` 태그를 사용하여 설정합니다.

```html
<head>
  <!-- 페이지 제목 -->
  <meta property="og:title" content="김선빈의 감정 일기장" />
  <!-- 페이지 설명 -->
  <meta property="og:description" content="나만의 감정을 기록하는 특별한 공간" />
  <!-- 공유 시 보여줄 이미지 -->
  <meta property="og:image" content="/thumbnail.png" />
  <!-- 실제 배포 주소 -->
  <meta property="og:url" content="https://toran1678.github.io/emotion-diary/" />
</head>
```

위와 같이 설정하면 링크 공유 시 우리가 지정한 이미지와 제목, 설명이 미리보기 형태로 나타나게 됩니다.

---

### Reference

- 인프런 강의: [한 입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지] - 이정환
