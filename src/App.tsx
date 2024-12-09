import AddTournament from "./AddTournament";
import HeaderNav from "./Components/Header/HeaderNav";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./Pages/CategoryPage";
import TeamsList from "./Components/Category/TeamsList";
import MyTeamPage from "./Components/Team/MyTeamPage";

function App() {
    return (
        <>
            <Router>
                <HeaderNav />
                <div className="App">
                    <Routes>
                        {/* Hlavní stránka */}
                        <Route path="/" element={<h1>Home</h1>} />

                        {/* Kategorie */}
                        <Route
                            path="category/:categoryId"
                            element={<CategoryPage />}
                        >
                            {/* Vnořené trasy pro každou záložku */}
                            <Route path="ucastnici" element={<TeamsList />} />
                            <Route path="skupiny" element={<h1>Skupiny</h1>} />
                            <Route path="utkani" element={<h1>Utkání</h1>} />
                            <Route path="poradi" element={<h1>Pořadí</h1>} />
                        </Route>
                        <Route path="/my-team" element={<MyTeamPage />} />
                        {/* Fallback pro neexistující cesty */}
                        <Route
                            path="*"
                            element={<div>404: Page not found</div>}
                        />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
