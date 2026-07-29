import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Field, Input, MemberSelect, NavBar, ProgressBar, Table } from "../components";
import { useAppContext } from "../context/AppContext";
import { useTaskResourceSummary } from "../hooks/useResourceSummary";
import { formatDate, formatDateRange } from "../utils/date";
import { isPositiveNumber } from "../utils/validation";

export default function TaskDetailPage() {
  const { taskId } = useParams<{ id: string; taskId: string }>();
  const {
    getTaskById,
    members,
    membersError,
    getMemberById,
    getAssignmentsByTask,
    addAssignment,
    getEntriesByTask,
    addActualEntry,
  } = useAppContext();

  const [assignMemberId, setAssignMemberId] = useState("");
  const [assignHours, setAssignHours] = useState("");
  const [assignError, setAssignError] = useState("");

  const [entryMemberId, setEntryMemberId] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [entryHours, setEntryHours] = useState("");
  const [entryNote, setEntryNote] = useState("");
  const [entryError, setEntryError] = useState("");

  const task = getTaskById(taskId ?? "");
  const assignments = getAssignmentsByTask(taskId ?? "");
  const taskActualEntries = getEntriesByTask(taskId ?? "");
  const summary = useTaskResourceSummary(task, taskActualEntries);

  if (!task) {
    return (
      <div>
        <NavBar />
        <div className="list-empty">작업을 찾을 수 없습니다.</div>
      </div>
    );
  }

  async function handleAssign() {
    const hours = Number(assignHours);
    if (!assignMemberId || !isPositiveNumber(hours)) {
      setAssignError("팀원과 배정 시간을 올바르게 입력해주세요.");
      return;
    }
    if (!task) return;
    try {
      await addAssignment({
        taskId: task.id,
        memberId: assignMemberId,
        allocatedHours: hours,
        startDate: task.plannedStartDate,
        endDate: task.plannedEndDate,
      });
      setAssignMemberId("");
      setAssignHours("");
      setAssignError("");
    } catch (err) {
      setAssignError(err instanceof Error ? err.message : "인력을 배정하지 못했습니다.");
    }
  }

  async function handleAddEntry() {
    const hours = Number(entryHours);
    if (!entryMemberId || !entryDate || !isPositiveNumber(hours)) {
      setEntryError("팀원, 날짜, 실제 투입 시간을 올바르게 입력해주세요.");
      return;
    }
    if (!task) return;
    try {
      await addActualEntry({
        taskId: task.id,
        memberId: entryMemberId,
        date: entryDate,
        actualHours: hours,
        note: entryNote,
      });
      setEntryMemberId("");
      setEntryDate("");
      setEntryHours("");
      setEntryNote("");
      setEntryError("");
    } catch (err) {
      setEntryError(err instanceof Error ? err.message : "실적을 저장하지 못했습니다.");
    }
  }

  return (
    <div>
      <NavBar />
      <h2>{task.name}</h2>
      <p>{formatDateRange(task.plannedStartDate, task.plannedEndDate)}</p>
      {membersError && <p className="form-error">{membersError}</p>}

      <Card title="계획 대비 실적">
        <p>
          {summary.actualHours}h / {summary.plannedHours}h
        </p>
        <ProgressBar percent={summary.utilizationRate} />
      </Card>

      <Card title="인력 배정">
        <Table
          items={assignments}
          getKey={(a) => a.id}
          emptyMessage="배정된 인력이 없습니다."
          columns={[
            { key: "member", header: "팀원", render: (a) => getMemberById(a.memberId)?.name ?? "-" },
            { key: "hours", header: "배정 시간", render: (a) => `${a.allocatedHours}h` },
          ]}
        />
        <Field label="팀원" htmlFor="assign-member">
          <MemberSelect
            id="assign-member"
            members={members}
            value={assignMemberId}
            onChange={setAssignMemberId}
          />
        </Field>
        <Field label="배정 시간" htmlFor="assign-hours">
          <Input
            id="assign-hours"
            type="number"
            value={assignHours}
            onChange={(e) => setAssignHours(e.target.value)}
          />
        </Field>
        {assignError && <p className="form-error">{assignError}</p>}
        <Button onClick={handleAssign}>배정 추가</Button>
      </Card>

      <Card title="실적 투입 기록">
        <Table
          items={taskActualEntries}
          getKey={(e) => e.id}
          emptyMessage="입력된 실적이 없습니다."
          columns={[
            { key: "date", header: "일자", render: (e) => formatDate(e.date) },
            { key: "member", header: "팀원", render: (e) => getMemberById(e.memberId)?.name ?? "-" },
            { key: "hours", header: "투입 시간", render: (e) => `${e.actualHours}h` },
            { key: "note", header: "메모", render: (e) => e.note },
          ]}
        />
        <Field label="팀원" htmlFor="entry-member">
          <MemberSelect
            id="entry-member"
            members={members}
            value={entryMemberId}
            onChange={setEntryMemberId}
          />
        </Field>
        <Field label="일자" htmlFor="entry-date">
          <Input
            id="entry-date"
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
        </Field>
        <Field label="투입 시간" htmlFor="entry-hours">
          <Input
            id="entry-hours"
            type="number"
            value={entryHours}
            onChange={(e) => setEntryHours(e.target.value)}
          />
        </Field>
        <Field label="메모" htmlFor="entry-note">
          <Input id="entry-note" value={entryNote} onChange={(e) => setEntryNote(e.target.value)} />
        </Field>
        {entryError && <p className="form-error">{entryError}</p>}
        <Button onClick={handleAddEntry}>실적 추가</Button>
      </Card>
    </div>
  );
}
