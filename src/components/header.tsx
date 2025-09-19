type HeaderProps = {
  totalApplications: number;
  appliedApplications: number;
  interviewingApplications: number;
  offeredApplications: number;
  rejectedApplications: number;
};

export default function Header({
  totalApplications,
  appliedApplications,
  interviewingApplications,
  offeredApplications,
  rejectedApplications,
}: HeaderProps) {
  return (
    <header className="header p-4 border-b mb-4 bg-white sticky top-0 z-10">
      <h1>Application Tracker</h1>
      <div className="stats flex gap-4">
        <div className="border rounded p-4 text-center">
          <h1 className="text-2xl font-bold">{totalApplications}</h1>
          <p>Total Applications</p>
        </div>
        <div className="border rounded p-4 text-center">
          <h1 className="text-2xl font-bold">{appliedApplications}</h1>
          <p>Applied Applications</p>
        </div>
        <div className="border rounded p-4 text-center">
          <h1 className="text-2xl font-bold">{interviewingApplications}</h1>
          <p>Interviewing Applications</p>
        </div>
        <div className="border rounded p-4 text-center">
          <h1 className="text-2xl font-bold">{offeredApplications}</h1>
          <p>Offered Applications</p>
        </div>
        <div className="border rounded p-4 text-center">
          <h1 className="text-2xl font-bold">{rejectedApplications}</h1>
          <p>Rejected Applications</p>
        </div>
      </div>
    </header>
  );
}
