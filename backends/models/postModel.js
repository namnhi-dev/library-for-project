import mongoose from "mongoose";

const { Schema } = mongoose;

const postModels = new Schema(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },
        slug: {
            type: String,
            slug: "title",
            unique: true,
        },
        description: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        upvote: {
            type: Number,
            default: 0,
        },
        downvote: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                connent: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const postModel = mongoose.model("Post", postModels);
export default postModel;
