import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Form, { type FormData } from "./components/form";
import ApplicationCard from "./components/applicationCard";

function App() {
  const [applications, setApplications] = useState<FormData[]>([]);

  function addApplication(application: FormData) {
    setApplications((prev) => [...prev, application]);
  }

  const totalApplications = applications.length;
  const appliedApplications = applications.filter(
    (app) => app.status === "Applied"
  ).length;
  const interviewingApplications = applications.filter(
    (app) => app.status === "Interviewing"
  ).length;
  const offeredApplications = applications.filter(
    (app) => app.status === "Offered"
  ).length;
  const rejectedApplications = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <>
      <Header
        totalApplications={totalApplications}
        appliedApplications={appliedApplications}
        interviewingApplications={interviewingApplications}
        offeredApplications={offeredApplications}
        rejectedApplications={rejectedApplications}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Form addApplication={addApplication} />
        <div className="applications-list">
          {applications.length > 0 ? (
            applications.map((application, index) => (
              <ApplicationCard
                key={`${application.company}-${application.applicationDate}-${index}`}
                {...application}
              />
            ))
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
