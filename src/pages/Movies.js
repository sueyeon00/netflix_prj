import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieAction';
import MovieSlide2 from '../component/MovieSlide2'
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Divider, TextField, MenuItem, Slider, Button} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const sortList = [
  {
    value: 'popularMovies',
    label: 'Popularity',
  },
  {
    value: 'upComingMovies',
    label: 'UpComing',
  },
  {
    value: 'topRateMovies',
    label: 'TopReted',
  },
  
];

function valuetext(value) {
  return `${value}`;
}

const Movies = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState([1990, 2024]);
  const [selectedSort, setSelectedSort] = useState('popularMovies');
  const [reverseSort, setReverseSort] = useState(false);
  const { popularMovies, topRateMovies, upComingMovies, loading } = useSelector(
      (state) => state.movies
  );
  useEffect(() => {
      dispatch(fetchMovies());
  },[dispatch])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // 연도 범위로 영화 필터링
  const filterMoviesByYear = (movies) => {
    if (!movies || !movies.results) {
      return [];
    }
    return movies.results.filter((movie) => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      return releaseYear >= value[0] && releaseYear <= value[1];
    });
  };

  // 선택한 정렬 옵션에 따라 영화 목록 선택
  const sortedMovies = {
    popularMovies: popularMovies,
    upComingMovies: upComingMovies,
    topRateMovies: topRateMovies,
  }[selectedSort]|| { results: [] };

  // 필터링된 영화 목록을 'results' 속성으로 감싸기
  const filteredMovies = {
    results: filterMoviesByYear(sortedMovies),
  };
  
  if (reverseSort) {
    filteredMovies.results.reverse();
  }
  return(
    <div style={{backgroundColor:'black'}}>
      <Typography sx={{color:"white", top:'10px',justifyContent:'center', display:'flex', fontSize:'xx-large'}}>Movies</Typography>
      <Divider sx={{ borderColor: "white", borderBottomWidth: "medium", borderStyle:'double'}}/>
      <Box sx={{display:'flex',flexDirection: 'row'}}>
        <Box sx={{ display:'flex',width:'20%',height:'100%', margin:"10%", flexDirection: 'column'}}>
          <Accordion >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Sort</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                id="standard-select-currency"
                select
                label="Select"
                defaultValue="Popularity"
                helperText="Sort Results By "
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                variant="standard"
              >
                {sortList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{marginTop:'20px'}} >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: "100%" ,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography>YEAR FILTER</Typography>
                <Slider
                  min={1990} // 최소값
                  max={2024} // 최대값
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaLabel={() => 'Year range'}
                  getAriaValueText={valuetext}
                  color='black'
                />
                <Typography gutterBottom>
                  From {value[0]} To {value[1]}
                </Typography>
                <Button
                  sx={{
                    margin:'10px',
                    display:'flex', 
                    color:'red',
                  }}
                  onClick={() => setReverseSort(!reverseSort)}
                  >
                    reverse
                </Button>
                
              </Box>
              <Divider sx={{borderColor:'black'}}/>
              {/* <Box sx={{ width: "100%" ,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography>GENRE FILTER</Typography> 
              </Box> */}
              
            </AccordionDetails>
          </Accordion>
          
        </Box>
        <Box sx={{display:'flex',width: { xs: '100%', md: '60%' }, margin:'3%'}}>
          <MovieSlide2 movies={filteredMovies}/>
        </Box>
      </Box>
    </div>
  );
};

export default Movies;