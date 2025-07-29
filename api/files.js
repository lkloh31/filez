import express from "express";
const router = express.Router();
export default router;

import { getFilesWithFolder, createFile } from "#db/queries/files";
import {
  getFolder,
  getFolders,
  getFolderByIdIncludingFiles,
} from "#db/queries/folders";

router.route("/files").get(async (req, res) => {
  const files = await getFilesWithFolder();
  res.send(files);
});

router.route("/folders").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.route("/folders/:id").get(async (req, res) => {
  const { id } = req.params;
  const folder = await getFolderByIdIncludingFiles(id);
  if (!folder) {
    return res.status(404).send("Folder not found");
  }
  res.send(folder);
});

router.route("/folders/:id/files").post(async (req, res) => {
  const { id } = req.params;
  const folder = await getFolder(id);

  if (!folder) {
    return res.status(404).send("Folder not found");
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Request body not provided");
  }

  const { name, size } = req.body;
  if (!name || !size) {
    return res.status(400).send("Missing required fields");
  }

  const file = await createFile({ name, size, folder_id: id });
  res.status(201).send(file);
});
