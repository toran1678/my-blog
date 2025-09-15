---
title: "Hexagon Game"
date: "2018-01-01"
tags: [Game, Unity, C#, Mobile]
excerpt: "Unity로 개발한 모바일 회전 피하기 게임입니다. 플레이어는 중앙을 중심으로 회전하며 구멍이 있는 육각형 장애물을 피해야 합니다."
coverImage: "/my-blog/images/project_img/hexagon-game/game_screen.png"
---

# Hexagon Game

## 프로젝트 개요

Hexagon Game은 고등학생 시절 SW 개발자 대회 참가를 위해 Unity 엔진을 사용하여 개발한 모바일 회전 피하기 게임입니다. 이 게임은 Terry Cavanagh의 명작 게임 "Super Hexagon"을 모작한 것으로, 플레이어는 화면 중앙의 원을 중심으로 회전하며, 구멍이 있는 육각형 장애물을 피하는 것이 목표입니다. 카메라 회전 효과를 통해 역동적인 게임 경험을 제공하며, 대회 출품을 통해 Unity 게임 개발의 기초를 학습할 수 있었던 의미 있는 프로젝트입니다.

## 사용 기술

- **Unity** - 게임 엔진
- **C#** - 프로그래밍 언어
- **Unity 2D Physics** - 충돌 감지 및 물리 시뮬레이션
- **Unity UI System** - 사용자 인터페이스
- **PlayerPrefs** - 데이터 저장

## 주요 기능

### 1. 플레이어 회전 시스템

플레이어는 화면 중앙을 중심으로 회전하며, 터치 입력을 통해 좌우로 이동할 수 있습니다.

```csharp
void Update () {
    // 플레이어가 조금씩 돌아감
    transform.RotateAround(Vector3.zero, Vector3.forward, -1 * Time.fixedDeltaTime * -30);

    // 컴퓨터 이동
    movement = Input.GetAxisRaw("Horizontal");
}

private void FixedUpdate()
{
    // 터치 입력을 받으면 발동
    if(Input.touchCount > 0)
    {
        Touch touch = Input.GetTouch(0);
        Vector3 touchPosition = Camera.main.ScreenToWorldPoint(touch.position);
        touchPosition.z = 0f;
        
        // 화면의 가운데는 x = 0 그러므로 왼쪽
        if(touchPosition.x < 0)
        {
            //Left
            transform.RotateAround(Vector3.zero, Vector3.forward, -1 * Time.fixedDeltaTime * -moveSpeed);
        } 
        else // 오른쪽
        {
            //Right
            transform.RotateAround(Vector3.zero, Vector3.forward, 1 * Time.fixedDeltaTime * -moveSpeed);
        }
    }

    // 컴퓨터 이동
    transform.RotateAround(Vector3.zero, Vector3.forward, movement * Time.fixedDeltaTime * -moveSpeed);
}
```

### 2. 장애물 생성 시스템

육각형 장애물은 일정한 시간 간격으로 생성되며, 랜덤한 회전값과 점진적으로 줄어드는 크기를 가집니다.

```csharp
public class Spawner : MonoBehaviour
{
    public float spawnRate = 1f;           // 장애물 소환 시간
    public GameObject hexagonPrefab;       // 육각형 프리팹
    
    private float nextTimeToSpawn = 0f;

    void Update () {
        // 육각형이 조금씩 돌아감
        transform.Rotate(Vector3.forward, Time.deltaTime * 30f);

        if (Time.time >= nextTimeToSpawn)
        {
            // 육각형 프리팹 소환
            Instantiate(hexagonPrefab, Vector3.zero, Quaternion.identity);
            nextTimeToSpawn = Time.time + 1f / spawnRate;
        }
    }

    void Start () {
        Application.targetFrameRate = 60;       // 프레임 60으로 고정
        QualitySettings.vSyncCount = 1;         // 최적화
        Screen.SetResolution(1280, 720, true);  // 해상도 1280x720으로 고정
    }
}
```

### 3. 육각형 장애물 동작

각 육각형은 랜덤한 회전값으로 시작하며, 지속적으로 크기가 줄어들어 일정 크기 이하가 되면 자동으로 제거됩니다.

```csharp
public class Hexagon : MonoBehaviour
{
    public Rigidbody2D rb;
    public float shrinkSpeed = 3f;

    void Start () {
        rb.rotation = Random.Range(0f, 360f);           // 0~360도 랜덤 회전
        transform.localScale = Vector3.one * 10f;       // 초기 크기 설정
    }

    void Update () {
        // 육각형이 조금씩 돌아감
        transform.Rotate(Vector3.forward, Time.deltaTime * 30f);
        // 크기를 점진적으로 줄임
        transform.localScale -= Vector3.one * shrinkSpeed * Time.deltaTime;

        // 프리팹 제거 (크기가 너무 작아지면)
        if (transform.localScale.x <= .05f)
        {
            Destroy(gameObject);
        }
    }
}
```

### 4. 점수 및 게임 오버 시스템

충돌 감지를 통해 점수를 계산하고, 최고 점수를 저장하는 시스템을 구현했습니다.

```csharp
public class Player : MonoBehaviour
{
    public int Score = 0;          // 점수
    private int highScore = 0;      // 최고점수
    public Text scoreText;          // 점수 텍스트
    public Text highScoreText;      // 최고점수 텍스트
    public AudioSource Audio;       // 오디오 설정

    // 충돌 시
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.layer == 8) // 충돌한 레이어가 8번일 경우
        {
            Time.timeScale = 0;         // 시간을 멈추고
            Audio.Stop();               // 음악을 멈추고
            canvas.SetActive(true);     // 메뉴창을 킴
        } 
        else
        {
            Score += 1;             // 점수 추가
            if (highScore < Score)  // 최고점수가 점수보다 낮을 경우
            {
                highScore = Score;  // 최고점수는 점수
                SaveBestScore();    // 세이브 함수 사용
            }
        }
    }

    public void SaveBestScore()
    {
        // Best Score에 highscore를 저장
        PlayerPrefs.SetInt("Best Score", highScore);
    }

    public void LoadBestScore()
    {
        // Best Score에서 점수를 highscore에 넣음
        highScore = PlayerPrefs.GetInt("Best Score", 0);
    }
}
```

### 5. 씬 관리 시스템

게임 시작, 재시작, 메인 메뉴로 돌아가기 등의 씬 전환 기능을 구현했습니다.

```csharp
public void MainMoveButton()
{
    SceneManager.LoadScene("Start");    // 스타트로 씬 전환
    Time.timeScale = 1;                 // 시간이 계속됨
}

public void RestartScene()
{
    SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex); // 씬을 재시작함
    Time.timeScale = 1; // 시간이 계속됨
}

public void ChangeGameScene()
{
    // 시작 버튼을 위해 만듬
    SceneManager.LoadScene("Play");
}
```

## 게임 플레이 방식

### 핵심 메커니즘

1. **회전 시스템**: 플레이어는 화면 중앙의 원을 중심으로 지속적으로 회전합니다.
2. **장애물 회피**: 구멍이 있는 육각형 장애물이 중앙을 중심으로 랜덤하게 나타납니다.
3. **점진적 난이도**: 육각형은 시간이 지날수록 크기가 줄어드는 속도가 빨라져 회피가 어려워집니다.
4. **터치 컨트롤**: 화면 좌측 터치 시 반시계방향, 우측 터치 시 시계방향으로 회전합니다.

### 시각적 효과

- **카메라 회전 효과**: 전체 화면이 회전하는 듯한 시각적 효과
- **육각형 회전**: 각 장애물이 독립적으로 회전하며 역동적인 느낌 제공
- **크기 변화**: 장애물의 점진적인 크기 감소로 긴장감 조성

## 개발 과정

### 주요 도전과제

1. **회전 물리 구현**: `RotateAround` 함수를 사용한 정확한 원형 회전 구현
2. **터치 입력 처리**: 모바일 환경에 최적화된 터치 입력 시스템
3. **충돌 감지 최적화**: 레이어 기반 충돌 감지로 성능 최적화
4. **UI/UX 설계**: 게임 플레이 중단 없이 점수와 최고 점수 표시

### 해결 방법

- **물리 시뮬레이션**: Unity의 2D 물리 시스템을 활용한 정확한 충돌 감지
- **입력 시스템**: 터치와 키보드 입력을 모두 지원하는 크로스 플랫폼 입력 처리
- **데이터 저장**: PlayerPrefs를 활용한 최고 점수 저장 시스템

## 배운 점

이 프로젝트를 통해 다음과 같은 것들을 배웠습니다:

1. **Unity 2D 게임 개발**: 2D 물리 시스템과 UI 시스템의 활용
2. **모바일 게임 최적화**: 터치 입력 처리 및 성능 최적화 기법
3. **게임 상태 관리**: 씬 전환, 게임 일시정지, 재시작 등의 상태 관리
4. **데이터 영속성**: PlayerPrefs를 활용한 게임 데이터 저장
5. **플레이스토어 출시 경험**: 앱 서명, 스토어 등록, 심사 과정을 통한 모바일 앱 배포 경험
