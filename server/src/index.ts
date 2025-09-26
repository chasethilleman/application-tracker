import "dotenv/config";
import express from "express";
import cors from "cors";
import type { Application } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import {
  ApplicationCreateSchema,
  formatDateToISO,
  statusPrismaToLabel,
} from "@shared/applicationSchema";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" })); // adjust for prod
app.use(express.json());

function toViewModel(application: Application) {
  return {
    id: application.id,
    company: application.company,
    jobTitle: application.jobTitle,
    status: statusPrismaToLabel(application.status),
    applicationDate: formatDateToISO(application.applicationDate),
    salary: application.salary != null ? application.salary.toString() : "",
    link: application.link ?? "",
    notes: application.notes ?? "",
    createdAt: application.createdAt.toISOString(),
    updatedAt: application.updatedAt.toISOString(),
  };
}

app.get("/api/applications", async (_req, res) => {
  const applications = await prisma.application.findMany({
    orderBy: { applicationDate: "desc" },
  });
  res.json(applications.map(toViewModel));
});

app.post("/api/applications", async (req, res) => {
  try {
    const parsed = ApplicationCreateSchema.parse(req.body);
    const application = await prisma.application.create({ data: parsed });
    res.status(201).json(toViewModel(application));
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: "Invalid payload", issues: err.issues });
      return;
    }

    console.error(err);
    res.status(500).json({ message: "Unable to create application" });
  }
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API running on ${port}`));
