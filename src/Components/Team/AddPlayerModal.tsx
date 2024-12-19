import React, { useState } from "react";
import { Player } from "../../Models/Player";
import { Category } from "../../Models/Category";

interface AddPlayerModalProps {
    teamId: number;
    onClose: () => void;
    onPlayerAdded: (player: Player) => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
    teamId,
    onClose,
    onPlayerAdded,
}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState<number | "">("");

    const handleSubmit = async (e: React.FormEvent) => {
    
        e.preventDefault();
    
        const newPlayer = {
            number,
            firstName,
            lastName,
            goalCount: 0,
            sevenMeterGoalCount: 0,
            sevenMeterMissCount: 0,
            twoMinPenaltyCount: 0,
            yellowCards: 0,
            redCards: 0,
            teamId,
            Category: 1,
        };
    
        console.log("Odesílaná data:", newPlayer);
    
        try {
            const response = await fetch(
                `http://localhost:5000/api/teams/${teamId}/players`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPlayer),
                }
            );
    
            if (!response.ok) {
                throw new Error(`Failed to add player: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Player added successfully:", data);
            onPlayerAdded(data);
            onClose();
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };
    
    

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Přidat hráče</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="number"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Číslo hráče
                        </label>
                        <input
                            type="number"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.valueAsNumber)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Jméno
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Příjmení
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Zavřít
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Přidat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPlayerModal;
