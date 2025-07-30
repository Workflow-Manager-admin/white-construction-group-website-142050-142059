import pool from "../config/db.js";

/**
 * PROJECT MODEL - handles DB interactions for projects.
 */

// PUBLIC_INTERFACE
export async function getAllProjects() {
  /** Returns all projects from DB. */
  const result = await pool.query("SELECT * FROM projects ORDER BY id ASC");
  return result.rows;
}

// PUBLIC_INTERFACE
export async function getProjectById(id) {
  /** Returns project by id. */
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function createProject(data) {
  /** Inserts new project. Data is {name, description, ...} */
  const { name, description } = data;
  const result = await pool.query(
    "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function updateProject(id, data) {
  /** Updates project with id. */
  const { name, description } = data;
  const result = await pool.query(
    "UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function deleteProject(id) {
  /** Deletes project by id. */
  await pool.query("DELETE FROM projects WHERE id = $1", [id]);
}
