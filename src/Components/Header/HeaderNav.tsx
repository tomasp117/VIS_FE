import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";
import { Category } from "../../Models/Category";

const HeaderNav: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Login modal
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Rozbalovací menu trenéra
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => !!localStorage.getItem("token")
    );
    const [role, setRole] = useState(() => localStorage.getItem("role") || "");

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
    };

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen((prev) => !prev);
    };

    const handleLoginSuccess = (role: string, coachId?: string) => {
        setIsLoggedIn(true);
        setRole(role);
        if (role === "Coach" && coachId) {
            localStorage.setItem("coachId", coachId); // Uložení coachId
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole("");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/categories"
                );
                const data = await response.json();
                setCategories(
                    data.map(
                        (category: any) =>
                            new Category(
                                category.id,
                                category.name,
                                category.votingOpen
                            )
                    )
                );
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            {/* Left section: Logo and navigation */}
            <div className="flex items-center space-x-6">
                {/* Logo/Home link */}
                <Link to="/" className="text-white text-lg font-bold">
                    Polanka Cup 2025
                </Link>

                {/* Dropdown for categories */}
                <div className="relative">
                    <button
                        onClick={toggleCategoryDropdown}
                        className="text-gray-300 hover:text-white focus:outline-none flex items-center"
                    >
                        Kategorie
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="ml-2 w-4 h-4"
                        />
                    </button>
                    {isCategoryDropdownOpen && (
                        <div className="absolute bg-white shadow-md rounded mt-2 z-10 w-48">
                            <ul className="py-1">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            to={`/category/${category.id}`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                            onClick={() =>
                                                setIsCategoryDropdownOpen(false)
                                            }
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Right section: Login/Profile */}
            <div className="relative">
                {isLoggedIn ? (
                    <div className="relative">
                        <button
                            onClick={toggleProfileDropdown}
                            className="text-gray-300 hover:text-white focus:outline-none flex items-center"
                        >
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                className="w-8 h-8"
                            />
                        </button>
                        {isProfileDropdownOpen && role === "Coach" && (
                            <div className="absolute right-0 bg-white shadow-md rounded mt-2 z-10 w-48">
                                <ul className="py-1">
                                    <li>
                                        <Link
                                            to="/my-team"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                            onClick={() =>
                                                setIsProfileDropdownOpen(false)
                                            }
                                        >
                                            Můj tým
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        >
                                            Odhlásit se
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setIsDropdownOpen(true)}
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            className="w-8 h-8 text-gray-300 hover:text-white"
                        />
                    </button>
                )}
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </nav>
    );
};

export default HeaderNav;
