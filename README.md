# 🌟 개인 포트폴리오 블로그

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**React와 Vite를 활용한 현대적인 개인 포트폴리오 웹사이트**

[🌐 라이브 데모](https://toran1678.github.io/my-blog) | [📚 프로젝트 상세](https://toran1678.github.io/my-blog/projects/github-page) | [📁 소스코드](https://github.com/toran1678/my-blog)

</div>

---

## 프로젝트 소개

마크다운 기반 콘텐츠 관리와 현대적인 웹 기술을 결합한 개인 포트폴리오 블로그입니다. 개발자의 프로젝트, 기술 블로그, 그리고 개인 소개를 효과적으로 전시할 수 있는 플랫폼을 제공합니다.

### 주요 특징

- **다크모드 지원** - 시스템 설정 감지 및 사용자 선호도 저장
- **완전 반응형** - 모바일부터 데스크톱까지 모든 디바이스 최적화
- **마크다운 기반** - 간편한 콘텐츠 관리 및 작성
- **태그 기반 필터링** - 프로젝트와 포스트의 효율적인 분류
- **빠른 성능** - Vite 기반 최적화된 빌드와 로딩
- **SEO 최적화** - 검색 엔진 친화적인 구조

## 기술 스택

### Frontend
- **React 18.3.1** - 최신 React 기능과 Concurrent Features
- **Vite 6.0.5** - 빠른 개발 서버와 최적화된 빌드
- **React Router DOM 6.30.0** - 클라이언트 사이드 라우팅
- **CSS Modules** - 컴포넌트별 스타일 격리

### 마크다운 처리
- **react-markdown 10.1.0** - 마크다운을 React 컴포넌트로 변환
- **remark-gfm 4.0.1** - GitHub Flavored Markdown 지원
- **rehype-raw 7.0.0** - HTML 태그 직접 사용 지원
- **rehype-sanitize 6.0.0** - XSS 방지를 위한 HTML 정화

### 코드 하이라이팅
- **react-syntax-highlighter 15.6.1** - 코드 블록 구문 강조
- **Prism** - 다양한 프로그래밍 언어 지원

## 프로젝트 구조

```
my-blog/
├── public/                 # 정적 파일
│   ├── images/            # 이미지 리소스
│   │   └── project_img/   # 프로젝트 이미지들
│   └── favicon.svg        # 파비콘
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Home/         # 홈페이지
│   │   ├── Layout/       # 레이아웃
│   │   ├── PostDetail/   # 포스트 상세
│   │   ├── ProjectList/  # 프로젝트 목록
│   │   ├── About/        # 소개 페이지
│   │   └── ...
│   ├── content/          # 마크다운 콘텐츠
│   │   ├── posts/        # 블로그 포스트
│   │   └── projects/     # 프로젝트 설명
│   ├── contexts/         # React Context
│   ├── utils/            # 유틸리티 함수
│   └── styles/           # 전역 스타일
├── package.json
├── vite.config.js
└── README.md
```

## 설치 및 실행

### 필요 조건
- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone https://github.com/toran1678/my-blog.git

# 프로젝트 디렉토리로 이동
cd my-blog

# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 서버 시작 (http://localhost:5173)
npm run dev
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 콘텐츠 추가 방법

### 새 프로젝트 추가
1. `src/content/projects/` 디렉토리에 `.md` 파일 생성
2. Frontmatter에 메타데이터 추가:
```markdown
---
title: "프로젝트 제목"
date: "2024-01-01"
tags: [React, JavaScript, CSS]
excerpt: "프로젝트 간단 설명"
coverImage: "/my-blog/images/project_img/프로젝트명/main.png"
repoUrl: "https://github.com/username/repo"
---
```

### 새 블로그 포스트 추가
1. `src/content/posts/` 디렉토리에 `.md` 파일 생성
2. Frontmatter에 메타데이터 추가:
```markdown
---
title: "포스트 제목"
date: "2024-01-01"
tags: [기술, 학습]
excerpt: "포스트 요약"
---
```

## 주요 기능

### 다크모드
- 시스템 설정 자동 감지
- 사용자 선택 테마 영구 저장
- 부드러운 전환 애니메이션

### 반응형 디자인
- 모바일 우선 설계
- 적응형 네비게이션
- 유연한 그리드 레이아웃

### 마크다운 처리
- Frontmatter 자동 파싱
- 자동 excerpt 생성
- 목차 자동 생성
- 코드 하이라이팅

### 프로젝트 관리
- 태그 기반 필터링
- 관련 프로젝트 추천
- 페이지네이션 지원

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

- **이메일**: toran16784@gmail.com
- **GitHub**: [@toran1678](https://github.com/toran1678)
- **포트폴리오**: [https://toran1678.github.io/my-blog](https://toran1678.github.io/my-blog)

---

<div align="center">

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!

Made with ❤️ by [toran1678](https://github.com/toran1678)

</div>