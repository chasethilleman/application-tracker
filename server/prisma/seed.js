import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.application.createMany({
    data: [
      {
        company: "Acme Corp",
        jobTitle: "Frontend Engineer",
        status: "APPLIED",
        applicationDate: new Date("2025-01-10"),
        salary: 120000,
        link: "https://jobs.acme.com/frontend",
        notes: "Reached out to recruiter on LinkedIn.",
      },
      // add more seed entries here
    ],
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
