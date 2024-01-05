const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const UserInterestSchema = new mongoose.Schema(
  {
    interests: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest",
      required: true
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
UserInterestSchema.set("toJSON", { getters: true });
UserInterestSchema.index({ interests: 1, users: 1 }, { unique: true });
UserInterestSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("UserInterests", UserInterestSchema);
