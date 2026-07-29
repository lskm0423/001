import { useNavigate } from "react-router-dom";
import { Card, NavBar, ProgressBar } from "../components";
import { useAppContext } from "../context/AppContext";
import { summarizeProjectResources } from "../utils/resource";
import { PROJECT_STATUS_LABEL } from "../utils/projectStatus";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { projects, projectsError, tasks, actualEntries } = useAppContext();

  return (
    <div>
      <NavBar />
      <h2>대시보드</h2>
      {projectsError && <p className="form-error">{projectsError}</p>}
      {projects.length === 0 ? (
        <div className="list-empty">등록된 프로젝트가 없습니다.</div>
      ) : (
        <div className="card-grid">
          {projects.map((project) => {
            const projectTasks = tasks.filter((task) => task.projectId === project.id);
            const summary = summarizeProjectResources(projectTasks, actualEntries);

            return (
              <Card
                key={project.id}
                title={project.name}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <p>{PROJECT_STATUS_LABEL[project.status]}</p>
                <div className="form-field">
                  <span>진행률</span>
                  <ProgressBar percent={summary.progress} />
                </div>
                <div className="form-field">
                  <span>리소스 소진율 ({summary.actualHours}h / {summary.plannedHours}h)</span>
                  <ProgressBar percent={summary.utilizationRate} />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
