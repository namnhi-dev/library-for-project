import validator from "validator";
import bcrypt from "bcrypt";

import userModel from "../models/userModel.js";
import { generateRefreshToken, generateToken } from "../configs/jwtToken.js";

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        let user = await userModel.findOne({ email, username });

        if (user)
            return res.json({
                success: false,
                message: "Người dùng đã tồn tại",
            });

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Email không hợp lệ",
            });
        }

        if (!validator.isStrongPassword(password)) {
            return res.json({
                success: false,
                message: "Password không hợp lệ",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new userModel({
            email,
            username,
            password: hashedPassword,
        });

        await user.save();

        const token = generateToken(user._id);
        return res.json({
            success: true,
            message: "Tạo thành công",
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, username, password } = req.body;
    console.log("hihi");
    try {
        let user = await userModel.findOne({
            $or: [{ email: email }, { username: username }],
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Người dùng không tồn tại",
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.json({
                success: false,
                message: "Thông tin đăng nhập không đúng",
            });
        }
        const refreshToken = await generateRefreshToken(user._id);
        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken,
        });
        // Thiết lập thời gian hết hạn cho cookie, ví dụ: 30 ngày
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true, // Không thể truy cập cookie thông qua JavaScript trên trình duyệt
            secure: true, //
        };

        // Đặt cookie và trả về phản hồi
        // res.cookie("token", refreshToken, cookieOptions);
        return res
            .setHeader(
                "Set-Cookie",
                `token=${refreshToken}; httpOnly;SameSite=None; Secure; Partitioned`
            )
            .json({ success: true, user });
    } catch (error) {}
};

const getUser = async (req, res) => {
    try {
        const user = await userModel.find().select("-password -role -__v");
        if (!user) {
            return res.json({ success: false, message: "Chưa có tài khoản" });
        }
        return res.json({ success: true, user });
    } catch (error) {}
};

export { createUser, loginUser, getUser };
