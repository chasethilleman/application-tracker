type HeaderProps = {
  totalApplications: number;
  appliedApplications: number;
  interviewingApplications: number;
  offeredApplications: number;
  rejectedApplications: number;
};

function HeaderCard(props: { title: string; count: number }) {
  return (
    <div className="border rounded p-4 text-center grow">
      <h1 className="text-2xl font-bold">{props.count}</h1>
      <p>{props.title}</p>
    </div>
  );
}

export default function Header({
  totalApplications,
  appliedApplications,
  interviewingApplications,
  offeredApplications,
  rejectedApplications,
}: HeaderProps) {
  return (
    <header className="header pt-4 pb-4 border-b mb-4 bg-white sticky top-0 z-10">
      <div className="stats flex gap-4">
        <HeaderCard title="Total Applications" count={totalApplications} />
        <HeaderCard title="Applied" count={appliedApplications} />
        <HeaderCard title="Interviewing" count={interviewingApplications} />
        <HeaderCard title="Offered" count={offeredApplications} />
        <HeaderCard title="Rejected" count={rejectedApplications} />
      </div>
    </header>
  );
}
