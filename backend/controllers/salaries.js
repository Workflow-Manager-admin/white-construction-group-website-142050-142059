import * as Salary from "../models/salary.js";

// PUBLIC_INTERFACE
export async function getAll(req, res, next) {
  try {
    const salaries = await Salary.getAllSalaries();
    res.json(salaries);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function getById(req, res, next) {
  try {
    const salary = await Salary.getSalaryById(req.params.id);
    if (!salary) return res.status(404).json({ error: "Not found" });
    res.json(salary);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function create(req, res, next) {
  try {
    const salary = await Salary.createSalary(req.body);
    res.status(201).json(salary);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function update(req, res, next) {
  try {
    const salary = await Salary.updateSalary(req.params.id, req.body);
    if (!salary) return res.status(404).json({ error: "Not found" });
    res.json(salary);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function remove(req, res, next) {
  try {
    await Salary.deleteSalary(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
