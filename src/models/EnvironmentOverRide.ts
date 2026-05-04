import mongoose from "mongoose"

const EnvironmentOverrideSchema = new mongoose.Schema({
    flagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeatureFlag"
    },

    environment: {
        type: String,
        enum: ["dev", "staging", "prod"]
    },

    enabled: Boolean,

    rolloutPercentage: {
        type: Number,
        min: 0,
        max: 100
    }
});

const EnvironmentOverride = mongoose.model(
    "EnvironmentOverride",
    EnvironmentOverrideSchema
);

export default EnvironmentOverride;