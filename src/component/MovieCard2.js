import React from 'react';
import "./../App.css";
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradeIcon from '@mui/icons-material/Grade';
import { Box, Typography } from '@mui/material';

const MovieCard2 = ({ item }) => {
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
      className='card2'
      onClick={showDetail}
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path})`,
      }}
    >
      <div className="card2-info">
        <Box>
            <Box sx={{display:"flex", flexDirection:"row", width:"100%", height:'25%'}}>
                <img 
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} 
                    style={{width:"50px", height:"80px", marginTop:"10px"}}
                />
                <Box sx={{margin:'10px'}}>
                    <h1 style={{ display:"flex",fontSize: 'clamp(15px, 2vw, 20px)'}}>{item.title}</h1>
                    <p>{item.release_date.substring(0, 4)}</p>
                </Box>
            </Box>
            <Box sx={{margin:"5px", display: 'flex', gap: '10px', flexWrap:'wrap'}}>
            {item.genre_ids.map((id) => {
                const genre = genreList.find((item) => item.id === id);
                return genre ? <Badge bg="danger" key={id}>{genre.name}</Badge> : null;
            })}
            </Box>
            <Box>
                <Typography sx={{fontSize:"10px"}}>
                    {item.overview}
                </Typography>
            </Box>
            <Box sx={{width:"100%"}}>
            <span><GradeIcon/> {item.vote_average}  </span>
            <span><PeopleAltIcon/>{item.popularity}</span>
            
            </Box>
        </Box>
      </div>
      <span>{item.adult ? "19" : "All"}</span>
    </div>
  );
}

export default MovieCard2;