import pool from "../config/db.js";

/**
 * PHOTO MODEL - handles DB interactions for photos related to projects.
 */

// PUBLIC_INTERFACE
export async function getPhotosByProject(projectId) {
  /** Returns all photos for a given projectId. */
  const result = await pool.query(
    "SELECT * FROM photos WHERE project_id = $1 ORDER BY id ASC",
    [projectId]
  );
  return result.rows;
}

// PUBLIC_INTERFACE
export async function getPhotoById(id) {
  /** Returns a single photo by its id. */
  const result = await pool.query("SELECT * FROM photos WHERE id = $1", [id]);
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function createPhoto(projectId, data) {
  /** Inserts a photo. Data is {url, caption (optional)}. */
  const { url, caption } = data;
  const result = await pool.query(
    "INSERT INTO photos (project_id, url, caption) VALUES ($1, $2, $3) RETURNING *",
    [projectId, url, caption || null]
  );
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function updatePhoto(id, data) {
  /** Updates a photo by id. */
  const { url, caption } = data;
  const result = await pool.query(
    "UPDATE photos SET url = $1, caption = $2 WHERE id = $3 RETURNING *",
    [url, caption || null, id]
  );
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function deletePhoto(id) {
  /** Deletes a photo by id. */
  await pool.query("DELETE FROM photos WHERE id = $1", [id]);
}
