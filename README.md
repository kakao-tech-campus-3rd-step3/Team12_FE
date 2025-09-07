# 🧑🏻‍💻 대학생을 위한 팀 일정 관리 매니저, UniSchedule

## 🎯 프로젝트 소개

**UniSchedule**은 대학생들이 팀 프로젝트를 진행할 때 발생하는 일정 조율의 어려움을 해결하기 위해 개발된 웹/앱 애플리케이션입니다.

## 📋 주요 기능

- **캘린더 관리** : 월간/주간/일간 뷰를 지원하는 인터랙티브 캘린더
- **사용자 인증**: 로그인/회원가입 기능 (추후 소셜 로그인으로 확장)
- **현대적인 UI**: Tailwind CSS를 활용한 반응형 디자인
- **모바일 최적화**: 다양한 디바이스에서 최적화된 사용자 경험
- **상태 관리**: Zustand를 활용한 효율적인 상태 관리
- **성능 최적화**: React Query를 통한 서버 상태 관리
- **드래그 앤 드롭**: 직관적인 일정 이동 및 시간 조정

## 🛠 기술 스택

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white)

### 스타일링

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-000000?logo=lucide&logoColor=white)

### 상태 관리

![Zustand](https://img.shields.io/badge/Zustand-000000)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=white)

### 개발 도구

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)
![TS ESLint](https://img.shields.io/badge/TypeScript%20ESLint-3178C6?logo=typescript&logoColor=white)

### Communication

![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white)

## 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

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

## 프로젝트 스크립트

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

## 프로젝트 구조

```
src/
├── apis/                 # API 호출 로직 관리
│   └── apiClient.ts
├── assets/              # 정적 리소스(이미지, 아이콘, 폰트)
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── atoms            # 버튼, 인풋, 로고 등 최소 단위 컴포넌트
│   └── common           # 헤더, 모달, 푸터 등 공통 컴포넌트
├── hooks/               # 커스텀 훅 모음
│   └── index.ts
├── layout/              # 레이아웃 컴포넌트
├── lib/                 # 외부 라이브러리 래퍼, 설정, 유틸
│   └── queryClient.ts
├── pages/               # 라우터와 연결된 페이지 단위 컴포넌트
│   ├── Calendar/
│   ├── Login/
│   └── Signup/
├── routes/              # 라우팅 관련 설정
│   ├── index.tsx        # 전체 라우팅 구성
│   └── path.ts          # 경로 상수 정의
├── store/               # 전역 상태 관리(Zustand)
├── types/               # 전역 타입 정의 (공용 인터페이스, 타입 선업)
├── App.tsx              # 최상위 진입점 컴포넌트
├── main.tsx             # entry 포인트
└── index.css            # 전역 스타일 정의
```

## ⚙️ 개발환경 설정

### 라우터 구조

```typescript
export const RouterPath = {
  HOME: '/',
  CALENDAR: '/calendar',
  CALENDAR_VIEW: '/calendar/:view/:date',
  TEAM: '/team',
  LOGIN: '/login',
  SIGNUP: '/signup',
};
```

## 📝 코딩 컨벤션

### 파일 명명 규칙

- **컴포넌트**: PascalCase (예: `UserProfile.tsx`)
- **훅**: camelCase + use 접두사 (예: `useAuth.ts`)
- **유틸리티**: camelCase (예: `formatDate.ts`)
- **상수**: UPPER_SNAKE_CASE (예: `API_ENDPOINTS`)

### Git 컨벤션

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가
- `chore`: 빌드 과정 또는 보조 도구 변경

## 👥 기여하기

### 기여 방법

1. **이슈 확인**: [Issues](https://github.com/your-username/Team12_FE/issues)에서 작업할 이슈를 확인하세요
2. **포크**: 저장소를 포크하세요
3. **브랜치 생성**: 새로운 기능 브랜치를 생성하세요
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. 개발: 코드를 작성하고 테스트하세요
5. 커밋: 변경사항을 커밋하세요
   ```
   git commit -m 'feat: add amazing feature'
   ```
6. 푸시: 브랜치에 푸시하세요
   ```
   git push origin feature/amazing-feature
   ```
7. Pull Request: Pull Request를 생성하세요

### 기여 가이드라인

- 코드 스타일: Prettier와 ESLint 규칙을 따르세요
- 커밋 메시지: Conventional Commits 형식을 사용하세요
- 테스트: 새로운 기능에 대한 테스트를 작성하세요
- 문서화: README나 코드 주석을 업데이트하세요

### 개발 워크플로우

```
graph LR
   A[이슈 확인] --> B[포크]
   B --> C[브랜치 생성]
   C --> D[개발]
   D --> E[테스트]
   E --> F[커밋]
   F --> G[푸시]
   G --> H[PR 생성]
   H --> I[코드 리뷰]
   I --> J[머지]
```
