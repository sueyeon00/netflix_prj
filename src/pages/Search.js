import React ,{useEffect} from 'react'
import { fetchSearch } from '../redux/actions/searchAction';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress,Typography, Grid, Divider} from '@mui/material';
import MovieCard2 from '../component/MovieCard2';
//Navbar에서 받아온 키워드가 속한 영화 카드를 보여주기 
//useLocation으로 받아오기
//url = /search?q=quary
const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const dispatch = useDispatch();
  const { loading, searchResults, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (query) {
      dispatch(fetchSearch(query)); // 검색어로 API 호출
    }
  }, [dispatch, query]);

  console.log('search', searchResults  )
  

  return (
    <Box sx={{ p: 2, backgroundColor:'black' }}>
    <Typography sx={{color:"white", top:'10px',justifyContent:'center', display:'flex', fontSize:'xx-large'}}>
        Search for "{query}"
    </Typography>
    <Divider sx={{ borderColor: "white", borderBottomWidth: "medium", borderStyle:'double', margin:'15px'}}/>
    
    {loading && <Box
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
    </Box>}
    {error && <Typography color="error">Error: {error}</Typography>}
    {!loading && !error && (
      <Box sx={{ flexGrow: 1, p: 2 }}>
      {!loading && !error && (
        <Grid container spacing={2}>
          {searchResults.length === 0 ? (
            <Typography>No results found.</Typography>
          ) : (
            searchResults.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard2 item={movie} />
              </Grid>
            ))
          )}
        </Grid>
      )}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.message}</Typography>}
    </Box>
    )}
  </Box>
  )
}

export default Search