---
title: "JSP 기반 맛집 추천 커뮤니티 플랫폼 (맛스팟)"
date: "2025-01-01"
tags: [Java, JSP, Servlet, MySQL, Kakao API]
excerpt: "JSP/Servlet을 기반으로 개발된 맛집 추천 커뮤니티 웹 애플리케이션입니다. 카카오 지도 API 연동, 이메일 인증, 관리자 시스템 등 다양한 기능을 제공하는 종합적인 웹 플랫폼입니다."
coverImage: "/my-blog/images/project_img/jsp-matjip/matjip_map.png"
repoUrl: "https://github.com/toran1678/jsp-matjip-community"
---

# JSP 기반 맛집 추천 커뮤니티 플랫폼 (맛스팟)

> **개발 기간**: 2025-05 ~ 2025-06  
> **개발 언어**: Java 21, JSP, JavaScript  
> **주요 기술**: JSP/Servlet, MySQL, Kakao Map API, SMTP  
> **프로젝트 유형**: 개인 프로젝트 (웹&앱 프로그래밍 과제)

## 프로젝트 개요

JSP/Servlet을 기반으로 개발된 맛집 추천 커뮤니티 웹 애플리케이션입니다. 사용자가 직접 맛집 정보를 공유하고, 카카오 지도 API를 활용한 위치 기반 검색, 이메일 인증 시스템, 관리자 대시보드 등 다양한 기능을 제공하는 종합적인 웹 플랫폼으로 구현했습니다.

### 핵심 기능

- **맛집 정보 공유**: 사용자가 직접 맛집 후기와 추천 정보 작성
- **지도 기반 검색**: 카카오 지도 API를 활용한 맛집 위치 표시 및 검색
- **지도 클러스터링**: 사용자들이 작성한 맛집 게시글의 위치를 지도에 표시하고, 가까운 위치의 맛집들을 클러스터로 그룹화하여 효율적인 탐색 제공
- **커뮤니티 기능**: 좋아요, 댓글을 통한 사용자 간 소통
- **이메일 인증**: SMTP를 통한 회원가입 이메일 인증 시스템
- **고급 검색**: 음식 종류, 지역별 필터링 검색 기능
- **관리자 시스템**: 게시물, 사용자, 통계 관리 기능
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 사용자 경험
- **이미지 업로드**: 맛집 사진 첨부 기능

## 기술 스택

### Backend
- **Java 21** - 메인 개발 언어
- **JSP/Servlet** - 웹 애플리케이션 프레임워크
- **MySQL 8.0** - 사용자 정보, 게시물, 댓글 데이터 저장
- **Jakarta Mail API** - SMTP를 통한 이메일 발송
- **JSTL** - JSP Standard Tag Library

### Frontend
- **HTML5, CSS3, JavaScript** - 클라이언트 사이드 구현
- **Chart.js** - 통계 차트 시각화
- **Font Awesome** - 아이콘 라이브러리
- **반응형 웹 디자인** - 모바일 최적화

### External APIs
- **카카오 지도 API** - 지도 서비스 및 장소 검색
- **Gmail SMTP** - 이메일 발송 서비스

### Development Tools
- **Eclipse IDE** - 개발 환경
- **Apache Tomcat 10.1** - 웹 서버
- **MySQL Workbench** - 데이터베이스 관리

## 시스템 아키텍처

### MVC 패턴 구조
```
┌─────────────────┐    HTTP Request    ┌─────────────────┐
│   Web Browser   │ ←────────────────→ │   JSP Pages     │
│                 │                    │   (View)        │
└─────────────────┘                    └─────────────────┘
                                               │
                                               ▼
┌─────────────────┐    Business Logic  ┌─────────────────┐
│   MySQL DB      │ ←────────────────→ │   Servlets      │
│                 │                    │   (Controller)  │
│ • User Data     │                    └─────────────────┘
│ • Post Data     │                             │
│ • Comment Data  │                             ▼
└─────────────────┘                    ┌─────────────────┐
                                       │   DAO Classes   │
                                       │   (Model)       │
                                       └─────────────────┘
```

### 보안 아키텍처
- **환경 변수 분리**: 모든 민감한 정보를 *config.properties*로 분리
- **세션 기반 인증**: 사용자 로그인 상태 관리
- **CSRF 토큰**: 관리자 페이지 보안 강화
- **SQL Injection 방지**: PreparedStatement 사용

## 주요 구현 기능

### 1. 사용자 인증 시스템
- **회원가입**: 이메일 중복 확인, 비밀번호 보안도 검사
- **이메일 인증**: Gmail SMTP를 통한 6자리 인증코드 발송
- **로그인/로그아웃**: 세션 기반 사용자 상태 관리
- **프로필 관리**: 사용자 정보 수정, 계정 삭제

```java
// 이메일 인증 코드 발송
public class SendEmailServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        // 설정 파일에서 이메일 정보 읽기
        final String fromEmail = ConfigUtil.getEmailAddress();
        final String password = ConfigUtil.getEmailPassword();
        
        // 6자리 랜덤 인증코드 생성
        String code = String.format("%06d", new Random().nextInt(999999));
        
        // Gmail SMTP를 통한 이메일 발송
        // ... (이메일 발송 로직)
    }
}
```

### 2. 맛집 게시물 시스템
- **게시물 작성**: 카카오 지도 API를 활용한 장소 선택
- **이미지 업로드**: 맛집 사진 첨부 및 미리보기
- **게시물 수정/삭제**: 작성자만 수정/삭제 가능
- **좋아요 시스템**: 게시물에 대한 좋아요 기능

![게시물 화면](/my-blog/images/project_img/jsp-matjip/matjip_post.png)

*게시물 작성 화면 - 카카오 지도 API를 활용한 장소 선택, 음식 종류 선택, 이미지 업로드 기능*

### 3. 지도 기반 검색 시스템
- **카카오 지도 API**: 동적 API 키 로딩으로 보안 강화
- **장소 검색**: 키워드 기반 맛집 검색
- **위치 표시**: 선택한 맛집 위치를 지도에 마커로 표시
- **지도 클러스터링**: 가까운 위치의 맛집들을 클러스터로 그룹화하여 효율적인 탐색 제공
- **지도 필터링**: 음식 종류, 지역별 필터링

![지도 검색 화면](/my-blog/images/project_img/jsp-matjip/matjip_map.png)
*지도 검색 화면 - 카카오 지도 API를 활용한 위치 기반 검색 및 클러스터링 기능*

```javascript
// 카카오 지도 API 동적 로딩
fetch('${pageContext.request.contextPath}/apiKey')
    .then(response => response.json())
    .then(data => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${data.kakaoApiKey}&libraries=services`;
        script.onload = function() {
            initializeMap();
        };
        document.head.appendChild(script);
    });
```

### 4. 커뮤니티 기능
- **댓글 시스템**: 게시물에 대한 댓글 작성/수정/삭제
- **검색 기능**: 제목, 내용, 작성자별 검색
- **정렬 기능**: 최신순, 인기순 정렬
- **페이지네이션**: 게시물 목록 페이징 처리

![게시판 화면](/my-blog/images/project_img/jsp-matjip/matjip_posts.png)
*게시판 화면 - 맛집 목록, 검색 기능, 필터링, 페이지네이션을 통합한 사용자 인터페이스*

### 5. 관리자 시스템
- **대시보드**: Chart.js를 활용한 전체 통계 및 현황 시각화
- **사용자 관리**: 사용자 목록, 검색, 삭제 기능
- **게시물 관리**: 게시물 목록, 검색, 삭제 기능
- **통계 분석**: Chart.js를 활용한 상세 데이터 시각화 및 분석

![관리자 대시보드](/my-blog/images/project_img/jsp-matjip/matjip_admin.png)
*관리자 대시보드 - Chart.js를 활용한 사용자 통계, 게시물 현황, 데이터 시각화*

#### Chart.js를 활용한 데이터 시각화
- **막대 차트**: 월별 게시물 작성 수, 사용자 가입 현황
- **도넛 차트**: 음식 종류별 게시물 분포
- **라인 차트**: 시간대별 활동량 추이
- **실시간 업데이트**: 데이터 변경 시 차트 자동 갱신

## 데이터베이스 설계

### 주요 테이블
```sql
-- 사용자 정보
users (user_id, username, email, user_pw, created_at, post_count)

-- 게시물 정보
posts (post_id, user_id, title, content, store_name, location, 
       food_type, x, y, image_path, created_at, like_count, comment_count)

-- 댓글 정보
comments (comment_id, post_id, user_id, content, created_at)

-- 좋아요 정보
likes (like_id, post_id, user_id, created_at)
```

### 데이터베이스 관계
- **1:N 관계**: users → posts (한 사용자가 여러 게시물 작성)
- **1:N 관계**: posts → comments (한 게시물에 여러 댓글)
- **M:N 관계**: users ↔ posts (좋아요 기능)

## 핵심 기술 구현

### 환경 변수 분리 (보안 강화)
```java
// ConfigUtil.java - 설정 파일 관리
public class ConfigUtil {
    private static Properties properties;
    
    static {
        loadProperties();
    }
    
    private static void loadProperties() {
        properties = new Properties();
        try {
            InputStream inputStream = ConfigUtil.class.getClassLoader()
                .getResourceAsStream("config.properties");
            if (inputStream != null) {
                properties.load(inputStream);
                inputStream.close();
            }
        } catch (IOException e) {
            System.err.println("설정 파일 로드 중 오류 발생: " + e.getMessage());
        }
    }
    
    // 데이터베이스 설정
    public static String getDbHost() {
        return getProperty("db.host", "localhost");
    }
    
    // 이메일 설정
    public static String getEmailAddress() {
        return getProperty("email.address", "");
    }
    
    // 카카오 API 키
    public static String getKakaoMapApiKey() {
        return getProperty("kakao.map.api.key", "");
    }
}
```

### 동적 API 키 로딩
```java
// ApiKeyServlet.java - API 키 제공
@WebServlet("/apiKey")
public class ApiKeyServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String kakaoApiKey = ConfigUtil.getKakaoMapApiKey();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"kakaoApiKey\":\"" + kakaoApiKey + "\"}");
    }
}
```

### 데이터베이스 연결 관리
```java
// DBConnection.java - 데이터베이스 연결
public class DBConnection {
    public static Connection getConnection() throws Exception {
        String host = ConfigUtil.getDbHost();
        String port = ConfigUtil.getDbPort();
        String dbName = ConfigUtil.getDbName();
        String username = ConfigUtil.getDbUsername();
        String password = ConfigUtil.getDbPassword();
        
        String url = "jdbc:mysql://" + host + ":" + port + "/" + dbName;
        
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(url, username, password);
    }
}
```

### 게시물 검색 및 필터링
```java
// PostDAO.java - 게시물 검색
public List<Post> getPosts(int page, int postsPerPage, String keyword, String foodType) {
    StringBuilder sql = new StringBuilder("SELECT * FROM posts WHERE 1=1");
    List<Object> params = new ArrayList<>();
    
    if (keyword != null && !keyword.trim().isEmpty()) {
        sql.append(" AND (title LIKE ? OR content LIKE ? OR store_name LIKE ?)");
        String searchKeyword = "%" + keyword + "%";
        params.add(searchKeyword);
        params.add(searchKeyword);
        params.add(searchKeyword);
    }
    
    if (foodType != null && !foodType.trim().isEmpty()) {
        sql.append(" AND food_type = ?");
        params.add(foodType);
    }
    
    sql.append(" ORDER BY created_at DESC LIMIT ? OFFSET ?");
    params.add(postsPerPage);
    params.add((page - 1) * postsPerPage);
    
    // PreparedStatement로 SQL 인젝션 방지
    // ... (쿼리 실행 로직)
}
```

## UI/UX 특징

### 반응형 디자인
- **모바일 최적화**: 작은 화면에서도 사용하기 편한 인터페이스
- **그리드 시스템**: CSS Grid와 Flexbox를 활용한 레이아웃
- **터치 친화적**: 모바일에서 터치하기 쉬운 버튼 크기

### 사용자 경험 개선
- **실시간 피드백**: 모든 사용자 액션에 대한 즉각적인 반응
- **직관적인 네비게이션**: 사용자가 쉽게 이해할 수 있는 메뉴 구조
- **시각적 피드백**: 로딩 상태, 성공/실패 메시지 표시

### 접근성 고려
- **키보드 네비게이션**: 키보드만으로도 모든 기능 사용 가능
- **시맨틱 HTML**: 의미있는 HTML 태그 사용
- **색상 대비**: 가독성을 고려한 색상 선택

## 프로젝트 성과

### 기술적 성장
- **웹 개발**: JSP/Servlet을 활용한 풀스택 웹 애플리케이션 개발
- **API 연동**: 카카오 지도 API를 활용한 지도 서비스 구현
- **보안 강화**: 환경 변수 분리를 통한 민감 정보 보호
- **데이터베이스 설계**: 정규화를 통한 효율적인 데이터 구조 설계
- **이메일 통신**: SMTP를 활용한 자동 이메일 발송 시스템

### 문제 해결 능력
- **보안 이슈**: 하드코딩된 API 키를 환경 변수로 분리하여 보안 강화
- **성능 최적화**: 페이지네이션을 통한 대용량 데이터 처리
- **사용자 경험**: 반응형 디자인을 통한 다양한 디바이스 지원

### 사용자 중심 설계
- **직관적인 UI**: 사용자가 쉽게 이해할 수 있는 인터페이스
- **실시간 피드백**: 모든 액션에 대한 즉각적인 반응
- **다양한 기능**: 검색, 필터링, 정렬 등 사용자 편의 기능

## 학습 포인트

### 웹 개발 기초
- JSP/Servlet을 활용한 웹 애플리케이션 개발
- MVC 패턴을 통한 코드 구조화
- 세션과 쿠키를 활용한 사용자 상태 관리

### 데이터베이스 설계
- 정규화를 통한 효율적인 데이터 구조 설계
- PreparedStatement를 활용한 SQL 인젝션 방지
- 트랜잭션 처리를 통한 데이터 무결성 확보

### API 연동
- 카카오 지도 API를 활용한 지도 서비스 구현
- Gmail SMTP를 활용한 이메일 발송 시스템
- 환경 변수를 통한 API 키 보안 관리

### 보안 강화
- 환경 변수 분리를 통한 민감 정보 보호
- CSRF 토큰을 통한 관리자 페이지 보안
- SQL 인젝션 방지를 위한 PreparedStatement 사용

## 프로젝트 회고

이번 프로젝트를 통해 **웹 개발의 전반적인 흐름**과 **보안의 중요성**에 대해 깊이 이해할 수 있었습니다. 특히 JSP/Servlet을 활용한 풀스택 개발 경험을 통해 클라이언트와 서버 간의 상호작용에 대해 많은 것을 배웠습니다.

**가장 도전적이었던 부분**은 카카오 지도 API를 동적으로 로딩하여 보안을 강화하는 것이었습니다. 하드코딩된 API 키를 환경 변수로 분리하고, JavaScript에서 동적으로 API를 로딩하는 과정에서 많은 시행착오를 겪었지만, 결국 안전하고 효율적인 구조를 구현할 수 있었습니다.

**가장 만족스러운 부분**은 사용자들이 직관적으로 사용할 수 있는 인터페이스를 구현한 것입니다. 반응형 디자인을 통해 다양한 디바이스에서 최적화된 경험을 제공하고, 실시간 피드백을 통해 사용자와의 상호작용을 개선할 수 있었습니다.

앞으로도 지속적인 학습을 통해 더욱 현대적이고 안전한 웹 애플리케이션을 개발하고, 사용자 중심의 서비스를 구현하는 개발자가 되고 싶습니다.

## 관련 링크

- [GitHub 저장소](https://github.com/toran1678/jsp-matjip-community)
- [카카오 개발자 센터](https://developers.kakao.com/)
- [Gmail SMTP 설정 가이드](https://support.google.com/accounts/answer/185833)
- [MySQL 공식 문서](https://dev.mysql.com/doc/)

---

*이 프로젝트는 교육 목적으로 제작되었으며, 실제 서비스에 사용할 때는 추가적인 보안 검토와 성능 최적화가 필요합니다.*
