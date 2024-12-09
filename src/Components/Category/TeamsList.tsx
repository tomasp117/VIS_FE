import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Team } from "../../Models/Team";

const TeamsList: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>(); // Získání categoryId z URL
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/teams/by-category/${categoryId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch teams");
                }
                const data = await response.json();
                setTeams(data.map((team: any) => new Team(team.id, team.name)));
            } catch (error) {
                console.error("Error fetching teams:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [categoryId]);

    if (loading) {
        return <div>Načítám týmy...</div>;
    }

    if (teams.length === 0) {
        return <div>Žádné týmy nebyly nalezeny.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left font-medium text-gray-700 border-b w-12">
                            #
                        </th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">
                            Název týmu
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr
                            key={team.id}
                            className={
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                        >
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{team.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamsList;
