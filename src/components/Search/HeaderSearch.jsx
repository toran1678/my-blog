import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import styles from './HeaderSearch.module.css';

export default function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const { search, isLoading } = useGlobalSearch();

  // Handle outside click to close dropdown and collapse search input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      inputRef.current?.blur();
    }
  };

  const toggleSearch = () => {
    if (isExpanded && query.trim() !== '') {
      // If expanded with text, clicking icon searches
      handleKeyDown({ key: 'Enter' });
    } else {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleResultClick = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  // Get current results for dropdown
  const results = query.trim() ? search(query) : { posts: [], projects: [] };
  const hasResults = results.posts.length > 0 || results.projects.length > 0;

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <div className={`${styles.searchWrapper} ${isExpanded ? styles.expanded : ''}`}>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsExpanded(true);
            if (query.trim()) setShowDropdown(true);
          }}
          onBlur={() => {
             // Optional: collapse if empty
          }}
        />
        {query && (
          <button 
            className={styles.clearBtn} 
            onClick={() => {
              setQuery('');
              setShowDropdown(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        <button 
          className={styles.searchIconBtn} 
          onClick={toggleSearch}
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {showDropdown && (
        <div className={styles.dropdownOverlay} ref={dropdownRef}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <span className={styles.spinner}></span>
              검색 준비 중...
            </div>
          ) : hasResults ? (
            <div className={styles.resultsContainer}>
              {results.posts.length > 0 && (
                <div className={styles.resultGroup}>
                  <div className={styles.groupHeader}>Posts</div>
                  <ul className={styles.resultList}>
                    {results.posts.slice(0, 3).map(post => (
                      <li key={post.slug} className={styles.resultItem} onClick={() => handleResultClick(`/posts/${post.slug}`)}>
                        <div className={styles.itemTitle}>{post.title}</div>
                        <div className={styles.itemMeta}>
                          {post.date}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.projects.length > 0 && (
                <div className={styles.resultGroup}>
                  <div className={styles.groupHeader}>Projects</div>
                  <ul className={styles.resultList}>
                    {results.projects.slice(0, 3).map(project => (
                      <li key={project.slug} className={styles.resultItem} onClick={() => handleResultClick(`/projects/${project.slug}`)}>
                        <div className={styles.itemTitle}>{project.title}</div>
                        <div className={styles.itemMeta}>
                          {project.period || project.type || '프로젝트'}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div 
                className={styles.viewAllBtn}
                onClick={() => handleKeyDown({ key: 'Enter' })}
              >
                &apos;{query}&apos; 전체 검색 결과 보기 &rarr;
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              &quot;{query}&quot;에 대한 검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
