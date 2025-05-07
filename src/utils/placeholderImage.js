/**
 * 플레이스홀더 이미지 URL을 생성하는 유틸리티 함수
 *
 * @param {Object} options - 플레이스홀더 이미지 옵션
 * @param {number} options.width - 이미지 너비 (픽셀)
 * @param {number} options.height - 이미지 높이 (픽셀)
 * @param {string} options.text - 이미지에 표시할 텍스트 (선택 사항)
 * @param {string} options.backgroundColor - 배경색 (선택 사항, 기본값: '#3498db')
 * @param {string} options.textColor - 텍스트 색상 (선택 사항, 기본값: '#ffffff')
 * @returns {string} 플레이스홀더 이미지 URL
 */
export function getPlaceholderImage({
    width = 800,
    height = 400,
    text = "",
    backgroundColor = "3498db",
    textColor = "ffffff",
  } = {}) {
    // 외부 플레이스홀더 서비스 사용 (placehold.co)
    const encodedText = encodeURIComponent(text)
    return `https://placehold.co/${width}x${height}/${backgroundColor}/${textColor}?text=${encodedText}`
  }
  
  /**
   * 마크다운 콘텐츠에서 placeholder.svg 경로를 외부 플레이스홀더 서비스 URL로 변환
   *
   * @param {string} content - 마크다운 콘텐츠
   * @returns {string} 변환된 마크다운 콘텐츠
   */
  export function replacePlaceholderUrls(content) {
    if (!content) return content
  
    // placeholder.svg?height=600&width=1200&query=text 형식의 URL을 찾아 변환
    return content.replace(
      /\/placeholder\.svg\?(?:height=(\d+))?(?:&width=(\d+))?(?:&query=([^)\s]+))?/g,
      (match, height, width, query) => {
        const h = Number.parseInt(height) || 400
        const w = Number.parseInt(width) || 800
        const text = query ? decodeURIComponent(query).replace(/\+/g, " ") : ""
  
        return getPlaceholderImage({
          width: w,
          height: h,
          text: text,
          backgroundColor: "3498db",
          textColor: "ffffff",
        })
      },
    )
  }
  
  /**
   * 이미지 URL이 placeholder.svg인 경우 외부 플레이스홀더 서비스 URL로 변환
   *
   * @param {string} url - 이미지 URL
   * @param {Object} options - 플레이스홀더 이미지 옵션
   * @returns {string} 변환된 이미지 URL
   */
  export function getImageUrl(url, options = {}) {
    if (!url) return ""
  
    // placeholder.svg 경로인 경우 변환
    if (url.includes("placeholder.svg")) {
      // URL에서 매개변수 추출
      const urlObj = new URL(url, window.location.origin)
      const height = urlObj.searchParams.get("height") || options.height || 400
      const width = urlObj.searchParams.get("width") || options.width || 800
      const query = urlObj.searchParams.get("query") || options.text || ""
  
      return getPlaceholderImage({
        width,
        height,
        text: query,
        backgroundColor: options.backgroundColor || "3498db",
        textColor: options.textColor || "ffffff",
      })
    }
  
    // 다른 URL은 그대로 반환
    return url
  }
  