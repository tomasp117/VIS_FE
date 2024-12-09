import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import for the close icon in font awesome
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (role: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onLoginSuccess,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose(); // Close the modal
            }
        };

        // Attach event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = { username, password };

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, role, coachId } = data;

                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                // Pokud je role "Coach", uložte také coachId
                if (role === "Coach" && coachId) {
                    localStorage.setItem("coachId", coachId);
                }

                onLoginSuccess(role);

                alert("Login successful!");
                setUsername(""); // Clear the form
                setPassword(""); // Clear the form
                onClose();
            } else {
                alert("Failed to login.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred.");
        }
    };

    const handleReset = () => {
        setUsername("");
        setPassword("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
                {/* <div className="flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:underline focus:outline-none"
                        >
                        <FontAwesomeIcon icon={faClose} />
                        </button>
                </div> */}
                <h2 className="text-lg font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end items-center space-x-4">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-gray-500 hover:underline focus:outline-none"
                        >
                            Reset Password
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 focus:outline-none"
                        >
                            Login
                        </button>
                    </div>
                </form>
                {/* Close Button */}
                <div className="mt-4 text-right"></div>
            </div>
        </div>
    );
};

export default LoginModal;
