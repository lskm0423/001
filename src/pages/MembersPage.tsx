import { useState } from "react";
import { Button, Input, Modal, NavBar, Table } from "../components";
import { useAppContext } from "../context/AppContext";
import { isNonEmpty } from "../utils/validation";

export default function MembersPage() {
  const { members, addMember, assignments, actualEntries } = useAppContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  function resetForm() {
    setName("");
    setRole("");
    setError("");
  }

  function handleSubmit() {
    if (!isNonEmpty(name) || !isNonEmpty(role)) {
      setError("이름과 역할을 입력해주세요.");
      return;
    }
    addMember({ name, role });
    resetForm();
    setOpen(false);
  }

  return (
    <div>
      <NavBar />
      <h2>팀원 관리</h2>
      <Button onClick={() => setOpen(true)}>팀원 등록</Button>
      <Table
        items={members}
        getKey={(member) => member.id}
        emptyMessage="등록된 팀원이 없습니다."
        columns={[
          { key: "name", header: "이름", render: (m) => m.name },
          { key: "role", header: "역할", render: (m) => m.role },
          {
            key: "allocated",
            header: "배정 시간",
            render: (m) =>
              `${assignments
                .filter((a) => a.memberId === m.id)
                .reduce((sum, a) => sum + a.allocatedHours, 0)}h`,
          },
          {
            key: "actual",
            header: "실제 투입 시간",
            render: (m) =>
              `${actualEntries
                .filter((e) => e.memberId === m.id)
                .reduce((sum, e) => sum + e.actualHours, 0)}h`,
          },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>팀원 등록</h3>
        <div className="form-field">
          <label htmlFor="member-name">이름</label>
          <Input id="member-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="member-role">역할</label>
          <Input id="member-role" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        {error && <div className="form-error">{error}</div>}
        <Button onClick={handleSubmit}>저장</Button>
      </Modal>
    </div>
  );
}
