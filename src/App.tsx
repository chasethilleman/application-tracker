import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import Form from "./components/form";
import ApplicationCard from "./components/applicationCard";
import Confetti from "react-confetti";
import type { ApplicationFormValues } from "@shared/applicationSchema";
import type { ApplicationRecord } from "./types";

function App() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await fetch("/api/applications");
        if (!response.ok) {
          throw new Error("Failed to load applications");
        }
        const data = (await response.json()) as ApplicationRecord[];
        setApplications(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load applications";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadApplications();
  }, []);

  async function addApplication(application: ApplicationFormValues) {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        throw new Error(payload.message ?? "Failed to save application");
      }

      const saved = (await response.json()) as ApplicationRecord;
      setApplications((prev) => [saved, ...prev]);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to save application";
      setError(message);
      setConfetti(false);
      throw err;
    }
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
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading applications…</p>}
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
