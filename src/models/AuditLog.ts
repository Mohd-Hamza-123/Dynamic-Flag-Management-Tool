import mongoose from "mongoose"

const AuditLogSchema = new mongoose.Schema({
  action: String, // "FLAG_CREATED", "FLAG_UPDATED"

  flagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeatureFlag"
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  changes: mongoose.Schema.Types.Mixed,

  createdAt: { type: Date, default: Date.now }
});

const AuditLog =  mongoose.models.AuditLog ||  mongoose.model("AuditLog", AuditLogSchema);
export default AuditLog