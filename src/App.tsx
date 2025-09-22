import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Form, { type FormData } from "./components/form";
import ApplicationCard from "./components/applicationCard";
import Confetti from "react-confetti";

function App() {
  const [applications, setApplications] = useState<FormData[]>([]);
  const [confetti, setConfetti] = useState(false);

  function addApplication(application: FormData) {
    setApplications((prev) => [...prev, application]);
    setConfetti(true);
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
      {confetti && <Confetti numberOfPieces={100} />}
      <Header
        totalApplications={totalApplications}
        appliedApplications={appliedApplications}
        interviewingApplications={interviewingApplications}
        offeredApplications={offeredApplications}
        rejectedApplications={rejectedApplications}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form addApplication={addApplication} />
        <div className="applications-list col-span-2">
          {applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {applications.map((application, index) => (
                <ApplicationCard
                  key={`${application.company}-${application.applicationDate}-${index}`}
                  {...application}
                />
              ))}
            </div>
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
