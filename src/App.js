import Navbar from './component/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MobileMoviedetail from './pages/MobileMovieDetail';
import Movies from './pages/Movies';
import Search from './pages/Search';
import { Route, Routes } from 'react-router-dom';
import useResponsive from './useMediaQuery';
//1. 3개 페이지 ( 홈페이지, 무비페이지, 무비 디테일)
//2. 홈페이지에서 배너를 볼 수 있다.
//3. 3가지 섹션의 영화를 볼 수 있다.(인기, 탑, 상승)
//4. 마우스 온하면 영화 디테일 표시 ( 제목, 장르, 점수, 인기도, 청불)
//5. 영화 슬라이드로 넘길 수 있다. 

//6. 영화 디테일 페이지에서 포스터, 제목, 줄거리, 점수, 인기도, 등등
//7. 트레일러를 누르면 유튜브 예고편 볼 수 있다.
//8. 영화 리뷰 , 관련 영화 볼 수 있다.

//9. 영화 검색 기능
//10. 영화 정렬 기능, 영화 필터링 기능

function App() {
  const {isMobile} = useResponsive();
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movie/:id" element={isMobile ? <MobileMoviedetail /> : <MovieDetail />} />
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </div>
  );

}

export default App;
