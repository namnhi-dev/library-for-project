import mongoose from "mongoose";
const { Schema } = mongoose;

const userModels = new Schema(
    {
        username: {
            type: String,
            unique: true,
            index: true,
        },
        fullname: {
            type: String,
        },
        email: {
            type: String,
            index: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        avatar: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        role: {
            type: String,
            default: "editor",
            enum: ["user", "admin", "editor"],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userModels);
export default userModel;
