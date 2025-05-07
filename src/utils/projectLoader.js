// 프로젝트 데이터를 불러오는 유틸리티 함수
import { getProjects, getProjectBySlug } from "./markdownLoader"

// 모든 프로젝트 가져오기
export const getAllProjects = async () => {
  try {
    // markdownLoader의 getProjects 함수를 사용하여 마크다운 파일에서 프로젝트 데이터 불러오기
    return await getProjects()
  } catch (error) {
    console.error("프로젝트 데이터를 불러오는 중 오류가 발생했습니다:", error)
    return []
  }
}

// ID로 특정 프로젝트 가져오기
export const getProjectById = async (id) => {
  try {
    // markdownLoader의 getProjectBySlug 함수를 사용하여 특정 프로젝트 데이터 불러오기
    const project = await getProjectBySlug(id)

    if (!project) {
      throw new Error("프로젝트를 찾을 수 없습니다.")
    }

    return project
  } catch (error) {
    console.error(`ID ${id}에 해당하는 프로젝트를 불러오는 중 오류가 발생했습니다:`, error)
    throw error
  }
}

// 특정 태그를 가진 프로젝트 가져오기
export const getProjectsByTag = async (tag) => {
  try {
    const projects = await getProjects()
    return projects.filter((project) => project.tags && project.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
  } catch (error) {
    console.error(`태그 ${tag}에 해당하는 프로젝트를 불러오는 중 오류가 발생했습니다:`, error)
    return []
  }
}

// 최근 프로젝트 가져오기
export const getRecentProjects = async (count = 3) => {
  try {
    const projects = await getProjects()
    return projects.slice(0, count)
  } catch (error) {
    console.error(`최근 프로젝트를 불러오는 중 오류가 발생했습니다:`, error)
    return []
  }
}

// 관련 프로젝트 가져오기 (같은 태그를 가진 프로젝트)
export const getRelatedProjects = async (currentProjectId, count = 3) => {
  try {
    const currentProject = await getProjectBySlug(currentProjectId)
    if (!currentProject || !currentProject.tags || currentProject.tags.length === 0) {
      return []
    }

    const allProjects = await getProjects()

    // 현재 프로젝트를 제외하고, 태그가 일치하는 프로젝트 필터링
    const relatedProjects = allProjects
      .filter((project) => project.slug !== currentProjectId)
      .filter((project) => project.tags && project.tags.some((tag) => currentProject.tags.includes(tag)))
      .slice(0, count)

    return relatedProjects
  } catch (error) {
    console.error(`관련 프로젝트를 불러오는 중 오류가 발생했습니다:`, error)
    return []
  }
}
