import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import BookDetailPage from "./pages/BookDetailPage";
import LibraryListPage from "./pages/LibraryListPage";
import LibraryDetailPage from "./pages/LibraryDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      <Route path="/library" element={<LibraryListPage />} />
      <Route path="/library/:id" element={<LibraryDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
