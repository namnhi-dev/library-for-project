import mongoose from "mongoose";

const dBConnect = async () => {
    try {
        await mongoose.connect(process.env.DBCONNECT_URL);
        console.log("Connected Successfully");
    } catch (error) {
        console.log("NOT Connected");
    }
};

export default dBConnect;
