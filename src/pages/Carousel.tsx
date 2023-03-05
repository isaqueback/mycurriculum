import { CarouselContainer } from '../styles/pages/home/carousel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { MutableRefObject } from 'react'

interface CarouselProps {
  presentation3Slider: MutableRefObject<null> | undefined
  isPresentation3SliderVisible: boolean
}

export function Carousel(props: CarouselProps) {
  return (
    <CarouselContainer isPresentation3SliderVisible={props.isPresentation3SliderVisible} presentation3Slider={props.presentation3Slider}>
      <Swiper
        ref={props.presentation3Slider}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="slide-1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt="slide-2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt="slide-3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="slide-4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt="slide-5"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt="slide-6"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            alt="slide-7"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            alt="slide-8"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            alt="slide-9"
          />
        </SwiperSlide>
      </Swiper>
    </CarouselContainer>
  )
}
