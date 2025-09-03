import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import './style.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

{/* <Swiper
modules={[Navigation, Controller]}
onSwiper={(inst) => {
    rightSwiperRef.current = inst;
    setTimeout(() => {
        if (swiperRef.current) {
            inst.controller.control = swiperRef.current;
        }
    });
}}
loop
allowTouchMove={false}
className="w-full"
>
{slides.map((s, idx) => (
    <SwiperSlide key={idx}>
        <img draggable="false" className="w-full md:h-[500px] h-[300px] object-cover select-none" src={s.right} alt="" />
    </SwiperSlide>
))}
</Swiper>



const slides = [
  {
      left: 'public/nkar.jpg',
      right: 'public/nkar1.jpg',
      title: '“The best sushi rolls ever”',
      text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A ac ornare amet, sed vitae cras sem. Cursus praesent fames at vestibulum imperdiet sit. Sem netus ac, eu, facilisis mauris lectus posuere. At.'
  },
  {
      left: 'public/nkar1.jpg',
      right: 'public/nkar.jpg',
      title: '“Absolutely fresh and tasty”',
      text:
          'Praesent commodo cursus magna, vel scelerisque nisl consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.'
  }
];
const [slideIndex, setSlideIndex] = useState(0);
const swiperRef = useRef(null);
const prevRef = useRef(null);
const nextRef = useRef(null);
const rightSwiperRef = useRef(null);
const clickPrev = () => {
  if (swiperRef.current) {
      swiperRef.current.slidePrev();
  }
};
const clickNext = () => {
  if (swiperRef.current) {
      swiperRef.current.slideNext();
  }
};
useEffect(() => {
  if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
  }
}, [slideIndex]); */}

export default App;
