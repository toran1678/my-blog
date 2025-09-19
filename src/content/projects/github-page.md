---
title: "개인 포트폴리오 블로그"
date: "2024-10-01"
tags: [React, Vite, JavaScript, Markdown, Portfolio]
excerpt: "React와 Vite를 활용하여 개발한 개인 포트폴리오 블로그입니다. 마크다운 기반 콘텐츠 관리, 다크모드 지원, 반응형 디자인 등의 웹 개발 기술을 적용했습니다."
coverImage: "/my-blog/images/project_img/github-page/blog.png"
demoUrl: "https://toran1678.github.io/my-blog"
repoUrl: "https://github.com/toran1678/my-blog"
---

# React 기반 개인 포트폴리오 블로그

> **개발 기간**: 2024-10 ~  
> **개발 언어**: JavaScript, HTML, CSS  
> **주요 기술**: React, Vite, Markdown, CSS Modules  
> **프로젝트 유형**: 개인 프로젝트 (포트폴리오 웹사이트)

## 프로젝트 개요

React와 Vite를 활용하여 개발한 개인 포트폴리오 블로그입니다. 마크다운 기반의 콘텐츠 관리 시스템을 구축하여 블로그 포스트와 프로젝트를 효율적으로 관리할 수 있도록 설계했습니다. 다크모드 지원, 반응형 디자인, SEO 최적화 등 현대적인 웹 개발 기술을 적용하여 사용자 경험을 극대화했습니다.

### 핵심 기능

- **마크다운 기반 콘텐츠 관리**: Frontmatter 파싱, 자동 excerpt 생성, 코드 하이라이팅
- **다크모드 지원**: 시스템 설정 감지, 로컬 스토리지 저장, 부드러운 전환 애니메이션
- **반응형 디자인**: 모바일 우선 설계, 적응형 네비게이션, 유연한 그리드 레이아웃
- **프로젝트 포트폴리오**: 태그 기반 필터링, 페이지네이션, 관련 프로젝트 추천
- **블로그 시스템**: 카테고리 분류, 검색 기능, 읽기 시간 계산, 소셜 공유 최적화


## 기술 스택

### Frontend
- **React 18.3.1**: 최신 React 기능과 Concurrent Features 활용
- **Vite 6.0.5**: 빠른 개발 서버와 최적화된 빌드 시스템
- **React Router DOM 6.30.0**: 클라이언트 사이드 라우팅
- **CSS Modules**: 컴포넌트별 스타일 격리 및 재사용성

### 마크다운 처리
- **react-markdown 10.1.0**: 마크다운을 React 컴포넌트로 변환
- **remark-gfm 4.0.1**: GitHub Flavored Markdown 지원
- **rehype-raw 7.0.0**: HTML 태그 직접 사용 지원
- **rehype-sanitize 6.0.0**: XSS 방지를 위한 HTML 정화
- **rehype-slug 5.1.0**: 헤딩에 자동 ID 생성

### 코드 하이라이팅
- **react-syntax-highlighter 15.6.1**: 코드 블록 구문 강조
- **Prism**: 다양한 프로그래밍 언어 지원

### 유틸리티
- **gray-matter 4.0.3**: Frontmatter 파싱
- **vite-plugin-markdown 2.2.0**: Vite에서 마크다운 파일 처리

### 개발 도구
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Git**: 버전 관리

## 프로젝트 구조

```
my-blog/
├── public/                 # 정적 파일
│   ├── images/            # 이미지 리소스
│   └── favicon.svg        # 파비콘
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Home/         # 홈페이지 컴포넌트
│   │   ├── Layout/       # 레이아웃 컴포넌트
│   │   ├── PostDetail/   # 포스트 상세 페이지
│   │   ├── ProjectList/  # 프로젝트 목록
│   │   ├── About/        # 소개 페이지
│   │   └── ...
│   ├── content/          # 마크다운 콘텐츠
│   │   ├── posts/        # 블로그 포스트
│   │   └── projects/     # 프로젝트 설명
│   ├── contexts/         # React Context
│   │   └── ThemeContext.jsx
│   ├── utils/            # 유틸리티 함수
│   │   ├── markdownLoader.js
│   │   └── projectLoader.js
│   └── styles/           # 전역 스타일
│       ├── global.css
│       ├── darkMode.css
│       └── variables.css
├── package.json
├── vite.config.js
└── README.md
```

## 핵심 구현 사항

### 1. 마크다운 로더 시스템
```javascript
// utils/markdownLoader.js
export async function getPosts() {
  const posts = []
  const postFiles = import.meta.glob("/src/content/posts/*.md", { as: "raw" })
  
  for (const path in postFiles) {
    const content = await postFiles[path]()
    const { frontMatter, content: markdownContent } = parseFrontMatter(content)
    
    posts.push({
      slug: path.split("/").pop().replace(".md", ""),
      ...frontMatter,
      content: markdownContent,
      excerpt: frontMatter.excerpt || generateExcerpt(markdownContent)
    })
  }
  
  return posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}
```

### 2. 테마 관리 시스템
```javascript
// contexts/ThemeContext.jsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])
  
  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 3. 목차 자동 생성
```javascript
// components/TableOfContents/TableOfContents.jsx
useEffect(() => {
  const markdownRoot = containerRef?.current || document
  const headingEls = Array.from(markdownRoot.querySelectorAll("h1, h2, h3"))
  
  const headings = headingEls.map((el) => {
    const level = Number(el.tagName.substring(1))
    const id = slugify(el.textContent || "")
    el.id = id
    return { id, text: el.textContent || "", level }
  })
  
  setHeadings(headings)
}, [containerRef, content])
```

### 4. 반응형 네비게이션
```javascript
// components/Layout/Layout.jsx
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50)
  }
  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])
```

## 성능 최적화

### 1. 코드 분할
- React.lazy를 활용한 컴포넌트 지연 로딩
- Vite의 자동 코드 분할 기능 활용

### 2. 이미지 최적화
- WebP 형식 지원
- 지연 로딩(Lazy Loading) 구현
- 플레이스홀더 시스템으로 로딩 경험 개선

### 3. 번들 최적화
- Tree Shaking을 통한 불필요한 코드 제거
- CSS Modules를 통한 스타일 최적화
- Vite의 최적화된 빌드 시스템 활용

## 프로젝트 성과

### 기술적 성장
- **React 생태계**: 최신 React 18 기능과 Context API를 활용한 상태 관리
- **빌드 도구**: Vite를 통한 빠른 개발 환경과 최적화된 프로덕션 빌드
- **마크다운 처리**: react-markdown과 다양한 플러그인을 활용한 콘텐츠 처리
- **CSS 아키텍처**: CSS Modules를 통한 스타일 격리 및 재사용성 향상
- **성능 최적화**: 코드 분할, 이미지 최적화, 번들 크기 최적화

### 문제 해결 능력
- **마크다운 파싱**: Frontmatter 처리와 자동 excerpt 생성 로직 구현
- **테마 관리**: CSS 변수와 Context API를 활용한 다크모드 시스템 구축
- **반응형 디자인**: 다양한 디바이스에서 일관된 사용자 경험 제공
- **라우팅**: React Router를 활용한 SPA 네비게이션 구현
- **SEO 최적화**: 메타 태그와 구조화된 데이터를 통한 검색 엔진 최적화

### 사용자 경험 개선
- **직관적 네비게이션**: 반응형 메뉴와 스크롤 기반 네비게이션
- **접근성**: 키보드 네비게이션과 스크린 리더 지원
- **성능**: 빠른 로딩 시간과 부드러운 애니메이션
- **개인화**: 사용자 선호도에 따른 테마 설정 저장
- **콘텐츠 발견**: 태그 기반 필터링과 관련 콘텐츠 추천

## 프로젝트 회고

이번 프로젝트를 통해 **현대적인 웹 개발 기술 스택**과 **사용자 중심의 설계**에 대한 깊은 이해를 얻을 수 있었습니다. 특히 마크다운 기반의 콘텐츠 관리 시스템을 구축하면서 개발자 친화적인 웹사이트의 장점을 직접 체험할 수 있었습니다.

**가장 도전적이었던 부분**은 다크모드 구현이었습니다. 모든 컴포넌트에 일관된 다크모드 스타일을 적용하기 위해 CSS 변수 시스템을 구축하고, 사용자 경험을 고려한 부드러운 전환 애니메이션을 구현하는 과정에서 많은 시행착오를 겪었습니다. 하지만 이를 통해 CSS 아키텍처와 테마 관리의 중요성을 깊이 이해할 수 있었습니다.

**가장 만족스러운 부분**은 마크다운 파일만으로도 풍부한 콘텐츠를 관리할 수 있는 시스템을 구축한 것입니다. Frontmatter 파싱, 자동 excerpt 생성, 목차 자동 생성 등의 기능을 구현하면서, 단순하지만 강력한 콘텐츠 관리 시스템의 가능성을 확인할 수 있었습니다.

또한 **Vite의 빠른 개발 환경**과 **React의 컴포넌트 기반 아키텍처**를 경험하면서, 현대적인 웹 개발 도구들의 발전된 기능들을 직접 활용할 수 있어 매우 유익했습니다. 특히 코드 분할과 최적화된 빌드 시스템을 통해 웹 성능의 중요성도 체감할 수 있었습니다.

이 프로젝트를 통해 단순한 포트폴리오 사이트를 넘어서, 확장 가능하고 유지보수가 용이한 웹 애플리케이션을 개발하는 경험을 할 수 있었습니다. 앞으로도 더욱 사용자 중심의 웹 애플리케이션을 개발하고, 최신 기술 스택을 활용한 혁신적인 프로젝트를 만들어가고 싶습니다.

## 향후 개선 계획

### 1. 검색 기능 강화
- 클라이언트 사이드 검색 구현
- 태그 기반 고급 필터링
- 검색 결과 하이라이팅

### 2. SEO 최적화
- 메타 태그 동적 생성
- 구조화된 데이터 마크업
- 사이트맵 자동 생성

### 3. 성능 모니터링
- Core Web Vitals 측정
- 사용자 행동 분석
- 에러 추적 시스템

### 4. 콘텐츠 관리 개선
- 마크다운 에디터 통합
- 이미지 업로드 시스템
- 콘텐츠 미리보기 기능

## 배포 및 운영

### GitHub Pages 배포
- Vite의 정적 사이트 생성 기능 활용
- GitHub Actions를 통한 자동 배포
- 커스텀 도메인 설정

이 프로젝트를 통해 현대적인 웹 개발 기술 스택을 활용한 포트폴리오 사이트 구축의 전 과정을 경험할 수 있었습니다. 마크다운 기반의 콘텐츠 관리부터 다크모드, 반응형 디자인까지 다양한 기능을 구현하면서 웹 개발의 깊이를 이해할 수 있었습니다.
