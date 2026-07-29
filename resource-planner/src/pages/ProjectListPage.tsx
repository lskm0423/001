import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, NavBar, Table } from "../components";
import { useAppContext } from "../context/AppContext";
import { PROJECT_STATUS_LABEL } from "../utils/projectStatus";
import { formatDateRange } from "../utils/date";
import { isNonEmpty } from "../utils/validation";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const { projects, addProject } = useAppContext();
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

  function handleSubmit() {
    if (!isNonEmpty(name) || !startDate || !endDate) {
      setError("프로젝트명과 기간을 입력해주세요.");
      return;
    }
    addProject({ name, description, startDate, endDate, status: "planned" });
    resetForm();
    setOpen(false);
  }

  return (
    <div>
      <NavBar />
      <h2>프로젝트 목록</h2>
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
        <div className="form-field">
          <label htmlFor="project-name">프로젝트명</label>
          <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="project-description">설명</label>
          <Input
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="project-start">시작일</label>
          <Input
            id="project-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="project-end">종료일</label>
          <Input
            id="project-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <Button onClick={handleSubmit}>저장</Button>
      </Modal>
    </div>
  );
}
