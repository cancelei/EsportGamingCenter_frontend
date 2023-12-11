import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './GameCarousel.css'; // Importa aquí el archivo CSS

function GameCarousel({ games }) {
  const navigate = useNavigate(); // Inicializa navigate usando useNavigate

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleGameClick = (gameId) => {
    navigate(`/details/${gameId}`); // Redirige a la página de detalles
  };

  return (
    <div>
      <h2>Game Catalog</h2>
      <Slider {...settings}>
        {games.map(game => (
          <div key={game.id} onClick={() => handleGameClick(game.id)} className="game-slide">
            <img src={game.image_url} alt={game.title} />
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next`} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev`} onClick={onClick} />
  );
}

GameCarousel.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default GameCarousel;
