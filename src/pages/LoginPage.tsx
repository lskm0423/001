import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Button, Input } from "../components";
import { isValidEmail, isNonEmpty } from "../utils/validation";

export default function LoginPage() {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("올바른 이메일 형식을 입력해 주세요.");
      return;
    }
    if (!isNonEmpty(password)) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }

    setError("");
    login(email, password);
    navigate("/home");
  }

  return (
    <div>
      <h2>로그인 / 회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
}
