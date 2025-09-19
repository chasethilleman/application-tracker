import { useState, type ChangeEvent, type FormEvent } from "react";

export type FormData = {
  company: string;
  jobTitle: string;
  status: "Applied" | "Interviewing" | "Offered" | "Rejected";
  applicationDate: string;
  salary: string;
  link: string;
  notes: string;
};

type FormProps = {
  addApplication: (application: FormData) => void;
};

function createInitialState(): FormData {
  return {
    company: "",
    jobTitle: "",
    status: "Applied",
    applicationDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    salary: "",
    link: "",
    notes: "",
  };
}

export default function Form({ addApplication }: FormProps) {
  const [formData, setFormData] = useState<FormData>(createInitialState);

  function onChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addApplication(formData);
    setFormData(createInitialState());
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 p-4 border rounded"
    >
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={onChange}
        required
      />
      <select name="status" value={formData.status} onChange={onChange}>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        name="applicationDate"
        value={formData.applicationDate}
        onChange={onChange}
        required
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={onChange}
      />
      <input
        type="url"
        name="link"
        placeholder="Application Link"
        value={formData.link}
        onChange={onChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={onChange}
      ></textarea>
      <button type="submit">Add Application</button>
    </form>
  );
}
