import 'swiper/css';
import 'swiper/css/navigation';
import New from './New';
import Povr from './povr';
import Menu from './Menu';
import Most from './Most';
import TestimonialsSwiper from './swiper';
import OurInstagram from '../../widgets/components/OurInstagram/OurInstagram';

export default function Home() {
    return (
        <div>
            <New />
            <Povr />
            <Menu />
            <Most />
            <TestimonialsSwiper />
            <OurInstagram />
        </div>
    );
}
