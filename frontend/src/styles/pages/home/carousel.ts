import styled from 'styled-components'

export const CarouselContainer = styled.div`
  width: 100%;

  .swiper {
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
