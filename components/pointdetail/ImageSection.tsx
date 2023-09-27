import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Store } from '@/types/store';
import Image from 'next/image';

interface Props {
    store: Store;
}

const ImageSection = ({ store }: Props) => {

    // slick slider 설정 옵션
    const sliderSettings = {
        dots: true, // 페이지 번호 표시
        infinite: true, // 무한 루프
        speed: 500, // 전환 속도 (밀리초)
        slidesToShow: 1, // 한 번에 표시할 이미지 개수
        slidesToScroll: 1, // 한 번에 스크롤할 이미지 개수
        centerMode: true, // 이미지를 가운데에 표시
        centerPadding: '0', // 가운데에 표시된 이미지와 슬라이더 가장자리 사이의 간격 (px)
    };

    return (
        <div className='w-[600px] mt-10'>
            {store.postImageList && (
                <Slider {...sliderSettings}>
                    {store.postImageList.map((item) => (
                            <Image key={item.id} src={item.imageUrl} width={200} height={200} alt='이미지' />
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default ImageSection;
