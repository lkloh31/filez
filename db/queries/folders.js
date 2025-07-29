import db from "#db/client";

export async function createFolder({ id, name }) {
  const sql = `
    INSERT INTO folders (id, name)
    VALUES ($1, $2)
    RETURNING *
  `;
  const {
    rows: [folder],
  } = await db.query(sql, [id, name]);
  return folder;
}

export async function getFolders() {
  const sql = `
        SELECT *
        FROM folders
    `;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolder(id) {
  const sql = `
        SELECT *
        FROM folders
        WHERE id = $1
    `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}
