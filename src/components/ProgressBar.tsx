interface ProgressBarProps {
  percent: number;
  label?: string;
}

export default function ProgressBar({ percent, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="progress-bar">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${clamped}%` }} />
      </div>
      <span className="progress-bar-label">{label ?? `${clamped}%`}</span>
    </div>
  );
}
