---
title: "OpenCV 기반 이미지 편집 프로그램 PhotoMate"
date: "2024-12-01"
tags: [OpenCV, PyQt5, Image Processing, Python]
excerpt: "OpenCV와 PyQt5를 활용하여 개발된 포토샵과 유사한 기능을 제공하는 이미지 편집 프로그램입니다. 다양한 필터, 그리기 도구, 고급 이미지 처리 기능을 통합한 종합적인 이미지 편집 솔루션입니다."
coverImage: "/my-blog/images/project_img/opencv-photomate/main.png"
repoUrl: "https://github.com/toran1678/PhotoMate"
---

# OpenCV 기반 이미지 편집 프로그램 PhotoMate

> **개발 기간**: 2024-11 ~ 2024-12  
> **개발 언어**: Python 3.7+  
> **주요 기술**: OpenCV, PyQt5, NumPy  
> **프로젝트 유형**: 개인 프로젝트 (컴퓨터 비전 학습)

## 프로젝트 개요

OpenCV와 PyQt5를 활용하여 개발된 포토샵과 유사한 기능을 제공하는 이미지 편집 프로그램입니다. 다양한 필터, 그리기 도구, 고급 이미지 처리 기능을 통합한 종합적인 이미지 편집 솔루션으로 구현했습니다.

### 핵심 기능

- **다양한 그리기 도구** (펜, 도형, 텍스트)
- **고급 이미지 필터** (블러, 엣지 검출, 모자이크, 스케치 효과)
- **컴퓨터 비전 알고리즘** (특징 검출, 템플릿 매칭, 파노라마 생성)
- **배경 분리 및 합성** (크로마키, 워터쉐드, 그랩컷)
- **모폴로지 연산** (열림/닫힘 연산, 그레디언트)
- **이미지 변형** (왜곡, 리퀴파이, 원근 변환)

## 기술 스택

### Backend
- **Python 3.7+** - 메인 개발 언어
- **OpenCV 4.10.0** - 컴퓨터 비전 및 이미지 처리
- **NumPy 2.0.2** - 수치 계산 및 배열 처리
- **PyInstaller 6.11.1** - 실행 파일 패키징

### Frontend
- **PyQt5 5.15.11** - GUI 프레임워크
- **Custom UI Components** - 사이드바, 슬라이더, 컬러 피커
- **Context Menu** - 우클릭 메뉴 시스템

### Development Tools
- **Visual Studio Code** - 개발 환경
- **Git** - 버전 관리

## 시스템 아키텍처

### 이미지 처리 파이프라인
- **이미지 로딩**: OpenCV를 통한 다양한 형식 지원
- **전처리**: RGB/BGR 변환, 크기 조정, 정규화
- **처리**: 필터 적용, 특징 검출, 변형 연산
- **후처리**: 결과 표시, 히스토리 관리, 저장

## 주요 구현 기능

### 1. 기본 편집 기능
- **이미지 I/O**: PNG, JPG, BMP, GIF 등 다양한 형식 지원
- **새 파일 생성**: 사용자 지정 크기의 빈 캔버스
- **되돌리기/다시 실행**: 작업 히스토리 스택 관리
- **이미지 확대/축소**: 10% ~ 200% 스케일 조정
- **이미지 자르기**: ROI 선택을 통한 크롭 기능

![메인 화면](/my-blog/images/project_img/opencv-photomate/main.png)
*PhotoMate 메인 화면 - 사이드바, 이미지 표시 영역, 컨트롤 패널이 통합된 편집 인터페이스*

### 2. 그리기 도구 시스템
- **펜 도구**: 자유로운 그리기 및 브러시 설정
- **도형 그리기**: 선, 원, 삼각형, 사각형
- **텍스트 추가**: 사용자 지정 텍스트 입력
- **색상 관리**: 브러시 색상 및 크기 조정
- **실시간 미리보기**: 드래그 중 도형 미리보기

![그리기 도구](/my-blog/images/project_img/opencv-photomate/drawing_tools.png)
*그리기 도구 사용 화면 - 다양한 도형과 텍스트를 자유롭게 그릴 수 있는 도구들*

![팔레트 시스템](/my-blog/images/project_img/opencv-photomate/palette_system.png)
*팔레트 시스템 - 색상 선택, 브러시 크기 조정, 실시간 색상 미리보기를 제공하는 컬러 관리 시스템*

### 3. 이미지 필터 및 효과
- **기본 필터**: 흑백 변환, 블러, 엣지 검출
- **아티스틱 효과**: 스케치/페인팅, 모자이크, 리퀴파이
- **색상 처리**: 정규화, 어댑티브 쓰레시홀드
- **변형 효과**: 볼록 렌즈, 방사 왜곡

![필터 효과](/my-blog/images/project_img/opencv-photomate/filter_effect_menu.png)
*다양한 필터 효과 목록 - 원본 이미지에 다양한 시각적 효과를 적용*

### 4. 고급 이미지 처리

PhotoMate는 다양한 고급 이미지 처리 기능을 제공합니다. 여기서는 주요 기능 중 몇 가지를 소개합니다.

#### 그랩컷 알고리즘
그랩컷(GrabCut) 알고리즘은 사용자가 지정한 사각형 영역을 기반으로 전경과 배경을 자동으로 분리하는 고급 세그멘테이션 기법입니다. GMM(Gaussian Mixture Model)을 사용하여 픽셀을 전경/배경으로 분류하고, 그래프 컷 알고리즘을 통해 최적의 분할을 수행합니다.

![그랩컷 알고리즘](/my-blog/images/project_img/opencv-photomate/grabcut.png)
*그랩컷 알고리즘을 활용한 배경 분리 - 사용자가 지정한 영역을 기반으로 전경 객체를 자동으로 분리하여 배경 제거 효과를 제공*

#### 스케치 효과
스케치 효과는 원본 이미지를 연필이나 펜으로 그린 것처럼 변환하는 아티스틱 필터입니다. 엣지 검출과 색상 단순화를 결합하여 손그림과 유사한 효과를 만들어냅니다. 다양한 스타일의 스케치 효과를 제공하여 창의적인 이미지 편집이 가능합니다.

![스케치 효과](/my-blog/images/project_img/opencv-photomate/sketch.png)
*스케치 효과 적용 - 원본 이미지를 손그림 스타일로 변환하여 아티스틱한 결과물을 생성*

#### 알파 블렌딩
알파 블렌딩은 두 이미지를 투명도를 고려하여 자연스럽게 합성하는 기법입니다. 각 픽셀의 알파 값을 기반으로 가중 평균을 계산하여 부드러운 이미지 합성 효과를 제공합니다. 크로마키 배경 제거 후 다른 배경과 합성할 때 매우 유용합니다.

![알파 블렌딩](/my-blog/images/project_img/opencv-photomate/alpha_blending.png)
*알파 블렌딩을 통한 이미지 합성 - 투명도를 고려한 자연스러운 이미지 합성으로 현실적인 결과물을 생성*

#### 엣지 검출
엣지 검출은 이미지에서 객체의 경계선을 찾아내는 중요한 컴퓨터 비전 기법입니다. Canny 엣지 검출 알고리즘을 사용하여 노이즈에 강하고 정확한 엣지를 검출합니다. 이진화된 엣지 이미지를 생성하여 객체의 윤곽을 명확하게 표현합니다.

![엣지 검출](/my-blog/images/project_img/opencv-photomate/edge_detection.png)
*Canny 엣지 검출 - 이미지의 경계선을 정확하게 검출하여 객체의 윤곽을 명확하게 표현*

#### 기타 고급 기능
- **워터쉐드 알고리즘**: 사용자 마커 기반 영역 분할
- **크로마키**: 특정 색상 배경 제거 및 합성
- **문서 처리**: 문서 스캔 및 원근 변환
- **색상 채우기**: Flood Fill 알고리즘을 통한 영역 채우기

### 5. 컴퓨터 비전 기능
- **특징 검출**: Canny 엣지, 시-토마스 코너, FAST, Blob
- **이미지 매칭**: 템플릿 매칭, ORB 특징 매칭
- **파노라마 생성**: SIFT 특징을 이용한 이미지 스티칭
- **모폴로지 연산**: 열림/닫힘 연산, 그레디언트

![검출 메뉴](/my-blog/images/project_img/opencv-photomate/detection_menu.png)
*검출 메뉴 - 엣지 검출, 코너 검출, FAST 특징 검출, Blob 검출 등 다양한 컴퓨터 비전 알고리즘을 제공하는 메뉴*

![컨텍스트 메뉴](/my-blog/images/project_img/opencv-photomate/context_menu.png)
*우클릭 컨텍스트 메뉴 - 되돌리기, 다시 실행, 이미지 뒤집기, 저장 등 빠른 작업을 위한 팝업 메뉴*

## 핵심 기술 구현

### 이미지 로딩 및 변환
```python
def open_file(self):
    """이미지를 선택하고 로드."""
    file_path, _ = QFileDialog.getOpenFileName(
        self, "이미지 파일 열기", "", 
        "Images (*.png *.xpm *.jpg *.bmp *.gif)"
    )
    if file_path:
        img_array = np.fromfile(file_path, np.uint8)
        self.image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        self.image = cv2.cvtColor(self.image, cv2.COLOR_BGR2RGB)
        self.temp_image = self.image.copy()
        self.update_image()
```

### Canny 엣지 검출
```python
def apply_canny_edge_detection(self):
    """Canny Edge Detection 적용"""
    if self.temp_image is None:
        return
    
    # 그레이스케일 변환
    gray_image = cv2.cvtColor(self.temp_image, cv2.COLOR_RGB2GRAY)
    
    # Canny 엣지 검출
    edges = cv2.Canny(gray_image, 100, 200)
    
    # 결과를 컬러 이미지로 변환
    edges_colored = cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB)
    self.update_and_save(edges_colored)
```

### 워터쉐드 알고리즘
```python
def apply_watershed(self):
    """워터쉐드 알고리즘을 적용한 배경 분리"""
    bgr_image = cv2.cvtColor(self.temp_image, cv2.COLOR_RGB2BGR)
    
    # 마커 초기화
    marker = np.zeros((rows, cols), np.int32)
    marker_id = 1
    
    def on_mouse(event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            marker[y, x] = marker_id
        elif event == cv2.EVENT_RBUTTONDOWN:
            # 워터쉐드 알고리즘 실행
            cv2.watershed(bgr_image, marker)
            # 경계를 초록색으로 표시
            img_draw[marker == -1] = (0, 255, 0)
```

### 파노라마 생성
```python
def create_panorama(self):
    """SIFT 특징을 이용한 파노라마 생성"""
    # SIFT 특징 검출기 생성
    descriptor = cv2.SIFT_create()
    kpsL, featuresL = descriptor.detectAndCompute(grayL, None)
    kpsR, featuresR = descriptor.detectAndCompute(grayR, None)
    
    # BF 매칭기로 특징점 매칭
    matcher = cv2.BFMatcher()
    matches = matcher.knnMatch(featuresR, featuresL, 2)
    
    # 좋은 매칭점 선별
    good_matches = []
    for m in matches:
        if len(m) == 2 and m[0].distance < m[1].distance * 0.75:
            good_matches.append((m[0].trainIdx, m[0].queryIdx))
    
    # 원근 변환 행렬 계산
    if len(good_matches) > 4:
        ptsL = np.float32([kpsL[i].pt for (i, _) in good_matches])
        ptsR = np.float32([kpsR[i].pt for (_, i) in good_matches])
        mtrx, status = cv2.findHomography(ptsR, ptsL, cv2.RANSAC, 4.0)
        
        # 파노라마 생성
        panorama = cv2.warpPerspective(imgR, mtrx, (panorama_width, panorama_height))
        panorama[0:hl, 0:wl] = imgL
```

### 그리기 도구 시스템
```python
def mouseMoveEvent(self, event):
    """마우스 드래그로 그리기"""
    if event.buttons() == Qt.LeftButton and self.drawing:
        current_point = self.map_to_image_coordinates(event.pos())
        if current_point:
            if self.current_shape is None:  # 펜 도구
                cv2.line(self.temp_image, self.last_point, current_point, 
                        self.brush_color, self.brush_size_slider.value())
                self.last_point = current_point
            else:  # 도형 그리기
                self.end_point = current_point
                temp_image = self.temp_image.copy()
                self.draw_shape(temp_image, self.start_point, self.end_point, preview=True)
                self.update_temp_image(temp_image)
```

### 작업 히스토리 관리
```python
def save_to_history(self):
    """현재 상태를 작업 히스토리에 저장"""
    if self.temp_image is not None:
        self.history.append(self.temp_image.copy())
        self.redo_stack.clear()

def undo(self):
    """작업 되돌리기"""
    if len(self.history) > 1:
        self.redo_stack.append(self.history.pop())
        self.temp_image = self.history[-1].copy()
        self.update_image()
```

## UI/UX 특징

### 직관적인 인터페이스
- **사이드바**: 모든 도구와 필터를 한눈에 볼 수 있는 구조
- **실시간 미리보기**: 드래그 중 도형과 선택 영역 미리보기
- **컨텍스트 메뉴**: 우클릭으로 빠른 작업 접근
- **툴팁 시스템**: 각 기능에 대한 상세한 설명

### 사용자 경험
- **작업 히스토리**: 무제한 되돌리기/다시 실행
- **실시간 피드백**: 모든 작업에 대한 즉각적인 시각적 피드백
- **키보드 단축키**: 효율적인 작업을 위한 단축키 지원
- **다양한 파일 형식**: PNG, JPG, BMP, GIF 등 광범위한 지원

## 프로젝트 성과

### 기술적 성장
- **컴퓨터 비전**: OpenCV를 활용한 고급 이미지 처리 알고리즘 구현
- **GUI 프로그래밍**: PyQt5를 이용한 복잡한 사용자 인터페이스 개발
- **이벤트 처리**: 마우스, 키보드 이벤트를 통한 인터랙티브 기능 구현
- **메모리 관리**: 대용량 이미지 처리 시 효율적인 메모리 사용

### 문제 해결 능력
- **좌표 변환**: 화면 좌표와 이미지 좌표 간의 정확한 변환
- **이미지 형식**: RGB/BGR 변환, 다양한 파일 형식 처리
- **실시간 처리**: 드래그 중 부드러운 미리보기 구현
- **히스토리 관리**: 효율적인 작업 히스토리 스택 구현

### 사용자 경험 개선
- **직관적 조작**: 마우스 드래그로 간편한 영역 선택
- **시각적 피드백**: 모든 작업에 대한 명확한 시각적 피드백
- **다양한 도구**: 전문적인 이미지 편집에 필요한 모든 도구 제공

## 향후 개선하면 좋을 부분

- **레이어 시스템**: 다중 레이어 지원으로 고급 편집 기능 추가
- **GPU 가속**: CUDA를 활용한 빠른 이미지 처리
- **플러그인 시스템**: 사용자 정의 필터 및 도구 추가
- **배치 처리**: 여러 이미지 동시 처리 기능
- **클라우드 연동**: 클라우드 저장소 연동 및 협업 기능
- **AI 기능**: 딥러닝 기반 자동 보정 및 스타일 전환

## 학습 포인트

### OpenCV 활용
- 다양한 이미지 처리 알고리즘의 실제 구현
- 특징 검출 및 매칭 알고리즘의 이해
- 모폴로지 연산을 통한 이미지 개선
- 컬러 공간 변환 및 히스토그램 처리

### GUI 프로그래밍
- PyQt5를 활용한 복잡한 UI 구성
- 이벤트 기반 프로그래밍 패턴
- 커스텀 위젯 개발 및 레이아웃 관리
- 사용자 인터랙션 처리

### 이미지 처리
- 픽셀 단위 이미지 조작
- 좌표 변환 및 기하학적 변형
- 필터링 및 노이즈 제거
- 실시간 이미지 처리 최적화

## 프로젝트 회고

이번 프로젝트를 통해 **컴퓨터 비전**과 **이미지 처리**에 대한 깊은 이해를 얻을 수 있었습니다. 특히 OpenCV의 다양한 알고리즘을 실제로 구현하고 사용자 친화적인 인터페이스로 제공하는 과정에서 많은 것을 배웠습니다.

**가장 도전적이었던 부분**은 실시간으로 사용자 입력을 처리하면서도 부드러운 사용자 경험을 제공하는 것이었습니다. 마우스 이벤트 처리와 좌표 변환, 그리고 실시간 미리보기 구현을 통해 GUI 프로그래밍의 복잡성을 체험했습니다.

**가장 만족스러운 부분**은 단순한 이미지 뷰어를 넘어서 전문적인 이미지 편집 도구의 기능들을 구현한 것입니다. 워터쉐드, 그랩컷, 파노라마 생성 등 고급 컴퓨터 비전 알고리즘을 실제로 구현하고 사용할 수 있게 만든 것이 큰 성취였습니다.

앞으로도 지속적인 학습을 통해 더욱 완성도 높은 이미지 처리 애플리케이션을 개발하고, 사용자 중심의 혁신적인 서비스를 구현하는 개발자가 되고 싶습니다.
