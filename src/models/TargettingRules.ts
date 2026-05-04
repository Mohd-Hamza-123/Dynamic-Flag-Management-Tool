import mongoose from "mongoose"

const TargetingRuleSchema = new mongoose.Schema({
  flagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeatureFlag",
    required: true
  },

  attribute: String, // e.g. "country", "userId"
  operator: {
    type: String,
    enum: ["equals", "not_equals", "in", "greater_than"]
  },

  value: mongoose.Schema.Types.Mixed,

  serve: mongoose.Schema.Types.Mixed // what variation to serve
});

const TargetingRule = mongoose.model("TargetingRule", TargetingRuleSchema);
export default TargetingRule