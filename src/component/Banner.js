import React from 'react'
import "./../App.css";
import useResponsive from '../useMediaQuery';
import { Typography } from '@mui/material';



const Banner = ({movie}) => {
  const { isMobile } = useResponsive();

  return (
    <div 
        className='banner'
        style={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path})`
            
        }}
    >
        <div className='banner-info'>
            <Typography sx={{ fontSize : isMobile ? "20px" : "24px"}}>{movie.title}</Typography>
            <Typography sx={{ fontSize : isMobile ? "12px" : "16px"}}>{movie.overview}</Typography>
        </div>
     
    </div>
  )
}

export default Banner;