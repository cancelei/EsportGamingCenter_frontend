import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './GameCarousel.css';

function GameCarousel({ games, handleGameClick }) {
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function handleKeyDown(event, gameId) {
    if (event.key === 'Enter') {
      handleGameClick(gameId);
    }
  }

  return (
    <div>
      <h2>Game Catalog</h2>
      <Slider
        dots={settings.dots}
        infinite={settings.infinite}
        speed={settings.speed}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        responsive={settings.responsive}
      >
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => handleGameClick(game.id)}
            onKeyDown={(event) => handleKeyDown(event, game.id)}
            className="game-slide"
            role="button"
            tabIndex={0}
            aria-label={game.title} // Added aria-label for text label
          >
            <img src={game.image_url} alt={game.title} />
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

GameCarousel.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleGameClick: PropTypes.func.isRequired,
};

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="Previous" // Added aria-label for text label
    />
  );
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="Next" // Added aria-label for text label
    />
  );
}

SampleNextArrow.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GameCarousel;
