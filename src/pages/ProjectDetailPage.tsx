import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Modal, NavBar, ProgressBar, Table, Timeline } from "../components";
import { useAppContext } from "../context/AppContext";
import { useProjectResourceSummary } from "../hooks/useResourceSummary";
import { TASK_STATUS_LABEL } from "../utils/projectStatus";
import { formatDateRange } from "../utils/date";
import { isNonEmpty, isPositiveNumber } from "../utils/validation";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, tasks, addTask, actualEntries } = useAppContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [plannedStartDate, setPlannedStartDate] = useState("");
  const [plannedEndDate, setPlannedEndDate] = useState("");
  const [plannedHours, setPlannedHours] = useState("");
  const [error, setError] = useState("");

  const project = getProjectById(id ?? "");
  const projectTasks = tasks.filter((task) => task.projectId === id);
  const summary = useProjectResourceSummary(projectTasks, actualEntries);

  if (!project) {
    return (
      <div>
        <NavBar />
        <div className="list-empty">프로젝트를 찾을 수 없습니다.</div>
      </div>
    );
  }

  function resetForm() {
    setName("");
    setPlannedStartDate("");
    setPlannedEndDate("");
    setPlannedHours("");
    setError("");
  }

  function handleSubmit() {
    const hours = Number(plannedHours);
    if (!isNonEmpty(name) || !plannedStartDate || !plannedEndDate || !isPositiveNumber(hours)) {
      setError("작업명, 기간, 계획 투입 시간을 올바르게 입력해주세요.");
      return;
    }
    addTask({
      projectId: id ?? "",
      name,
      plannedStartDate,
      plannedEndDate,
      plannedHours: hours,
      status: "planned",
    });
    resetForm();
    setOpen(false);
  }

  return (
    <div>
      <NavBar />
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>{formatDateRange(project.startDate, project.endDate)}</p>

      <Card title="계획 대비 실적">
        <div className="form-field">
          <span>진행률</span>
          <ProgressBar percent={summary.progress} />
        </div>
        <div className="form-field">
          <span>리소스 소진율 ({summary.actualHours}h / {summary.plannedHours}h)</span>
          <ProgressBar percent={summary.utilizationRate} />
        </div>
      </Card>

      <Card title="일정">
        <Timeline
          items={projectTasks.map((task) => ({
            id: task.id,
            label: task.name,
            startDate: task.plannedStartDate,
            endDate: task.plannedEndDate,
          }))}
          rangeStart={project.startDate}
          rangeEnd={project.endDate}
          onItemClick={(taskId) => navigate(`/projects/${project.id}/tasks/${taskId}`)}
        />
      </Card>

      <h3>작업 목록</h3>
      <Button onClick={() => setOpen(true)}>작업 등록</Button>
      <Table
        items={projectTasks}
        getKey={(task) => task.id}
        onRowClick={(task) => navigate(`/projects/${project.id}/tasks/${task.id}`)}
        emptyMessage="등록된 작업이 없습니다."
        columns={[
          { key: "name", header: "작업명", render: (t) => t.name },
          {
            key: "period",
            header: "계획 기간",
            render: (t) => formatDateRange(t.plannedStartDate, t.plannedEndDate),
          },
          { key: "plannedHours", header: "계획 시간", render: (t) => `${t.plannedHours}h` },
          { key: "status", header: "상태", render: (t) => TASK_STATUS_LABEL[t.status] },
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>작업 등록</h3>
        <div className="form-field">
          <label htmlFor="task-name">작업명</label>
          <Input id="task-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="task-start">계획 시작일</label>
          <Input
            id="task-start"
            type="date"
            value={plannedStartDate}
            onChange={(e) => setPlannedStartDate(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="task-end">계획 종료일</label>
          <Input
            id="task-end"
            type="date"
            value={plannedEndDate}
            onChange={(e) => setPlannedEndDate(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="task-hours">계획 투입 시간</label>
          <Input
            id="task-hours"
            type="number"
            value={plannedHours}
            onChange={(e) => setPlannedHours(e.target.value)}
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <Button onClick={handleSubmit}>저장</Button>
      </Modal>
    </div>
  );
}
