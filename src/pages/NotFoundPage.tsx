import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <Link to="/home">홈으로 이동</Link>
    </div>
  );
}
