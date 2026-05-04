import mongoose from "mongoose"

const FeatureFlagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  key: {
    type: String,
    required: true,
  }, // unique identifier
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
}, {
  timestamps: true
});


FeatureFlagSchema.index({ key: 1, workspaceId: 1 }, { unique: true })

const FeatureFlag = mongoose.models.FeatureFlag || mongoose.model("FeatureFlag", FeatureFlagSchema);
export default FeatureFlag