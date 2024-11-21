// function Chat() {
//   return (
//     <div className="container">
//       <h1>Recomendador de Videojuegos en Steam 🎮</h1>
//       <form id="recommendationForm">
//         <label htmlFor="genre">Género de videojuego:</label>
//         <input type="text" id="genre" name="genre" required placeholder="Acción, Aventura, RPG..." />

//         <label htmlFor="favorite">Tu juego favorito:</label>
//         <input type="text" id="favorite" name="favorite" required placeholder="Ejemplo: Dark Souls" />

//         <label htmlFor="type">Tipo de juego:</label>
//         <input type="text" id="type" name="type" required placeholder="Online, Singleplayer, Mundo Abierto..." />

//         <button type="submit">Enviar</button>
//       </form>

//       <div id="recommendations" className="recommendations">
//         <h2>Recomendaciones</h2>
//         <ul id="recommendationsList"></ul>
//       </div>
//     </div>
//   )
// }
// export default Chat;

import React, { useState } from "react";
import "./Chat.css"; // Import the CSS file for styling

function GameForm() {
  const [formData, setFormData] = useState({
    genre: "",
    favoriteGame: "",
    gameType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="form-container">
      <h2>Game Preferences</h2>
      <form onSubmit={handleSubmit} className="game-form">
        <div className="form-group">
          <label htmlFor="genre">Game Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g., Action, RPG"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="favoriteGame">Favorite Game:</label>
          <input
            type="text"
            id="favoriteGame"
            name="favoriteGame"
            value={formData.favoriteGame}
            onChange={handleChange}
            placeholder="e.g., The Witcher 3"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gameType">Type of Game:</label>
          <select
            id="gameType"
            name="gameType"
            value={formData.gameType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Single Player">Single Player</option>
            <option value="Multiplayer">Multiplayer</option>
            <option value="Co-op">Co-op</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default GameForm;

