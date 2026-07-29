import { useEffect, useState } from "react";
import type { Member } from "../types";
import { apiGet, apiPost } from "../lib/api";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<Member[]>("/api/members")
      .then(setMembers)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "팀원 목록을 불러오지 못했습니다.");
      });
  }, []);

  async function addMember(input: Omit<Member, "id">) {
    const member = await apiPost<Member>("/api/members", input);
    setMembers((prev) => [...prev, member]);
    return member;
  }

  function getMemberById(memberId: string): Member | undefined {
    return members.find((member) => member.id === memberId);
  }

  return { members, membersError: error, addMember, getMemberById };
}
