import { MutableRefObject } from 'react'
import styled, { css } from 'styled-components'

interface CarouselContainerProps {
  presentation3Slider: MutableRefObject<null> | undefined
  isPresentation3SliderVisible: boolean
}

export const CarouselContainer = styled.div<CarouselContainerProps>`
  width: 100%;

  .swiper {
    transform: ${({isPresentation3SliderVisible}) => {
      return isPresentation3SliderVisible ? css`translateY: 0 scale(1);` : css`translateY(20px) scale(0.9);`
    }};
    opacity: ${({isPresentation3SliderVisible}) => {
      return isPresentation3SliderVisible ? 1 : 0
    }};
    transition: all 600ms cubic-bezier(0,-0.01,.01,1.46);
    padding-bottom: 50px;

    .swiper-pagination-bullet-active {
      background-color: ${(props) => props.theme['red-400']};
    }
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 200px;
    height: 200px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  @media (min-width: 768px) {
    .swiper {
      min-width: 768px;
      max-width: 900px;
    }

    .swiper-slide {
      width: 250px;
      height: 250px;
    }
  }

  @media (min-width: 1728px) {
    .swiper {
      max-width: 1500px;
    }

    .swiper-slide {
      width: 400px;
      height: 400px;
    }
  }
`
