# ROADMAP: 프로젝트 리소스 관리 서비스 (MVP)

'구조 우선 접근법(Structure-First)'에 따라, 골격 → 공통 요소 → UI → 핵심 기능 → 최적화 순으로 개발한다. 각 Phase는 이전 Phase의 산출물을 기반으로 확장하며, 기능 로직은 Phase 4 이전까지 구현하지 않는다.

## Phase 1: 전체 골격 구축 (라우트, 빈 페이지, 타입 정의)

- 라우트 정의 (PRD 메뉴 구조 기준)
  - `/` (대시보드)
  - `/projects` (프로젝트 목록)
  - `/projects/:id` (프로젝트 상세)
  - `/projects/:id/tasks/:taskId` (작업 상세)
  - `/members` (팀원 관리)
- 각 라우트에 대응하는 빈 페이지 컴포넌트 생성
  - DashboardPage, ProjectListPage, ProjectDetailPage, TaskDetailPage, MembersPage
- 타입 정의
  - `Project` (F001, F002)
  - `Task` (F003, F004)
  - `Member` (F005)
  - `Assignment` (F006)
  - `ActualEntry` (F007)
- 페이지 간 이동(라우팅)만 동작하는 상태로 완료

## Phase 2: 공통 요소 구현 (공통 컴포넌트, 커스텀 훅, 유틸리티)

- 공통 컴포넌트: Button, Input, Card, ProgressBar, Table, Modal, Timeline(간트용)
- 커스텀 훅(로직 스캐폴딩, 목데이터/로컬 상태 기반)
  - `useProjects` (F001, F002)
  - `useTasks` (F003, F004)
  - `useMembers` (F005)
  - `useAssignments` (F006)
  - `useActualEntries` (F007)
  - `useResourceSummary` (F008, F010)
- 유틸리티: 시간/기간 포맷, 소진율 계산, 폼 검증

## Phase 3: UI 완성 (더미 데이터를 활용한 화면 구성)

- DashboardPage: 프로젝트별 진행률/리소스 소진율 카드 UI, 더미 데이터 (F010)
- ProjectListPage: 프로젝트 리스트 및 등록 폼 UI, 더미 데이터 (F001, F002)
- ProjectDetailPage: 아래 섹션을 더미 데이터로 완성
  - 작업 목록 및 등록 폼 (F003, F004)
  - 일정 타임라인 뷰 (F009)
  - 계획 대비 실적 요약 (F008)
- TaskDetailPage: 아래 섹션을 더미 데이터로 완성
  - 인력 배정 영역 (F006)
  - 실적 투입 기록 폼/목록 (F007)
  - 계획 대비 실적 비교 (F008)
- MembersPage: 팀원 목록/등록 폼, 배정 현황 요약 UI, 더미 데이터 (F005)
- 모든 화면의 인터랙션(버튼, 입력, 상태 변경 등)은 UI 단에서만 동작, 실제 저장/조회 없음

## Phase 4: 핵심 기능 구현 (API 및 DB 연동)

- 프로젝트 등록/조회 API 및 DB 연동 (F001, F002)
- 작업 등록/조회 API 및 DB 연동 (F003, F004)
- 팀원 등록/조회 API 및 DB 연동 (F005)
- 인력 배정 API 및 DB 연동 (F006)
- 실적 투입 기록 API 및 DB 연동 (F007)
- 계획 대비 실적 비교 집계 API 연동 (F008)
- 일정 타임라인 데이터 연동 (F009)
- 대시보드 집계 API 연동 (F010)
- Phase 3의 더미 데이터를 실제 API 응답으로 교체

## Phase 5: 최적화 및 최종 배포

- 코드 리팩토링 및 중복 제거
- 예외 처리 및 에러 화면 보완
- 빌드 최적화
- 최종 QA 및 배포 준비
