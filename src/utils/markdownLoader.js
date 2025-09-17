// 마크다운 파일을 불러오는 유틸리티 함수

  // 간단한 마크다운 파서 (frontmatter 파싱)
function parseFrontMatter(markdown) {
    const frontMatterRegex = /^---\s*([\s\S]*?)\s*---/
    const match = markdown.match(frontMatterRegex)
  
    if (!match) {
      return {
        frontMatter: {},
        content: markdown,
      }
    }
  
    const frontMatterBlock = match[1]
    const content = markdown.replace(frontMatterRegex, "").trim()
    const frontMatter = {}
  
    // frontMatter 블록을 파싱
    frontMatterBlock.split("\n").forEach((line) => {
      const [key, ...valueArr] = line.split(":")
      if (key && valueArr.length) {
        let value = valueArr.join(":").trim()
  
        // 따옴표 제거
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        }
  
        // 배열 처리 (예: tags: [tag1, tag2])
        if (value.startsWith("[") && value.endsWith("]")) {
          value = value
            .slice(1, -1)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean) // 빈 문자열 제거
        }
  
        frontMatter[key.trim()] = value
      }
    })
  
    return { frontMatter, content }
  }

  // excerpt 자동 생성 함수
  function generateExcerpt(content) {
    // 마크다운 문법 제거
    let text = content
      .replace(/#{1,6}\s+/g, '') // 헤딩 제거
      .replace(/\*\*(.*?)\*\*/g, '$1') // 굵은 글씨 제거
      .replace(/\*(.*?)\*/g, '$1') // 기울임체 제거
      .replace(/`(.*?)`/g, '$1') // 인라인 코드 제거
      .replace(/```[\s\S]*?```/g, '') // 코드 블록 제거
      .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지 제거
      .replace(/\[.*?\]\(.*?\)/g, '') // 링크 제거
      .replace(/>\s*/g, '') // 인용구 제거
      .replace(/^\s*[-*+]\s*/gm, '') // 리스트 마커 제거
      .replace(/^\s*\d+\.\s*/gm, '') // 번호 리스트 제거
      .replace(/\n+/g, ' ') // 여러 줄바꿈을 공백으로
      .trim()
    
    // 문장 단위로 분리
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0)
    
    if (sentences.length === 0) {
      return text.substring(0, 80) + '...'
    }
    
    // 첫 번째 문장만 사용 (카드에서 두 줄을 넘지 않도록)
    let excerpt = sentences[0].trim()
    
    // 80자 이상이면 80자로 자르고 ... 추가
    if (excerpt.length > 80) {
      excerpt = excerpt.substring(0, 80) + '...'
    }
    
    // 마지막에 마침표 추가 (없는 경우에만)
    if (!excerpt.endsWith('.') && !excerpt.endsWith('...')) {
      excerpt += '.'
    }
    
    return excerpt
  }
  
  // 모든 포스트 가져오기
  export async function getPosts() {
    const posts = []
  
    // Vite의 import.meta.glob을 사용하여 모든 마크다운 파일 가져오기
    const postFiles = import.meta.glob("/src/content/posts/*.md", { as: "raw" })
  
    for (const path in postFiles) {
      const content = await postFiles[path]()
      const slug = path.split("/").pop().replace(".md", "")
  
      // frontmatter와 content 추출
      const { frontMatter, content: markdownContent } = parseFrontMatter(content)

      // excerpt가 없으면 자동 생성
      const excerpt = frontMatter.excerpt || generateExcerpt(markdownContent)

      posts.push({
        slug,
        ...frontMatter,
        content: markdownContent,
        excerpt,
      })
    }
  
    // 날짜 기준 내림차순 정렬
    return posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  }
  
  // 슬러그로 특정 포스트 가져오기
  export async function getPostBySlug(slug) {
    const posts = await getPosts()
    return posts.find((post) => post.slug === slug)
  }
  
  // 모든 프로젝트 가져오기
  export async function getProjects() {
    const projects = []
  
    // Vite의 import.meta.glob을 사용하여 모든 마크다운 파일 가져오기
    const projectFiles = import.meta.glob("/src/content/projects/*.md", { as: "raw" })
  
    for (const path in projectFiles) {
      const content = await projectFiles[path]()
      const slug = path.split("/").pop().replace(".md", "")
  
      // frontmatter와 content 추출
      const { frontMatter, content: markdownContent } = parseFrontMatter(content)
  
      projects.push({
        slug,
        id: slug, // id도 slug와 동일하게 설정
        ...frontMatter,
        content: markdownContent,
      })
    }
  
    // 날짜 기준 내림차순 정렬
    return projects.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  }
  
  // 슬러그로 특정 프로젝트 가져오기
  export async function getProjectBySlug(slug) {
    const projects = await getProjects()
    return projects.find((project) => project.slug === slug)
  }
  
  // ID로 특정 프로젝트 가져오기
  export async function getProjectById(id) {
    const projects = await getProjects()
    return projects.find((project) => project.id === id || project.slug === id)
  }
  