import React from 'react';
import "./../App.css";
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradeIcon from '@mui/icons-material/Grade';

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const { genreList } = useSelector(state => state.movies); 
  

  const showDetail = () => {
    navigate(`/movie/${item.id}`, {
      state : item
    });
  };

  if (!genreList.length) {
    return <div>Loading genres...</div>;
  }

  return (
    <div 
      className='card'
      onClick={showDetail}
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path})`,
      }}
    >
      <div className='overlay'>
        <h1 style={{ fontSize: '20px', margin:"5px"}}>{item.title}</h1>
        <div style={{margin:'10px', display: 'flex', gap: '10px', flexWrap:'wrap'}}>
          {item.genre_ids.map((id) => {
            const genre = genreList.find((item) => item.id === id);
            return genre ? <Badge bg="danger" key={id}>{genre.name}</Badge> : null;
          })}
        </div>
        <div style={{margin:'10px'}}>
          <span><GradeIcon/> {item.vote_average}  </span>
          <span>{item.adult ? "19" : "All"}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
