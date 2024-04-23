"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState } from "react";

export default function Home() {
    const [value, setValue] = useState({
        email: "namnhi@gamil.com",
        password: "Van123456@",
    });
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://devlocal.vn:5000/api/users/login",
                value,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form>
                <div className="py-4">
                    <input
                        className="border outline-none p-1 px-2 rounded-md"
                        type="text"
                        name="email"
                        value="namnhi@gamil.com"
                    />
                </div>
                <div className="py-4">
                    <input
                        className="border outline-none p-1 px-2 rounded-md"
                        type="password"
                        name="password"
                        value="Van123456@"
                    />
                </div>
                <div>
                    <button onClick={handleLogin} type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
