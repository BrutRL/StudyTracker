import { Subject } from "../Model/SubjectSchema.js";
import { StudySession } from "../Model/StudySessionSchema.js";
import mongoose from "mongoose";

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

export const count = async (req, res) => {
  try {
    const data = await Subject.find({ userId: req.userId });
    res.status(200).json({ ok: true, data: data.length });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: `Failed to get study session data ${error}`,
    });
  }
};
export const create = async (req, res) => {
  const { name, targetHours, color } = req.body;
  try {
    const newSubject = new Subject({
      userId: req.userId,
      name: name,
      targetHours: targetHours,
      color: color,
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
  const { name, targetHours, color } = req.body;
  try {
    await Subject.findByIdAndUpdate(
      id,

      {
        userId: req.userId,
        name: name,
        targetHours: targetHours,
        color: color,
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

export const progress = async (req, res) => {
  try {
    const data = await Subject.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
      {
        $lookup: {
          from: "studysessions",
          localField: "_id",
          foreignField: "subjectId",
          as: "sessions",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          targetHours: 1,
          color: 1,
          createdAt: 1,
          totalHours: {
            $round: [{ $divide: [{ $sum: "$sessions.duration" }, 60] }, 0],
          },
          hoursLeft: {
            $max: [
              0,
              {
                $round: [
                  {
                    $subtract: [
                      "$targetHours",
                      { $divide: [{ $sum: "$sessions.duration" }, 60] },
                    ],
                  },
                  0,
                ],
              },
            ],
          },
          percent: {
            $round: [
              {
                $cond: {
                  if: { $eq: ["$targetHours", 0] },
                  then: 0,
                  else: {
                    $multiply: [
                      {
                        $divide: [
                          { $divide: [{ $sum: "$sessions.duration" }, 60] },
                          "$targetHours",
                        ],
                      },
                      100,
                    ],
                  },
                },
              },
              0,
            ],
          },
        },
      },
    ]);
    res.status(200).json({ ok: true, data: data });
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: `Failed to get progress ${error}` });
  }
};
