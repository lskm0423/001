import type { Member } from "../types";

interface MemberSelectProps {
  id: string;
  members: Member[];
  value: string;
  onChange: (memberId: string) => void;
}

export default function MemberSelect({ id, members, value, onChange }: MemberSelectProps) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">선택</option>
      {members.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </select>
  );
}
