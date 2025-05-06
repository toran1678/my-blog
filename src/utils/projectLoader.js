// 프로젝트 데이터를 불러오는 유틸리티 함수

// 샘플 프로젝트 데이터
const projectsData = [
    {
      id: "1",
      title: "포트폴리오 웹사이트",
      summary: "React와 Vite를 사용하여 만든 개인 포트폴리오 웹사이트입니다.",
      content: `
  # 포트폴리오 웹사이트
  
  ## 프로젝트 개요
  이 프로젝트는 React와 Vite를 사용하여 개발한 개인 포트폴리오 웹사이트입니다. GitHub Pages를 통해 배포되었으며, 마크다운으로 작성된 프로젝트 설명을 보여줍니다.
  
  ## 사용 기술
  - React
  - Vite
  - React Router
  - CSS
  - GitHub Pages
  
  ## 주요 기능
  - 반응형 디자인
  - 프로젝트 갤러리
  - 마크다운 콘텐츠 렌더링
      `,
      image: "/my-blog/images/portfolio.jpg",
      tags: ["React", "Vite", "CSS"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/portfolio",
      date: "2023-05-15",
    },
    {
      id: "2",
      title: "할 일 관리 앱",
      summary: "React와 localStorage를 사용한 할 일 관리 웹 애플리케이션입니다.",
      content: `
  # 할 일 관리 앱
  
  ## 프로젝트 개요
  이 프로젝트는 React를 사용하여 개발한 할 일 관리 웹 애플리케이션입니다. 사용자는 할 일을 추가, 편집, 삭제할 수 있으며, 완료 여부를 체크할 수 있습니다.
  
  ## 사용 기술
  - React
  - localStorage
  - CSS
  
  ## 주요 기능
  - 할 일 추가/편집/삭제
  - 완료 상태 토글
  - 로컬 스토리지를 통한 데이터 저장
  - 필터링 기능 (전체/완료/미완료)
      `,
      image: "/my-blog/images/todo-app.jpg",
      tags: ["React", "localStorage", "CSS"],
      demoUrl: "https://example.com/todo-demo",
      repoUrl: "https://github.com/username/todo-app",
      date: "2023-03-10",
    },
  ]
  
  // 모든 프로젝트 가져오기
  export const getProjects = async () => {
    // 실제 구현에서는 API 호출이나 마크다운 파일을 불러오는 로직이 들어갈 수 있습니다.
    // 현재는 샘플 데이터를 반환합니다.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(projectsData)
      }, 500) // 로딩 시뮬레이션
    })
  }
  
  // ID로 특정 프로젝트 가져오기
  export const getProjectById = async (id) => {
    // 실제 구현에서는 API 호출이나 마크다운 파일을 불러오는 로직이 들어갈 수 있습니다.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = projectsData.find((p) => p.id === id)
        if (project) {
          resolve(project)
        } else {
          reject(new Error("프로젝트를 찾을 수 없습니다."))
        }
      }, 500) // 로딩 시뮬레이션
    })
  }
  