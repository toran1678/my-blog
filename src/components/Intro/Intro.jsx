import { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import styles from "./Intro.module.css"

const CATEGORY_ICONS = {
  Frontend: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 20h10" />
      <path d="M12 18v2" />
    </svg>
  ),
  Backend: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6v6c0 0 0 3 7 3s7-3 7-3V6" />
      <path d="M11 3c7 0 7 3 7 3s0 3-7 3S4 9 4 9 4 6 11 3z" />
      <path d="M11 21c-7 0-7-3-7-3v-6" />
    </svg>
  ),
  DevOps: (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="currentColor">
      <path d="M46,24A12,12,0,0,0,34,12c-5.2,0-9.5,4.1-11.9,11.4C20.3,28.9,17.3,32,14,32a8,8,0,0,1,0-16h1.2l-1.6,1.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l4.9-5a1.9,1.9,0,0,0,0-2.8l-4.9-5a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L15.2,12H14a12,12,0,0,0,0,24c5.2,0,9.5-4.1,11.9-11.4C27.7,19.1,30.7,16,34,16a8,8,0,0,1,0,16H32.8l1.6-1.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-4.9,5a1.9,1.9,0,0,0,0,2.8l4.9,5a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L32.8,36H34A12,12,0,0,0,46,24Z" />
    </svg>
  ),
  Tools: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  ),
}

const CATEGORY_COLORS = {
  Frontend: "#4A90E2",
  Backend: "#27ae60",
  DevOps: "#f39c12",
  Tools: "#34495e",
}

const skills = {
  Frontend: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  ],
  Backend: [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ],
  DevOps: [
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  ],
  Tools: [
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
    { name: "Webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
  ],
}

const projects = [
  {
    title: "딥러닝 가상 피팅 서비스 & 웹 커뮤니티 플랫폼",
    subtitle: "캡스톤 디자인",
    date: "2025.03 – 2025.06",
    tags: ["React", "FastAPI", "Python", "Deep Learning"],
    description:
      "딥러닝 모델을 활용한 가상 의류 피팅 서비스와 웹 커뮤니티를 결합한 풀스택 웹 애플리케이션. 사용자가 온라인으로 의류를 가상으로 착용해보고 커뮤니티에서 소통할 수 있는 통합 플랫폼.",
  },
  {
    title: "맛집 추천 커뮤니티 (맛스팟 MatSpot)",
    subtitle: "풀스택 웹 서비스",
    date: "2025.07 – 2025.12",
    tags: ["React", "Node.js", "MySQL", "Kakao Map API"],
    description:
      "사용자들이 쉽고 재미있게 주변 맛집 정보를 공유하고 추천을 받아 새로운 맛집을 발견할 수 있는 커뮤니티 기반 웹 서비스. Kakao 지도를 통해 직관적으로 맛집 위치 확인 가능.",
  },
  {
    title: "뉴스 감성 분석 & 요약 및 주가 예측 서비스",
    subtitle: "AI & Data Engineering",
    date: "2024.03 – 2024.06",
    tags: ["Python", "LSTM", "OpenAI API", "NewsAPI"],
    description:
      "OpenAI를 활용한 뉴스 자동 요약·검색 기능을 제공하는 파이썬 프로그램. LSTM 모델로 주가 예측, 카카오 API를 통해 예측 결과를 카카오톡으로 전송.",
  },
  {
    title: "자바 소켓 오목 게임",
    subtitle: "Java Swing & Socket Programming",
    date: "2024.03 – 2024.06",
    tags: ["Java", "Socket", "Swing", "MySQL"],
    description:
      "Java Socket Programming을 활용한 멀티플레이어 오목 게임. 실시간 통신과 게임 로직 구현, synchronized를 활용한 동시성 제어 및 자체 통신 프로토콜 정의.",
  },
  {
    title: "OpenCV 이미지 처리 포토샵 프로그램",
    subtitle: "이미지 처리",
    date: "2024.03 – 2024.06",
    tags: ["Python", "OpenCV"],
    description:
      "Python과 OpenCV 라이브러리를 활용하여 이미지 필터링, 색상 조정, 객체 인식 기능을 포함한 포토샵 프로그램 개발.",
  },
  {
    title: "Blender 3D 기초 캐릭터 모델링",
    subtitle: "3D Modeling",
    date: "2024.09 – 2024.12",
    tags: ["Blender", "3D Modeling"],
    description: "Blender를 활용한 3D 기초 캐릭터 모델링 프로젝트.",
  },
]

const CapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
  </svg>
)

const BuildingIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
    <path d="M18 5v17" />
    <path d="m4 6 8-4 8 4" />
    <path d="M6 5v17" />
    <circle cx="12" cy="9" r="2" />
  </svg>
)

const educations = [
  {
    school: "안양대학교",
    degree: "소프트웨어학과 학사",
    period: "2020 – 2025",
    Icon: CapIcon,
    color: "#3498db",
  },
  {
    school: "인천정보산업고등학교",
    degree: "전산과",
    period: "2017 – 2019",
    Icon: BuildingIcon,
    color: "#27ae60",
  },
  {
    school: "안양대학교 지식재산융합과정",
    degree: "지식재산융합 소단위 전공 이수 및 실무 역량 강화",
    period: "2024 – 2025.12",
    details: [
      "출원번호: 10-2025-0189295",
    ],
    Icon: CapIcon,
    color: "#8e44ad",
  },
]

const CertBadgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const CarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h10l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="16.5" cy="17.5" r="2.5" />
  </svg>
)

const certifications = [
  { name: "정보처리기사", issuer: "한국산업인력공단", date: "2025.09", Icon: CertBadgeIcon },
  { name: "1종 보통 운전면허 (오토)", issuer: "경찰청(운전면허시험관리단)", date: "2025.02", Icon: CarIcon },
  { name: "컴퓨터활용능력 2급", issuer: "대한상공회의소", date: "2018.10", Icon: CertBadgeIcon },
]

function SectionTitle({ children }) {
  return (
    <div className={styles.sectionTitleWrap}>
      <h2 className={styles.sectionTitle}>{children}</h2>
      <div className={styles.sectionTitleLine} />
    </div>
  )
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function Intro() {
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      { threshold: 0.08 }
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el)
  }

  return (
    <div className={styles.introContainer}>
      {/* ── Hero ── */}
      <section className={styles.hero} ref={addRef}>
        <div className={styles.heroImageWrap}>
          <img
            src="/my-blog/images/profile.png"
            alt="프로필 이미지"
            className={styles.heroImage}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://via.placeholder.com/400x400?text=Profile"
            }}
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>FULL STACK DEVELOPER</p>
          <h1 className={styles.heroHeadline}>
            멈추지 않는 것이<br />
            <span className={styles.heroAccent}>가장 빠른 길이다.</span>
          </h1>
          <p className={styles.heroDesc}>
            완벽한 지도를 가지고 출발하기보다, 일단 시작하고 문제를 마주하며 길을 찾아가는 개발자입니다.
            끊임없이 시도하고 수정하는 <strong>실행</strong>이 결국 가장 빠른 해결책임을 경험으로 배웠습니다.
          </p>
          <div className={styles.heroLinks}>
            <a
              href="https://github.com/toran1678"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.heroBtn} ${styles.heroBtnGithub}`}
              data-hero-btn="github"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              toran1678
            </a>
            <a href="mailto:toran16784@gmail.com" className={`${styles.heroBtn} ${styles.heroBtnEmail}`} data-hero-btn="email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/toran16784/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.heroBtn} ${styles.heroBtnLinkedin}`}
              data-hero-btn="linkedin"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>



      {/* ── Skills ── */}
      <section className={styles.section} ref={addRef}>
        <SectionTitle>Skills</SectionTitle>
        <div className={styles.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillCard}>
              <div className={styles.skillCategoryHeader}>
                <span className={styles.skillCategoryIcon} style={{ color: CATEGORY_COLORS[category] }}>
                  {CATEGORY_ICONS[category]}
                </span>
                <h3 className={styles.skillCategory}>{category}</h3>
              </div>
              <div className={styles.skillList}>
                {items.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <img src={skill.icon} alt={skill.name} className={styles.skillIcon} />
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className={styles.section} ref={addRef}>
        <SectionTitle>Projects</SectionTitle>
        <div className={styles.projectsGrid}>
          {projects.map((p) => (
            <div key={p.title} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectSubtitle}>{p.subtitle}</p>
                </div>
                <span className={styles.projectDate}>{p.date}</span>
              </div>
              <p className={styles.projectDesc}>{p.description}</p>
              <div className={styles.projectTags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.projectTag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className={styles.section} ref={addRef}>
        <SectionTitle>Education</SectionTitle>
        <div className={styles.eduList}>
          {educations.map((e) => (
            <div key={e.school} className={styles.eduCard}>
              <div className={styles.eduBadge} style={{ background: e.color }}>
                <e.Icon />
              </div>
              <div className={styles.eduInfo}>
                <h3 className={styles.eduSchool}>{e.school}</h3>
                <p className={styles.eduDegree}>{e.degree}</p>
                <p className={styles.eduPeriod}>{e.period}</p>
                {e.details && (
                  <ul className={styles.eduDetails}>
                    {e.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certification ── */}
      <section className={styles.section} ref={addRef}>
        <SectionTitle>Certification</SectionTitle>
        <div className={styles.certList}>
          {certifications.map((c) => (
            <div key={c.name} className={styles.certCard}>
              <div className={styles.certLeft}>
                <div className={styles.certIcon}>
                  <c.Icon />
                </div>
                <div>
                  <h3 className={styles.certName}>{c.name}</h3>
                  <p className={styles.certIssuer}>{c.issuer}</p>
                </div>
              </div>
              <span className={styles.certDate}>{c.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
