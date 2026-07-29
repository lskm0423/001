import type { ActualEntry, Assignment, Member, Project, Task } from "../types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "사내 ERP 고도화",
    description: "구매/재고 모듈 리뉴얼 및 API 개편",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    status: "in_progress",
  },
  {
    id: "p2",
    name: "모바일 앱 리뉴얼",
    description: "고객용 모바일 앱 UX 개선 프로젝트",
    startDate: "2026-07-01",
    endDate: "2026-10-31",
    status: "planned",
  },
];

export const MOCK_MEMBERS: Member[] = [
  { id: "m1", name: "김하늘", role: "PM" },
  { id: "m2", name: "이도윤", role: "백엔드 개발자" },
  { id: "m3", name: "박서연", role: "프론트엔드 개발자" },
  { id: "m4", name: "최민준", role: "디자이너" },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    projectId: "p1",
    name: "요구사항 분석",
    plannedStartDate: "2026-06-01",
    plannedEndDate: "2026-06-14",
    plannedHours: 80,
    status: "completed",
  },
  {
    id: "t2",
    projectId: "p1",
    name: "API 설계 및 개발",
    plannedStartDate: "2026-06-15",
    plannedEndDate: "2026-07-31",
    plannedHours: 240,
    status: "in_progress",
  },
  {
    id: "t3",
    projectId: "p1",
    name: "프론트엔드 개발",
    plannedStartDate: "2026-07-01",
    plannedEndDate: "2026-08-31",
    plannedHours: 200,
    status: "planned",
  },
  {
    id: "t4",
    projectId: "p2",
    name: "UX 리서치",
    plannedStartDate: "2026-07-01",
    plannedEndDate: "2026-07-15",
    plannedHours: 60,
    status: "planned",
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: "a1", taskId: "t1", memberId: "m1", allocatedHours: 40, startDate: "2026-06-01", endDate: "2026-06-14" },
  { id: "a2", taskId: "t1", memberId: "m2", allocatedHours: 40, startDate: "2026-06-01", endDate: "2026-06-14" },
  { id: "a3", taskId: "t2", memberId: "m2", allocatedHours: 160, startDate: "2026-06-15", endDate: "2026-07-31" },
  { id: "a4", taskId: "t2", memberId: "m1", allocatedHours: 80, startDate: "2026-06-15", endDate: "2026-07-31" },
  { id: "a5", taskId: "t3", memberId: "m3", allocatedHours: 200, startDate: "2026-07-01", endDate: "2026-08-31" },
];

export const MOCK_ACTUAL_ENTRIES: ActualEntry[] = [
  { id: "e1", taskId: "t1", memberId: "m1", date: "2026-06-05", actualHours: 20, note: "요구사항 인터뷰" },
  { id: "e2", taskId: "t1", memberId: "m1", date: "2026-06-10", actualHours: 22, note: "문서 정리" },
  { id: "e3", taskId: "t1", memberId: "m2", date: "2026-06-12", actualHours: 38, note: "기술 검토" },
  { id: "e4", taskId: "t2", memberId: "m2", date: "2026-07-05", actualHours: 60, note: "API 설계" },
  { id: "e5", taskId: "t2", memberId: "m1", date: "2026-07-10", actualHours: 30, note: "일정 조율" },
];
