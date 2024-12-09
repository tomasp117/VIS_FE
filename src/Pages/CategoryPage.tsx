import { Link, Outlet, useParams } from "react-router-dom";

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Kategorie: {categoryId}</h1>

            {/* Navigace mezi záložkami */}
            <div className="flex space-x-4 border-b mb-4">
                <Link
                    to="ucastnici"
                    className="py-2 px-4 text-gray-500 hover:text-indigo-500"
                >
                    Účastníci
                </Link>
                <Link
                    to="skupiny"
                    className="py-2 px-4 text-gray-500 hover:text-indigo-500"
                >
                    Skupiny
                </Link>
                <Link
                    to="utkani"
                    className="py-2 px-4 text-gray-500 hover:text-indigo-500"
                >
                    Utkání
                </Link>
                <Link
                    to="poradi"
                    className="py-2 px-4 text-gray-500 hover:text-indigo-500"
                >
                    Pořadí
                </Link>
            </div>

            {/* Obsah záložek */}
            <Outlet />
        </div>
    );
};

export default CategoryPage;
