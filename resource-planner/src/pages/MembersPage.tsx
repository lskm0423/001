import { useState } from "react";
import { Button, Field, Input, Modal, NavBar, Table } from "../components";
import { useAppContext } from "../context/AppContext";
import { isNonEmpty } from "../utils/validation";

export default function MembersPage() {
  const { members, membersError, addMember, assignments, actualEntries } = useAppContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  function resetForm() {
    setName("");
    setRole("");
    setError("");
  }

  async function handleSubmit() {
    if (!isNonEmpty(name) || !isNonEmpty(role)) {
      setError("이름과 역할을 입력해주세요.");
      return;
    }
    try {
      await addMember({ name, role });
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "팀원을 등록하지 못했습니다.");
    }
  }

  return (
    <div>
      <NavBar />
      <h2>팀원 관리</h2>
      {membersError && <p className="form-error">{membersError}</p>}
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
        <Field label="이름" htmlFor="member-name">
          <Input id="member-name" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="역할" htmlFor="member-role">
          <Input id="member-role" value={role} onChange={(e) => setRole(e.target.value)} />
        </Field>
        {error && <p className="form-error">{error}</p>}
        <Button onClick={handleSubmit}>저장</Button>
      </Modal>
    </div>
  );
}
