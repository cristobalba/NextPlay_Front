import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./GameForm.css"; // Import the CSS file for styling
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from '../Auth/useAuthToken';

function GameForm() {
  const { isAuthenticated } = useAuth0();
  const { token, error, fetchToken } = useAuthToken();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    genre: "",
    favorite: "",
    type: "",
  });

  const [missingData, setMissingData] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // enviar info a backend
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/recommend`,
        {
          'genre': formData.genre,
          'favorite': formData.favorite,
          'type': formData.type,
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response && response.data) {
        setRecommendations(response.data.recommendations);
      }
    } catch (error) {
      console.error("Error al pedir recomendación:", error);
    };
  }

  const isFormDataEmpty = Object.values(formData).some((value) => value === "");

  const checkInputs = () => {
    if (isFormDataEmpty) {
      return setMissingData(true);
    }
    setLoading(true);
    setMissingData(false);
  }

  useEffect(() => {
    if (isAuthenticated) {
      const getTokenAndCheckUser = async () => {
        await fetchToken();
      };

      getTokenAndCheckUser();
    }
  }, [isAuthenticated, fetchToken]);

  useEffect(() => {
    if (recommendations.length > 0) { // Verificar si hay recomendaciones antes de navegar
      navigate('../chat', { state: { recommendations: recommendations } });
    }
  }, [recommendations, navigate]); // Este useEffect solo se activa cuando recommendations cambia


  return (
    <div className="form-container">
      <h2>Rellena con tus preferencias de juegos</h2>
      <form onSubmit={handleSubmit} className="game-form">
        <div className="form-group">
          <label htmlFor="genre">Género de juego:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g., Acción, RPG"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="favorite">Juego favorito:</label>
          <input
            type="text"
            id="favorite"
            name="favorite"
            value={formData.favorite}
            onChange={handleChange}
            placeholder="e.g., The Witcher 3"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gameType">Tipo de juego:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccionar tipo
            </option>
            <option value="Single Player">Single Player</option>
            <option value="Multiplayer">Multiplayer</option>
            <option value="Co-op">Co-op</option>
          </select>
        </div>
        <button
          type="submit"
          className="submit-button"
          onClick={() => checkInputs()}
          style={{ color: 'white' }}
        >
          {loading ? "Cargando..." : "Enviar"}
        </button>
        {missingData ? (
          <p style={{ color: 'red' }}>*Debes rellenar todos los campos</p>)
          : (<></>)
        }
      </form>
    </div>
  );
}

export default GameForm;
