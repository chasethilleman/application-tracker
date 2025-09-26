import type { ApplicationFormValues } from "@shared/applicationSchema";

export type ApplicationRecord = ApplicationFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
