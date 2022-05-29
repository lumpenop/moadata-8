# Moadata - Admin Dashboard

## 📜 프로젝트 개요
PC WEB 기반의 차트가 포함된 회원 관리용 admin 사이트

## 🔗 프로젝트 배포

### 🔗 [링크추가]

- 스토리보드
- Test Case

## ⚙ 기술 스택
  <img src="https://img.shields.io/badge/TypeScript-v4.4.2-blue"/>
  <img src="https://img.shields.io/badge/React-v18.1.0-blue"/>
  <img src="https://img.shields.io/badge/Redux/toolkit-v1.8.1-blue"/>
  <img src="https://img.shields.io/badge/React Router Dom-v6.3.0-blue"/>

```
그 외 추가 라이브러리
  - "bignumber.js": "^9.0.2"
  - "dayjs": "^1.11.2"
  - "react-datepicker": "^4.8.0"
  - "react-use": "^17.3.2"
  - "recoil": "^0.7.3-alpha.2"
  - "store": "^2.0.12"
  - "victory": "^36.4.0"
```

## 🎄 Router 구조

```
'/' 로그인화면
'/home' 메인화면
'/management' 회원 관리
'/management/detail/:id' 회원 상세
```

## 🎄 프로젝트 트리

```
src
 ┣ assets       // svg 파일
 ┣ components   // 공통으로 사용하는 컴포넌트
 ┣ hooks        // Custom Hooks
 ┣ routes       // 페이지
 ┣ services     // API 호출 관련
 ┣ store        // 전역 상태
 ┣ styles       // 전역 style
 ┣ types        // 필요한 type 정의
```

## 📍 Getting Started / 어떻게 시작하나요?

0. 빈 폴더 생성

1. Repository 클론
```sh
$ git clone [폴더명]
```

2. Dependecies 설치
```sh
$ yarn install
```

3. Run 실행
```sh
$ yarn start
```

※ **.env 키 추가**

1.

## 🖼 실행 이미지

## 🔧구현 방법
### 페이지
1. 로그인 화면
    - 로그인
2. 백오피스 홈 페이지
    - 페이지 구현 (요구 사항)
3. 회원 관리 페이지
    - 검색 영역
        - 3.1.1: input text로 회원 아이디, 회원 정보를 입력 받아 recoil로 데이터 전역 관리
        - 3.1.2: date picker로 회원의 가입 기간을 설정하여 조회하도록 구현
        - 3.1.3: 검색 버튼 클릭 시 아이디 - 기간, 회원 번호 - 기간에 해당하는 데이터를 local storage데이터와 비교하여 출력 리스트 생성
        - 3.1.4: 생성된 출력 리스트를 recoil로 전역 관리
    - 검색 결과 출력 영역
        - 3.2.1: 검색 영역. (작성ing..)
4. 회원 상세 관리 페이지
    - 심박 그래프 구현
    - 걸음수 그래프 구현

### 추가 기능
5. 우대사항 구현
    - 로그인 validation
  
6. 
    - 데이터 보관 처리
    - 리스트 화면 처리
    - 페이지 네비게이션 이동 처리


## 🔥 어려웠던 점


## 💎 현재 이슈
hot issue 핫!
