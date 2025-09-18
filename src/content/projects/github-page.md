---
title: "개인 포트폴리오 블로그"
date: "2025-01-01"
tags: [React, Vite, JavaScript, Markdown, Portfolio]
excerpt: "React와 Vite를 활용하여 개발한 개인 포트폴리오 블로그입니다. 마크다운 기반 콘텐츠 관리, 다크모드 지원, 반응형 디자인 등의 웹 개발 기술을 적용했습니다."
coverImage: "/my-blog/images/project_img/github-page/blog.png"
demoUrl: "https://toran1678.github.io/my-blog"
repoUrl: "https://github.com/toran1678/my-blog"
---

# React 기반 개인 포트폴리오 블로그

## 프로젝트 개요

React와 Vite를 활용하여 개발한 개인 포트폴리오 블로그입니다. 마크다운 기반의 콘텐츠 관리 시스템을 구축하여 블로그 포스트와 프로젝트를 효율적으로 관리할 수 있도록 설계했습니다. 다크모드 지원, 반응형 디자인, SEO 최적화 등 현대적인 웹 개발 기술을 적용하여 사용자 경험을 극대화했습니다.

## 주요 기능

### 1. 마크다운 기반 콘텐츠 관리
- **Frontmatter 파싱**: YAML 형식의 메타데이터 자동 파싱
- **자동 excerpt 생성**: 마크다운 콘텐츠에서 자동으로 요약문 추출
- **이미지 최적화**: 동적 이미지 경로 처리 및 플레이스홀더 시스템
- **코드 하이라이팅**: SyntaxHighlighter를 활용한 코드 블록 스타일링
- **목차 자동 생성**: 헤딩을 기반으로 한 자동 목차 생성 및 스크롤 연동

### 2. 다크모드 지원
- **시스템 설정 감지**: 사용자의 시스템 다크모드 설정 자동 감지
- **로컬 스토리지**: 사용자 선택 테마 설정 영구 저장
- **부드러운 전환**: CSS transition을 활용한 자연스러운 테마 전환
- **일관된 디자인**: 모든 컴포넌트에 통일된 다크모드 스타일 적용

### 3. 반응형 디자인
- **모바일 우선 설계**: 모바일 환경을 우선으로 한 반응형 레이아웃
- **적응형 네비게이션**: 화면 크기에 따른 네비게이션 메뉴 최적화
- **유연한 그리드**: CSS Grid와 Flexbox를 활용한 유연한 레이아웃
- **터치 친화적**: 모바일 환경에 최적화된 터치 인터페이스

### 4. 프로젝트 포트폴리오
- **태그 기반 필터링**: 기술 스택별 프로젝트 분류 및 필터링
- **페이지네이션**: 대량의 프로젝트를 효율적으로 표시
- **관련 프로젝트 추천**: 유사한 태그를 가진 프로젝트 자동 추천
- **상세 프로젝트 페이지**: 마크다운 기반의 풍부한 프로젝트 설명

### 5. 블로그 시스템
- **카테고리 분류**: 태그 기반의 포스트 분류 시스템
- **검색 기능**: URL 파라미터를 활용한 태그 기반 검색
- **읽기 시간 계산**: 콘텐츠 길이 기반의 예상 읽기 시간 표시
- **소셜 공유**: 메타 태그를 활용한 소셜 미디어 최적화

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

## 개발 과정에서 얻은 경험

### 1. 마크다운 기반 CMS 구축
마크다운 파일을 직접 관리하는 방식으로 개발하면서, 기존 CMS의 복잡성 없이도 효율적인 콘텐츠 관리가 가능함을 깨달았습니다. Frontmatter를 활용한 메타데이터 관리와 자동 excerpt 생성 등의 기능을 구현하면서, 개발자 친화적인 콘텐츠 관리 시스템의 장점을 경험했습니다.

### 2. 다크모드 구현의 복잡성
다크모드를 구현하면서 CSS 변수와 Context API를 활용한 테마 관리의 중요성을 배웠습니다. 모든 컴포넌트에 일관된 다크모드 스타일을 적용하기 위해 CSS 변수 시스템을 구축하고, 사용자 경험을 고려한 부드러운 전환 애니메이션을 구현했습니다.

### 3. 반응형 디자인과 접근성
모바일 우선 설계를 통해 다양한 디바이스에서 일관된 사용자 경험을 제공하는 것의 중요성을 깨달았습니다. CSS Grid와 Flexbox를 적절히 조합하여 유연한 레이아웃을 구현하고, 터치 인터페이스에 최적화된 네비게이션을 개발했습니다.

### 4. 성능 최적화의 중요성
Vite의 빠른 개발 서버와 최적화된 빌드 시스템을 경험하면서, 현대적인 빌드 도구의 중요성을 실감했습니다. 코드 분할, 이미지 최적화, 번들 크기 최적화 등을 통해 웹 성능의 중요성을 배웠습니다.

### 5. 사용자 경험 중심 설계
목차 자동 생성, 읽기 시간 계산, 관련 프로젝트 추천 등의 기능을 구현하면서, 사용자 경험을 고려한 기능 설계의 중요성을 배웠습니다. 단순한 기능 구현을 넘어서 사용자가 실제로 유용하게 느낄 수 있는 기능들을 고민하고 구현했습니다.

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

### 성능 모니터링
- Lighthouse를 통한 성능 측정
- Core Web Vitals 최적화
- 사용자 피드백 수집

이 프로젝트를 통해 현대적인 웹 개발 기술 스택을 활용한 포트폴리오 사이트 구축의 전 과정을 경험할 수 있었습니다. 마크다운 기반의 콘텐츠 관리부터 다크모드, 반응형 디자인까지 다양한 기능을 구현하면서 웹 개발의 깊이를 이해할 수 있었습니다.
