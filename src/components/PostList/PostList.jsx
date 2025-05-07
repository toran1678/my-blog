"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getPosts } from "../../utils/markdownLoader"
import styles from "./PostList.module.css"

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData = await getPosts()
        setPosts(postData)
      } catch (error) {
        console.error("포스트를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return <div className="loading">게시글을 불러오는 중...</div>
  }

  return (
    <div className={styles.postsContainer}>
      <header className={styles.postsHeader}>
        <h1>블로그 게시글</h1>
        <p className={styles.postsDescription}>개발 경험과 지식을 공유하는 블로그 게시글 모음입니다.</p>
      </header>

      <div className={styles.postList}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              {post.coverImage && (
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={`${post.title} 커버 이미지`}
                  className={styles.postImage}
                />
              )}
              <div className={styles.postInfo}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <div className={styles.postMeta}>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.tags && (
                    <div className={styles.postTags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <Link to={`/posts/${post.slug}`} className={styles.readMore}>
                  더 읽기
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className={styles.emptyMessage}>아직 작성된 게시글이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
