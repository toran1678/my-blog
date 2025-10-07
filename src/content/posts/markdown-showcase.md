---
title: "마크다운 스타일 쇼케이스"
date: "2025-05-07"
author: "개발자"
tags: [마크다운, 스타일, 가이드]
# coverImage: "/my-blog/images/1.png"
#coverImage: "/placeholder.svg?height=600&width=1200&query=colorful abstract design"
---

# 마크다운 스타일 쇼케이스

이 포스트는 블로그의 다양한 마크다운 스타일을 보여주기 위한 예시입니다. 여러 마크다운 요소들이 어떻게 스타일링되는지 확인할 수 있습니다.

## 텍스트 스타일링

일반 텍스트는 이렇게 보입니다. **굵은 텍스트**는 이렇게 보이고, *기울임체*는 이렇게 보입니다. ***굵은 기울임체***도 가능합니다. ~~취소선~~도 사용할 수 있습니다.

## 헤딩

# 헤딩 1
## 헤딩 2
### 헤딩 3
#### 헤딩 4
##### 헤딩 5
###### 헤딩 6

## 인용구

> 인용구는 이렇게 보입니다. 중요한 내용이나 다른 사람의 말을 인용할 때 사용합니다.
>
> 여러 단락으로 구성된 인용구도 가능합니다.

## 리스트

### 순서 없는 리스트

- 항목 1
- 항목 2
  - 중첩 항목 2.1
  - 중첩 항목 2.2
- 항목 3

### 순서 있는 리스트

1. 첫 번째 항목
2. 두 번째 항목
   1. 중첩 항목 2.1
   2. 중첩 항목 2.2
3. 세 번째 항목

## 코드

인라인 코드는 `const greeting = "Hello, World!";`처럼 보입니다.

코드 블록은 다음과 같이 보입니다:

```javascript
// 자바스크립트 예시
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

```css
/* CSS 예시 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
```

```jsx
// React 컴포넌트 예시
import React from 'react';

function Greeting({ name }) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Welcome to our website.</p>
    </div>
  );
}

export default Greeting;
```

## 링크

[내부 링크](#)나 [외부 링크](https://example.com)를 사용할 수 있습니다.

## 이미지

아래는 이미지 예시입니다:

![고양이](/images/1.png)
![아름다운 풍경](/placeholder.svg?height=400&width=600&query=beautiful landscape)

## 테이블

| 이름     | 나이 | 직업       |
|----------|-----|------------|
| 홍길동   | 30  | 개발자     |
| 김철수   | 25  | 디자이너   |
| 이영희   | 28  | 마케터     |

## 수평선

아래는 수평선입니다:

---

## 특별한 콘텐츠 블록

<div data-type="note">
이것은 노트 블록입니다. 중요한 정보나 참고 사항을 표시할 때 사용합니다.
</div>

<div data-type="warning">
이것은 경고 블록입니다. 주의해야 할 사항이나 위험 요소를 표시할 때 사용합니다.
</div>

<div data-type="tip">
이것은 팁 블록입니다. 유용한 팁이나 트릭을 공유할 때 사용합니다.
</div>

<div data-type="important">
중요한 정보
</div>

<div data-type="caution">
위험하거나 조심해야 할 내용
</div>

## BlockQuote
> This is first blockqute.
> > This is a second blockqute.


## 결론

이 포스트를 통해 블로그의 다양한 마크다운 스타일을 확인할 수 있습니다. 이제 이 스타일을 활용하여 멋진 블로그 포스트를 작성해보세요!
