---
title: "포트폴리오 웹사이트"
date: "2023-05-15"
tags: [React, Vite, CSS]
excerpt: "React와 Vite를 사용하여 만든 개인 포트폴리오 웹사이트입니다."
# coverImage: "/my-blog/images/1.png"
---

# 포트폴리오 웹사이트

## 프로젝트 개요

이 프로젝트는 React와 Vite를 사용하여 개발한 개인 포트폴리오 웹사이트입니다. GitHub Pages를 통해 배포되었으며, 마크다운으로 작성된 프로젝트 설명을 보여줍니다.

## 사용 기술

- React
- Vite
- React Router
- CSS Modules
- GitHub Pages

## 주요 기능

### 반응형 디자인

모바일부터 데스크톱까지 다양한 화면 크기에 대응하는 반응형 디자인을 구현했습니다.

```css
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
```

### 마크다운 콘텐츠

마크다운 파일을 사용하여 블로그 포스트와 프로젝트 설명을 관리합니다.

```jsx
import ReactMarkdown from 'react-markdown';

function MarkdownContent({ content }) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}
```

```jsx
코드 부분
```

### 다크 모드

사용자 환경 설정에 따라 자동으로 적용되는 다크 모드를 지원합니다.

## 개발 과정

이 프로젝트를 개발하면서 겪은 어려움과 해결 방법에 대해 공유합니다.

### 문제점 1: 라우팅 이슈

GitHub Pages에서 SPA 라우팅 문제가 발생했습니다.

### 해결책

404.html 페이지를 사용한 리다이렉트 방식으로 해결했습니다.

## 배운 점

이 프로젝트를 통해 다음과 같은 것들을 배웠습니다:

1. CSS 모듈을 활용한 스타일 관리
2. 마크다운 기반 콘텐츠 시스템 구축
3. GitHub Pages 배포 최적화

## 향후 계획

- 검색 기능 추가
- 댓글 시스템 구현
- 성능 최적화

!<img src="../../assets/images/first-post.png">