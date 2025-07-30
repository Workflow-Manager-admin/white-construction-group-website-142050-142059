import * as Project from "../models/project.js";

// PUBLIC_INTERFACE
export async function getAll(req, res, next) {
  try {
    const projects = await Project.getAllProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function getById(req, res, next) {
  try {
    const project = await Project.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function create(req, res, next) {
  try {
    const project = await Project.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function update(req, res, next) {
  try {
    const project = await Project.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function remove(req, res, next) {
  try {
    await Project.deleteProject(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
