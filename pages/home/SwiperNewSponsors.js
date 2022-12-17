import React from 'react'
import { useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SwiperCore, { FreeMode, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardDefault } from '../../components';
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import CardSmall from '../../components/CardSmall';

// SwiperCore.use([Navigation]);

function SwiperNewSponsors(props) {
    const swiperRef = useRef(null);
    const sliderBreakPoints = {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1366: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
    }
    return (
        <article className='flex space-x-6 items-center my-4'>
            <FaAngleLeft onClick={() => swiperRef.current?.slidePrev()} size={50} className="text-yellow-primary cursor-pointer"/>
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={sliderBreakPoints}
                    modules={[FreeMode, Pagination, Navigation]}
                    className="!pb-12">
                        {props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i} className=" border rounded-[2rem] px-4 py-2 shadow-md cursor-pointer">
                              <CardSmall data={item} type={props.type}/>
                            </SwiperSlide>
                        )
                        })}
                </Swiper>
            <FaAngleRight onClick={() => swiperRef.current?.slideNext()} size={50} className="text-yellow-primary cursor-pointer"/>
        </article>
    )
}

export default SwiperNewSponsors