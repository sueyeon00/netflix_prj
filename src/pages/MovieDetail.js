import React,{useEffect, useState} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {Box, Button, Divider, Avatar, Stack, Typography, Modal, CircularProgress} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradeIcon from '@mui/icons-material/Grade';
import { deepOrange } from '@mui/material/colors';
import { fetchMovieDetails } from '../redux/actions/movieDetailAction';
import { fetchMovies } from '../redux/actions/movieAction';
import YouTube from 'react-youtube';
import MovieCard2 from '../component/MovieCard2';

//영화 데이터 가져오기 movie/:id
//포스터, 장르, 제목, 평점, 관객 수, 청불여부, 줄거리, 
//budget, revenue, release day, time
//watch tralier 링크로 예고편 연결

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { id } = useParams();
  const { reviews, recommendations, traliers, loading, error } = useSelector((state) => state.movieDetails);
  const { genreList } = useSelector(state => state.movies); 
  const [selectedButton, setSelectedButton] = useState('reviews');
  const [open, setOpen] = useState(false);
  
  const clickReviewBtn = () => {
    setSelectedButton('reviews');
  };

  const clickRelatedBtn = () => {
    setSelectedButton('related');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const tralier = traliers?.results || [];
  let videoKey = '';

  // 'Official Trailer' 이름을 가진 비디오를 찾기
  if (tralier.length > 0) {
    // 'Official Trailer' 이름을 가진 비디오를 찾기
    const officialTrailer = tralier.find(video => video.name === 'Official Trailer');
  
    if (officialTrailer) {
      // 'Official Trailer' 비디오가 있으면 그 key 사용
      videoKey = officialTrailer.key;
    } else if (tralier.length > 0) {
      // 'Official Trailer'가 없으면, 가장 마지막 비디오의 key 사용
      videoKey = tralier[tralier.length - 1].key;
    }
  }
  console.log('videokey', videoKey)

  
  useEffect(() => {
    // 장르 리스트가 비어 있을 경우 fetchMovies 호출
    if (!genreList.length) {
      dispatch(fetchMovies());
    }
    dispatch(fetchMovieDetails(id)); // 영화 상세 정보 가져오기
  }, [dispatch, id, genreList.length]);

  if (loading) return <div><Box
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
</Box></div>;
  if (error) return <div>Error: {error}</div>;
  if (!genreList.length) {
    return <div>Loading genres...</div>;

  }
  
  return (
    <div style={{backgroundColor:'black', height: '100%', color:'white'}}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center' ,
        marginBottom: '40px'
      }}>
        <Box sx={{marginLeft:'10%', marginTop:'10%', marginRight:'2%'}}>
          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${state.poster_path}`} alt="Movie Poster" />
        </Box>
        <Box sx={{marginRight:'10%', marginTop:'10%', marginLeft:'2%'}}>
          <span> {state.adult ? 
            <Avatar sx={{
              bgcolor : deepOrange[500],
              width:'24px', 
              height:'24px', 
              fontSize:'small' 
              }}>19</Avatar>  
              : <Avatar 
              sx={{width:'24px', height:'24px', fontSize:'small'}}>All</Avatar> }</span>
          <h1>{state.title}</h1>
          <div style={{margin:'10px', display: 'flex', gap: '10px'}}>
          {state.genre_ids.map((id) => {
            const genre = genreList.find((state) => state.id === id);
            return genre ? <Badge bg="danger" key={id}>{genre.name}</Badge> : null;
          })}
          </div>
          <p> <GradeIcon/> {state.vote_average}   <PeopleAltIcon/> {state.popularity}</p>
          <Divider/>
          <p> {state.overview} </p>
          <Divider/>
          <p> <Badge bg="danger" >Date</Badge>  {state.release_date}</p>
          <Divider/>
          <Button sx={{color:'red'}} onClick={handleOpen}>Show Tralier</Button>
          <Modal
            open = {open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{position: 'absolute', width:"400px", top:"50%", left:"50%" ,transform: 'translate(-50%, -50%)'}}>
              <YouTube videoId={videoKey}/>
            </Box>

          </Modal>
        </Box>
      </Box>
      <Divider/>
      <Box
        sx={{margin :"10%", marginTop :'5%' }}>
          <Stack direction="row" spacing={3}>
              <Button 
                variant={selectedButton === 'reviews' ? 'contained' : 'outlined'}
                color='error'
                onClick={clickReviewBtn}
                >
                Reviews({reviews.total_results})
              </Button>
              <Button 
                variant={selectedButton === 'related' ? 'contained' : 'outlined'}
                color='error'
                onClick={clickRelatedBtn}>
                Related Movies({recommendations.total_results})
              </Button>
          </Stack>
        <Box
          height={800}
          width="100%"
          my={4}
          marginBottom={10}
          display="flex"
          flexDirection='column'
          overflow='auto'
          alignItems="center"
          color='white'
          gap={4}
          p={3}
          sx={{ border: '5px solid grey' }}
        >
          {selectedButton === 'reviews' ? (
          // 리뷰를 보여주는 부분
          reviews.results.length > 0 ? (
            reviews.results.map((review) => (
              <Box key={review.id} mb={2}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
                <Divider/>
              </Box>
            ))
          ) : (
            <p>No reviews available.</p>
          )
        ) : (
          // 추천 영화를 보여주는 부분
          <Box display="flex" flexWrap="wrap" gap={2}>
            {recommendations.results.length > 0 ? (
              recommendations.results.map((movie) => (
                <Box key={movie.id} mb={2} sx={{ width: 'calc(33% - 10px)' }}>
                  <MovieCard2 item ={movie} />
                 
                </Box>
              ))
            ) : (
              <p>No related movies available.</p>
            )}
          </Box>
        )}
          
        </Box>
        <Box sx={{background:"black", width:"100%", height:'50px'}}/>
      </Box>
    </div>

  )
}

export default MovieDetail