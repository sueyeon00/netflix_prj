import React ,{useState} from 'react'
import { styled, alpha } from '@mui/material/styles';
import {AppBar, Box, Toolbar, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link , useNavigate} from 'react-router-dom';
import "./../App.css";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#000000', 0.85), // 배경을 검정색으로 설정
  '&:hover': {
    backgroundColor: alpha('#000000', 0.95), // 호버 시 배경을 더 진한 검정색으로
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff', // 아이콘 색상을 흰색으로 설정
  }));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#ffffff', // 텍스트 색상을 흰색으로 설정
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
          borderColor: '#e50914', // 포커스 시 빨간색으로 포인트 설정
        },
      },
    },
    '& .MuiInputBase-root': {
      border: '1px solid #ffffff', // 입력창의 테두리를 흰색으로 설정
      '&:hover': {
        borderColor: '#e50914', // 호버 시 빨간색 테두리
      },
      '&:focus-within': {
        borderColor: '#e50914', // 포커스 시 빨간색 테두리
      },
    },
}));

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅을 사용합니다.

  // 검색어를 상태에 저장하고 URL로 이동
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query)}`); // 검색어를 URL에 포함하여 이동
    }
  };
  
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static"  sx={{ bgcolor: '#000000' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img width={100} src='https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940' alt="Logo" />
            <Link to="/" className='nav-item'>Home</Link>
            <Link to="/movies" className='nav-item'>Movies</Link>
          </Box>
          <Box sx={{ ml: 'auto' }}> {/* 검색 기능을 오른쪽으로 이동 */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                //키워드 받고 url = /q={keyword} 로 넘겨주기 
                value={query} // 입력 값을 상태로 관리
                onChange={(e) => setQuery(e.target.value)} // 입력 값 상태 업데이트
                onKeyDown={handleKeyDown} // Enter 키 입력 시 처리
              />
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar
