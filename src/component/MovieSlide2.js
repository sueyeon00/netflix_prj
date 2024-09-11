import React, {useState} from 'react'
import {Box, Grid, Pagination} from '@mui/material';
import MovieCard2 from './MovieCard2'

const MovieSlide2 = ({ movies }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // 페이지 변경 시 호출될 함수
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (!movies || !movies.results) {
        return <div>Movies data is not available.</div>; // 데이터가 없을 때 보여줄 메시지
    }

    // 전체 영화 리스트에서 현재 페이지에 해당하는 영화들만 추출
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = movies.results.slice(startIndex, endIndex);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(movies.results.length / itemsPerPage);


    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={2} sx={{ padding: '10px', justifyContent: 'center' }}>
                    {currentMovies.map((item) => (
                        <Grid item xs={1} key={item.id}>
                            <MovieCard2 item={item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
           
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={totalPages} // 총 페이지 수
                    page={currentPage} // 현재 페이지
                    onChange={handlePageChange} // 페이지 변경 핸들러
                    size='large'
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'white', // 기본 숫자 색상
                        },
                        '& .Mui-selected': {
                            color: 'white', // 선택된 페이지의 숫자 색상
                            backgroundColor: 'red', // 선택된 페이지의 배경색
                        },
                    }}
                />
            </Box>
       
        </div>
    );
}

export default MovieSlide2;