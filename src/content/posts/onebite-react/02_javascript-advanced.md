---
title: "JavaScript 심화"
date: "2026-02-03"
category: "개발"
tags: [JavaScript]
excerpt: "JavaScript 심화 핵심 요약"
coverImage: "/my-blog/images/post_img/onebite-react/javascript-basic/javascript.png"
---

# \[JavaScript] 자바스크립트 심화 핵심 요약
## Truthy & Falsy
> JavaScript에서는 참, 거짓도 아닌 값도 참, 거짓으로 평가한다.

**JavaScript**에서는 어떠한 값이 `Boolean` 타입에 해당하는 `True`, `False`가 아니어도
상황에 따라 참으로 판단하거나 또는 거짓으로 판단하는 경우가 있습니다.
```javascript
// Truthy
if (123) { console.log("123 is true"); }
else { console.log("123 is false"); }

// Falsy
if (undefined) { console.log("undefined is true"); }
else { console.log("undefined is false"); }

// # 출력
// 123 is true
// undefined is false
```

### Truthy & Falsy란?
- **참**이나 **거짓**을 의미하지 않는 값도, 조건문 내에서 참이나 거짓으로 평가되는 특징
- **Truthy 한 값**: 참 같은 값
- **Falsy 한 값**: 거짓 같은 값
- 이를 이용하여 조건문을 간결하게 만들 수 있음

### Falsy한 값
- `undefined`, `null`, `0`, `-0`
- `NaN`, `""`, `0n`

### Truthy한 값
- 7가지 Falsy한 값들을 제외한 나머지 모든 값

### 활용 사례 코드
```javascript
function printName(person) {
  if (!person) { console.log("person의 값이 없음"); return; }
  console.log(person.name);
}
```
> 복잡한 비교 연산자 없이도 값의 유무를 판단하여 안전하게 예외 처리를 할 수 있음

## 단락 평가(Short-circuit Evaluation)
> 논리 연산(&&, ||) 시, 결과가 확정되는 시점에서 평가를 중단하고 해당 값을 반환한다.

```javascript
console.log(false && true); // 앞이 False이니 바로 False 반환
console.log(true || false); // 앞이 True이니 바로 True 반환
```

1. 논리곱 연산자(`&&`)
- `A && B`: A가 Falsy면 B를 볼 필요 없이 A 반환, A가 Truthy면 B 반환
- 모두가 참이어야 하므로, 하나라도 거짓이 나오면 바로 평가 종료
2. 논리합 연산자(`||`)
- `A || B`: A가 Truthy면 B를 볼 필요 없이 A 반환, A가 Falsy면 B 반환
- 하나라도 참이면 되므로, 참이 나오는 순간 바로 평가 종료

### 단락 평가 예제 코드
```javascript
function returnFalse() {
  console.log("False 함수"); return false;
}
function returnTrue() {
  console.log("True 함수"); return true;
}
console.log(returnFalse() && returnTrue());
// # 출력
// False 함수
// false
```
> returnFalse 함수에서 false를 반환했기 때문에 returnTrue 함수는 호출되지 않음
> Truthy & Falsy한 값들도 사용 가능

### 활용 사례 코드
```javascript
function printName(person) {
  const name = person && person.name;
  console.log(name || "person의 값이 없음");
}
printName();
printName({ name: "김선빈" });
```
> `&&` 연산자를 사용하여 `person` 객체가 비어있을 때 발생할 수 있는 **에러를 방지**하고,
> `||` 연산자를 사용하여 값이 없을 때 출력할 **기본 문자열(Default)**을 설정

## 구조 분해 할당
> 배열이나 객체의 속성을 분해해서, 그 값을 변수에 담을 수 있게 하는 표현식

### 배열의 구조 분해 할당 예제 코드
```javascript
let arr = [1, 2, 3];
// 기존 방식
// let one = arr[0];
// let two = arr[1];
let [one, two, three] = arr;
// let [one, two, three, four] = arr; // 오류 발생 X
```
- 배열의 **순서(인덱스)**를 기준으로 변수에 값을 할당함
- 배열의 **원소 개수**를 **초과**해 변수를 선언하더라도 오류가 발생하지 않고 `undefined` 저장

### 객체의 구조 분해 할당 예제 코드
```javascript
let person = {
  name: "김선빈",
  age: 26,
  hobby: "헬스",
};
let {
  age: myAge, // age의 값을 "myAge"라는 변수에 담음
  hobby,
  name,
  extra = "hello",
 } = person;
```
- 객체의 **키(Key)**를 기준으로 변수에 값을 할당
- 변수 이름이 객체의 키 이름과 일치해야 함

### 객체 구조 분해 할당을 이용해서 함수의 매개변수를 얻는 방법
```javascript
const func = ({ name, age, hobby, extra }) => {
  console.log(name, age, hobby, extra);
};
```
- 함수의 **매개변수 선언부**에서 구조 분해 할당을 바로 적용
- 객체를 인자로 받음과 동시에 프로퍼티를 개별 변수로 추출
- 함수 내부에서 `obj.name` 처럼 접근할 필요 없이 간결하게 사용 가능

## Spread 연산자 & Rest 매개변수
### Spread 연산자란?
- **"펼치는 역할"**: 배열이나 객체와 같이 뭉쳐있는 값을 개별 요소로 **해체**하여 펼침
- 주로 배열/객체를 복사하거나 병합할 때 사용

### Spread 연산자 예제 코드
```javascript
// 배열 전개
let arr1 = [1, 2, 3];
let arr2 = [4, ...arr1, 5, 6];

// 객체 전개
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3, d: 4 };

// 함수에서 사용
function funcA(p1, p2, p3) {
  console.log(p1, p2, p3);
}
funcA(...arr1);
```

### Rest(나머지) 매개변수란?
- **"모으는 역할"**: 개별적으로 들어오는 여러 개의 값들을 하나의 **배열(Array)**로 묶어줌
- 함수의 매개변수 정의 시 사용, 항상 맨 마지막에 위치해야 함
- Rest 매개변수는 뒤의 모든 인수들을 배열에 저장하는 기능

### Rest 매개변수 예제 코드
```javascript
function func(one, two, ...rest) { // ...rest가 아닌 ...[이름]도 가능
  console.log(one);  // 1
  console.log(two); // 2
  console.log(rest); // [3, 4, 5] (남은 인자들을 배열로 묶음)
}
func(1, 2, 3, 4, 5);
```

## 원시타입 VS 객체타입
> 원시타입과 객체타입은 값이 저장되거나 복사되는 과정이 서로 다르다.

### 원시 타입 (Primitive Type)
- 종류: `Number`, `String`, `Boolean`, `Null`, `Undefined`, `Symbol`, `BigInt`
- 특징:
  - **불변성(Immutable)**: 메모리에 할당된 값이 변경되지 않음
  - **값에 의한 전달(Pass by Value)**: 변수에 할당할 때 값 그 자체가 복사되어 전달
  - **메모리**: 스택(Stack) 영역에 값이 직접 저장됨

### 객체 타입 (Object Type)
- 종류: `Object`, `Array`, `Function`, `Date`, `RegExp` 등
- 특징:
  - **가변성(Mutable)**: 속성이나 값을 자유롭게 변경할 수 있음
  - **참조에 의한 전달(Pass by Reference)**: 변수에는 값이 있는 메모리 주소가 저장됨
  - **메모리**: 실제 데이터는 힙(Heap) 영역에, 주소 값은 스택(Stack) 영역에 저장

```javascript
// 원시 타입 (값 복사)
let p1 = 1;
let p2 = p1;
p2 = 2;
console.log(p1); // 1 (영향 없음)
console.log(p2); // 2

// 객체 타입 (참조 복사)
let o1 = { name: "김선빈" };
let o2 = o1; // 메모리 주소가 복사됨 (같은 객체를 바라봄)
o2.name = "토란";
console.log(o1.name); // "토란" (o2를 바꿨는데 o1도 바뀜)
console.log(o2.name); // "토란"
```

> 객체 타입 주의사항 1. 의도치 않게 값이 수정될 수 있음

```javascript
let o1 = { name: "김선빈" };
let o2 = o1;
let o3 = { ...o1 };
console.log(o1 === o2); // true
console.log(o1 === o3); // false
console.log(
  JSON.stringify(o1) === JSON.stringify(o3) // true
); // JSON.stringify(): 객체를 문자열로 변환하는 기능
```

> 객체 타입 주의사항 2. 객체간의 비교는 기본적으로 참조값을 기준으로 이루어짐
> 객체 타입 주의사항 3. 배열과 함수도 사실 객체이다.

### 깊은 복사 VS 얕은 복사
> 객체를 복사할 때, 껍데기만 복사할 것인가 내부까지 완벽하게 복사할 것인가의 차이

### 얕은 복사 (Shallow Copy)
- **개념**: 객체의 가장 바깥쪽(1단계) 속성만 새로운 메모리에 복사, 내부에 중첩된 객체는 여전히 참조(주소)를 공유하는 방식
- **방법**: `Spread 연산자(...)`, `Object.assign()`, `Array.prototype.slice()`
- **한계**: 객체 안에 또 다른 객체가 있다면, 그 내부 객체는 원본과 연결되어 있어 수정 시 영향을 받음

```javascript
const obj1 = { name: 김선빈, info: { hobby: "코딩" } };
const obj2 = { ...obj1 }; // 얕은 복사
obj2.name = "토란";  // 1단계: obj1 영향 없음 (잘 분리 됨)
obj2.info.hobby = "운동";   // 2단계(중첩): obj1도 "운동"으로 바뀜 (주소 공유)
console.log(obj1.info.hobby); // "운동"
```

> 강의에서는 Spread 연산자를 깊은 복사라고 설명하고 있어서 내용을 추가하였음

### 깊은 복사 (Deep Copy)
- **개념**: 객체의 1단계뿐만 아니라 내부에 중첩된 모든 객체까지 재귀적으로 복사, 원본과 완벽하게 분리된 새로운 객체를 만드는 방식
- **방법**:
  - `JSON.parse(JSON.stringify(obj))`: 가장 간단하지만, 함수나 `undefined` 등은 복사되지 않음
  - structuredClone(obj): 최신 브라우저에서 지원하는 내장 함수로, 안정적으로 복사함
  - `Lodash 라이브러리`

```javascript
const obj1 = { name: "김선빈", info: { hobby: "코딩" } };
const obj2 = JSON.parse(JSON.stringify(obj1)); // 깊은 복사
obj2.info.hobby = "운동";
console.log(obj1.info.hobby); // "운동" (원본 유지됨됨)
```

> JSON.stringify()로 직렬화 후, JSON.parse()로 다시 객체화하는 방식
> 가장 빠르고 간편하지만, undefined, function 등은 직렬화 대상이 아니므로 손실됨

## 반복문으로 배열과 객체 순회하기
### 순회(Iteration)란?
배열, 객체에 저장된 여러 개의 값에 순서대로 하나씩 접근하는 것을 의미

### 1. 배열 순회 (Array Iteration)
배열은 **인덱스(순서)**를 가지므로, 인덱스를 이용하거나 값을 직접 꺼내는 방식을 사용

### 1.1. 인덱스를 이용한 순회
```javascript
let arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1, 2, 3
}
```

### 1.2. 값을 이용한 순회 (for of 반복문)
```javascript
let arr = [1, 2, 3];
for (let item of arr) { // arr 배열에 있는 값을 하나씩 꺼내어 변수 item에 저장
  console.log(item); // 1, 2, 3
}
```

### 2. 객체 순회 (Object Iteration)
객체는 순서가 없는 **Key-Value 쌍**이므로, **Key**를 먼저 얻거나 **프로퍼티**를 직접 순회하는 방식을 사용

### 2.1. 객체의 Key를 순회 (Object.keys)
- 객체의 **Key(키)**들만 뽑아서 배열로 만든 뒤 순회

```javascript
let person = { name: "김선빈", age: 26, hobby: "운동" };
let keys = Object.keys(person);

for (let i=0; i < keys.length; i++) { console.log(keys[i]); }
for (let key of keys) {
  const value = person[key];
  console.log(key, value);
}
```

### 2.2. 객체의 Value를 순회 (Object.values)
- Key는 필요 없고, **값(Value)**만 빠르게 뽑아서 순회할 때 사용

```javascript
let person = { name: "김선빈", age: 26, hobby: "운동" };
let values = Object.values(person);

for (let value of values) {
  console.log(value);
}
```

### 2.3. 프로퍼티 순회 (for in)
- 객체 전용 반복문으로, 객체의 Key를 순회

```javascript
let person = { name: "김선빈", age: 26, hobby: "운동" };
for (let key in person) {
  const value = person[key];
  console.log(key, value);
}
```

> 주의사항: for in은 객체 순회, for of는 배열 순회 (헷갈릴 수 있음)

## 배열 메서드 1. 요소 조작
> 배열의 요소를 추가·삭제하거나, 두 배열을 합치는 등의 구조적인 변경을 다루는 메서드

| 구분  | 메서드           | 설명            | 반환값        |
| --- | ------------- | ------------- | ---------- |
| 맨 뒤 | push(item)    | 배열 맨 끝에 요소 추가 | 변경된 배열의 길이 |
|     | pop()         | 배열 맨 끝의 요소 제거 | 제거된 요소     |
| 맨 앞 | unshift(item) | 배열 맨 앞에 요소 추가 | 변경된 배열의 길이 |
|     | shift()       | 배열 맨 앞의 요소 제거 | 제거된 요소     |

### 요소 조작 예제 코드
```javascript
let arr = [1, 2, 3];
arr.push(4); // [1, 2, 3, 4] (뒤에 추가)
arr.pop();   // [1, 2, 3] (뒤에서 제거)
arr.unshift(0); // [0, 1, 2, 3] (앞에 추가)
arr.shift(); //  [1, 2, 3]; (앞에서 제거)
```

> `shift`와 `unshift`는 인덱스를 다시 부여하기 때문에 `push`, `pop`보다 비교적 느리게 동작함

### Slice(잘라내기) & Concat(합치기)
- 원본 배열은 그대로 두고, 새로운 배열을 만들어 반환하는 메서드들
- `slice(시작인덱스, 끝인덱스)`: 배열의 특정 범위를 잘라내서 새로운 배열로 반환
- `concat(item)`: 두 개의 배열을 이어 붙여 새로운 배열을 반환

```javascript
// slice 메서드
let arr = [1, 2, 3, 4, 5];
let sliced = arr.slice(0, 2); // [1, 2]
let sliced2 = arr.slice(-3); // [3, 4, 5]

// concat 메서드
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2); // [1, 2, 3, 4]
```

## 배열 메서드 2. 순회와 탐색
> 배열의 모든 요소를 확인하거나, 특정 조건에 맞는 요소를 찾아내는 메서드

### 순회 및 변형 (Iteration)
> 요소를 하나씩 꺼내어 로직을 수행하거나, 새로운 배열을 만든다.

### forEach (단순 순회)
- `for`문을 대체하는 메서드, 반환값 없이 단순히 반복 실행

```javascript
let arr = [1, 2, 3];
arr.forEach(function (item, idx, arr) {
  console.log(idx, item * 2);
});

arr.forEach((item) => {
  console.log(item * 2); // 2, 4, 6 출력
});
```

### includes (존재 여부)
- 배열에 특정 값이 있는지 확인하여 `true / false` 반환

```javascript
let arr = [1, 2, 3];
console.log(arr.includes(2)); // true
console.log(arr.includes(5)); // false
```

### indexOf (인덱스 위치)
- 특정 요소의 인덱스(위치)를 찾아서 반환(없으면 `-1`)
- 배열의 맨 앞부터 탐색
- 객체 배열에서는 주소값이 달라서 못 찾음(얕은 비교)

```javascript
let arr = [2, 2, 3];
console.log(arr.indexOf(2)); // 0
console.log(arr.indexOf(5)); // -1
```

### findIndex (인덱스 찾기)
- 조건(콜백 함수)을 만족하는 **첫 번째 요소의 인덱스**를 반환(없으면 `-1`)
- 특정 프로퍼티의 값을 기준으로 비교해 복잡한 객체값도 탐색 가능

```javascript
let arr = [1, 2, 3];
const idx = arr.findIndex((item) => {
  if (item % 2 !== 0) return true;
});
console.log(idx) // 0

let idx2 = arr.findIndex((item) => item % 2 === 0);
console.log(idx2); // 1 (값 2의 인덱스)

let objectArr = [
  { name: "김선빈" },
  { name: "토란" },
];

console.log(
  objectArr.findIndex(
    (item) => item.name === "김선빈"
  )
); // 0
```

### find (값 찾기)
- 조건(콜백 함수)을 만족하는 **첫 번째 요소 그 자체**를 반환

```javascript
let arr5 = [
  { name: "김선빈" },
  { name: "토란" }
];
const found = arr5.find((item) => item.name === "김선빈" );
console.log(found); // { name: '김선빈' }
```

## 배열 메서드 3. 변형
### filter (필터링 - 여러 개 찾기)
- 조건(콜백 함수)을 만족하는 **모든 요소를 모아서 새로운 배열**로 반환
- 요소를 삭제할 때도 자주 사용됨

```javascript
let arr = [
  { name: "김선빈", hobby: "코딩" },
  { name: "토란", hobby: "코딩" },
  { name: "홍길동", hobby: "운동" }
];
const codingPeople = arr.filter(
  (item) => item.hobby === "코딩"
); // hobby가 "코딩"인 사람만
```

### map (변형 후 새 배열 반환)
- 모든 요소를 순회하면서, 각각 콜백 함수를 실행, **반환된 값들로 구성된 새로운 배열**을 만듦
- 원본 배열은 변하지 않음

```javascript
let arr = [1, 2, 3];
const mapResult = arr.map((item, idx, arr) => {
  return item * 2;
});
console.log(mapResult); // [2, 4, 6]

let arr2 = [
  { name: "김선빈", hobby: "코딩" },
  { name: "토란", hobby: "코딩" },
  { name: "홍길동", hobby: "운동" }
];
let names = arr2.map((item) => item.name); // 이름만 추출
```

### sort (배열 정렬)
- 배열을 사전순(ASCII 코드)으로 정렬하는 메서드
- 원본 배열 자체가 변함
- `sort`는 기본적으로 요소를 문자열로 변환해서 비교
- 숫자를 정렬할 때는 반드시 **비교 함수**를 전달해야 함

```javascript
// 숫자 오름차순 정렬
let arr = [10, 3, 5];
arr.sort((a, b) => {
  if (a > b) {
    // b가 a 앞에 와라
    return 1; // -> b, a 배치
  } else if (a < b) {
    // a가 b 앞에 와라
    return -1; // -> a, b 배치
  } else {
    // 두 값의 자리를 바꾸지 마라
    return 0; // a, b 자리를 그대로 유지
  }
});

// 코드를 이렇게 줄일 수도 있음
let arr2 = [10, 3, 5];
arr2.sort((a, b) => a - b); // [3, 5, 10] 오름차순
arr2.sort((a, b) => b - a); // [10, 5, 3] 내림차순
```

### toSorted (최근에 추가된 최신 함수)
- `sort`와 똑같이 동작하지만, **원본을 유지하고 정렬된 "새로운 배열"을 반환**

```javascript
let arr = ["c", "a", "b"];
const sorted = arr.toSorted();
```

### join (합치기)
- 배열의 모든 요소를 연결해 **하나의 문자열로** 반환

```javascript
let arr = ["안녕", "나는", "김선빈"];
console.log(arr.join());     // "안녕,나는,김선빈"
console.log(arr.join(" ")); // "안녕 나는 김선빈"
```

## Date 객체와 날짜
> 자바스크립트 내장 객체로, 시간의 특정 지점을 저장하고 관리

**Date 객체**는 날짜와 시간을 생성, 수정 출력하는 다양한 메소드를 제공

### Date 객체 예제 코드
```javascript
// 1. 현재 시간 생성
let now = new Date(); // 생성자

// 2. 특정 날짜 생성 (문자열)
let date1 = new Date("2026-02-03");
let date2 = new Date("2026-02-03/10:30:00"); // 시간 포함
//"1997/01/07", "1997.01.07" 구분 가능

// 3. 특정 날짜 생성 (숫자: 연, 월, 일, 시, 분, 초)
// 주의: 월(Month)은 0부터 시작 (1월 = 0)
let date3 = new Date(2026, 1, 3);
```

### 날짜 정보 가져오기 (Getter)
날짜 객체에서 연, 월, 일 등의 정보를 개별적으로 추출할 때 사용

| 메서드           | 설명           | 주의사항                  |
| ------------- | ------------ | --------------------- |
| getFullYear() | 4자리 연도 반환    |                       |
| getMonth()    | 월 (0~11) 반환  | 1월이 0, 12월이 11임       |
| getDate()     | 일 (1~31) 반환  |                       |
| getDay()      | 요일 (0~6) 반환  | 일요일(0)~토요일(6)         |
| getHours()    | 시간 (0~23) 반환 |                       |
| getTime()     | 타임스탬프 반환     | 1970.1.1부터 흐른 밀리초(ms) |

### Date 객체 예제 코드
```javascript
let date = new Date();
// 타임 스탬프
let ts = date.getTime();
let date2 = new Date(ts);

// 시간 요소 추출
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

let hour = date.getHours();
let minute = date.getMinutes();
let seconds = date.getSeconds();
```

### 날짜 수정하기 (Setter)
가져오는 메서드 이름에서 `get`을 `set`으로 바꾸면 수정 가능

```javascript
let date = new Date();
date.setFullYear(2023);
date.setMonth(0); // 1월로 변경

```

### 시간을 여러 포맷으로 출력
Date 객체 자체를 출력하면 포맷이 복잡하므로, 보기 좋은 문자열로 변환

```javascript
let date = new Date();

console.log(date.toDateString());
// 날짜만 (현지 포맷)
console.log(date.toLocaleDateString());
// 시간만 (현지 포맷)
console.log(date.toLocaleTimeString());
// 날짜 + 시간 (현지 포맷)
console.log(date.toLocaleString()); 
```

## 동기(Synchronous)와 비동기(Asynchronous)
> 작업(Task)을 **순서대로** 처리할 것인가, **병렬적**으로 처리할 것인가의 차이

### 1. 동기 처리 (Synchronous)
- **개념**: 코드가 작성된 순서대로 **한 번에 하나씩** 실행됨
- **특징**: 앞선 작업이 끝나지 않으면 뒷 작업은 **기다려야 함(Blocking)**

```javascript
// 동기 처리 예제
console.log("1. 작업 시작");
console.log("2. 긴 작업 중..."); // 이 줄이 끝날 때까지 아랫줄은 실행 안 됨
console.log("3. 작업 끝");

// 출력 순서: 1 -> 2 -> 3 (순서가 보장됨)
```

### 2. 비동기 처리 (Asynchronous)
- **개념**: 특정 작업을 시작만 시켜놓고, 완료를 기다리지 않고 **바로 다음 코드를 실행**
- **특징**: 오래 걸리는 작업을 백그라운드에 맡겨두고 메인 스레드는 멈추지 않음(Non-Blocking)
- 비동기란 동기적이지 않다는 뜻으로 작업을 순서대로 처리하지 않음

```javascript
// 비동기 처리 예제 (setTimeout)
console.log("1. 작업 시작");
// 2초 뒤에 실행해줘! 라고 예약만 걸고 바로 넘어감
setTimeout(() => {
  console.log("2. 오래 걸린 작업 완료!");
}, 2000);
console.log("3. 다음 작업 바로 실행");

// 출력 순서: 1 -> 3 -> (2초 뒤) -> 2

// setTimeout()이라는 비동기 함수를 만나게 되면
// 1. Web APIs에 실행해달라고 부탁 (타이머가 끝나면 실행할 콜백함수를 넘겨줌)
// 2. 다음 작업을 이어서 실행
// 3. 타이머가 완료되면 Web APIs가 콜백함수를 JavaScript Engine에게 돌려줌
// 4. JavaScript Engine은 콜백함수를 실행
```

> 비동기 작업들은 자바스크립트 엔진이 아닌 Web APIs에서 실행됨
> Web APIs란 웹 브라우저가 직접 관리하는 별도의 영역

### 왜 비동기가 필요할까?
자바스크립트 엔진은 **메인 스레드가 단 하나(Single Thread)**뿐입니다. 만약 서버에서 데이터를 받아오는 데 10초가 걸리는 작업을 **동기**로 처리하면, 10초 동안 브라우저 화면이 멈춰버리는 현상이 발생합니다. 이를 방지하기 위해 오래 걸리는 작업은 비동기로 처리해야 합니다.

## 비동기 작업 처리하기 1. 콜백 함수

> 비동기 작업이 완료되면 실행할 함수를 매개변수로 전달하여 결과는 받아보는 방식

자바스크립트의 비동기 함수는 작업을 요청하고 바로 종료되어 버리기 때문에, **결과값(return)**을 변수에 담을 수 없습니다. 따라서, **"작업이 끝나면 이 함수를 실행해서 결과값을 줘!"**라며 함수를 함께 넘겨주는 방식을 사용합니다.

### 기본 사용 방법
비동기 함수 내부에서 작업이 끝난 시점에, 인자로 받은 `callback()` 함수를 호출하며 결과값을 넘겨줌
```javascript
// 비동기 작업을 수행하는 함수
function add(a, b, callback) {
  setTimeout(() => {
    const sum = a + b;
    callback(sum); // 작업이 끝나면 콜백 함수 실행 (결과 전달)
  }, 3000); // 3초 뒤 실행
}

// 함수 호출
add(1, 2, (value) => {
  console.log(value); // 3초 뒤 결과 "3" 출력
});
```

### 콜백 지옥 (Callback Hell)
콜백 함수는 직관적이지만, 비동기 작업의 **순서**를 제어하려고 할 때 코드가 기형적으로 변함
```javascript
function orderFood(callback) {
  setTimeout(() => {
    const food = "피자";
    callback(food);
  }, 3000);
}

function cooldownFood(food, callback) {
  setTimeout(() => {
    const cooldownedFood = `식은 ${food}`;
    callback(cooldownedFood);
  }, 2000);
}

function freezeFood(food, callback) {
  setTimeout(() => {
    const freezedFood = `냉동된 ${food}`;
    callback(freezedFood);
  }, 1500);
}

orderFood((food) => {
  console.log(food);
  cooldownFood(food, (cooldownedFood)=>{
    console.log(cooldownedFood);
    freezeFood(cooldownedFood, (freezedFood) => {
      console.log(freezedFood);
    });
  });
});
```

## 비동기 작업 처리하기 2. Promise

> 비동기 작업을 효율적으로 처리할 수 있도록 도와주는 자바스크립트의 내장 객체

**Promise**는 비동기 처리를 더 유연하게 다루고, **콜백 지옥을 해결**하기 위해 등장
비동기 작업이 "언젠가 완료될 것"이라는 약속(Promise)을 객체로 반환

### Promise의 3가지 상태 (States)
1. **대기(Pending)**: 작업이 진행 중인 상태
2. **성공(Fulfilled / Resolved)**: 작업이 성공적으로 완료됨(`resolve` 호출)
3. **실패(Rejected)**: 작업이 실패함(`reject` 호출)

### 기본 문법 (생성하기)
`executor`라는 실행 함수를 인자로 받으며, 이 함수 안에서 비동기 작업을 수행
- 성공 시: `resolve(결과값)` 호출
- 실패 시: `reject(에러객체)` 호출

```javascript
// Promise 객체 생성
const promise = new Promise((resolve, reject) => {
  // 비동기 작업을 실행하는 함수 (executor)
  setTimeout(() => {
    const num = 10;
    if (typeof num == 'number') {
      resolve(num + 10); // 성공 -> then으로 데이터 전달
    } else {
      reject("숫자가 아닙니다"); // 실패 -> catch로 에러 전달
    }
  }, 2000);
});
```

### 결과 처리하기 (사용하기)
생성된 Promise 객체의 메서드를 체이닝하여 결과를 처리
- `then()`: `resolve`가 호출되면 실행됨 (성공 로직)
- `catch()`: `reject`가 호출되면 실행됨 (실패 로직)

```javascript
// then 메서드
// -> 그 후에
promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Promise Chaining (콜백 지옥 탈출)
`then` 메서드는 결과를 반환하고, 또 다른 Promise를 반환할 수 있습니다. 이를 이용해 **비동기 작업을 순차적으로 연결**할 수 있습니다.

```javascript
taskA(1, 2)
  .then((resA) => {
    console.log(resA);
    return taskB(resA); // 다음 비동기 작업(Promise) 반환
  })
  .then((resB) => {
    console.log(resB); // taskB가 끝나면 실행
    return taskC(resB);
  })
  .then((resC) => {
    console.log(resC); // taskC가 끝나면 실행
  })
  .catch((err) => {
    console.log("중간에 에러가 생기면 여기서 한 번에 처리");
  });
```

> 피라미드 모양이 사라지고, 코드가 세로로 평평하게(Flat) 정리되어 가독성 향상

## 비동기 작업 처리하기 3. async/await

> Promise를 기반으로 하지만, **마치 동기 코드처럼(순서대로)** 작성할 수 있게 해주는 문법

A. `async` (함수 앞에 붙임)
- 이 함수는 **비동기 함수**라고 선언하는 것
- `async`가 붙은 함수는 **무조건 Promise를 반환**

B. `await` (Promise 앞에 붙임)
- 비동기 작업(Promise)이 끝날 때까지 **함수의 실행을 일시 정지**하고 기다림
- 작업이 성공하면 결과값(`resolve` 값)을 반환하고 다음 줄로 넘어감
- 주의: `await`는 반드시 `async` 함수 내부에서만 사용 가능

```javascript
// 기존 Promise 방식 (.then 체이닝)
function main() {
  getData()
    .then((data) => {
      console.log(data);
      return parseData(data);
    }) 
    .then((parsed) => {
      console.log(parsed);
    });
}

// async/await 방식
async function main() {
  // getData가 끝날 때까지 기다렸다가, 결과값을 data에 넣음
  // await은 비동기 함수가 다 처리되기를 기다리는 역할
  const data = await getData();
  console.log(data);
  
  // 위 줄이 끝나야 아래가 실행됨 (동기 코드처럼 보임)
  const parsed = await parseData(data);
  console.log(parsed);
}
```

### Reference

- 인프런 강의: [한 입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지] - 이정환