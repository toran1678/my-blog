import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import styles from './SearchPage.module.css';
import { ThumbnailPlaceholder } from '../../components/ImagePlaceholder/ImagePlaceholder';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { search, isLoading } = useGlobalSearch();
  const [results, setResults] = useState({ posts: [], projects: [] });

  useEffect(() => {
    if (!isLoading && query) {
      setResults(search(query));
    }
  }, [query, isLoading, search]); // Removed 'search' dependency to prevent infinite loops if hook recreate

  if (isLoading) {
    return (
      <div className={styles.searchPageContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>검색 결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const hasResults = results.posts.length > 0 || results.projects.length > 0;

  return (
    <div className={styles.searchPageContainer}>
      <header className={styles.searchHeader}>
        <h1 className={styles.searchTitle}>
          <span className={styles.highlight}>&apos;{query}&apos;</span> 검색 결과
        </h1>
      </header>

      {!query.trim() ? (
        <div className={styles.emptyState}>검색어를 입력해주세요.</div>
      ) : !hasResults ? (
        <div className={styles.emptyState}>&quot;{query}&quot;에 대한 검색 결과가 없습니다.</div>
      ) : (
        <div className={styles.resultsWrapper}>
          {results.projects.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.sectionTitle}>
                프로젝트 <span className={styles.countBadge}>{results.projects.length}</span>
              </h2>
              <div className={styles.gridContainer}>
                {results.projects.map((project) => (
                  <Link to={`/projects/${project.slug}`} key={project.slug} className={styles.cardLink}>
                    <div className={styles.card}>
                      <div className={styles.cardImageContainer}>
                        {project.coverImage ? (
                          <img 
                            src={project.coverImage} 
                            alt={project.title} 
                            className={styles.cardImage}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <ThumbnailPlaceholder title={project.title} />
                        )}
                        {project.type && (
                          <div className={styles.typeBadge}>
                            {project.type.includes('팀') ? '팀 프로젝트' : '개인 프로젝트'}
                          </div>
                        )}
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <p className={styles.cardExcerpt}>
                          {project.excerpt?.substring(0, 100)}{project.excerpt?.length > 100 ? '...' : ''}
                        </p>
                        {project.skills && (
                          <div className={styles.cardSkills}>
                            {project.skills.split(',').slice(0, 3).map((skill, idx) => (
                              <span key={idx} className={styles.skillTag}>{skill.trim()}</span>
                            ))}
                            {project.skills.split(',').length > 3 && (
                              <span className={styles.skillTag}>+{project.skills.split(',').length - 3}</span>
                            )}
                          </div>
                        )}
                        <div className={styles.cardFooter}>
                          <span className={styles.cardDate}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            {project.period || '기간 미상'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.posts.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.sectionTitle}>
                스토리 <span className={styles.countBadge}>{results.posts.length}</span>
              </h2>
              <div className={styles.listContainer}>
                {results.posts.map((post) => (
                  <Link to={`/posts/${post.slug}`} key={post.slug} className={styles.listItem}>
                    <div className={styles.listContent}>
                      <h3 className={styles.listTitle}>{post.title}</h3>
                      <p className={styles.listExcerpt}>
                        {post.excerpt?.substring(0, 150)}{post.excerpt?.length > 150 ? '...' : ''}
                      </p>
                      <div className={styles.listFooter}>
                        <span className={styles.listDate}>{post.date}</span>
                        {post.tags && (
                          <div className={styles.listTags}>
                            {post.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className={styles.listTag}>#{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {post.coverImage && (
                      <div className={styles.listImageContainer}>
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className={styles.listImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
