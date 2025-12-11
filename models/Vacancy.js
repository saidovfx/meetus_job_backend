import mongoose from "mongoose";

const VacancySchema = new mongoose.Schema(
  {
    ownerCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "jobusers" },

    vacancyTitle: { type: String, required: true },
    vacancyShortDesc: { type: String },
    vacancyFullDesc: { type: String },

    vacancySkills: {
      type: [String],
      enum: ["API's", "logical-thinking", "creative"],
    },

    vacancyFor: {
      type: String,
      enum: [
        "web-developer",
        "fullStack-developer",
        "software-engineer",
        "mobile-developer",
        "native-developer",
        "smm",
        "artist",
        "doctor",
        "mobiloagraph",
      ],
    },

    salaryFrom: Number,
    salaryTo: Number,
    salaryCurrency: { type: String, default: "USD" },

    workType: {
      type: String,
      enum: ["remote", "office", "hybrid"],
      default: "remote",
    },

    experienceLevel: {
      type: String,
      enum: ["intern", "junior", "middle", "senior", "lead"],
    },

    location: String,

    deadline: Date,

    languages: {
      type: [String],
      enum: ["english", "russian", "tajik", "uzbek"],
    },

    applied: { type: [mongoose.Schema.Types.ObjectId], ref: "jobusers" },
    rejected: { type: [mongoose.Schema.Types.ObjectId], ref: "jobusers" },
    accepted: { type: mongoose.Schema.Types.ObjectId, ref: "jobusers" },

    appliedCount: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["open", "closed", "paused"],
      default: "open",
    },

    vacancyFinished: { type: Boolean, default: false },
    vacancyCanceled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Vacancy", VacancySchema);
