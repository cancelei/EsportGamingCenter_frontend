import { React } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import GameItem from './GameItem';
import '../../assets/css/carousel.css';

function MainPage() {
  const { games } = useSelector((state) => state.games);

  return (
    <>
      <Navbar />
      <div className="main-page-container">MainPage</div>
      {games.map((game) => (
        <GameItem
          key={game.id}
          game={game}
          classNames={{
            button: 'btn btn-outline-primary',
            gameBody: 'card-body',
            imageContainer: 'image-container',
            image: 'card-img-top',
            title: 'card-title',
            discription: 'card-text',
          }}
        />
      ))}
    </>
  );
}

export default MainPage;
