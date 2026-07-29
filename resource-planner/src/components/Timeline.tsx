interface TimelineItem {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
}

interface TimelineProps {
  items: TimelineItem[];
  rangeStart: string;
  rangeEnd: string;
  onItemClick?: (id: string) => void;
}

function toOffsetPercent(date: string, rangeStart: number, rangeSpan: number): number {
  const value = new Date(date).getTime();
  return ((value - rangeStart) / rangeSpan) * 100;
}

export default function Timeline({ items, rangeStart, rangeEnd, onItemClick }: TimelineProps) {
  const start = new Date(rangeStart).getTime();
  const end = new Date(rangeEnd).getTime();
  const span = Math.max(end - start, 1);

  if (items.length === 0) {
    return <div className="list-empty">일정이 없습니다.</div>;
  }

  return (
    <div className="timeline">
      {items.map((item) => {
        const left = Math.min(100, Math.max(0, toOffsetPercent(item.startDate, start, span)));
        const right = Math.min(100, Math.max(0, toOffsetPercent(item.endDate, start, span)));
        const width = Math.max(right - left, 2);

        return (
          <div className="timeline-row" key={item.id}>
            <span className="timeline-row-label">{item.label}</span>
            <div className="timeline-row-track">
              <div
                className="timeline-row-bar"
                style={{ left: `${left}%`, width: `${width}%` }}
                onClick={onItemClick ? () => onItemClick(item.id) : undefined}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
