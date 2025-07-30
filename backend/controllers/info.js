import * as Info from "../models/info.js";

// PUBLIC_INTERFACE
export async function get(req, res, next) {
  try {
    const info = await Info.getInfo();
    res.json(info);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function update(req, res, next) {
  try {
    const newInfo = await Info.setInfo(req.body);
    res.json(newInfo);
  } catch (err) {
    next(err);
  }
}
