import mongoose from "mongoose"

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