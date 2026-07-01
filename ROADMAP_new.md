# ROADMAP: Technical Readiness Planner for Abatement Development Project (MVP)

'구조 우선 접근법(Structure-First)'에 따라, 골격 → 공통 요소 → UI → 핵심 기능 → 최적화 순으로 개발한다. 각 Phase는 이전 Phase의 산출물을 기반으로 확장하며, 기능 로직은 Phase 4 이전까지 구현하지 않는다.

## Phase 1: 전체 골격 구축 (라우트, 빈 페이지, 타입 정의)

- 라우트 정의 (PRD 메뉴 구조 기준)
  - `/login`
  - `/dashboard`
  - `/projects` (목록)
  - `/projects/new` (등록)
  - `/projects/:id` (상세)
- 각 라우트에 대응하는 빈 페이지 컴포넌트 생성
  - LoginPage, DashboardPage, ProjectListPage, ProjectCreatePage, ProjectDetailPage
- 타입 정의
  - `User` (F001)
  - `Project` (F002~F004)
  - `AbatementTechnology` (F005)
  - `TRLAssessment` (F006)
  - `ChecklistItem` (F007)
  - `Comment` (F009)
- 페이지 간 이동(라우팅)만 동작하는 상태로 완료

## Phase 2: 공통 요소 구현 (공통 컴포넌트, 커스텀 훅, 유틸리티)

- 공통 컴포넌트: Button, Input, Table, Card, Modal, Checklist Item, TRL Selector/Badge
- 커스텀 훅(로직 스캐폴딩, 목데이터/로컬 상태 기반)
  - `useAuth` (F001)
  - `useProjects` (F002, F003, F004)
  - `useTechnologies` (F005)
  - `useTRLAssessment` (F006)
  - `useChecklist` (F007)
  - `useComments` (F009)
- 유틸리티: TRL 값 매핑, 날짜 포맷, 폼 검증

## Phase 3: UI 완성 (더미 데이터를 활용한 화면 구성)

- LoginPage: 로그인 폼 UI (F001)
- DashboardPage: 프로젝트별 준비도 요약 UI, 더미 데이터로 구성 (F008)
- ProjectListPage: 프로젝트 목록 테이블 UI, 더미 데이터 (F003)
- ProjectCreatePage: 프로젝트 등록 폼 UI (F002)
- ProjectDetailPage: 아래 섹션을 더미 데이터로 완성 (F004)
  - 감축 기술 목록 섹션 (F005)
  - TRL 평가 섹션 (F006)
  - 준비도 체크리스트 섹션 (F007)
  - 코멘트 섹션 (F009)
- 모든 화면의 인터랙션(버튼, 입력, 체크 등)은 UI 단에서만 동작, 실제 저장/조회 없음

## Phase 4: 핵심 기능 구현 (API 및 DB 연동)

- 인증 API 연동, 세션 처리 (F001)
- 프로젝트 등록/목록/상세 API 및 DB 연동 (F002, F003, F004)
- 감축 기술 등록/수정/삭제 API 연동 (F005)
- TRL 평가 입력/저장 API 연동 (F006)
- 준비도 체크리스트 등록/체크 상태 저장 API 연동 (F007)
- 대시보드 집계 데이터 API 연동 (F008)
- 코멘트 작성/조회 API 연동 (F009)
- Phase 3의 더미 데이터를 실제 API 응답으로 교체

## Phase 5: 최적화 및 최종 배포

- 코드 리팩토링 및 중복 제거
- 예외 처리 및 에러 화면 보완
- 빌드 최적화
- 최종 QA 및 배포 준비
