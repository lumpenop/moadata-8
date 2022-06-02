# Moadata - Admin Dashboard

## 📜 프로젝트 개요
PC WEB 기반의 차트가 포함된 회원 관리용 admin 사이트

## 🔗 프로젝트 배포

### 🔗 [링크추가]

- 스토리보드
- Test Case

- 개인 과제 수행 보고서

김승원 - https://nantes.tistory.com/387

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

2. Dependencies 설치
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
- 페이지
### 1. 로그인 페이지

  >🍬 로그인 유효성 검사
    
    - input으로 관리자 아이디와 비밀번호를 입력 받고 그 입력 값이 .env에 저장된 관리자 정보와 같은지 비교하여 검증
    - 유효성 검증 결과에 따라서 플로팅 메세지와 팝업이 화면에 출력되도록 구현
    - 인증 결과에 대한 boolean 상태 값을 recoil로 데이터 전역 관리 
  
  > 🍬 로그인 상태 유지
  
    - 로그인 인증 성공 시, Session Storage에 관리자 아이디 값을 저장하여 새로고침이 발생해도 상태가 유지되도록 구현
    
  > 🍬 리다이렉트
    
    - URL을 직접 입력해서 다른 경로에 접근하는 경우, 인증 결과에 대한 상태 값을 참조하여 리다이렉트 처리
    
   > 🍬 비밀번호 블라인드 Toggle 버튼

    - 토글 버튼의 클릭 이벤트가 발생하는 경우 input의 type이 변경될 수 있도록 boolean 상태 값을 관리
    
### 2. 백오피스 홈 페이지

  > 🍬 렌딩 페이지

    - 로그인 시, 백오피스의 홈 페이지가 렌딩 되도록 라우팅 처리되어 내부의 홈 컨텐츠가 보이도록 구현
    
  > 🍬 Header Layout

     - 로그인 한 Admin 계정의 ID를 Session Storage에서 가져와 상단에 '[Admin ID]님'으로 보여짐
     - 로그아웃 버튼 : 인증에 대한 boolean 값을 초기화하고, Admin ID를 담은 Session Storage 정보도 삭제되면서 로그인 페이지로 이동
     
   > 🍬 LNB Layout

      - NavLink를 통해 선택된 리스트에 따라 폰트와 배경 색상의 스타일이 변경되어 하이라이트 처리
      - 선택된 리스트에 따라 화면의 메인 컨텐츠가 알맞게 보여짐 
    
---
### 3. 회원 관리 페이지
### 🍭검색 영역

 >🍬 회원번호/아이디/기간검색 Input

    - input text로 회원 아이디, 회원 정보를 입력 받아 recoil로 데이터 전역 관리
    - date picker로 회원의 가입 기간을 설정하여 조회하도록 구현
    - date picker의 오늘, 1주, 전체 버튼으로 기간을 바로 설정하는 퀵 버튼 구현

> 🍬 검색/초기화 버튼

    - 버튼을 컴포넌트로 제작하여 재사용성을 높임(사이즈 별 구분)
    - 검색 버튼 클릭 시 [아이디 - 기간], [회원 번호 - 기간]에 해당하는 데이터를 local storage 데이터와 비교하여 출력 리스트 생성
    - 초기화 버튼 클릭시 검색 내용 초기값(" ")으로 전환

> 🍬 회원 리스트 검색    

    - 생성된 회원 리스트를 recoil로 전역 관리
    - 생성된 회원 리스트의 숫자를 이용하여 검색된 인원 수 제공
    
 ### **🍭 검색 결과 출력 영역**

> 🍬 검색 버튼

    - 검색 영역에서 recoil에 저장한 회원 리스트를 받아옴

    - 받아온 데이터를 html table에 map으로 출력

    - 회원 정보의 상세 그래프 아이콘을 누르면 회원 상세 페이지로 이동
---

### 4. 회원 상세 관리 페이지
### 🍭심박 그래프, 걸음 수 그래프 구현

> 🍬 데이터

    - 선택한 회원에 맞는 데이터만 상위 컴포넌트에서 props로 전달 받음
    - filter 함수를 이용하여 해당하는 기간의 데이터만 그래프로 그려줌

> 🍬 조회 기간 

    - 회원의 가입일 이전의 날짜와 현재 날짜 이후로는 클릭이 불가
    - 날짜를 사용자가 직접 지정하여 데이터가 있으면 일 단위로 그래프를 보여줌
    
> 🍬 오늘 차트 

    - 가입일 날짜의 심작박동수와 걸음수를 10분 단위로 보여줌
    
> 🍬 1주일 차트 

    - 조회 기간의 첫번째 선택된 날짜를 기준으로 1주일 간의 기록을 보여줌
    
> 🍬 전체 기간 차트 

    - 가입일 날짜 ~ 오늘 날짜 까지 중 데이터가 있는 날만 차트를 보여줌

- 추가 기능
### 5. 우대사항 구현
- 로그인 validation
  
### 6. 
- 데이터 보관 처리
- 리스트 화면 처리
- 페이지 네비게이션 이동 처리


## 🔥 어려웠던 점


## 💎 현재 이슈
머리부터 발끝까지 hot issue 핫!
