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
        <h2 className="text-xl font-bold flex items-center py-2">
          <Building className="mr-2" /> {props.company}
        </h2>
        <p className="flex items-center py-1">
          <Briefcase className="mr-2" />
          {props.jobTitle}
        </p>
        <p className="flex items-center py-1">
          <Building className="mr-2" />
          {props.status}
        </p>
        <p className="flex items-center py-1">
          <Calendar className="mr-2" />
          {props.applicationDate}
        </p>
        <p className="flex items-center py-1">
          <DollarSign className="mr-2" />
          {props.salary}
        </p>
        <p className="flex items-center py-1 break-all">
          <Link className="mr-2" />{" "}
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            {props.link}
          </a>
        </p>
        <p className="flex items-center py-1">
          <FileText className="mr-2" /> {props.notes}
        </p>
      </div>
    </>
  );
}
