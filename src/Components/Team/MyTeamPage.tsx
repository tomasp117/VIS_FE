import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "../../Models/Team";

const MyTeamPage: React.FC = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
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
            {/* Další informace o týmu nebo možnosti správy */}
        </div>
    );
};

export default MyTeamPage;
