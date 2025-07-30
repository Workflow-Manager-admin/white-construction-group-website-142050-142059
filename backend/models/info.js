import pool from "../config/db.js";

/**
 * INFO MODEL - handles DB interactions for the global company info.
 * We assume a single row exists (id = 1).
 */

// PUBLIC_INTERFACE
export async function getInfo() {
  /** Returns company info row (single). */
  const result = await pool.query("SELECT * FROM info WHERE id = 1");
  return result.rows[0];
}

// PUBLIC_INTERFACE
export async function setInfo(fields) {
  /** Updates the global info row (id = 1). Accepts a dict of fields to set */
  let setFragments = [];
  let values = [];
  let idx = 1;
  for (let [k, v] of Object.entries(fields)) {
    setFragments.push(`${k} = $${idx}`);
    values.push(v);
    idx++;
  }
  let sql = `UPDATE info SET ${setFragments.join(", ")} WHERE id = 1 RETURNING *`;
  const result = await pool.query(sql, values);
  return result.rows[0];
}
