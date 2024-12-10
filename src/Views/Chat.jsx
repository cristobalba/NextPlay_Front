import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importa los estilos
import "./Chat.css";
import Navbar from '../Components/Navbar';
import { RiArrowGoBackFill } from "react-icons/ri";

function Chat() {
  const location = useLocation();
  const { recommendations, token } = location.state;
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [missingData, setMissingData] = useState(false);
  const [selectedRecommendationId, setSelectedRecommendationId] = useState(null);
  const [selectedGameTitle, setSelectedGameTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (comment === "" || rating === "") {
      return setMissingData(true);
    }
    setMissingData(false);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/feedback`, {
        'feedbacks': [
          {
            "recommendationId": selectedRecommendationId,
            "rating": parseInt(rating),
            "comment": comment,
          }
        ]
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(false);
      // Mostrar notificación después de enviar el feedback correctamente
      toast.success("¡Feedback enviado correctamente!", {
        position: "top-right", // Posición de la notificación
        autoClose: 5000, // Tiempo en milisegundos que permanece visible
        hideProgressBar: false, // Mostrar barra de progreso
        closeOnClick: true, // Cerrar al hacer clic
        pauseOnHover: true, // Pausar al pasar el ratón
        draggable: true, // Habilitar arrastre
      });
    } catch (error) {
      console.error("Error al enviar retroalimentación:", error);
      toast.error("Error al enviar feedback. Inténtalo nuevamente.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleRecommendationClick = (id, title) => {
    setSelectedRecommendationId(id);
    setSelectedGameTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      {/* Botón para redirigir a /form */}

      <div className="body-rec">
        <div className="chat-recommendations-container">
          {/* Recommendations Section */}
          <div className="recommendations-section">
            <h2 style={{color:'white'}}>Recomendaciones</h2>
            <p className="subtitle" style={{color:'white'}}>Haz click sobre una recomendación para dar feedback sobre esta y tener mejores recomendaciones a futuro!</p>
            <div className="recommendations-grid">
              {recommendations.map((recommendation, index) => (
                <div
                  key={recommendation.id}
                  className={`recommendation-card color-${(index % 5) + 1}`}
                  onClick={() => handleRecommendationClick(recommendation.id, recommendation.gameTitle)} // Establecer el id de la recomendación al hacer clic
                >
                  <h3>{recommendation.gameTitle}</h3>
                  <p>{recommendation.gameDescription}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Pop-Up */}
          {isModalOpen && (
            <div className="modal-overlay" onClick={handleCloseModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Tu opinión es importante</h2>
                <p className="gameTitle">Sobre {selectedGameTitle}</p>
                <form className="feedback-form" onSubmit={handleSendFeedback}>
                  <div className="feedback-input-container">
                    <label htmlFor="rating">Calificación de la recomendación:</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={handleRatingChange}
                      className="rating-input"
                    >
                      <option value="">Selecciona una calificación</option>
                      <option value="1">1 - Muy malo</option>
                      <option value="2">2 - Malo</option>
                      <option value="3">3 - Aceptable</option>
                      <option value="4">4 - Bueno</option>
                      <option value="5">5 - Excelente</option>
                    </select>
                  </div>

                  <div className="feedback-input-container">
                    <label htmlFor="comment">Comentario sobre la recomendación:</label>
                    <input
                      id="comment"
                      className="comment-input"
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Deja tu comentario..."
                      rows="4"
                    />
                  </div>

                  <div className="feedback-input-container">
                    <button type="submit" className="send-button" style={{color:'black'}}>
                      Enviar
                    </button>
                    {missingData && <p style={{ color: 'red' }}>*Debes rellenar todos los campos</p>}
                  </div>
                  <div className="feedback-input-container">
                    <button className="close-modal-button" onClick={handleCloseModal}>Cerrar</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Importa el componente de ToastContainer para renderizar las notificaciones */}
      <ToastContainer />
    </>
  );
}

export default Chat;
