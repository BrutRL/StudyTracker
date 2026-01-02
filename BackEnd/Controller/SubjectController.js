import { Subject } from "../Model/SubjectSchema.js";

export const all = async (req, res) => {
  try {
    const data = await Subject.find({ userId: req.userId });
    res.status(200).json({ ok: true, data: data });
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: `Failed to get all subject ${error}` });
  }
};
export const create = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newSubject = new Subject({
      userId: req.userId,
      name: name,
      description: description,
    });
    await newSubject.save();
    res.status(200).json({ ok: true, message: `Subject created successfully` });
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: `Failed to create subject ${error}` });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await Subject.findByIdAndUpdate(
      id,

      {
        userId: req.userId,
        name: name,
        description: description,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ ok: true, message: `Subject updated successfully` });
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: `Failed to create subject ${error}` });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Subject.findByIdAndDelete(id);
    res.status(200).json({ ok: true, message: `Subject deleted successfully` });
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: `Failed to delete subject ${error}` });
  }
};
