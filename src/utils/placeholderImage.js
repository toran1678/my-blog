/**
 * 이미지 URL을 처리하는 유틸리티 함수
 *
 * 마크다운 파일에서 가져온 이미지 경로를 실제 사용 가능한 URL로 변환합니다.
 * 모든 이미지는 public/images 디렉토리에 있다고 가정합니다.
 *
 * @param {string} imagePath - 이미지 경로
 * @returns {string} - 처리된 이미지 URL
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return ""

  // 이미 완전한 URL인 경우 그대로 반환
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  // 개발 환경인지 확인
  const isDev = import.meta.env.DEV
  // 기본 URL 설정 (개발 환경에서는 빈 문자열, 프로덕션에서는 /my-blog)
  const baseUrl = isDev ? "/my-blog" : "/my-blog"

  // 경로 처리
  let processedPath = imagePath

  // /my-blog로 시작하는 경우 /my-blog 제거
  if (imagePath.startsWith("/my-blog")) {
    processedPath = imagePath.substring(8) // "/my-blog" (8글자) 제거
  }

  // /로 시작하지 않는 경우 / 추가
  if (!processedPath.startsWith("/")) {
    processedPath = "/" + processedPath
  }

  // 최종 URL 생성
  return `${baseUrl}${processedPath}`
}

/**
 * 이미지 URL이 유효한지 확인하는 함수
 *
 * @param {string} url - 확인할 이미지 URL
 * @returns {Promise<boolean>} - 이미지 URL이 유효하면 true, 그렇지 않으면 false
 */
export async function isImageUrlValid(url) {
  if (!url) return false

  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error("이미지 URL 확인 중 오류:", error)
    return false
  }
}

/**
 * 이미지 경로를 디버깅하는 함수
 *
 * @param {string} originalPath - 원본 이미지 경로
 * @param {string} transformedPath - 변환된 이미지 경로
 */
export function debugImagePath(originalPath, transformedPath) {
  console.log({
    original: originalPath,
    transformed: transformedPath,
    isDev: import.meta.env.DEV,
    baseUrl: import.meta.env.DEV ? "/my-blog" : "/my-blog",
    processedPath: originalPath ? (originalPath.startsWith("/my-blog") ? originalPath.substring(8) : originalPath) : "",
  })
}
