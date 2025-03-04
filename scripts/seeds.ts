const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const main = async () => {
  try {
    await database.category.createMany({
      data: [
        { name: "Quality Assurance" },
        { name: "DevOps" },
        { name: "Cybersecurity" },
        { name: "Cloud Computing" },
        { name: "Database Administration" },
        { name: "Network Engineering" },
        { name: "Business Analysis" },
        { name: "Sales" },
        { name: "Marketing" },
        { name: "Customer Support" },
        { name: "Human Resources" },
        { name: "Finance" },
        { name: "Accounting" },
        { name: "Legal" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(`Error on seeding the database categories: ${error}`);
  }
};

main();
