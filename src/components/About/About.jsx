"use client"

import { useState, useEffect } from "react"
import styles from "./About.module.css"

export default function About() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className={styles.aboutContainer}>
      <section className={styles.heroSection} id="hero" data-animate>
        <div className={`${styles.heroContent} ${isVisible["hero"] ? styles.visible : ""}`}>
          <h1 className={styles.heroTitle}>
            안녕하세요, <span className={styles.highlight}>김선빈</span>입니다
          </h1>
          <p className={styles.heroSubtitle}>
            웹 개발에 열정을 가진 개발자입니다. 사용자 경험을 개선하고 효율적인 코드를 작성하는 것에 관심이 많습니다.
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/toran1678"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub 프로필"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/toran16784/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn 프로필"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:toran16784@gmail.com" className={styles.socialLink} aria-label="이메일 보내기">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
        <div className={`${styles.heroImage} ${isVisible["hero"] ? styles.visible : ""}`}>
          <div className={styles.profileImageContainer}>
            <img
              src="/my-blog/images/profile.png"
              alt="프로필 이미지"
              className={styles.profileImage}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/400x400?text=Profile"
              }}
            />
          </div>
        </div>
      </section>

      <section className={styles.tabSection} id="tabs" data-animate>
        <div className={`${styles.tabContainer} ${isVisible["tabs"] ? styles.visible : ""}`}>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${activeTab === "personal" ? styles.active : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              개인정보
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "skills" ? styles.active : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              기술 스택
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "experience" ? styles.active : ""}`}
              onClick={() => setActiveTab("experience")}
            >
              경력
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "education" ? styles.active : ""}`}
              onClick={() => setActiveTab("education")}
            >
              교육
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "personal" && (
              <div className={styles.personalTab}>
                <div className={styles.personalInfo}>
                  <div className={styles.personalCard}>
                    <div className={styles.personalIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className={styles.personalContent}>
                      <h3>이름</h3>
                      <p>김선빈</p>
                    </div>
                  </div>

                  <div className={styles.personalCard}>
                    <div className={styles.personalIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div className={styles.personalContent}>
                      <h3>생년월일</h3>
                      <p>2001년 4월 19일</p>
                    </div>
                  </div>

                  <div className={styles.personalCard}>
                    <div className={styles.personalIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className={styles.personalContent}>
                      <h3>위치</h3>
                      <p>경기도 안양시</p>
                    </div>
                  </div>

                  <div className={styles.personalCard}>
                    <div className={styles.personalIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div className={styles.personalContent}>
                      <h3>연락처</h3>
                      <p>010-7178-5852</p>
                    </div>
                  </div>

                  <div className={styles.personalCard}>
                    <div className={styles.personalIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div className={styles.personalContent}>
                      <h3>이메일</h3>
                      <p>toran16784@gmail.com</p>
                    </div>
                  </div>

                  <div className={styles.personalCard}>
                    <div className={styles.personalIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                    </div>
                    <div className={styles.personalContent}>
                      <h3>학력</h3>
                      <p>안양대학교 {'( '}소프트웨어학과{' )'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className={styles.skillsTab}>
                <div className={styles.skillCategory}>
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.categoryIcon}>
                      <rect width="18" height="18" x="3" y="3" rx="2"/>
                      <path d="m10 15-3-3 3-3"/>
                      <path d="m14 9 3 3-3 3"/>
                    </svg>
                    Language
                  </h3>
                  <div className={styles.skillBlocks}>
                    <span className={styles.skillBlock} data-skill="typescript">TypeScript</span>
                    <span className={styles.skillBlock} data-skill="javascript">JavaScript</span>
                    <span className={styles.skillBlock} data-skill="python">Python</span>
                    <span className={styles.skillBlock} data-skill="java">Java</span>
                    <span className={styles.skillBlock} data-skill="c++">C</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.categoryIcon} viewBox="0 0 16 16">
                      <path d="M3 3.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                      <path d="M.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5zM1 5V2h14v3zm0 1h14v8H1z"/>
                    </svg>
                    Frontend
                  </h3>
                  <div className={styles.skillBlocks}>
                    <span className={styles.skillBlock} data-skill="react">React</span>
                    <span className={styles.skillBlock} data-skill="next.js">Next.js</span>
                    <span className={styles.skillBlock} data-skill="vite">Vite</span>
                    <span className={styles.skillBlock} data-skill="html5">HTML</span>
                    <span className={styles.skillBlock} data-skill="css3">CSS</span>
                    <span className={styles.skillBlock} data-skill="sass">Sass</span>
                    <span className={styles.skillBlock} data-skill="tailwind">Tailwind CSS</span>
                    <span className={styles.skillBlock} data-skill="responsive">Responsive Design</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h3>
                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.categoryIcon}>
                      <path d="M4 6V12C4 12 4 15 11 15C18 15 18 12 18 12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 3C18 3 18 6 18 6C18 6 18 9 11 9C4 9 4 6 4 6C4 6 4 3 11 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 21C4 21 4 18 4 18V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 22H19.5H21M19.5 19.4286H21.8333V16H17.1666V19.4286H19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Backend
                  </h3>
                  <div className={styles.skillBlocks}>
                    <span className={styles.skillBlock} data-skill="node.js">Node.js</span>
                    <span className={styles.skillBlock} data-skill="express">Express</span>
                    <span className={styles.skillBlock} data-skill="fastapi">FastAPI</span>
                    {/* <span className={styles.skillBlock} data-skill="mongodb">MongoDB</span> */}
                    {/* <span className={styles.skillBlock} data-skill="firebase">Firebase</span> */}
                    <span className={styles.skillBlock} data-skill="restful">RESTful API</span>
                    <span className={styles.skillBlock} data-skill="graphql">GraphQL</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h3>
                    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={styles.categoryIcon}>
                      <title>dev-ops-solid</title>
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="invisible_box" data-name="invisible box">
                          <rect width="48" height="48" fill="none"/>
                        </g>
                        <g id="icons_Q2" data-name="icons Q2">
                          <path d="M46,24A12,12,0,0,0,34,12c-5.2,0-9.5,4.1-11.9,11.4C20.3,28.9,17.3,32,14,32a8,8,0,0,1,0-16h1.2l-1.6,1.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l4.9-5a1.9,1.9,0,0,0,0-2.8l-4.9-5a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L15.2,12H14a12,12,0,0,0,0,24c5.2,0,9.5-4.1,11.9-11.4C27.7,19.1,30.7,16,34,16a8,8,0,0,1,0,16H32.8l1.6-1.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-4.9,5a1.9,1.9,0,0,0,0,2.8l4.9,5a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L32.8,36H34A12,12,0,0,0,46,24Z" fill="currentColor"/>
                        </g>
                      </g>
                    </svg>
                    DevOps
                  </h3>
                  <div className={styles.skillBlocks}>
                    <span className={styles.skillBlock} data-skill="docker">Docker</span>
                    <span className={styles.skillBlock} data-skill="redis">Redis</span>
                    {/* <span className={styles.skillBlock} data-skill="aws">AWS</span> */}
                    {/* <span className={styles.skillBlock} data-skill="vercel">Vercel</span> */}
                    <span className={styles.skillBlock} data-skill="git">Git & GitHub</span>
                    <span className={styles.skillBlock} data-skill="ci/cd">CI/CD</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.categoryIcon}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
                    Tools
                  </h3>
                  <div className={styles.skillBlocks}>
                    <span className={styles.skillBlock} data-skill="figma">Figma</span>
                    <span className={styles.skillBlock} data-skill="blender">Blender</span>
                    <span className={styles.skillBlock} data-skill="vscode">VS Code</span>
                    <span className={styles.skillBlock} data-skill="webpack">Webpack</span>
                    <span className={styles.skillBlock} data-skill="ui/ux">UI/UX</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h3>자격증</h3>
                  <div className={styles.certificationBlocks}>
                    <div className={styles.certificationItem}>
                      <span className={styles.certificationName}>정보처리기사</span>
                      <span className={styles.certificationDate}>2025</span>
                    </div>
                    <div className={styles.certificationItem}>
                      <span className={styles.certificationName}>컴퓨터활용능력 2급</span>
                      <span className={styles.certificationDate}>2018</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className={styles.experienceTab}>
                <div className={styles.timeline}>
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineDate}>2020 - 2025</div>
                      <h3 className={styles.timelineTitle}>안양대학교</h3>
                      <div className={styles.timelineCompany}>소프트웨어학과 학사</div>
                      <div className={styles.timelineQuote}>"다양한 기술을 활용한 창의적 프로젝트 개발"</div>
                      <div className={styles.timelineTags}>
                        <span className={styles.timelineTag}>Frontend 개발</span>
                        <span className={styles.timelineTag}>Backend 개발</span>
                        <span className={styles.timelineTag}>AI/ML 개발</span>
                      </div>
                      <div className={styles.timelineProjects}>
                        <div className={styles.timelineProject}>
                          <div className={styles.projectBar}>|</div>
                          <div className={styles.projectContent}>
                            <h4 className={styles.projectTitle}>딥러닝 가상 피팅 서비스 & 웹 커뮤니티 플랫폼 - 캡스톤 디자인</h4>
                            <div className={styles.projectDate}>2025년 하반기 - 2025년 상반기</div>
                            <p className={styles.projectDescription}>
                              딥러닝 모델을 활용한 가상 의류 피팅 서비스와 웹 커뮤니티를 결합한 
                              풀스택 웹 애플리케이션 개발. 사용자가 온라인으로 의류를 가상으로 착용해보고 
                              커뮤니티에서 소통할 수 있는 통합 플랫폼으로 4학년 캡스톤 디자인 프로젝트
                            </p>
                          </div>
                        </div>

                        <div className={styles.timelineProject}>
                          <div className={styles.projectBar}>|</div>
                          <div className={styles.projectContent}>
                            <h4 className={styles.projectTitle}>맛집 추천 커뮤니티 ( 맛스팟 MatSpot )</h4>
                            <div className={styles.projectDate}>2025년 하반기</div>
                            <p className={styles.projectDescription}>
                              사용자들이 쉽고 재미있게 주변 맛집 정보를 공유하고,
                              다른 사용자들의 추천을 받아 새로운 맛집을 발견할 수 있도록 하는 커뮤니티 기반 웹 서비스.
                              Kakao 지도를 통해 직관적으로 맛집 위치를 확인하고, 다양한 필터와 검색 기능 지원
                            </p>
                          </div>
                        </div>
                        
                        <div className={styles.timelineProject}>
                          <div className={styles.projectBar}>|</div>
                          <div className={styles.projectContent}>
                            <h4 className={styles.projectTitle}>OpenCV를 활용한 이미지 처리 포토샵 프로그램 개발</h4>
                            <div className={styles.projectDate}>2024년 상반기</div>
                            <p className={styles.projectDescription}>
                              Python과 OpenCV 라이브러리를 활용하여 이미지 필터링, 색상 조정, 
                              객체 인식 기능을 포함한 포토샵 프로그램 개발
                            </p>
                          </div>
                        </div>
                        
                        <div className={styles.timelineProject}>
                          <div className={styles.projectBar}>|</div>
                          <div className={styles.projectContent}>
                            <h4 className={styles.projectTitle}>뉴스 감성 분석 & 요약 및 주가 예측 서비스 개발</h4>
                            <div className={styles.projectDate}>2024년 상반기</div>
                            <p className={styles.projectDescription}>
                              OpenAI를 활용한 뉴스 자동 요약 및 검색 기능을 제공하는 
                              파이썬 프로그램 개발(LSTM 모델을 사용한 주가 예측, NewsAPI와 OpenAI를 사용한 뉴스 검색 및 요약, 카카오 API를 통해 예측 결과를 카카오톡으로 전송)
                            </p>
                          </div>
                        </div>
                        
                        <div className={styles.timelineProject}>
                          <div className={styles.projectBar}>|</div>
                          <div className={styles.projectContent}>
                            <h4 className={styles.projectTitle}>자바 소켓 통신 오목 게임 개발</h4>
                            <div className={styles.projectDate}>2024년 상반기</div>
                            <p className={styles.projectDescription}>
                              Java Socket Programming을 활용한 멀티플레이어 오목 게임 개발. 
                              실시간 통신과 게임 로직 구현, Java Swing을 활용한 게임 개발
                            </p>
                          </div>
                        </div>
                        
                        <div className={styles.timelineProject}>
                          <div className={styles.projectBar}>|</div>
                          <div className={styles.projectContent}>
                            <h4 className={styles.projectTitle}>Blender 3D 기초 모델링</h4>
                            <div className={styles.projectDate}>2024년 하반기</div>
                            <p className={styles.projectDescription}>
                              Blender를 활용한 3D 기초 캐릭터 모델링
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineDate}>2020 - 2022</div>
                      <h3 className={styles.timelineTitle}>주니어 웹 개발자</h3>
                      <div className={styles.timelineCompany}>더미 데이터</div>
                      <ul className={styles.timelineList}>
                        <li>반응형 웹사이트 개발</li>
                        <li>기존 웹사이트 유지보수 및 기능 개선</li>
                        <li>클라이언트와의 협업 및 요구사항 분석</li>
                        <li>HTML, CSS, JavaScript를 활용한 프론트엔드 개발</li>
                        <li>WordPress 테마 및 플러그인 커스터마이징</li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineDate}>2023.09 - 2023.12</div>
                      <h3 className={styles.timelineTitle}>서버 프로그래밍 프로젝트 {'( '}안양대학교{' )'}</h3>
                      <div className={styles.timelineCompany}>MLB팀 DB에 저장 및 선수별 능력치 시각화 프로젝트</div>
                      <ul className={styles.timelineList}>
                        <li>반응형 웹사이트 개발</li>
                        <li>선수 비교 화면 디자인 {'( '}Chart.js 사용{' )'}</li>
                        <li>GitHub 협업 능력 향상</li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                  </div> */}

                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className={styles.educationTab}>
                <div className={styles.educationCard}>
                  <div className={styles.educationHeader}>
                    <div className={styles.educationLogo}>
                      <span>AU</span>
                    </div>
                    <div className={styles.educationInfo}>
                      <h3>소프트웨어과 학사</h3>
                      <p className={styles.educationSchool}>안양대학교</p>
                      <p className={styles.educationPeriod}>2020 - 2025</p>
                    </div>
                  </div>
                  <div className={styles.educationDetails}>
                    <p>
                      컴퓨터 과학의 기본 원리와 프로그래밍 기술을 배웠습니다. 알고리즘, 자료구조, 데이터베이스, 웹 개발
                      등 다양한 분야를 학습했습니다.
                    </p>
                    <div className={styles.educationHighlights}>
                      <h4>주요 과목</h4>
                      <ul>
                        <li>자료구조 및 알고리즘</li>
                        <li>데이터베이스 시스템</li>
                        <li>웹 프로그래밍</li>
                        <li>소프트웨어 공학</li>
                        <li>인공지능과 머신러닝 기술</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.educationCard}>
                  <div className={styles.educationHeader}>
                    <div className={styles.educationLogo} style={{ backgroundColor: "#e74c3c" }}>
                      <span>WD</span>
                    </div>
                    <div className={styles.educationInfo}>
                      <h3>웹 개발 부트캠프</h3>
                      <p className={styles.educationSchool}>더미 데이터</p>
                      <p className={styles.educationPeriod}>2020</p>
                    </div>
                  </div>
                  <div className={styles.educationDetails}>
                    <p>
                      현대적인 웹 개발 기술과 프레임워크를 집중적으로 학습했습니다. 실제 프로젝트를 통해 실무 경험을
                      쌓았습니다.
                    </p>
                    <div className={styles.educationHighlights}>
                      <h4>배운 기술</h4>
                      <ul>
                        <li>HTML5, CSS3, JavaScript (ES6+)</li>
                        <li>React 및 상태 관리</li>
                        <li>Node.js 및 Express</li>
                        <li>MongoDB 및 Mongoose</li>
                        <li>RESTful API 설계</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact" data-animate>
        <div className={`${styles.contactContainer} ${isVisible["contact"] ? styles.visible : ""}`}>
          <h2 className={styles.contactTitle}>연락처</h2>
          <p className={styles.contactSubtitle}>새로운 프로젝트나 협업 기회가 있으시다면 언제든지 연락주세요.</p>

          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3>이메일</h3>
              <p>
                <a href="mailto:toran16784@gmail.com">toran16784@gmail.com</a>
              </p>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              <h3>GitHub</h3>
              <p>
                <a href="https://github.com/toran1678" target="_blank" rel="noopener noreferrer">
                  github.com/toran1678
                </a>
              </p>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <h3>LinkedIn</h3>
              <p>
                <a href="https://www.linkedin.com/in/toran16784/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/toran16784
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
