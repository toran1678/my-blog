"use client"

import { useState, useEffect } from "react"
import styles from "./About.module.css"

export default function About() {
  const [activeTab, setActiveTab] = useState("skills")
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
              src="/my-blog/src/assets/images/profile.png"
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
            {activeTab === "skills" && (
              <div className={styles.skillsTab}>
                <div className={styles.skillCategory}>
                  <h3>프론트엔드</h3>
                  <div className={styles.skillBars}>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>HTML5 & CSS3</span>
                        <span>90%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>JavaScript (ES6+)</span>
                        <span>85%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>React</span>
                        <span>80%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Vite</span>
                        <span>75%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Tailwind CSS</span>
                        <span>85%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h3>백엔드</h3>
                  <div className={styles.skillBars}>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Node.js</span>
                        <span>75%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Express</span>
                        <span>70%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>MongoDB</span>
                        <span>65%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Firebase</span>
                        <span>80%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div className={styles.skillProgress} style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h3>기타</h3>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Git & GitHub</span>
                    <span className={styles.skillTag}>Responsive Design</span>
                    <span className={styles.skillTag}>RESTful API</span>
                    <span className={styles.skillTag}>Figma</span>
                    <span className={styles.skillTag}>UI/UX</span>
                    <span className={styles.skillTag}>Agile/Scrum</span>
                    <span className={styles.skillTag}>Jest</span>
                    <span className={styles.skillTag}>Webpack</span>
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
                      <div className={styles.timelineDate}>2022 - 현재</div>
                      <h3 className={styles.timelineTitle}>프론트엔드 개발자</h3>
                      <div className={styles.timelineCompany}>더미 데이터</div>
                      <ul className={styles.timelineList}>
                        <li>React를 사용한 웹 애플리케이션 개발</li>
                        <li>사용자 인터페이스 개선 및 성능 최적화</li>
                        <li>팀 내 코드 리뷰 및 기술 멘토링</li>
                        <li>RESTful API 통합 및 상태 관리 구현</li>
                        <li>반응형 디자인 및 크로스 브라우저 호환성 보장</li>
                      </ul>
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
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className={styles.educationTab}>
                <div className={styles.educationCard}>
                  <div className={styles.educationHeader}>
                    <div className={styles.educationLogo}>
                      <span>KU</span>
                    </div>
                    <div className={styles.educationInfo}>
                      <h3>소프트웨어과 학사</h3>
                      <p className={styles.educationSchool}>안양대학교</p>
                      <p className={styles.educationPeriod}>2021 - 2025</p>
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
                        <li>인공지능 개론</li>
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
                      <p className={styles.educationSchool}>코딩 아카데미</p>
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
