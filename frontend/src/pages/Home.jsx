import MovieCard from "../components/MovieCard.jsx";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadPopularMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } catch (err) {
            console.log(err);
            setError("Failed to load popular movies");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setMovies(results);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    };

    const handleCancelSearch = () => {
        setSearchQuery("");    // Clear input
        loadPopularMovies();   // Reset back to popular movies
    };
      

    return (
        <div className="home">
            <div className="container">
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a movie..."
                        className="search-input"
                    />
                    <button type="submit" className="search-button" aria-label="Search for movie">Search</button>
                    {/* Cancel button: only shows if theres a query in the input field */}

                    {searchQuery && (
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancelSearch}
                            aria-label="Clear search">
                            Cancel
                        </button>
                    )}
                </form>

                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}

                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;