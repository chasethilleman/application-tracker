import type { FormData } from "./form";
import {
  Building,
  Briefcase,
  Calendar,
  DollarSign,
  Link,
  FileText,
} from "lucide-react";

type ApplicationCardProps = FormData;

export default function ApplicationCard(props: ApplicationCardProps) {
  return (
    <>
      <div className="application-card border rounded p-4 bg-white shadow text-left">
        <h2 className="text-xl font-bold flex items-center">
          <Building className="mr-2" /> {props.company}
        </h2>
        <p className="flex items-center">
          <Briefcase className="mr-2" />
          {props.jobTitle}
        </p>
        <p className="flex items-center">
          <Building className="mr-2" />
          {props.status}
        </p>
        <p className="flex items-center">
          <Calendar className="mr-2" />
          {props.applicationDate}
        </p>
        <p className="flex items-center">
          <DollarSign className="mr-2" />
          {props.salary}
        </p>
        <p className="flex items-center">
          <Link className="mr-2" />{" "}
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            {props.link}
          </a>
        </p>
        <p>
          <FileText className="mr-2" /> {props.notes}
        </p>
      </div>
    </>
  );
}
