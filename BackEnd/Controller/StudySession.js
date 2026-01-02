import { StudySession } from "../Model/StudySessionSchema.js";

export const all = async (req, res) => {
  try {
    const data = await StudySession.find({ userId: req.userId });
    res.status(200).json({ ok: true, data: data });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: `Failed to get study session data ${error}`,
    });
  }
};

export const create = async (req, res) => {
  const { subjectId, duration, notes, date } = req.body;
  try {
    const newStudy = new StudySession({
      userId: req.userId,
      subjectId: subjectId,
      duration: duration,
      notes: notes,
      date: date,
    });

    await newStudy.save();
    res
      .status(200)
      .json({ ok: true, message: `StudySession Successfully Created` });
  } catch (error) {
    res
      .status(401)
      .json({ ok: false, message: `Failed to create study session ${error}` });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { subjectId, duration, notes, date } = req.body;
  try {
    await StudySession.findByIdAndUpdate(id, {
      userId: req.userId,
      subjectId: subjectId,
      duration: duration,
      notes: notes,
      date: date,
    });
    res
      .status(200)
      .json({ ok: true, message: `StudySession updated successfully` });
  } catch (error) {
    res
      .status(401)
      .json({ ok: false, message: `Failed to update study session ${error}` });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await StudySession.findByIdAndDelete(id);
    res
      .status(200)
      .json({ ok: true, message: `Study Session Deleted Successfully` });
  } catch (error) {
    res
      .status(401)
      .json({ ok: false, message: `Failed to update study session ${error}` });
  }
};
