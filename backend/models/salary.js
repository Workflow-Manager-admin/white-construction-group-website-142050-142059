import pool from "../config/db.js";

/**
 * SALARY MODEL - handles DB interactions for salary records.
 */

// PUBLIC_INTERFACE
export async function getAllSalaries() {
  /** Returns all salary records. */
  const result = await pool.query("SELECT * FROM salaries ORDER BY id ASC");
  return result.rows;
}

// PUBLIC_INTERFACE
export async function getSalaryById(id) {
  /** Returns a salary record by id. */
  const result = await pool.query("SELECT * FROM salaries WHERE id = $1", [id]);
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function createSalary(data) {
  /** Inserts a salary record. Data shape: {employee, amount, period, ...} */
  const { employee, amount, period } = data;
  const result = await pool.query(
    "INSERT INTO salaries (employee, amount, period) VALUES ($1, $2, $3) RETURNING *",
    [employee, amount, period]
  );
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function updateSalary(id, data) {
  /** Updates a salary record by id. */
  const { employee, amount, period } = data;
  const result = await pool.query(
    "UPDATE salaries SET employee = $1, amount = $2, period = $3 WHERE id = $4 RETURNING *",
    [employee, amount, period, id]
  );
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function deleteSalary(id) {
  /** Deletes a salary record by id. */
  await pool.query("DELETE FROM salaries WHERE id = $1", [id]);
}
