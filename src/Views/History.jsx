import React, { useState, useEffect } from 'react';
import './History.css'; // Importamos el archivo CSS
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from '../Auth/useAuthToken';
import Navbar from '../Components/Navbar';

function GameList() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const { token, error, fetchToken } = useAuthToken();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [gamesPerPage] = useState(15); // Juegos por página

    // Función para generar colores aleatorios
    const getRandomColor = () => {
        const colors = ['#A0C4E1', '#B1D2E6', '#C3D9EC', '#D4E1F0', '#E5F0F5'];

        return colors[Math.floor(Math.random() * colors.length)];
    };

    const fetchRecs = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recommendations`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGames(response.data); // Asignar los datos obtenidos al estado `games`
            setLoading(false); // Marcar que la carga ha terminado
        } catch (error) {
            console.error('Error al obtener los juegos:', error);
            setLoading(false); // En caso de error, también terminamos la carga
        }
    };

    // Paginación: obtenemos los juegos correspondientes a la página actual
    const paginate = (games, currentPage, gamesPerPage) => {
        const indexOfLastGame = currentPage * gamesPerPage;
        const indexOfFirstGame = indexOfLastGame - gamesPerPage;
        return games.slice(indexOfFirstGame, indexOfLastGame);
    };

    // Función para cambiar de página
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (isAuthenticated) {
            const getRecs = async () => {
                await fetchRecs();
            };

            getRecs();
        }
    }, [isAuthenticated]);

    return (
        <>
            <Navbar />
            <div className="game-list-container">
                <div className="game-list-scroll">
                    {loading ? (
                        <div className="loading">Cargando...</div> // Mostrar mensaje de carga
                    ) : (
                        // Mostrar los juegos de la página actual
                        paginate(games, currentPage, gamesPerPage).map((game, index) => (
                            <div key={index} className="game-card-container">
                                <div
                                    className="game-title-card"
                                    style={{ backgroundColor: getRandomColor() }}
                                >
                                    <h2 className="game-title">{game.gameTitle}</h2>
                                </div>
                                <div className="game-description-card">
                                    <p className="game-description">{game.gameDescription}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Botones de paginación fuera del área de scroll */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => changePage(currentPage - 1)}
                    >
                        Anterior
                    </button>
                    <button
                        disabled={currentPage === Math.ceil(games.length / gamesPerPage)}
                        onClick={() => changePage(currentPage + 1)}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </>
    );
}

export default GameList;

