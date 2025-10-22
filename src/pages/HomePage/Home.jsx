import 'swiper/css';
import 'swiper/css/navigation';
import New from './New';
import Povr from './povr';
import Menu from './Menu';
import Most from './Most';
import TestimonialsSwiper from './swiper';
export default function Home() {
    return (
        <div>
            <New />
            <Povr />
            <Menu />
            <Most />
            <TestimonialsSwiper />
        </div>
    );
}
