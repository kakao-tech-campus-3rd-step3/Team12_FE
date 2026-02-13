# 🧑🏻‍💻 대학생을 위한 팀 일정 관리 매니저, UniSchedule (FE)

대학생들의 복잡한 팀 프로젝트와 개인 일정을 한 번에 관리해주는 대학생 맞춤형 일정 관리 서비스입니다. 조별 과제, 동아리, 스터디 등 팀 활동에 최적화된 기능을 제공하여 일정 조율의 효율을 높이고 커뮤니케이션 비용을 절감하는 것을 목표로 합니다.

[ 🎬 시연 영상 ]  https://drive.google.com/file/d/1Kyhudr9JqhYTI_yAzuZxC_IdD2Ho9BmP/view?usp=drive_link

### 1. 프로젝트 배경

#### 1.1. 국내외 시장 현황 및 문제점

- 기존 캘린더 서비스의 한계
    - Google 캘린더 
        - 팀원 간의 실질적인 공통 가용 시간을 파악하기 위해 복잡한 공유 설정이 필요합니다. 특히, 팀 공유 기능은 유료 Workspace 구독이 필요해 접근성이 낮습니다.
    - When2Meet 등 일회성 일정 조율 도구
        - 일회성 조율 조구는 지속적인 일정 관리가 어렵고 캘린더 기능이 부족합니다.

#### 1.2. 필요성과 기대효과

대학생들에게 비용 부담이 낮고 접근성이 좋으며, 지속적인 일정 관리가 가능한 맞춤형 서비스가 필요합니다.

본 서비스에서는 개인 캘린더 및 팀 캘린더 기능을 함께 제공하고, 에브리타임 시간표 및 Google 캘린더 연동을 지원해서 일정 관리 편의성을 높였습니다.

팀원들의 가용 시간을 자동으로 분석하고 최적의 회의 시간을 추천함으로써, 일정 조율에 필요한 커뮤니케이션 비용을 크게 줄일 수 있을 것으로 기대합니다.

### 2. 개발 목표

#### 2.1. 목표 및 세부 내용

> 목표

- 개인 일정과 팀 일정을 통합 관리하는 직관적인 캘린더 UI 구축
- 팀원 간 가용 시간 조회를 통한 최적 일정 추천 기능 제공
- 개인 일정 내용 노출 방지(사생활 보호)를 위한 UI/UX 설계
- 에브리타임 시간표, Google 캘린더 등 외부 일정 연동 기능 제공

> 세부 구현 내용

1. 유연한 일정 관리 UI
    - FullCalendar를 활용한 월간/주간/일간 뷰 지원
    - 일정 CRUD 인터페이스 (단일 일정/반복 일정)
    - 개인/팀 일정 시각적 구분 및 필터링
    - RRULE 기반 반복 일정 처리 및 시각화
    - 반복 규칙 설정, 특정 날짜 예외 처리, 팀 일정 참여자 선택 등 상세 옵션 제공
    - 드래그 앤 드롭을 통한 직관적인 일정 이동 및 시간 조정

2. 외부 일정 연동 기능
    - 에브리타임 시간표 연동 UI (이미지 업로드 및 링크 연동)
    - Google 캘린더 일정 동기화 UI (OAuth2 연동)

3. 직관적인 팀원 일정 공유
    - 초대 코드 기반 팀 생성 및 가입 UI
    - 팀 일정 생성 시, 팀원 캘린더에 일정 자동 반영
    - 팀 가용 일정 조회 및 시각화 (그리드 형태)
    - 팀원 전체 참여 가능 시간대 추천 UI
    - WebSocket 기반 실시간 팀 채팅 인터페이스

4. 사용자 경험 최적화
    - 반응형 디자인으로 모바일/데스크톱 최적화
    - React Query를 통한 효율적인 서버 상태 관리 및 캐싱
    - Zustand를 활용한 클라이언트 상태 관리
    - 로딩 상태 및 에러 처리 UI

#### 2.2. 기존 서비스 대비 차별성

| 주요 기능 | Google Calendar | When2Meet | Notion | UniSchedule |
| :--- | :--- | :--- | :--- | :--- |
| 수업 일정 등록 | 매 학기 수동 등록 | 기능 없음 | 수동 등록 | 에브리타임 연동 |
| 팀원 일정 확인 | 모든 캘린더 공유/초대 필요 | 가능한 시간 투표 | 구글 캘린더 공유 필요 | 팀 생성/참여 및<br>팀원 가용 시간 확인 가능 |
| 프라이버시 | 일정 공개 여부 선택 가능 | 익명 투표 | 일정 공개 여부 선택 불가능 | 시간만 공유 |
| 팀 일정 등록 | 유료 Workspace 사용 필요 | 미제공 | 구글 캘린더 의존 | 팀 내 메신저 및<br>팀 일정 등록 가능 |

### 3. 기술 스택

## 🛠 기술 스택

### 💻 Frontend Toolkit
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### 🎨 Styling
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)

### 🔄 State Management
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

### 📚 Key Libraries
![FullCalendar](https://img.shields.io/badge/FullCalendar-2B5CE6?style=for-the-badge&logo=fullcalendar&logoColor=white)
![React Day Picker](https://img.shields.io/badge/React_Day_Picker-FF6B6B?style=for-the-badge&logo=react-day-picker&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![RRule](https://img.shields.io/badge/RRule-4A90E2?style=for-the-badge&logo=rrule&logoColor=white)

### 🛠 Development Tools
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![TypeScript ESLint](https://img.shields.io/badge/TypeScript_ESLint-3178C6?style=for-the-badge&logo=typescript-eslint&logoColor=white)

### 🧩 Cowork Tools
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

### 4. 시작하기

#### 4.1. 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

#### 4.2. 설치 및 실행

1. **저장소 클론**

```bash
git clone <repository-url>
cd Team12_FE
```

2. **의존성 설치**

```bash
npm install
```

3. **개발 서버 실행**

```bash
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

### 5. 프로젝트 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 코드 린팅
npm run lint

# 코드 포맷팅
npm run format

# 포맷팅 검사
npm run format:check
```

### 6. 프로젝트 구조

```
src/
├── apis/
│ ├── client/
│ ├── constants/ # API 엔드포인트 상수
│ ├── services/
│ │ ├── auth.ts # 인증 API
│ │ ├── calendar.ts # 캘린더 API
│ │ ├── chat.ts # 채팅 API
│ │ ├── team.ts # 팀 API
│ │ └── everytime.ts # 에브리타임 시간표 연동 API
│ └── types/
├── assets/
├── components/
│ ├── atoms/ # 버튼, 인풋, 로고
│ ├── molecules/ # 모달, 페이지네이션
│ └── organisms/ # 헤더, 드로어
├── hooks/
│ ├── calendar/
│ ├── team/
│ ├── timetable/
│ └── modal/
├── layout/
├── lib/
│ ├── queryClient.ts # React Query 클라이언트 설정
│ └── queryKeys.ts # React Query 키 관리
├── pages/
│ ├── Calendar/ # 공통 캘린더 컴포넌트
│ ├── PersonalCalendar/
│ ├── TeamCalendar/
│ ├── TimeTable/
│ ├── Login/
│ └── Signup/
├── routes/
│ ├── index.tsx
│ └── path.ts
├── store/ # 전역 상태 관리(Zustand)
│ ├── calendar/
│ ├── team/
│ └── useAuthStore.ts
├── types/
├── utils/ # 유틸리티 함수
│ ├── dateTimeUtils.ts # 날짜/시간
│ ├── eventUtils.ts # 이벤트
│ ├── rruleUtils.ts # RRULE
│ └── timetableUtils.ts# 시간표
├── styles/
├── App.tsx
├── main.tsx
└── index.css
```

### 7. 주요 기능 구현

#### 7.1. 캘린더 뷰

- **FullCalendar 라이브러리 활용**: 월간/주간/일간 뷰 전환
- **드래그 앤 드롭**: 일정 이동 및 시간 조정
- **일정 모달**: 일정 생성/수정/삭제 인터페이스
- **반복 일정 처리**: RRULE 기반 반복 규칙 설정 및 시각화

#### 7.2. 팀 가용 시간 시각화

- **가용 시간 그리드**: 팀원별 가용 시간을 그리드 형태로 표시
- **추천 시간대**: 팀원 전체가 참여 가능한 시간대 자동 계산 및 하이라이트
- **시간대 필터링**: 특정 시간대만 필터링하여 확인 가능

#### 7.3. 실시간 채팅

- **WebSocket 연동**: 실시간 메시지 송수신
- **팀 채팅 UI**: 팀별 채팅방 인터페이스
- **메시지 히스토리**: 과거 메시지 조회 및 표시

#### 7.4. 시간표 연동

- **에브리타임 연동**: 이미지 업로드 또는 링크를 통한 시간표 연동
- **시간표 파싱**: 이미지 분석을 통한 자동 시간표 등록
- **시간표 편집**: 등록된 시간표 수정 및 관리

### 8. 개발환경 설정

#### 8.1. 라우터 구조

```typescript
export const RouterPath = {
  HOME: {
    DEFAULT: '/',
    VIEW: '/:view/:date',
  },
  TEAM_CALENDAR: {
    DEFAULT: '/team-calendar/:id',
    VIEW: '/team-calendar/:id/:view/:date',
  },
  TIMETABLE: '/timetable',
  LOGIN: '/login',
  SIGNUP: '/signup',
};
```

#### 8.2. 환경 변수

프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
```

### 9. 코딩 컨벤션

#### 9.1. 파일 명명 규칙

- **컴포넌트**: PascalCase (예: `UserProfile.tsx`)
- **훅**: camelCase + use 접두사 (예: `useAuth.ts`)
- **유틸리티**: camelCase (예: `formatDate.ts`)
- **상수**: UPPER_SNAKE_CASE (예: `API_ENDPOINTS`)

#### 9.2. 컴포넌트 구조

- **Atomic Design 패턴**: atoms, molecules, organisms로 컴포넌트 계층화
- **커스텀 훅**: 재사용 가능한 로직은 커스텀 훅으로 분리
- **타입 정의**: TypeScript를 활용한 타입 안전성 보장

#### 9.3. Git 컨벤션

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가
- `chore`: 빌드 과정 또는 보조 도구 변경

