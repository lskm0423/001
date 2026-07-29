import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data.sqlite");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id),
    name TEXT NOT NULL,
    planned_start_date TEXT NOT NULL,
    planned_end_date TEXT NOT NULL,
    planned_hours REAL NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS assignments (
    id TEXT PRIMARY KEY,
    task_id TEXT NOT NULL REFERENCES tasks(id),
    member_id TEXT NOT NULL REFERENCES members(id),
    allocated_hours REAL NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS actual_entries (
    id TEXT PRIMARY KEY,
    task_id TEXT NOT NULL REFERENCES tasks(id),
    member_id TEXT NOT NULL REFERENCES members(id),
    date TEXT NOT NULL,
    actual_hours REAL NOT NULL,
    note TEXT NOT NULL DEFAULT ''
  );
`);

const seedProjects = [
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

const seedMembers = [
  { id: "m1", name: "김하늘", role: "PM" },
  { id: "m2", name: "이도윤", role: "백엔드 개발자" },
  { id: "m3", name: "박서연", role: "프론트엔드 개발자" },
  { id: "m4", name: "최민준", role: "디자이너" },
];

const seedTasks = [
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

const seedAssignments = [
  { id: "a1", taskId: "t1", memberId: "m1", allocatedHours: 40, startDate: "2026-06-01", endDate: "2026-06-14" },
  { id: "a2", taskId: "t1", memberId: "m2", allocatedHours: 40, startDate: "2026-06-01", endDate: "2026-06-14" },
  { id: "a3", taskId: "t2", memberId: "m2", allocatedHours: 160, startDate: "2026-06-15", endDate: "2026-07-31" },
  { id: "a4", taskId: "t2", memberId: "m1", allocatedHours: 80, startDate: "2026-06-15", endDate: "2026-07-31" },
  { id: "a5", taskId: "t3", memberId: "m3", allocatedHours: 200, startDate: "2026-07-01", endDate: "2026-08-31" },
];

const seedActualEntries = [
  { id: "e1", taskId: "t1", memberId: "m1", date: "2026-06-05", actualHours: 20, note: "요구사항 인터뷰" },
  { id: "e2", taskId: "t1", memberId: "m1", date: "2026-06-10", actualHours: 22, note: "문서 정리" },
  { id: "e3", taskId: "t1", memberId: "m2", date: "2026-06-12", actualHours: 38, note: "기술 검토" },
  { id: "e4", taskId: "t2", memberId: "m2", date: "2026-07-05", actualHours: 60, note: "API 설계" },
  { id: "e5", taskId: "t2", memberId: "m1", date: "2026-07-10", actualHours: 30, note: "일정 조율" },
];

const insertProject = db.prepare(
  `INSERT OR IGNORE INTO projects (id, name, description, start_date, end_date, status) VALUES (@id, @name, @description, @startDate, @endDate, @status)`,
);
for (const project of seedProjects) insertProject.run(project);

const insertMember = db.prepare(
  `INSERT OR IGNORE INTO members (id, name, role) VALUES (@id, @name, @role)`,
);
for (const member of seedMembers) insertMember.run(member);

const insertTask = db.prepare(
  `INSERT OR IGNORE INTO tasks (id, project_id, name, planned_start_date, planned_end_date, planned_hours, status) VALUES (@id, @projectId, @name, @plannedStartDate, @plannedEndDate, @plannedHours, @status)`,
);
for (const task of seedTasks) insertTask.run(task);

const insertAssignment = db.prepare(
  `INSERT OR IGNORE INTO assignments (id, task_id, member_id, allocated_hours, start_date, end_date) VALUES (@id, @taskId, @memberId, @allocatedHours, @startDate, @endDate)`,
);
for (const assignment of seedAssignments) insertAssignment.run(assignment);

const insertActualEntry = db.prepare(
  `INSERT OR IGNORE INTO actual_entries (id, task_id, member_id, date, actual_hours, note) VALUES (@id, @taskId, @memberId, @date, @actualHours, @note)`,
);
for (const entry of seedActualEntries) insertActualEntry.run(entry);
