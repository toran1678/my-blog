---
title: "AI 기반 가상 피팅 및 커뮤니티 서비스 Fashion Guys"
date: "2025-12-26"
tags: [AI, Virtual Fitting, FastAPI, React, OOTDiffusion, DensePose, Python, MySQL]
excerpt: "OOTDiffusion을 활용한 AI 가상 피팅 기술과 소셜 네트워킹을 결합한 차세대 패션 플랫폼입니다. 실제 의류를 착용하지 않고도 AI가 생성한 가상 피팅 결과를 미리 확인하고, 다른 사용자들과 패션 콘텐츠를 공유·소통할 수 있는 종합 패션 서비스입니다."
coverImage: "/my-blog/images/project_img/virtual-fitting/main.png"
repoUrl: "https://github.com/toran1678/VirtualFitting"
period: "2025-03 ~ 2025-12"
language: "Python 3.10+, JavaScript (React 19)"
skills: "FastAPI, React, OOTDiffusion, DensePose, MySQL, Redis, Docker"
type: "팀 프로젝트 (캡스톤 디자인)"
---

# AI 기반 가상 피팅 및 커뮤니티 서비스 Fashion Guys

## 프로젝트 개요

**Fashion Guys**는 AI 기술을 활용한 가상 피팅 서비스와 소셜 네트워킹 기능을 결합한 혁신적인 패션 플랫폼입니다. 사용자는 실제 의류를 착용하지 않고도 AI가 생성한 가상 피팅 결과를 미리 확인할 수 있으며, 다른 사용자들과 패션 콘텐츠를 공유하고 소통할 수 있습니다.

![메인 화면](/my-blog/images/project_img/virtual-fitting/main.png|400)
*Fashion Guys 메인 화면 - 가상 피팅과 소셜 커뮤니티가 결합된 패션 플랫폼*

### 핵심 기능

- **AI 가상 피팅** — OOTDiffusion, Change Clothes AI, Leffa AI 3가지 모델 지원
- **배경 커스터마이징** — 가상 피팅 결과의 배경을 자유롭게 변경
- **커스텀 의류 생성** — 직접 업로드한 의류 이미지의 AI 자동 배경 제거 및 옷장 저장
- **소셜 피드** — 패션 콘텐츠 공유, 댓글, 좋아요, 스티커 기능
- **팔로우 시스템** — 공개/비공개 계정, 팔로우 요청 승인 시스템
- **마이페이지** — 팔로워/팔로잉 관리, 인물·의류·프로필 통합 관리
- **카카오 소셜 로그인** — OAuth 기반 간편 로그인

---

## 기술 스택

### Backend

| 기술 | 버전 / 역할 |
|------|-------------|
| **FastAPI** | 고성능 비동기 웹 프레임워크 |
| **Python** | 3.10+, 메인 백엔드 언어 |
| **MySQL** | 8.0, 관계형 데이터베이스 |
| **Redis** | 캐시 및 비동기 작업 큐 관리 |
| **SQLAlchemy** | ORM 및 데이터베이스 관리 |
| **Uvicorn** | ASGI 서버 |

### AI / ML

| 기술 | 역할 |
|------|------|
| **OOTDiffusion** | 로컬 고품질 가상 피팅 모델 (HD/DC 모드) |
| **Change Clothes AI** | Hugging Face Gradio 기반 빠른 피팅 (`jallenjia/Change-Clothes-AI`) |
| **Leffa AI** | Hugging Face Gradio 기반 빠른 피팅 (`franciszzj/Leffa`) |
| **DensePose** | 인체 표면 밀도 추정 (전처리) |
| **Human Parsing (ATR/LIP)** | 인체 분할 마스크 생성 (전처리) |
| **OpenPose** | 인체 포즈 추정 18 키포인트 (전처리) |
| **Rembg & Segment Anything** | 이미지 배경 제거 |
| **Pillow & OpenCV** | 이미지 전처리 및 후처리 |
| **PyTorch** | 딥러닝 프레임워크 |

### Frontend

| 기술 | 버전 / 역할 |
|------|-------------|
| **React** | 19.0, 최신 React 기능 활용 |
| **React Router DOM** | 7.4, 클라이언트 사이드 라우팅 |
| **Axios** | HTTP 클라이언트 |
| **@gradio/client** | Gradio API 통신 |
| **Kakao SDK** | 소셜 로그인 |
| **React Image Crop** | 이미지 크롭 기능 |
| **Lucide React** | 모던 아이콘 라이브러리 |
| **CSS Modules** | 컴포넌트별 스타일 격리 |

### DevOps & Infrastructure

| 기술 | 역할 |
|------|------|
| **Docker & Docker Compose** | 컨테이너화 |
| **Nginx** | 리버스 프록시 및 정적 파일 서빙 |
| **Redis Worker** | 백그라운드 작업 처리 |

---

## 시스템 아키텍처

### 전체 구조

```
capstone_project/
├── backend/                        # FastAPI 백엔드
│   ├── app/
│   │   ├── api/                   # API 라우터 및 엔드포인트
│   │   │   ├── routes/            # 기능별 라우터
│   │   │   └── ml_models/         # AI 모델 디렉토리
│   │   ├── core/                  # 핵심 설정
│   │   │   ├── redis_config.py    # Redis 연결 설정
│   │   │   └── task_queue.py      # 작업 큐 관리
│   │   ├── crud/                  # 데이터베이스 CRUD
│   │   ├── models/                # SQLAlchemy ORM 모델
│   │   ├── schemas/               # Pydantic 스키마
│   │   └── workers/               # 백그라운드 워커
│   └── crawling/                  # 의류 데이터 크롤링
├── frontend/                       # React 프론트엔드
│   └── src/
│       ├── api/                   # API 호출 함수
│       ├── components/            # 재사용 컴포넌트
│       ├── pages/                 # 페이지 컴포넌트
│       ├── context/               # React Context
│       └── hooks/                 # 커스텀 훅
├── nginx/                          # Nginx 설정
└── docker-compose.yml             # 개발 환경 Docker
```

![시스템 아키텍처](/my-blog/images/project_img/virtual-fitting/architecture.png|350)
*Fashion Guys 전체 시스템 아키텍처 - Frontend, Backend API, AI 서버, DB 간의 통신 구조*

### 데이터베이스 스키마

MySQL 8.0 기반으로 설계된 ERD는 사용자, 가상 피팅, 소셜 기능, 의류 데이터를 효율적으로 관리합니다.

**주요 테이블:**

| 테이블 | 설명 |
|--------|------|
| `users` | 사용자 정보 및 프로필 |
| `feeds` | 소셜 피드 게시글 |
| `feed_images` | 피드 다중 이미지 |
| `feed_comments` | 피드 댓글 |
| `liked_feeds` | 피드 좋아요 |
| `followers` | 팔로우 관계 |
| `follow_requests` | 팔로우 요청 |
| `virtual_fittings` | 가상 피팅 결과 |
| `virtual_fitting_process` | 가상 피팅 처리 상태 |
| `background_customs` | 배경 커스터마이징 결과 |
| `clothing_items` | 의류 데이터 (크롤링, 2만+ 건) |
| `custom_clothing_items` | 커스텀 의류 |
| `user_clothes` | 사용자 옷장 (수집 의류) |
| `liked_clothes` | 의류 좋아요 |
| `person_images` | 인물 이미지 |
| `verification` | 이메일 인증 코드 |

![데이터베이스 ERD](/my-blog/images/project_img/virtual-fitting/db.png|400)
*MySQL 기반 데이터베이스 ERD - 사용자, 피팅, 소셜, 의류 데이터의 관계 구조*

---

## AI 전처리 파이프라인

OOTDiffusion 기반 고품질 가상 피팅을 위해서는 입력 이미지에 대한 정밀한 전처리가 필수입니다. 다음 4단계의 전처리 파이프라인을 통해 인물 이미지를 AI 모델이 처리할 수 있는 형태로 변환합니다.

![전처리 파이프라인](/my-blog/images/project_img/virtual-fitting/preprocessing.png|400)
*AI 전처리 파이프라인 — 원본 인물 이미지에서 DensePose, Human Parse, Pose Keypoints, Cloth Mask 생성 과정*

### 1단계: DensePose (인체 표면 밀도 추정)

**DensePose**는 Facebook AI Research에서 개발한 모델로, 2D 이미지에서 인체의 3D 표면을 밀집적으로 추정합니다.

- **출력**: 24개 신체 부위의 UV 맵 (각 픽셀이 3D 인체 표면의 어느 위치에 해당하는지)
- **역할**: 의류가 신체에 어떻게 감겨야 하는지 3D 기하학적 정보 제공
- **특징**: 단순 스켈레톤이 아닌 전체 표면을 정밀하게 추정하여 리얼리스틱한 피팅 가능

```python
# DensePose 전처리 예시
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from densepose import add_densepose_config

cfg = get_cfg()
add_densepose_config(cfg)
cfg.merge_from_file("densepose_rcnn_R_50_FPN_s1x.yaml")
cfg.MODEL.WEIGHTS = "densepose_rcnn_R_50_FPN_s1x.pkl"

predictor = DefaultPredictor(cfg)
outputs = predictor(image)
# outputs['pred_densepose'] — UV 좌표 맵 반환
```

### 2단계: Human Parsing (인체 분할)

**Human Parsing**은 인물 이미지를 픽셀 단위로 신체 각 부위별로 분류(세그멘테이션)하는 기술입니다.

- **모델**: ATR (Attribute Recognition) / LIP (Look Into Person) 기반 파싱 모델
- **분류 카테고리**: 배경, 피부, 머리/얼굴, 상의, 하의, 드레스, 신발, 모자, 가방 등 20개 클래스
- **역할**: 어떤 영역에 새 의류를 입혀야 하는지 정확한 마스크 정보 제공

```python
# Human Parsing 전처리 예시
import torch
from transforms.transforms import transform_logits

# ATR 모델로 인체 파싱
with torch.no_grad():
    output = model(input_tensor)
    
upsample = torch.nn.Upsample(
    size=(h, w), mode='bilinear', align_corners=True
)
upsample_output = upsample(output[0][-1][0].unsqueeze(0))
logit_result = transform_logits(
    upsample_output[0].data.cpu().numpy(), 
    center, scale, w, h, input_size=[473, 473]
)
parsing_result = np.argmax(logit_result, axis=2)
# 0: 배경, 5: 상의, 9: 하의, 6: 드레스 등
```

### 3단계: Pose Estimation (포즈 추정)

**OpenPose** 기반으로 인체의 18개 키포인트(관절)를 추출하여 포즈 정보를 제공합니다.

- **키포인트**: 코, 목, 어깨, 팔꿈치, 손목, 엉덩이, 무릎, 발목 등 18개 부위
- **출력**: JSON 형태의 좌표 데이터 + 시각화 이미지
- **역할**: 팔, 다리의 굴절 각도를 파악하여 의류 변형 및 주름 표현에 활용

```python
# OpenPose 포즈 추정 예시
import json

# OpenPose CLI 실행으로 키포인트 추출
import subprocess
subprocess.run([
    "python", "run_openpose.py",
    "--image_path", input_image_path,
    "--write_json", output_dir,
    "--write_images", output_dir,
    "--display", "0"
])

# 결과 JSON 파싱
with open(f"{output_dir}/pose_keypoints.json") as f:
    pose_data = json.load(f)
    keypoints = pose_data["people"][0]["pose_keypoints_2d"]
```

### 4단계: Cloth Mask 생성

의류 이미지에서 배경을 제거하고 의류 영역만의 마스크를 생성합니다.

- **도구**: Rembg (U²-Net 기반) + 추가 후처리
- **역할**: 의류 영역과 배경을 정확히 분리하여 피팅 모델의 입력으로 사용
- **후처리**: 경계 영역 정제, 노이즈 제거

```python
# Cloth Mask 생성 예시 (Rembg 활용)
from rembg import remove
from PIL import Image
import numpy as np

# 배경 제거
cloth_image = Image.open(cloth_path)
cloth_no_bg = remove(cloth_image)  # RGBA 이미지 반환

# 마스크 추출 (알파 채널)
cloth_array = np.array(cloth_no_bg)
cloth_mask = (cloth_array[:, :, 3] > 0).astype(np.uint8) * 255

# 마스크 저장
mask_image = Image.fromarray(cloth_mask, mode='L')
mask_image.save("cloth_mask.png")
```

---

## 주요 기능 구현

### 1. AI 가상 피팅

Fashion Guys는 **3가지 피팅 옵션**을 제공하여 사용자가 속도와 품질을 선택할 수 있습니다.

![인물 이미지 관리](/my-blog/images/project_img/virtual-fitting/person.png|300)
*인물 이미지 관리 화면 — 가상 피팅에 사용할 인물 이미지를 업로드하고 관리*

![의류 선택](/my-blog/images/project_img/virtual-fitting/clothes.png|400)
*의류 선택 화면 — 2만+ 크롤링 의류 데이터에서 원하는 의류를 검색·선택*

#### 옵션 1: 고품질 가상 피팅 (OOTDiffusion) — 2~3분

- **로컬 AI 모델** — 서버에 직접 배포된 OOTDiffusion 모델 사용
- **HD/DC 모드** — Half-body(상체 전용) / Full-body(전신) 옵션
- **카테고리 지원** — 상체, 하체, 드레스 분류 지원
- **4개 결과 생성** — 다양한 결과 중 원하는 것을 선택
- **Redis 비동기 처리** — 백그라운드 작업 큐를 통한 빠른 응답

```python
# OOTDiffusion 가상 피팅 API 예시
@router.post("/virtual-fitting/ootd")
async def create_ootd_fitting(
    person_image_id: int,
    cloth_image_id: int,
    model_type: str = "hd",  # "hd" or "dc"
    category: int = 0,       # 0: upper, 1: lower, 2: dress
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Redis 작업 큐에 추가 (비동기 처리)
    task_id = await task_queue.enqueue(
        "ootd_fitting",
        {
            "person_image_id": person_image_id,
            "cloth_image_id": cloth_image_id,
            "model_type": model_type,
            "category": category,
            "user_id": current_user.id
        }
    )
    return {"task_id": task_id, "status": "queued"}
```

![가상 피팅 화면](/my-blog/images/project_img/virtual-fitting/virtual-fitting.png|500)
*가상 피팅 메인 화면 — 인물, 의류 선택 및 피팅 모델 옵션 설정*

#### 옵션 2: 빠른 피팅 - Change Clothes AI — 30초 내

- **Hugging Face Gradio API** 활용 (`jallenjia/Change-Clothes-AI`)
- **실시간 처리** — 클라우드 기반으로 빠른 결과 생성
- **상체/하체/전신** 모두 지원

#### 옵션 3: 빠른 피팅 - Leffa AI — 30초 내

- **Hugging Face Gradio API** 활용 (`franciszzj/Leffa`)
- **품질 우선** — 빠른 피팅 중 가장 높은 품질
- **다양한 스타일** 지원

```python
# Gradio API 활용 빠른 피팅 예시
from gradio_client import Client, handle_file

async def leffa_fitting(person_image_path: str, cloth_image_path: str):
    client = Client("franciszzj/Leffa")
    result = client.predict(
        src_image_path=handle_file(person_image_path),
        ref_image_path=handle_file(cloth_image_path),
        ref_acceleration=False,
        step=50,
        scale=2.5,
        seed=42,
        vt_model_type="viton_hd",
        api_name="/leffa_predict_vt"
    )
    return result
```

![가상 피팅 결과](/my-blog/images/project_img/virtual-fitting/virtual-fitting2.png|700)
*가상 피팅 결과 화면 — 생성된 4개의 피팅 결과 이미지 중 선택 가능*

---

### 2. 배경 커스터마이징

가상 피팅 완료 후 결과 이미지의 배경을 AI로 제거하고 원하는 배경으로 교체할 수 있습니다.

**3가지 배경 옵션:**
- **단색 배경** — HEX 색상 코드로 원하는 색상 직접 입력
- **기본 제공 배경 이미지** — 자연, 도시, 인테리어 등 다양한 배경 선택
- **사용자 업로드 이미지** — 직접 촬영한 사진이나 원하는 배경 이미지 업로드

```python
# 배경 커스터마이징 처리 예시
from rembg import remove
from PIL import Image
import numpy as np

async def apply_background(
    fitting_result_path: str,
    background_type: str,  # "color", "preset", "upload"
    background_value: str  # hex color or image path
) -> Image.Image:
    # 1. 피팅 결과 이미지 배경 제거
    result_image = Image.open(fitting_result_path)
    fg_image = remove(result_image)  # 배경 제거된 RGBA 이미지
    
    # 2. 배경 생성
    if background_type == "color":
        r, g, b = int(background_value[1:3], 16), \
                  int(background_value[3:5], 16), \
                  int(background_value[5:7], 16)
        background = Image.new("RGBA", fg_image.size, (r, g, b, 255))
    else:
        background = Image.open(background_value).convert("RGBA")
        background = background.resize(fg_image.size, Image.LANCZOS)
    
    # 3. 합성 (알파 블렌딩)
    result = Image.alpha_composite(background, fg_image)
    return result.convert("RGB")
```

![배경 커스터마이징](/my-blog/images/project_img/virtual-fitting/background-custom.png|700)
*배경 커스터마이징 화면 — AI로 배경을 제거한 후 단색·기본 제공·업로드 이미지로 재합성*

---

### 3. 커스텀 의류 생성

사용자가 직접 의류 이미지를 업로드하면 AI가 자동으로 배경을 제거하고 개인 옷장에 저장합니다.

- **이미지 업로드** — 직접 촬영한 의류 사진 업로드
- **AI 자동 배경 제거** — Rembg(U²-Net)를 활용한 정확한 배경 제거
- **카테고리 분류** — 상의/하의/드레스 카테고리 지정
- **개인 옷장 저장** — 저장 후 즉시 가상 피팅에 활용 가능

![커스텀 의류 생성](/my-blog/images/project_img/virtual-fitting/custom-clothes.png|500)
*커스텀 의류 생성 화면 — 사용자가 업로드한 의류 이미지에서 AI가 배경을 자동 제거*

![의류 옷장](/my-blog/images/project_img/virtual-fitting/wardrobe.png|500)
*개인 옷장 화면 — 좋아요한 의류와 커스텀 의류를 한 곳에서 관리*

---

### 4. 소셜 피드

패션 콘텐츠를 공유하고 다른 사용자와 소통하는 소셜 커뮤니티 기능입니다.

**피드 기능:**
- **다중 이미지 업로드** — 최대 10개 이미지 업로드, 캐러셀로 표시
- **스티커 기능** — 87개의 감정/동물/음식 스티커로 감정 표현
- **댓글 시스템** — 실시간 댓글 및 답글(대댓글) 지원
- **좋아요 기능** — 피드 좋아요 및 통계 확인
- **피드 편집/삭제** — 작성자만 수정 가능한 권한 관리
- **무한 스크롤** — 페이지네이션 없이 자연스러운 피드 탐색

![소셜 피드](/my-blog/images/project_img/virtual-fitting/feeds.jpg|400)
*소셜 피드 화면 — 팔로우한 사용자들의 패션 콘텐츠를 타임라인 형식으로 탐색*

![피드 작성](/my-blog/images/project_img/virtual-fitting/create-feed.png|400)
*피드 작성 화면 — 다중 이미지 업로드, 스티커, 텍스트를 조합하여 패션 콘텐츠 게시*

---

### 5. 팔로우 시스템

공개/비공개 계정 설정과 팔로우 요청 승인 시스템을 통해 프라이버시를 보호합니다.

**팔로우 시스템 특징:**
- **공개/비공개 계정** — 프로필 공개 여부를 사용자가 직접 설정
- **팔로우 요청 승인** — 비공개 계정의 경우 팔로우 요청 후 승인/거부 처리
- **팔로워/팔로잉 관리** — 목록 확인 및 관계 관리
- **팔로잉 전용 피드** — 팔로우한 사용자의 피드만 필터링하여 탐색

```python
# 팔로우 요청 처리 예시
@router.post("/follow/{target_user_id}")
async def follow_user(
    target_user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    target_user = db.query(User).filter(User.id == target_user_id).first()
    
    if target_user.is_private:
        # 비공개 계정: 팔로우 요청 생성
        follow_request = FollowRequest(
            requester_id=current_user.id,
            target_id=target_user_id,
            status="pending"
        )
        db.add(follow_request)
        return {"status": "request_sent"}
    else:
        # 공개 계정: 바로 팔로우
        follower = Follower(
            follower_id=current_user.id,
            following_id=target_user_id
        )
        db.add(follower)
        return {"status": "following"}
```

![팔로우 관리](/my-blog/images/project_img/virtual-fitting/follow.png|400)
*팔로우 관리 화면 — 팔로워/팔로잉 목록, 받은/보낸 팔로우 요청을 한 화면에서 관리*

![팔로우 요청](/my-blog/images/project_img/virtual-fitting/follow2.png|400)
*팔로우 요청 화면 — 비공개 계정의 팔로우 요청 승인/거부 처리*

---

### 6. 마이페이지

사용자의 모든 정보와 컨텐츠를 통합 관리하는 개인 페이지입니다.

**마이페이지 기능:**
- **프로필 관리** — 프로필 이미지, 닉네임, 자기소개, 공개/비공개 설정
- **팔로워/팔로잉 관리** — 팔로우 현황 통계 및 목록 확인
- **인물 이미지 관리** — 가상 피팅에 사용할 인물 사진 업로드·삭제
- **의류 관리** — 좋아요한 의류 및 커스텀 의류 통합 관리
- **내 피드 관리** — 작성한 피드 목록 확인·편집·삭제

![마이페이지](/my-blog/images/project_img/virtual-fitting/my-page.png|400)
*마이페이지 — 프로필, 팔로워/팔로잉, 인물·의류 관리를 통합한 개인 대시보드*

---

### 7. 인증 및 보안

안전한 서비스 이용을 위한 다양한 인증 방식과 보안 기능을 구현했습니다.

#### 이메일 인증 회원가입

Gmail SMTP를 활용한 이메일 인증 코드 발송으로 본인 확인 후 회원가입이 가능합니다.

![일반 회원가입](/my-blog/images/project_img/virtual-fitting/create-account.png|400)
*이메일 인증 회원가입 — Gmail SMTP 기반 인증 코드 발송 및 확인*

![회원가입 2단계](/my-blog/images/project_img/virtual-fitting/create-account2.png|400)
*회원가입 2단계 — 인증 코드 확인 후 비밀번호 및 프로필 정보 입력*

#### 카카오 소셜 로그인

Kakao OAuth 2.0을 통한 간편 로그인으로 별도 회원가입 없이 서비스를 이용할 수 있습니다.

```javascript
// 카카오 소셜 로그인 처리 예시 (Frontend)
const handleKakaoLogin = () => {
  window.Kakao.Auth.authorize({
    redirectUri: `${window.location.origin}/auth/kakao/callback`,
    scope: "profile_nickname,profile_image,account_email",
  });
};

// 콜백 처리
const handleKakaoCallback = async (code) => {
  const response = await axios.post("/api/auth/kakao", { code });
  const { access_token, user } = response.data;
  
  // 세션 쿠키 저장 후 메인 페이지 이동
  setUser(user);
  navigate("/");
};
```

```python
# 카카오 OAuth 백엔드 처리 예시
@router.post("/auth/kakao")
async def kakao_login(code: str, db: Session = Depends(get_db)):
    # 1. 카카오 토큰 발급
    token_response = requests.post(
        "https://kauth.kakao.com/oauth/token",
        data={
            "grant_type": "authorization_code",
            "client_id": KAKAO_CLIENT_ID,
            "redirect_uri": KAKAO_REDIRECT_URI,
            "code": code,
        }
    )
    access_token = token_response.json()["access_token"]
    
    # 2. 카카오 사용자 정보 조회
    user_info = requests.get(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()
    
    kakao_id = str(user_info["id"])
    nickname = user_info["kakao_account"]["profile"]["nickname"]
    
    # 3. DB에서 사용자 조회/생성
    user = db.query(User).filter(User.kakao_id == kakao_id).first()
    if not user:
        user = User(kakao_id=kakao_id, nickname=nickname, ...)
        db.add(user)
    
    return create_session_token(user)
```

![카카오 소셜 로그인](/my-blog/images/project_img/virtual-fitting/kakao-register.png|400)
*카카오 소셜 로그인 — OAuth 2.0 기반 간편 로그인으로 별도 회원가입 없이 이용 가능*

**보안 기능:**
- **비밀번호 암호화** — bcrypt 해시 암호화 적용
- **세션 관리** — Redis 기반 안전한 쿠키 세션
- **파일 업로드 검증** — 이미지 타입 및 크기 제한으로 악성 파일 차단

---

## 성능 최적화

### Redis 비동기 작업 큐

OOTDiffusion과 같은 무거운 AI 연산은 요청-응답을 즉시 처리하면 서버가 응답 불능 상태가 됩니다. **Redis 작업 큐**와 **백그라운드 워커**를 통해 이를 해결했습니다.

```python
# Redis 작업 큐 관리 예시
import redis
import json
import uuid

class TaskQueue:
    def __init__(self):
        self.redis = redis.from_url("redis://localhost:6379")
    
    async def enqueue(self, task_type: str, task_data: dict) -> str:
        task_id = str(uuid.uuid4())
        task = {
            "task_id": task_id,
            "task_type": task_type,
            "data": task_data,
            "status": "queued",
            "created_at": datetime.now().isoformat()
        }
        # Redis 리스트에 작업 추가
        self.redis.lpush("task_queue", json.dumps(task))
        # 작업 상태를 Redis에 저장 (TTL 1시간)
        self.redis.setex(f"task:{task_id}", 3600, json.dumps(task))
        return task_id
    
    async def get_status(self, task_id: str) -> dict:
        task_data = self.redis.get(f"task:{task_id}")
        return json.loads(task_data) if task_data else None

# 백그라운드 워커
class OOTDWorker:
    def run(self):
        while True:
            # 작업 큐에서 작업 꺼내기
            task_data = self.redis.brpop("task_queue", timeout=5)
            if task_data:
                task = json.loads(task_data[1])
                self.process_ootd_fitting(task)
    
    def process_ootd_fitting(self, task: dict):
        # OOTDiffusion 모델로 가상 피팅 수행
        result_images = self.ootd_model.generate(
            model_type=task["data"]["model_type"],
            category=task["data"]["category"],
            person_image=task["data"]["person_image_path"],
            cloth_image=task["data"]["cloth_image_path"],
            num_samples=4
        )
        # 결과 저장 및 상태 업데이트
        self.save_results(task["task_id"], result_images)
```

### 프론트엔드 최적화

| 기법 | 설명 |
|------|------|
| **지연 로딩** | `React.lazy`를 통한 페이지 단위 코드 분할 |
| **무한 스크롤** | 피드 페이지네이션으로 초기 로딩 최소화 |
| **이미지 프록시** | 외부 이미지 캐싱 및 최적화 |
| **CSS Modules** | 스타일 격리로 번들 크기 최적화 |
| **Context API** | 전역 상태 관리로 불필요한 리렌더링 방지 |

### AI 모델 최적화

| 옵션 | 모델 | 처리 시간 | 특징 |
|------|------|-----------|------|
| 고품질 | OOTDiffusion (로컬) | 2~3분 | 최고 품질, 4개 결과 생성 |
| 빠른 피팅 | Change Clothes AI (Gradio) | 30초 내 | 실시간, 간편 사용 |
| 빠른 피팅 | Leffa AI (Gradio) | 30초 내 | 빠른 피팅 중 최고 품질 |

---

## 핵심 기술 구현

### FastAPI + SQLAlchemy 비동기 DB 처리

```python
# 비동기 DB 세션 및 ORM 모델 예시
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=True)
    kakao_id = Column(String(50), unique=True, nullable=True)
    nickname = Column(String(50), nullable=False)
    is_private = Column(Boolean, default=False)
    profile_image = Column(String(500), nullable=True)
    
    # 관계 정의
    feeds = relationship("Feed", back_populates="author")
    person_images = relationship("PersonImage", back_populates="user")
    virtual_fittings = relationship("VirtualFitting", back_populates="user")

# FastAPI 엔드포인트
@router.get("/users/me", response_model=UserSchema)
async def get_my_profile(
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
):
    return current_user
```

### React Context를 통한 전역 상태 관리

```javascript
// 사용자 인증 상태 전역 관리
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 앱 시작 시 세션 확인
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 프로젝트 성과

### 기술적 도전과 해결

| 도전 | 해결 방법 |
|------|-----------|
| OOTDiffusion 장시간 처리 | Redis 작업 큐 + 백그라운드 워커로 비동기 처리 |
| 다중 AI 모델 통합 | 인터페이스 통일 + Gradio Client 표준화 |
| 실시간 처리 상태 업데이트 | 폴링 방식으로 작업 상태 주기적 확인 |
| 이미지 배경 제거 정확도 | Rembg + 추가 후처리로 품질 향상 |
| 대용량 의류 데이터 (2만+) | 크롤링 CSV → MySQL 벌크 삽입 + 인덱싱 |

### 학습 포인트

**AI/ML 기술:**
- OOTDiffusion 가상 피팅 파이프라인 전체 이해 및 구현
- DensePose, Human Parsing, OpenPose 전처리 파이프라인 구축
- Rembg(U²-Net) 기반 배경 제거 및 이미지 합성

**풀스택 개발:**
- FastAPI의 비동기 처리 패턴 (async/await) 실전 적용
- React 19의 최신 기능 활용 (Context, Hooks, Suspense)
- Docker Compose를 통한 다중 서비스 컨테이너 오케스트레이션

**시스템 설계:**
- Redis를 활용한 비동기 작업 큐 설계
- OAuth 2.0 소셜 로그인 구현 (카카오)
- MySQL 관계형 DB 스키마 설계 (16개 테이블)

## 프로젝트 회고

이번 캡스톤 프로젝트를 통해 **AI 기술과 웹 서비스를 실제로 통합하는 경험**을 쌓을 수 있었습니다. 특히 OOTDiffusion 같은 무거운 딥러닝 모델을 실제 서비스에서 사용 가능하게 만드는 과정이 가장 도전적이었습니다.

**가장 도전적이었던 부분**은 OOTDiffusion의 2~3분에 달하는 처리 시간을 사용자가 기다릴 수 있게 만드는 UX 설계였습니다. Redis 작업 큐와 백그라운드 워커를 도입하여 서버가 블로킹되지 않도록 했고, 프론트엔드에서는 폴링 방식으로 실시간 처리 상태를 표시하여 사용자 경험을 개선했습니다.

**AI 전처리 파이프라인** 구축도 큰 도전이었습니다. DensePose, Human Parsing, OpenPose 등 여러 모델의 출력 형식이 모두 다르고, 이를 OOTDiffusion의 입력 형식에 맞게 통일하는 과정에서 많은 시행착오를 겪었습니다.

**가장 만족스러운 부분**은 3가지 피팅 옵션을 통해 사용자에게 선택권을 제공한 것입니다. 고품질이 필요하면 OOTDiffusion을, 빠른 확인이 필요하면 Gradio API를 선택할 수 있어 다양한 사용 사례를 커버할 수 있었습니다.

앞으로는 실시간 스트리밍을 통한 처리 상태 업데이트, 더 경량화된 로컬 피팅 모델 도입, 그리고 추천 알고리즘을 통한 개인화된 의류 추천 기능을 추가하고 싶습니다.
