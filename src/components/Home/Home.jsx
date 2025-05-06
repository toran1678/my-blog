import { Link } from "react-router-dom"
import styles from "./Home.module.css"
import ProjectCard from "../ProjectCard/ProjectCard"
import PostItem from "../PostItem/PostItem"

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <h1>안녕하세요, 선빈의 포트폴리오입니다</h1>
        <p>웹 개발자로서의 저의 여정과 프로젝트들을 소개합니다</p>
        <Link to="/projects" className={styles.ctaButton}>
          프로젝트 보기
        </Link>
      </section>

      <section className={styles.featuredProjects}>
        <h2>주요 프로젝트</h2>
        <div className={styles.projectGrid}>
          <ProjectCard id="1" title="프로젝트 1" summary="프로젝트 간단 설명" />
          <ProjectCard id="2" title="프로젝트 2" summary="프로젝트 간단 설명" />
        </div>
      </section>

      <section className={styles.recentPosts}>
        <h2>최근 게시글</h2>
        <div className={styles.postList}>
          <PostItem id="1" title="게시글 제목 1" summary="게시글 요약..." />
          <PostItem id="2" title="게시글 제목 2" summary="게시글 요약..." />
        </div>
      </section>
    </div>
  )
}
