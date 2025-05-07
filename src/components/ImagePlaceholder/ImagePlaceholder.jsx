import React from 'react'
import styles from './ImagePlaceholder.module.css'

export default function ImagePlaceholder({ type = 'default', title, width = '100%', height = '100%' }) {
  // 타입에 따라 다른 스타일과 패턴 적용
  const placeholderClass = `${styles.placeholder} ${styles[type]}`
  
  return (
    <div 
      className={placeholderClass} 
      style={{ width, height }}
      aria-label={title ? `${title} 이미지 플레이스홀더` : '이미지 플레이스홀더'}
    >
      <div className={styles.patternContainer}>
        <div className={styles.pattern}></div>
      </div>
      
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      {title && <div className={styles.title}>{title}</div>}
    </div>
  )
}

// 다양한 타입의 플레이스홀더 컴포넌트 생성
export const CoverPlaceholder = (props) => <ImagePlaceholder type="cover" {...props} />
export const ThumbnailPlaceholder = (props) => <ImagePlaceholder type="thumbnail" {...props} />
export const ContentPlaceholder = (props) => <ImagePlaceholder type="content" {...props} />
