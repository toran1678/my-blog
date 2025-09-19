---
title: "자바 소켓 통신 기반 멀티플레이어 오목 게임"
date: "2024-12-01"
tags: [Game, Java, Socket, MySQL]
excerpt: "Java Socket 통신을 기반으로 개발된 실시간 멀티플레이어 오목 게임입니다. 다중 사용자 환경에서 실시간 채팅, 1대1 채팅, 파일 전송, 사용자 관리 등 다양한 기능을 제공하는 종합적인 게임 플랫폼입니다."
coverImage: "/my-blog/images/project_img/java-omok/game_screen.png"
repoUrl: "https://github.com/toran1678/Java-Socket-Omok"
---

# 자바 소켓 통신 기반 멀티플레이어 오목 게임

> **개발 기간**: 2024-09 ~ 2024-11  
> **개발 언어**: Java 8+  
> **주요 기술**: Socket Programming, MySQL, Swing GUI  
> **프로젝트 유형**: 개인 프로젝트 (대학교 자바프로그래밍II 과제)

## 프로젝트 개요

Java Socket 통신을 기반으로 개발된 실시간 멀티플레이어 오목 게임입니다. 다중 사용자 환경에서 실시간 채팅, 1대1 채팅, 파일 전송, 사용자 관리 등 다양한 기능을 제공하는 종합적인 게임 플랫폼으로 구현했습니다.

### 핵심 기능

- **실시간 멀티플레이어 오목 게임** (15x15 오목판)
- **다양한 채팅 시스템** (로비 채팅, 1대1 채팅, 귓속말, 이모티콘)
- **파일 전송 및 다운로드** 기능
- **사용자 프로필 관리** (프로필 사진, 캐릭터 선택)
- **관리자 도구** (사용자 관리, 채팅 모니터링)
- **날씨 API 연동** (기상청 공공데이터포털)
- **랭킹 시스템** 및 **게임 전적 관리**

## 기술 스택

### Backend
- **Java 8+** - 메인 개발 언어
- **Socket Programming** - 실시간 클라이언트-서버 통신
- **MySQL 8.0** - 사용자 정보, 채팅 로그, 게임 데이터 저장
- **Java Serialization** - 객체 직렬화를 통한 데이터 전송
- **JavaMail API** - SMTP를 통한 이메일 전송 (비밀번호 찾기)

### Frontend
- **Java Swing** - GUI 구현
- **Custom UI Components** - 말풍선 채팅, 이모티콘, 팔레트 기능

### External APIs
- **기상청 공공데이터포털** - 실시간 날씨 정보
- **우편번호 API** - 주소 검색 기능

### Development Tools
- **Eclipse IDE** - 개발 환경
- **MySQL Workbench** - 데이터베이스 관리

## 시스템 아키텍처

### 클라이언트-서버 구조
```
┌─────────────────┐    Socket 통신    ┌─────────────────┐
│   Client App    │ ←──────────────→ │   Server App    │
│                 │                  │                 │
│ • GUI (Swing)   │                  │ • Socket Server │
│ • Game Logic    │                  │ • Room Manager  │
│ • Chat System   │                  │ • DB Connection │
└─────────────────┘                  └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │   MySQL DB      │
                                    │                 │
                                    │ • User Data     │
                                    │ • Chat Logs     │
                                    │ • Game Records  │
                                    └─────────────────┘
```

### 데이터 전송 구조
- **MessageDTO**: 클라이언트-서버 간 통신을 위한 통합 데이터 객체
- **MessageType**: 메시지 타입을 정의한 열거형 (CHAT, OmokPlaceStone, FileTransfer 등)
- **Object Serialization**: 복잡한 데이터 구조의 안전한 전송

## 주요 구현 기능

### 1. 실시간 오목 게임
- **15x15 오목판** 구현
- **4방향 승리 조건 검사** (수평, 수직, 대각선)
- **관전자 모드** 지원

![게임 화면](/my-blog/images/project_img/java-omok/game_screen.png)
*오목 게임 메인 화면 - 15x15 오목판, 플레이어 목록, 채팅창, 게임 제어 버튼이 통합된 게임 인터페이스*

### 2. 채팅 시스템
- **로비 채팅**: 전체 사용자 대상 실시간 채팅
- **1대1 채팅**: 개인 메시지, 파일 전송, 이모티콘
- **귓속말**: 특정 사용자에게 비공개 메시지
- **채팅 기록 저장**: 데이터베이스에 모든 채팅 로그 저장

### 3. 사용자 관리
- **회원가입/로그인**: 아이디 중복 확인, 비밀번호 보안도 검사
- **프로필 관리**: 프로필 사진 업로드, 리사이즈, 캐릭터 선택
- **아이디/비밀번호 찾기**: 이메일을 통한 임시 비밀번호 발송 (JavaMail API 활용)

![클라이언트 플로우차트](/my-blog/images/project_img/java-omok/client_flowchart.png)
*클라이언트 애플리케이션의 전체 실행 흐름도 - 로그인부터 게임까지의 사용자 경험을 시각화*

### 4. 관리자 도구
- **실시간 사용자 모니터링**
- **사용자 강퇴 및 관리**
- **채팅 로그 검색 및 분석**
- **회원 추가/수정/삭제/복원**

![관리자 도구 플로우차트](/my-blog/images/project_img/java-omok/admin_tool_flowchart.png)
*관리자 도구의 기능별 처리 흐름도 - 사용자 관리, 채팅 모니터링, 시스템 관리 기능을 체계적으로 정리*

![관리자 도구 화면](/my-blog/images/project_img/java-omok/admin_tool_screen.png)
*관리자 도구 메인 화면 - 실시간 사용자 모니터링, 채팅 로그 확인, 사용자 관리 기능을 통합 제공*

### 5. 부가 기능
- **날씨 API**: 기상청 데이터를 활용한 실시간 날씨 정보
- **우편번호 검색**: 주소 입력 시 자동 우편번호 검색
- **배경음악**: 로비에서 배경음악 재생/정지
- **다크모드**: UI 테마 변경 기능

![로비 화면](/my-blog/images/project_img/java-omok/lobby_screen.png)
*메인 로비 화면 - 사용자 목록, 채팅, 오목 랭킹, 날씨 정보, 프로필 관리 등 모든 기능을 통합한 메인 인터페이스*

## 데이터베이스 설계

### 주요 테이블
```sql
-- 사용자 정보
users (id, nickname, password, profile_picture, win, lose, ...)

-- 채팅 로그
chat_logs (id, nickname, room_name, message, timestamp)

-- 오목 게임 기록
omok_moves (id, room_name, player, x, y, stone_color, move_time)

-- 삭제된 사용자 (휴지통)
usersTrash (id, nickname, password, ...)
```

## 핵심 기술 구현

### Socket 통신
```java
// 서버 측 - 클라이언트 연결 관리
public class ServerApplication extends Thread {
    private Vector<ReceiveThread> clientThreadList = new Vector<>();
    
    public void run() {
        while (serverSocket != null && !serverSocket.isClosed()) {
            socket = serverSocket.accept();
            ReceiveThread receiveThread = new ReceiveThread(socket);
            clientThreadList.add(receiveThread);
            receiveThread.start();
        }
    }
}
```

### 오목 승리 조건 검사
```java
private boolean OmokCheckWinner(int[][] board, int x, int y, int player) {
    int[][] directions = {{1,0}, {0,1}, {1,1}, {1,-1}};
    
    for (int[] dir : directions) {
        int count = countStones(board, x, y, dir[0], dir[1], player)
                  + countStones(board, x, y, -dir[0], -dir[1], player) - 1;
        if (count >= 5) return true;
    }
    return false;
}
```

### 비밀번호 보안도 검사
```java
public int calculatePasswordStrength(String password) {
    int score = 0;
    if (password.length() >= 8) score += 20;
    if (password.matches(".*[0-9].*")) score += 20;
    if (password.matches(".*[a-z].*")) score += 20;
    if (password.matches(".*[A-Z].*")) score += 20;
    if (password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) score += 20;
    return score;
}
```

### SMTP 이메일 전송 (비밀번호 찾기)
```java
// JavaMail API를 활용한 이메일 전송 (환경 변수 사용)
public static void sendEmail(String recipientEmail, String subject, String body) {
    if (SENDER_EMAIL.isEmpty() || SENDER_PASSWORD.isEmpty()) {
        System.err.println("이메일 설정이 올바르지 않습니다. config.properties 파일을 확인해주세요.");
        return;
    }

    Properties properties = new Properties();
    properties.put("mail.smtp.auth", "true");
    properties.put("mail.smtp.starttls.enable", "true");
    properties.put("mail.smtp.host", SMTP_HOST);
    properties.put("mail.smtp.port", SMTP_PORT);
    properties.put("mail.smtp.ssl.protocols", "TLSv1.2");

    Session session = Session.getInstance(properties, new Authenticator() {
        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(SENDER_EMAIL, SENDER_PASSWORD);
        }
    });
    
    try {
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(SENDER_EMAIL));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
        message.setSubject(subject);
        message.setText(body);
        
        Transport.send(message);
        System.out.println("Email sent successfully!");
    } catch (MessagingException e) {
        e.printStackTrace();
    }
}
```

### 우편번호 API 연동
```java
// 우편번호 검색 API 호출 (환경 변수 사용)
private List<String> fetchAddressData(String query) {
    List<String> results = new ArrayList<>();
    try {
        String encodedQuery = URLEncoder.encode(query, "UTF-8");
        String apiUrl = PUBLIC_DATA_API_URL + "?serviceKey=" + PUBLIC_DATA_API_KEY + 
                       "&srchwrd=" + encodedQuery + "&countPerPage=50&currentPage=1";

        HttpURLConnection conn = (HttpURLConnection) new URL(apiUrl).openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/xml");
        
        // XML 응답 처리 및 우편번호 추출
        // ... (XML 파싱 로직)
    } catch (Exception e) {
        System.err.println("주소 검색 중 오류가 발생했습니다.");
    }
    return results;
}
```

## UI/UX 특징

### 커스텀 컴포넌트
- **말풍선 채팅**: 1대1 채팅에서 말풍선 형태의 메시지 표시
- **이모티콘 시스템**: 다양한 이모티콘을 통한 감정 표현
- **팔레트 기능**: 채팅창 색상 커스터마이징
- **프로그레스 바**: 비밀번호 보안도 시각적 표시

### 반응형 디자인
- **다크모드**: 사용자 선호에 따른 테마 변경
- **실시간 업데이트**: 사용자 목록, 채팅, 게임 상태 실시간 동기화

## 프로젝트 성과

### 기술적 성장
- **네트워크 프로그래밍**: Socket 통신을 통한 실시간 멀티플레이어 환경 구현
- **멀티스레딩**: 동시 다중 클라이언트 처리 및 스레드 안전성 확보
- **데이터베이스 연동**: MySQL을 활용한 사용자 데이터 및 게임 기록 관리
- **API 연동**: 기상청 공공데이터포털 API를 활용한 실시간 날씨 정보 제공
- **이메일 통신**: JavaMail API와 SMTP를 활용한 자동 이메일 발송 시스템 구현

### 문제 해결 능력
- **동기화 문제**: 멀티스레드 환경에서의 데이터 일관성 확보
- **메모리 관리**: 적절한 리소스 해제를 통한 메모리 누수 방지
- **예외 처리**: 다양한 예외 상황에 대한 안정적인 처리

### 사용자 경험 개선
- **직관적인 UI**: 사용자가 쉽게 이해할 수 있는 인터페이스 설계
- **실시간 피드백**: 모든 사용자 액션에 대한 즉각적인 반응
- **다양한 커뮤니케이션**: 텍스트, 이모티콘, 파일 전송 등 다양한 소통 방법

## 향후 개선하면 좋을 부분

- **웹 기반 UI**: Spring Boot를 활용한 웹 애플리케이션으로 전환
- **REST API**: RESTful API 서버 구축
- **모바일 앱**: Android/iOS 앱 개발
- **AI 상대**: 인공지능 기반 컴퓨터 상대 기능
- **토너먼트 시스템**: 대회 및 리그 기능 추가
- **실시간 알림**: 푸시 알림 시스템 구현

## 학습 포인트

### 소켓 프로그래밍
- TCP 소켓을 활용한 실시간 양방향 통신
- ObjectInputStream/ObjectOutputStream을 통한 객체 직렬화
- 멀티스레드 환경에서의 안전한 통신 처리

### 데이터베이스 설계
- 정규화를 통한 효율적인 데이터 구조 설계
- PreparedStatement를 활용한 SQL 인젝션 방지
- 트랜잭션 처리를 통한 데이터 무결성 확보

### GUI 프로그래밍
- Java Swing을 활용한 복잡한 UI 구성
- 이벤트 기반 프로그래밍 패턴
- 커스텀 컴포넌트 개발

### 이메일 통신
- JavaMail API를 활용한 SMTP 이메일 전송
- Gmail SMTP 서버 연동 및 인증 처리
- 임시 비밀번호 생성 및 이메일 발송 시스템

## 프로젝트 회고

이번 프로젝트를 통해 **네트워크 프로그래밍**과 **멀티스레딩**에 대한 깊은 이해를 얻을 수 있었습니다. 특히 실시간 통신에서 발생하는 동기화 문제와 예외 상황 처리에 대해 많은 것을 배웠습니다.

**가장 도전적이었던 부분**은 여러 클라이언트가 동시에 접속하는 환경에서 데이터 일관성을 유지하는 것이었습니다. 이를 해결하기 위해 synchronized 키워드와 Vector 컬렉션을 활용하여 스레드 안전성을 확보했습니다.

**가장 만족스러운 부분**은 사용자들이 실시간으로 소통하며 게임을 즐길 수 있는 환경을 구현한 것입니다. 단순한 게임을 넘어서 소셜 플랫폼의 역할을 할 수 있는 기능들을 추가한 것이 큰 성취였습니다.

앞으로도 지속적인 학습을 통해 더욱 완성도 높은 애플리케이션을 개발하고, 사용자 중심의 서비스를 구현하는 개발자가 되고 싶습니다.
