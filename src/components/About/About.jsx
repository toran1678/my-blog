import styles from "./About.module.css"

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1>소개</h1>

      <section className={styles.aboutSection}>
        <h2>안녕하세요, 저는 선빈입니다</h2>
        <p>웹 개발에 열정을 가진 개발자입니다. 사용자 경험을 개선하고 효율적인 코드를 작성하는 것에 관심이 많습니다.</p>
      </section>

      <section className={styles.aboutSection}>
        <h2>기술 스택</h2>
        <div className={styles.skillsContainer}>
          <div className={styles.skillCategory}>
            <h3>프론트엔드</h3>
            <ul>
              <li>HTML5 & CSS3</li>
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className={styles.skillCategory}>
            <h3>백엔드</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
              <li>Firebase</li>
            </ul>
          </div>

          <div className={styles.skillCategory}>
            <h3>기타</h3>
            <ul>
              <li>Git & GitHub</li>
              <li>Responsive Design</li>
              <li>RESTful API</li>
              <li>Figma</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h2>경력</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2022 - 현재</div>
            <div className={styles.timelineContent}>
              <h3>프론트엔드 개발자</h3>
              <p>ABC 기술</p>
              <ul>
                <li>React를 사용한 웹 애플리케이션 개발</li>
                <li>사용자 인터페이스 개선 및 성능 최적화</li>
                <li>팀 내 코드 리뷰 및 기술 멘토링</li>
              </ul>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2020 - 2022</div>
            <div className={styles.timelineContent}>
              <h3>주니어 웹 개발자</h3>
              <p>XYZ 스튜디오</p>
              <ul>
                <li>반응형 웹사이트 개발</li>
                <li>기존 웹사이트 유지보수 및 기능 개선</li>
                <li>클라이언트와의 협업 및 요구사항 분석</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h2>교육</h2>
        <div className={styles.education}>
          <div className={styles.educationItem}>
            <h3>컴퓨터 공학 학사</h3>
            <p>한국대학교</p>
            <p>2016 - 2020</p>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h2>연락처</h2>
        <div className={styles.contactInfo}>
          <p>이메일: example@email.com</p>
          <p>
            GitHub:{" "}
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
              github.com/username
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/username
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
