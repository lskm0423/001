import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <Link to="/">대시보드</Link>
      <Link to="/projects">프로젝트</Link>
      <Link to="/members">팀원 관리</Link>
    </nav>
  );
}
