import { useState } from "react";
import type { Member } from "../types";
import { MOCK_MEMBERS } from "../data/mockData";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);

  function addMember(input: Omit<Member, "id">) {
    const member: Member = { ...input, id: crypto.randomUUID() };
    setMembers((prev) => [...prev, member]);
    return member;
  }

  function getMemberById(memberId: string): Member | undefined {
    return members.find((member) => member.id === memberId);
  }

  return { members, addMember, getMemberById };
}
