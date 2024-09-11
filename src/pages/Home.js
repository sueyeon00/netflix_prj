import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieAction';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';
import {Box, CircularProgress} from '@mui/material';

//2. 홈페이지에서 배너를 볼 수 있다.
//3. 3가지 섹션의 영화를 볼 수 있다.(인기, 탑, 상승)
//4. 마우스 온하면 영화 디테일 표시 ( 제목, 장르, 점수, 인기도, 청불)
//5. 영화 슬라이드로 넘길 수 있다. 
const Home = () => {
    const dispatch = useDispatch();
    const { popularMovies, topRateMovies, upComingMovies, loading } = useSelector(
        (state) => state.movies
    );
    useEffect(() => {
        dispatch(fetchMovies());
    },[dispatch])
    
    if(loading){
        return <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // 수평 중앙 정렬
          alignItems: 'center',     // 수직 중앙 정렬
          height: '100vh',          // 화면 전체 높이
        }}
      >
        <CircularProgress
          sx={{
            color: '#e50914', // 빨간색
          }}
        />
      </Box>
    }
  return (
    <div style={{backgroundColor:'black', color:'white'}}>
        <Box >
            <Banner movie={popularMovies.results[0]}/>
            <h1>Popluar Movie</h1>
            <MovieSlide movies={popularMovies}/>
            <h1>Top Rated Movie</h1>
            <MovieSlide movies={topRateMovies}/>
            <h1>Upcoming Movie</h1>
            <MovieSlide movies={upComingMovies}/>
            <Box sx={{width:"100%", height:"150px", color:"black"}}/>
        </Box>
    </div>
  )
}

export default Home