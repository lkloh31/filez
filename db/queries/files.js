import db from "#db/client";

export async function createFile({ name, size, folder_id }) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}

export async function getFilesWithFolder() {
  const sql = `
  SELECT files.*
  FROM
    files
    JOIN folders ON files.id = folders.file_id
  `;
  const { rows: files } = await db.query(sql);
  return files;
}

export async function getFile(id) {
  const sql = `
        SELECT *
        FROM files
        WHERE id = $1
    `;
  const {
    rows: [file],
  } = await db.query(sql, [id]);
  return file;
}
