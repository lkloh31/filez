import db from "#db/client";
import { createFile } from "#db/queries/files";
import { createFolder } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const folders = [
    { id: 1, name: "folder01" },
    { id: 2, name: "folder02" },
    { id: 3, name: "folder03" },
  ];

  const files = [
    { name: "file01", size: 20, folder_id: 1 },
    { name: "file02", size: 20, folder_id: 1 },
    { name: "file03", size: 20, folder_id: 1 },
    { name: "file04", size: 20, folder_id: 1 },
    { name: "file05", size: 20, folder_id: 1 },
    { name: "file01", size: 20, folder_id: 2 },
    { name: "file02", size: 20, folder_id: 2 },
    { name: "file03", size: 20, folder_id: 2 },
    { name: "file04", size: 20, folder_id: 2 },
    { name: "file05", size: 20, folder_id: 2 },
    { name: "file01", size: 20, folder_id: 3 },
    { name: "file02", size: 20, folder_id: 3 },
    { name: "file03", size: 20, folder_id: 3 },
    { name: "file04", size: 20, folder_id: 3 },
    { name: "file05", size: 20, folder_id: 3 },
  ];

  for (const folder of folders) {
    await createFolder(folder);
  }

  for (const file of files) {
    await createFile(file);
  }
}
