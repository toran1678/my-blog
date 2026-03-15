---
title: "JavaScript 기초"
date: "2026-01-29"
category: "개발"
tags: [JavaScript]
excerpt: "JavaScript 기초 핵심 요약"
coverImage: "/my-blog/images/post_img/onebite-react/javascript-basic/javascript.png"
---

# \[ JavaScript ] 자바스크립트 기초 핵심 요약
## JavaScript는 무슨 역할을 하는 언어일까?
> HTML, CSS와 함께 Web 페이지를 개발하기 위해 만들어진 언어

- *HTML*: 웹의 뼈대 (구조와 내용)
- *CSS*: 웹의 피부 (스타일과 디자인)
- *JavaScript*: 웹의 근육 (기능과 동작)
  - 정적인 웹 페이지에 클릭 이벤트, 데이터 통신 등 다양한 **상호작용**을 불어넣습니다.

## JavaScript는 어떻게 실행될까?
> JavaScript는 "JavaScript 엔진"에 의해 실행 됨

JavaScript 엔진은 브라우저에 기본 탑재되어 있음

## 변수와 상수
> 문자열`"hello"`, 숫자`970107`, 배열`[1, 2, 3]`과 같은 값을 저장할 수 있는 공간

변수, 상수는 값을 저장하는 박스라고 생각하면 된다.
### 변수란?
- 변수는 프로그램이 실행되는 도중에 값을 바꿔가면서 저장할 수 있는 저장소
- 초기화되지 않은 변수를 호출하면 "undefined"가 출력 됨
### 상수란?
- 상수는 변수와는 달리 한 번 저장된 값을 다시는 수정할 수 없음
- 선언 시 초기화가 반드시 필요
> 과거에는 `var`을 썼지만, 현재는 호이스팅이나 스코프 문제로 인해 `let`, `const` 사용을 권장한다

### 변수와 상수 예시 코드
```javascript
// 1. 변수
let age = 27;
console.log(age);

// 변수의 값을 수정
age = 30;
console.log(age);

// 2. 상수
const birth = "1997.01.07";
// birth = "2000.01.01"; // 오류 발생

// 3. 변수 명명규칙(네이밍 규칙)
// 3-1. $, _를 제외한 기호는 사용할 수 없음
// 3-2. 숫자로 시작할 수 없음
// 3-3. 예약어를 사용할 수 없음 (예: let, if 등)
```
### 변수 명명규칙(네이밍 규칙)
- 예약어와 '$', '\_'를 제외한 기호는 사용할 수 없고 숫자로 시작할 수 없음
- 변수명은 알아보기 쉽게 지어주어야 협업과 수정에 용이

## 자료형(타입)
> 동일한 속성이나 특징을 가진 원소들을 묶은 것 - 자료형(Type) = 집합

### 원시 타입(Primitive Type)
- 기본형 타입이라고 불림
- 프로그래밍에 있어 가장 기본적인 값들의 타입을 의미

### 자료형 예시 코드
```javascript
// 1. Number Type
let num1 = 27;
let num2 = 3;

let inf = Infinity; // 양의 무한대
let mInf = -Infinity; // 음의 무한대
let nan = NaN; // Not a Number

// 2. String Type
let myName = "김선빈"; // 또는 '김선빈'
let myLocation = "인천";
// 백틱을 이용하여 동적으로 달러사인과 중괄호를 통해서 변수의 값을 문자열에 동적으로 포함할 수 있음
// 템플릿 리터럴 문법
let introduceText = `${myName}은 ${myLocation}에 거주합니다.`;

// 3. Boolean Type
let isSwitchOn = true;

// 4. Null Type (아무것도 없다)
let empty = null;

// 5. Undefined Type
let none;
```

> 알아볼 것: 나머지를 구하는 연산은 모듈러 연산이라고 부르는데 이를 알아보기
### Null과 Undefined의 차이점
![Null과 Undefined의 차이점](/my-blog/images/post_img/onebite-react/javascript-basic/undefined-null.png)

- null은 주소값이 없는 것
- undefined는 값이 할당되지 않은 것

## 형 변환(Type Casting)
> 어떤 값의 타입을 다른 타입으로 변경하는 것
### 형 변환이란?
Number Type을 String Type으로 변환하는 것과 같은 행위를 형 변환이라고 한다.
### 묵시적 형 변환(암묵적 형 변환)
- 개발자가 직접 설정하지 않아도 알아서 자바스크립트 엔진이 형 변환하는 것을 의미
### 명시적 형 변환
- 개발자가 직접 함수 등을 이용해 형 변환을 일으키는 것을 의미
### 형 변환 예시 코드
```javascript
// 1. 묵시적 형 변환
// -> 자바스크립트 엔진이 알아서 형 변환하는 것
let num = 10;
let str = "20";
const result = num + str;
// result 출력: 1020

// 2. 명시적 형 변환
// -> 내장함수 등을 이용해서 직접 형 변환을 명시
// -> 문자열 -> 숫자
const result2 = num + Number(str);
// result2 출력: 30

let str2 = "10개";
let strToNum = parseInt(str2); // 숫자가 앞쪽에 있어야 한다.
// strToNum 출력: 10

// -> 숫자 -> 문자열
let num1 = 20;
let numToStr1 = String(num1);
// numToStr1 + "입니다" 출력: "20입니다"
```
- `Number("10개")`는 `NaN`이 되지만, `parseInt("10개")`는 `10`이 됩니다.
## 연산자
> 프로그래밍에서의 다양한 연산을 위한 기호, 키워드를 말함
> 덧셈(+), 뺄셈(-), 곱셈(\*), 나눗셈(/) 등

### 연산자 예시 코드
```javascript
// 1. 대입 연산자
let var1 = 1;

// 2. 산술 연산자
let num1 = 3 + 2;
let num2 = 3 - 2;
let num3 = 3 * 2;
let num4 = 3 / 2;
let num5 = 3 % 2; // 나머지 연산
// 연산자마다 우선순위가 다르다.

// 3. 복합 대입 연산자
let num6 = 10;
num6 += 20; // num6 + 20

// 4. 증감 연산자
let num7 = 10;
num7++; // 후위 연산 - 이 라인이 끝나고 +1
++num7; // 전위 연산

// 5. 논리 연산자
let or = true || false;
let and = true && false;
let not = !true;

// 비교 연산자
let comp1 = 1 === 2; // 동등 비교 연산자
let comp2 = 1 !== 2; // 비동등 비교 연산자
let comp3 = 2 > 1; // 1은 2 미만?
let comp4 = 2 >= 1; // 1은 2 이하?
```
### 동등 연산자와 일치 연산자
> JavaScript는 일치연산자(\=\=\=)라는 것이 존재

### 동등 연산자
- 두 피연산자의 자료형이 다를 경우, 자동으로 형 변환을 수행한 후 값을 비교
- 예를 들어, `5 == "5"`는 `true` 반환
```javascript
console.log(5 == "5"); // true
console.log("" == false); // true
```
### 일치 연산자
- 동등 연산자 `"=="`는 0과 false를 구분하지 못함
- 일치연산자를 사용하면 데이터 타입의 변환 없이 값을 비교 가능
```javascript
console.log(0 === false) // false
```

### 동등 연산자와 일치 연산자 차이
```javascript
console.log(1 == "1"); // true (타입 변환 발생)
console.log(1 === "1"); // false (타입이 다르므로)
```

### Null 병합 연산자 (Nullish Coalescing)
- `??` 기호를 사용하며, 값이 **확정된** 변수를 찾을 때 유용합니다.
- 피연산자가 `null` 또는 `undefined`일 때만 오른쪽 항을 반환합니다. (`0`이나 `false`는 유효한 값으로 취급)
```javascript
let var1; // undefined
let var2 = 0;
console.log(var1 ?? 10); // 10 출력 (var1이 undefined이므로)
console.log(var2 ?? 10); // 0 출력 (0은 null/undefined가 아니므로 값 유지)
```
Tip: `||` (OR 연산자)는 0을 false로 취급하지만, `??`는 0을 값으로 인정한다는 차이가 있습니다.
### typeof 연산자
- 값의 타입을 문자열로 반환하는 기능을 하는 연산자
```javascript
let var1 = 1;
var1 = "hello";
console.log(typeof var1) // "string" 출력
```
### 삼항 연산자
- 항을 3개 사용하는 연산자
- 조건식을 이용해서 참, 거짓일 때의 값을 다르게 반환
```javascript
// 요구사항: 변수 res에 var8의 값이 짝수 -> "짝", 홀수 -> "홀"
let var8 = 10;
let res = var8 % 2 === 0 ? "짝수" : "홀수"; // "짝수" 출력
```

## 조건문
> 특정 조건을 만족했을 때에만 실행되는 코드를 작성하기 위한 문법
> 대표적으로 if, switch 조건문이 존재

### if 조건문
```javascript
let num = 10;
if (num >= 10) {
  console.log("num은 10 이상입니다.");
} else if (num >= 5) {
  console.log("num은 5 이상입니다.");
} else {
  console.log("조건이 거짓입니다.");
}
```

### switch 조건문
- if문과 기능 자체는 동일
- 다수의 조건을 처리할 때 if보다 더 직관적
```javascript
let animal = "cat";
switch (animal) {
  case "cat": console.log("고양이"); break;
  case "dog": console.log("강아지"); break;
  case "bear": console.log("곰"); break;
  default: console.log("모르는 동물입니다.");
}
```

## 반복문
> 어떠한 동작을 반복해서 수행할 수 있도록 만들어주는 문법

### 반복문 예시 코드
```javascript
for (초기식; 조건식; 증감식) {
  console.log("반복");
}

for (let idx=0; idx < 10; idx++) {
  if (idx % 2 === 0) { continue; } // idx가 짝수일 경우 다음 회차로 넘어감
  console.log(idx);
  if (idx >= 5) { break; } // idx가 5 이상일 경우 반복문 종료
}
```

## 함수
> 재사용 가능한 코드 뭉치로 유지보수 용이

### 함수의 핵심 구조
1. 입력(Input): 함수가 일을 하기 위해 필요한 데이터(매개변수)
2. 처리(Process): 함수 내부에서 수행되는 로직(코드 블록)
3. 출력(Output): 결과값을 돌려줌(반환값)
### 함수 예시 코드
```javascript
function 함수명() {
  // 코드 블록
}
함수명();

function getArea(width, height) {
  function another() { console.log("another"); } // 중첩 함수
  another();
  let area = width * height;
  console.log(area);
}
getArea(10, 20);
```

### JavaScript에서 함수의 특징
- 함수의 호출보다 함수를 아래에 두어도 문제 없이 잘 수행됨
- 호이스팅(끌어올리다)이라는 특징 때문

## 함수 표현식과 화살표 함수
### 함수 표현식 예시 코드
```javascript
// 1. 함수 표현식
function funcA() {
  console.log("funcA");
}
let varA = funcA;
varA();

// 호이스팅 대상이 되지 않는 함수
let varB = function () { // 익명 함수
  console.log("funcB");
}
varB();
```

> JavaScript에서는 함수도 숫자나 문자열과 같은 하나의 값으로 취급
> 함수 자체를 변수에 담아둘 수 있음

### 화살표 함수 예시 코드
```javascript
let varA = () => {
  return 1;
};
console.log(varA()); // 출력 1

let varB = (value) => value + 1;
console.log(varB(1)); // 출력 2

let varC = (value) => {
  return value + 1;
};
```

## 콜백 함수(Callback Function)
> 자신이 아닌 다른 함수에, 인수로써 전달된 함수를 의미

### 예시 코드
```javascript
// 콜백 함수
function main(value) { value() }
function sub() { console.log("sub") }
main(sub); // 출력 sub
```

### 예시 코드 2
```javascript
// 콜백 함수의 활용
function repeat(count, callback) {
  for(let idx=1; idx<=count; idx++) {
    callback(idx);
  }
}

// 1. 일반적인 익명 함수 전달
repeat(5, function (idx) {
  console.log(idx);
});
// 2. 로직이 변경된 콜백
repeat(5, function (idx) {
  console.log(idx * 2);
});
// 3. 화살표 함수 활용: 코드를 더 간결하게 작성
repeat(5, (idx) => {
  console.log(idx * 3);
});
```
### 콜백 함수의 특징
- 동작의 추상화: 함수는 '반복'이라는 틀만 제공, 반복하며 무엇을 할지는 콜백 함수가 결정
- 코드의 재사용성: 동일한 로직을 수정하지 않고도, 호출할 때마다 서로 다른 결과 생성
- 함수를 값처럼 취급: JavaScript에서 함수를 인자로 전달할 수 있다는 점을 이용한 패턴

## 스코프
### 스코프란?
- 우리말로 "범위"를 뜻함
- 변수나 함수에 접근하거나 호출할 수 있는 범위를 말함

### 예시 코드
```javascript
function funcA() { // 함수 안에서만 a에 접근 가능
  let a = 1;
}
console.log(a); // [오류 발생] a라는 변수는 모름 a에 접근 불가
```

### 전역 스코프와 지역 스코프
- 전역 스코프(전체 영역): 전체 영역에서 접근 가능
- 지역 스코프(특정 영역): 특정 영역에서만 접근 가능
- 중괄호 안쪽에 선언된 모든 변수들은 지역 스코프를 가짐
- 함수 선언식에서의 함수도 지역 스코프를 가짐

## 객체
### 객체(Object)란?
- 원시 타입이 아닌 객체 타입의 자료형
- 여러가지 값을 동시에 저장할 수 있는 자료형을 의미
- 현실세계에 존재하는 어떤 사물이나 개념을 표현하기 용이

### 예시 코드
```javascript
// 1. 객체 생성
let obj1 = new Object(); // 객체 생성자
let obj2 = {}; // 객체 리터럴

// 2. 객체 프로퍼티 (객체 속성)
let person = {
  name: "김선빈", // key: value
  nickname: "toran",
  age: 26,
  hobby: "코딩",
  location: "인천",
  extra: {},
  "like cat": true,
};

// 3. 객체 프로퍼티를 다루는 방법
// 3.1 특정 프로퍼티에 접근 (점 표기법, 괄호 표기법)
let name = person.name;
let age = person["age"]; // 대괄호 안의 속성을 쌍따옴표로 잘 묶어주어야 함
let property = "hobby";
let hobby = person[property];

// 3.2 새로운 프로퍼티를 추가하는 방법
person.job = "fe developer";
person["favoriteFood"] = "치킨";

// 3.3 프로퍼티를 수정하는 방법
person.hobby = "운동";
person["favoriteFood"] = "피자";

// 3.4 프로퍼티를 삭제하는 방법
delete person.hobby;
delete person["favoriteFood"];

// 3.5 프로퍼티의 존재 유무를 확인하는 방법 (in 연산자)
let result1 = "name" in person; // name이라는 프로퍼티가 person이라는 객체에 존재하는가?
// result1의 출력: true
```

### 예시 코드 2
```javascript
// 1. 상수 객체
const animal = {
  type: "고양이",
  name: "나비",
  color: "black",
};

// 프로퍼티 추가, 수정, 삭제는 가능
animal.age = 2; // 추가
animal.name = "까망이"; // 수정
delete animal.color; // 삭제
// animal = 123; // 오류 발생

// 2. 메서드
// -> 값이 함수인 프로퍼티를 의미
const person = {
  name: "김선빈",
  sayHi: function () { console.log("안녕"); },
  sayHi2: () => { console.log("안녕"); },
  sayHi3: () { console.log("안녕"); }, // 메서드 선언
}
person.sayHi();
person["sayHi"]();
```

## 배열(Array)
> 여러 개의 값을 순차적으로 담을 수 있는 자료 형

### 배열 예시 코드
```javascript
// 1. 배열 생성
let arrA = new Array(); // 배열 생성자
let arrB = []; // 배열 리터럴

let arrC = [ // 어떠한 값도 넣을 수 있음
  1,
  2,
  true,
  "hello",
  null,
  undefined,
  () => {},
  {},
  [],
];

// 2. 배열 요소 접근
let item1 = arrC[0]; // 1에 접근
arrC[0] = "hello"; // 배열의 값을 수정
```

## 마무리하며
지금까지 JavaScript의 가장 기초적이면서도 핵심적인 문법들을 정리해 보았습니다.

- **데이터 보관**: 변수, 상수, 자료형, 객체, 배열
- **논리 흐름**: 연산자, 조건문, 반복문
- **동작 수행**: 함수, 스코프

### Reference

- 인프런 강의: [한 입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지] - 이정환