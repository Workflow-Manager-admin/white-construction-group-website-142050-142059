import * as Photo from "../models/photo.js";

// PUBLIC_INTERFACE
export async function getAll(req, res, next) {
  try {
    const projectId = req.params.id;
    const photos = await Photo.getPhotosByProject(projectId);
    res.json(photos);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function getById(req, res, next) {
  try {
    const photo = await Photo.getPhotoById(req.params.photoId);
    if (!photo) return res.status(404).json({ error: "Not found" });
    res.json(photo);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function create(req, res, next) {
  try {
    const projectId = req.params.id;
    const photo = await Photo.createPhoto(projectId, req.body);
    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function update(req, res, next) {
  try {
    const photo = await Photo.updatePhoto(req.params.photoId, req.body);
    if (!photo) return res.status(404).json({ error: "Not found" });
    res.json(photo);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function remove(req, res, next) {
  try {
    await Photo.deletePhoto(req.params.photoId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
