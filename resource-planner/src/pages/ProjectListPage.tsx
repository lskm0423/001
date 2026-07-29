import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Field, Input, Modal, NavBar, Table } from "../components";
import { useAppContext } from "../context/AppContext";
import { PROJECT_STATUS_LABEL } from "../utils/projectStatus";
import { formatDateRange } from "../utils/date";
import { isNonEmpty } from "../utils/validation";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const { projects, projectsError, addProject } = useAppContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  function resetForm() {
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setError("");
  }

  async function handleSubmit() {
    if (!isNonEmpty(name) || !startDate || !endDate) {
      setError("프로젝트명과 기간을 입력해주세요.");
      return;
    }
    try {
      await addProject({ name, description, startDate, endDate, status: "planned" });
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "프로젝트를 등록하지 못했습니다.");
    }
  }

  return (
    <div>
      <NavBar />
      <h2>프로젝트 목록</h2>
      {projectsError && <p className="form-error">{projectsError}</p>}
      <Button onClick={() => setOpen(true)}>프로젝트 등록</Button>
      <Table
        items={projects}
        getKey={(project) => project.id}
        onRowClick={(project) => navigate(`/projects/${project.id}`)}
        emptyMessage="등록된 프로젝트가 없습니다."
        columns={[
          { key: "name", header: "프로젝트명", render: (p) => p.name },
          { key: "period", header: "기간", render: (p) => formatDateRange(p.startDate, p.endDate) },
          { key: "status", header: "상태", render: (p) => PROJECT_STATUS_LABEL[p.status] },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>프로젝트 등록</h3>
        <Field label="프로젝트명" htmlFor="project-name">
          <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="설명" htmlFor="project-description">
          <Input
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <Field label="시작일" htmlFor="project-start">
          <Input
            id="project-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Field>
        <Field label="종료일" htmlFor="project-end">
          <Input
            id="project-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Field>
        {error && <p className="form-error">{error}</p>}
        <Button onClick={handleSubmit}>저장</Button>
      </Modal>
    </div>
  );
}
