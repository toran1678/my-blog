---
title: "블로그 웹사이트"
date: "2024-12-15"
tags: [GitHub]
excerpt: "React + Vite로 제작한 개인 블로그 웹사이트. 마크다운 기반 콘텐츠와 GitHub Pages 배포, 다크 모드까지 포함합니다."
# coverImage: "/my-blog/images/1.png"
---

> 이 프로젝트는 React와 Vite를 사용하여 개발한 개인 블로그 웹사이트입니다.

## 주요 기능
- 반응형 레이아웃(모바일/데스크톱)
- 마크다운 기반 콘텐츠
- 다크 모드 지원

## 사용 기술
- React
- Vite
- React Router
- CSS Modules
- GitHub Pages / Actions

## 구현 포인트
### 반응형 디자인
모바일부터 데스크톱까지 다양한 화면 크기에 대응하는 반응형 디자인을 구현했습니다.

### 배포
GitHub Pages에 배포했고, Actions로 자동 배포 흐름을 구성했습니다.

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

## 배운 점
이 프로젝트를 통해 다음과 같은 것들을 배웠습니다:

1. CSS 모듈을 활용한 스타일 관리
2. 마크다운 기반 콘텐츠 시스템 구축
3. GitHub Pages 배포 최적화