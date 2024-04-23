import mongoose from "mongoose";
const { Schema } = mongoose;

const categoryModels = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            slug: "title",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const categoryModel = mongoose.model("Category", categoryModels);
export default categoryModel;
