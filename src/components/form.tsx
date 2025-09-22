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
      className="flex flex-col gap-2 p-4 border border-gray-300 rounded col-span-1 bg-white"
    >
      <label
        htmlFor="company"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Company
      </label>
      <input
        type="text"
        name="company"
        id="company"
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Company"
        value={formData.company}
        onChange={onChange}
        required
      />
      <label
        htmlFor="jobTitle"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Job Title
      </label>
      <input
        type="text"
        name="jobTitle"
        id="jobTitle"
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={onChange}
        required
      />
      <label
        htmlFor="status"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Status
      </label>
      <select
        name="status"
        id="status"
        value={formData.status}
        onChange={onChange}
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <label
        htmlFor="applicationDate"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Application Date
      </label>
      <input
        type="date"
        name="applicationDate"
        id="applicationDate"
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={formData.applicationDate}
        onChange={onChange}
        required
      />
      <label
        htmlFor="salary"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Salary
      </label>
      <input
        type="number"
        name="salary"
        id="salary"
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Salary"
        value={formData.salary}
        onChange={onChange}
      />
      <label
        htmlFor="link"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Application Link
      </label>
      <input
        type="url"
        name="link"
        id="link"
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Application Link"
        value={formData.link}
        onChange={onChange}
      />
      <label
        htmlFor="notes"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        Notes
      </label>
      <textarea
        name="notes"
        id="notes"
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Notes"
        value={formData.notes}
        onChange={onChange}
      ></textarea>
      <button type="submit">Add Application</button>
    </form>
  );
}
