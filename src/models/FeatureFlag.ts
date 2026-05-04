import mongoose from "mongoose"

const FeatureFlagSchema = new mongoose.Schema({
  key: { type: String, required: true }, // unique identifier
  name: String,
  description: String,

  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true
  },

  type: {
    type: String,
    enum: ["boolean", "percentage", "variant"],
    default: "boolean"
  },

  enabled: { type: Boolean, default: false },

  variations: [
    {
      value: mongoose.Schema.Types.Mixed, // true/false or string
      weight: Number // for percentage rollout
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

const FeatureFlag = mongoose.model("FeatureFlag", FeatureFlagSchema);
export default FeatureFlag