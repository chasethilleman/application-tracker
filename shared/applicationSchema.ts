// shared/applicationSchema.ts
import { z } from "zod";

export const StatusEnum = z.enum(["Applied", "Interviewing", "Offered", "Rejected"]);
export const PrismaStatusEnum = z.enum([
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
]);

const labelToPrismaMap = {
  Applied: "APPLIED",
  Interviewing: "INTERVIEWING",
  Offered: "OFFERED",
  Rejected: "REJECTED",
} as const;

const prismaToLabelMap = {
  APPLIED: "Applied",
  INTERVIEWING: "Interviewing",
  OFFERED: "Offered",
  REJECTED: "Rejected",
} as const;

export const ApplicationInputSchema = z.object({
  company: z.string().min(1),
  jobTitle: z.string().min(1),
  status: StatusEnum,
  applicationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  salary: z
    .string()
    .regex(/^\d+$/, "Salary must be numeric")
    .or(z.literal(""))
    .default(""),
  link: z.union([z.string().url(), z.literal("")]).default(""),
  notes: z.string().default(""),
});

export const ApplicationCreateSchema = ApplicationInputSchema.transform(
  (input) => {
    const salaryValue = input.salary.trim();
    const linkValue = input.link.trim();
    const notesValue = input.notes.trim();

    return {
      company: input.company,
      jobTitle: input.jobTitle,
      status: PrismaStatusEnum.parse(labelToPrismaMap[input.status]),
      applicationDate: new Date(input.applicationDate),
      salary: salaryValue.length > 0 ? Number.parseInt(salaryValue, 10) : null,
      link: linkValue.length > 0 ? linkValue : null,
      notes: notesValue.length > 0 ? notesValue : null,
    };
  }
);

export type ApplicationFormValues = z.input<typeof ApplicationInputSchema>;
export type ApplicationCreateInput = z.output<typeof ApplicationCreateSchema>;

export type ApplicationStatusLabel = z.infer<typeof StatusEnum>;
export type ApplicationStatusEnum = z.infer<typeof PrismaStatusEnum>;

export function statusLabelToPrisma(status: ApplicationStatusLabel): ApplicationStatusEnum {
  return PrismaStatusEnum.parse(labelToPrismaMap[status]);
}

export function statusPrismaToLabel(status: ApplicationStatusEnum): ApplicationStatusLabel {
  return prismaToLabelMap[status];
}

export function formatDateToISO(date: Date): string {
  return date.toISOString().split("T")[0];
}
