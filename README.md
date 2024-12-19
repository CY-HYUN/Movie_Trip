# 무비트립 (Movie Trip): 영화 팬을 위한 맞춤형 여행 솔루션

**무비트립(Movie Trip)**은 국내 영화 및 드라마 촬영지를 기반으로 사용자에게 맞춤형 경로를 제공하는 혁신적인 여행 플랫폼입니다. 영화 팬과 여행 애호가를 대상으로 한 이 플랫폼은 촬영지 방문이라는 새로운 형태의 관광 경험을 제공하며, 지역 사회 경제 활성화와 문화 자원의 활용을 목표로 합니다.

---

## 📌 프로젝트 개요

### 프로젝트 배경
1. **영화 및 드라마 촬영지 방문 수요 증가**:
   - 전 세계적으로 영화 및 드라마 콘텐츠 소비가 증가하면서, 팬들이 촬영지를 방문하려는 수요가 급증하고 있습니다.
   - 그러나 기존의 여행 플랫폼은 영화 콘텐츠와 촬영지를 연결한 경로 제공 기능이 부족합니다.

2. **지역 사회의 문화 자원 활용 필요성**:
   - 촬영지는 지역의 독특한 문화 자원으로, 이를 효과적으로 활용하면 관광 산업 발전에 기여할 수 있습니다.
   - 지역 경제 활성화를 위해 문화 콘텐츠 기반의 관광 자원화 필요성이 대두되고 있습니다.

3. **여행 산업과 영화 콘텐츠의 결합**:
   - 관광 산업은 점점 개인화되고 있으며, 사용자의 관심사에 맞는 맞춤형 여행 서비스에 대한 요구가 증가하고 있습니다.
   - 무비트립은 이러한 요구를 충족시키기 위해 설계되었습니다.

---

### 프로젝트 목표
- 영화 및 드라마 촬영지 기반의 맞춤형 경로 안내 서비스를 개발.
- 촬영지 방문을 통해 지역 경제와 문화 자원을 활성화.
- 사용자가 리뷰, 평점, 경로 저장 등 다양한 커뮤니티 활동에 참여할 수 있는 환경 제공.

---

## 📋 프로젝트 상세 설명

### 1️⃣ 주요 시스템 수행 시나리오
**로그인 및 회원가입**
- 사용자는 계정을 생성한 후 로그인하여 서비스를 이용할 수 있습니다.
- 리더보드에서 사용자의 업적과 참여 상태를 확인할 수 있습니다.

**영화 검색 및 촬영지 선택**
- 사용자가 영화나 드라마를 검색하면 관련 촬영지 목록이 제공됩니다.
- 촬영지별 상세 정보(주소, 사진, 설명, 관련 영화 정보)와 사용자 리뷰를 확인할 수 있습니다.

**촬영지 경로 제공**
- 카카오 지도 API를 활용하여 촬영지 간 최적 경로를 생성하고, 지도로 시각화합니다.
- 사용자는 1개 이상의 촬영지를 선택하여 자신만의 경로를 생성할 수 있습니다.

**경로 저장 및 관리**
- 생성된 경로는 데이터베이스에 저장되며, My 페이지에서 관리할 수 있습니다.
- 캘린더 기능을 통해 사용자는 경로별 일정 계획을 세울 수 있습니다.

**리뷰 및 평점**
- 사용자는 촬영지에 대한 리뷰를 작성하고 별점을 매길 수 있습니다.
- 다른 사용자의 리뷰를 통해 촬영지에 대한 정보를 얻을 수 있습니다.

**추가 예정 기능**
- 주변 숙소 및 음식점 정보 제공.
- AI 기반 날씨 정보 및 대중교통 안내.
- 퀘스트 형식의 업적 달성률 제공.

---

### 2️⃣ 데이터 설계

**ERD(Entity-Relationship Diagram)**:
- `Users`: 사용자 정보 테이블 (ID, 이름, 이메일, 업적 등).
- `Movies`: 영화 정보 테이블 (제목, 개봉일, 장르, 평점 등).
- `Locations`: 촬영지 정보 테이블 (촬영지 이름, 주소, 관련 영화 등).
- `Routes`: 사용자가 생성한 경로 저장 (촬영지 목록, 경로 이름, 사용자 ID 등).
- `Reviews`: 사용자 리뷰 테이블 (리뷰 내용, 별점, 작성자 ID 등).

**주요 데이터베이스 관계**:
- `Movies`와 `Locations`는 다대다(M:N) 관계로 설정.
- `Users`와 `Routes`는 1대다(1:N) 관계로 설정.

---

### 3️⃣ 주요 기능 및 설계

#### 시스템 구성
1. **웹 프론트엔드**:
   - React와 TypeScript 기반으로 구현.
   - 반응형 웹 디자인을 통해 데스크톱, 태블릿, 모바일 환경에서 모두 사용할 수 있도록 설계.
2. **모바일 애플리케이션**:
   - Flutter를 활용하여 Android 애플리케이션 개발.
   - 웹과 동일한 기능을 제공하며, 앱 전용 UI로 최적화.
3. **백엔드 서버**:
   - Next.js를 사용하여 서버 및 API 개발.
   - Prisma ORM을 통해 데이터베이스 접근성과 효율성을 개선.
4. **지도 및 경로 기능**:
   - 카카오 지도 API를 활용하여 최적 경로를 제공.
   - 사용자의 선택에 따라 경로를 시각화하고, 촬영지 정보와 연결.

#### UI 설계
- **로그인 및 회원가입 화면**:
  - 간단하고 직관적인 사용자 인터페이스 제공.
- **메인 화면**:
  - 검색창을 통해 영화 및 드라마 검색.
  - 인기 영화 및 추천 경로 표시.
- **경로 생성 화면**:
  - 사용자가 촬영지를 선택하고, 경로를 저장.
  - 지도 상에서 촬영지 간 이동 경로 시각화.
- **리뷰 화면**:
  - 사용자 리뷰와 별점 확인 및 작성.
  - 작성된 리뷰는 커뮤니티에서 공유 가능.

---

## 📈 프로젝트 결과

### 주요 성과
1. **웹 및 앱 동시 제공**:
   - React와 Flutter를 활용하여 사용자가 웹과 앱에서 동일한 경험을 제공받도록 설계.
2. **촬영지 기반 경로 안내**:
   - 사용자가 선택한 영화 및 촬영지에 따라 맞춤형 경로 생성.
3. **커뮤니티 활성화**:
   - 리뷰 및 평점 시스템을 통해 사용자 간 상호작용 강화.

### 데이터 분석 결과
- **촬영지별 인기 순위**:
  - 가장 많이 방문한 촬영지 및 관련 영화 분석.
- **사용자 행동 분석**:
  - 경로 생성 빈도, 리뷰 작성 비율, 참여도 등 데이터 기반 인사이트 제공.

---

## 🛠️ 기술 스택 및 개발 환경

### 기술 스택
1. **프론트엔드**:
   - React (TypeScript 기반), CSS.
   - 반응형 웹 디자인 구현.
2. **백엔드**:
   - Next.js 및 Prisma ORM.
   - RESTful API 설계 및 구현.
3. **모바일**:
   - Flutter로 Android 애플리케이션 개발.
4. **지도 서비스**:
   - 카카오 지도 API를 사용하여 경로 제공.

### 개발 환경
- IDE: Visual Studio Code, Android Studio.
- 데이터베이스: MySQL.
- 서버 환경: Node.js, Next.js.

---

## 📊 기대 효과 및 추가 개발 계획

### 기대 효과
1. **관광 산업 활성화**:
   - 촬영지 방문을 통해 지역 경제와 문화 자원 활용에 기여.
2. **영화 팬과 여행 애호가의 만족도 증대**:
   - 개인화된 여행 경로 제공.
3. **새로운 시장 창출**:
   - 영화 콘텐츠와 관광의 결합으로 새로운 비즈니스 모델 제안.

### 추가 개발 계획
- AI 기반 추천 시스템:
  - 사용자의 영화 선호도에 따라 촬영지 및 경로 추천.
- 대중교통 안내 및 날씨 정보:
  - 실시간 교통 상황 및 날씨 데이터를 활용한 경로 안내.
- 더 많은 영화 및 촬영지 데이터 확장:
  - 다양한 국가와 지역의 영화 데이터를 통합.
