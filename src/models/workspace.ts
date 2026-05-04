import mongoose from "mongoose"

// A Workspace is the top-level container of your system. It groups all feature flags, environments, and users under one logical unit.

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    ownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required : true,
    },
    environments: [{
        name: {
            type: String,
            enum: ["dev", "staging", "prod"],
            required: true
        },
        apiKey: String // used in SDK
    }],
}, {
    timestamps: true
});

const Workspace =
  mongoose.models.Workspace ||
  mongoose.model("Workspace", WorkspaceSchema);

export default Workspace;