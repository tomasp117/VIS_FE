import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "../../Models/Team";
import { Player } from "../../Models/Player";
import AddPlayerModal from "./AddPlayerModal";

const MyTeamPage: React.FC = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyTeam = async () => {
            try {
                const coachId = localStorage.getItem("coachId");
                if (!coachId) {
                    throw new Error("Coach ID not found");
                }

                const response = await fetch(
                    `http://localhost:5000/api/coaches/${coachId}/team`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch team");
                }

                const data = await response.json();
                setTeam(new Team(data.id, data.name));
            } catch (error) {
                console.error("Error fetching team:", error);
                navigate("/"); // Přesměrování na domovskou stránku
            } finally {
                setLoading(false);
            }
        };

        fetchMyTeam();
    }, [navigate]);

    useEffect(() => {
        const fetchPlayers = async () => {
            if (!team) {
                console.log("No team available to fetch players.");
                return;
            }
            try {
                console.log(`Fetching players for team ID: ${team.id}`);
                const response = await fetch(
                    `http://localhost:5000/api/teams/${team.id}/players`
                );
    
                if (response.status === 404) {
                    console.log("No players found for this team.");
                    setPlayers([]);
                    return;
                }
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch players: ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log("Players fetched successfully:", data);
    
                setPlayers(
                    data.map(
                        (player: any) =>
                            new Player(
                                player.id,
                                player.number,
                                player.firstName,
                                player.lastName,
                                player.goalCount,
                                player.sevenScored,
                                player.sevenMissed,
                                player.twoMin,
                                player.yellowCards,
                                player.redCards
                            )
                    )
                );
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };
    
        if (team) {
            fetchPlayers();
        }
    }, [team]);
    
    
    

    const handleAddPlayer = (newPlayer: Player) => {
        setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    };

    if (loading) {
        return <div>Načítám tým...</div>;
    }

    if (!team) {
        return <div>Váš tým nebyl nalezen.</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Můj tým</h1>
            <p>
                <strong>Název týmu:</strong> {team.name}
            </p>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                Přidat hráče
            </button>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        <strong>{player.number}</strong> - {player.firstName}{" "}
                        {player.lastName}
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <AddPlayerModal
                    teamId={team.id}
                    onClose={() => setIsModalOpen(false)}
                    onPlayerAdded={handleAddPlayer}
                />
            )}
        </div>
    );
};

export default MyTeamPage;
