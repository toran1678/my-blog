---
title: "할 일 관리 앱"
date: "2023-03-10"
tags: [React, localStorage, CSS]
excerpt: "React와 localStorage를 사용한 할 일 관리 웹 애플리케이션입니다."
#coverImage: "coverImage: "/placeholder.svg?height=600&width=1200&query=TODO-APP"
demoUrl: "https://example.com/todo-demo"
repoUrl: "https://github.com/username/todo-app"
---

# 할 일 관리 앱

## 프로젝트 개요

이 프로젝트는 React를 사용하여 개발한 할 일 관리 웹 애플리케이션입니다. 사용자는 할 일을 추가, 편집, 삭제할 수 있으며, 완료 여부를 체크할 수 있습니다.

## 사용 기술

- React
- localStorage
- CSS

## 주요 기능

### 할 일 추가/편집/삭제

사용자는 새로운 할 일을 추가하고, 기존 할 일을 편집하거나 삭제할 수 있습니다.

```jsx
function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false
  };
  setTodos([...todos, newTodo]);
}
```

### 완료 상태 토글

각 할 일 항목의 완료 상태를 토글할 수 있습니다.

```jsx
function toggleTodo(id) {
  setTodos(
    todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}
```

### 로컬 스토리지 저장

할 일 목록은 브라우저의 localStorage에 저장되어 페이지를 새로고침해도 유지됩니다.

```jsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

### 필터링 기능

전체, 완료, 미완료 항목을 필터링하여 볼 수 있습니다.

## 개발 과정

이 프로젝트를 개발하면서 겪은 어려움과 해결 방법에 대해 공유합니다.

### 문제점: 상태 관리

여러 컴포넌트에서 할 일 목록 상태를 공유해야 했습니다.

### 해결책

Context API를 사용하여 상태를 전역적으로 관리했습니다.

## 배운 점

이 프로젝트를 통해 다음과 같은 것들을 배웠습니다:

1. React Hooks를 활용한 상태 관리
2. localStorage를 이용한 데이터 저장
3. 컴포넌트 구조 설계

## 향후 계획

- 드래그 앤 드롭으로 할 일 순서 변경
- 카테고리 기능 추가
- 날짜별 할 일 관리
