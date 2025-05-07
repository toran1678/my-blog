---
title: "이미지 테스트"
date: "2025-05-07"
author: "개발자"
tags: ["테스트", "이미지"]
coverImage: "1.png"
# coverImage: "/placeholder.svg?height=600&width=1200&query=이미지+테스트"
---

# 이미지 테스트

이 포스트는 다양한 방식의 이미지 삽입을 테스트합니다.

## 마크다운 이미지 문법

아래는 마크다운 이미지 문법을 사용한 예시입니다:

![테스트 이미지](1.png)

## HTML img 태그

아래는 HTML img 태그를 사용한 예시입니다:

<img src="/1.png" alt="테스트 이미지 HTML" />

## 상대 경로 이미지

아래는 상대 경로를 사용한 예시입니다:

![상대 경로 이미지](../../assets/images/first-post.png)

<img src="../../assets/images/first-post.png" alt="상대 경로 이미지 HTML" />

## 플레이스홀더 이미지

아래는 플레이스홀더 이미지입니다:

![플레이스홀더 이미지](/placeholder.svg?height=300&width=500&query=플레이스홀더+이미지)

<img src="/placeholder.svg?height=300&width=500&query=HTML+플레이스홀더" alt="HTML 플레이스홀더" />
