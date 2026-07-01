import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function NavBar() {
  const { isAuthenticated, logout } = useAppContext();

  return (
    <nav className="nav">
      <Link to="/home">홈</Link>
      <Link to="/search">도서 검색</Link>
      <Link to="/library">내 서재</Link>
      {isAuthenticated ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <Link to="/login">로그인</Link>
      )}
    </nav>
  );
}
