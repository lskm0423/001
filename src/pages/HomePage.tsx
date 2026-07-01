import { NavBar } from "../components";
import { useAppContext } from "../context/AppContext";
import { useReadingSummary } from "../hooks/useReadingSummary";
import { READING_STATUS_LABEL } from "../utils/readingStatus";

export default function HomePage() {
  const { user, entries } = useAppContext();
  const summary = useReadingSummary(user?.id, entries);

  return (
    <div>
      <NavBar />
      <h2>독서 현황</h2>
      <div className="summary-grid">
        {(Object.keys(READING_STATUS_LABEL) as Array<keyof typeof summary>).map(
          (status) => (
            <div className="summary-item" key={status}>
              <strong>{summary[status]}</strong>
              <span>{READING_STATUS_LABEL[status]}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
