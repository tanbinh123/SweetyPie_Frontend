import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../common/Carousel';
import { FiHeart } from 'react-icons/fi';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

const HoverSvg = styled.button`
  transition: all 0.2s ease-in-out;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(229, 231, 235, 1);
    transition: background-color 0.2s;
  }
`;

// className="hover:bg-gray-200 transform hover:scale-110 transition-colors duration-150 focus:outline-none rounded-full focus:shadow-outline"

const AccommList = props => {
  const {
    id,
    accommodationPictures,
    accommodationType,
    bathroomNum,
    bedNum,
    bedroomNum,
    buildingType,
    capacity,
    gu,
    price,
    rating,
    reviewNum,
    title,
  } = props;

  const [bookMark, setBookMark] = useState(false);

  const bookMarkClick = e => {
    setBookMark(!bookMark);
    console.log(e.target);
  };

  const img = accommodationPictures.map(picture => picture.url);

  const setLocal = e => {
    if (e.target.dataset.name !== 'accommList') return;
    console.log(e.target);
    localStorage.setItem('bookmark', e.target);
  };

  const prevent = e => e.preventDefault();

  return (
    <li key={id} onClick={setLocal} data-name="accommList">
      <div className="h-25rem border-t border-#EBEBEB pt-10 pb-10 relative">
        <HoverSvg
          className="absolute top-8 right-0 z-20"
          onClick={bookMarkClick}
          key={id}
        >
          <FiHeart
            fill={bookMark ? 'rgb(255, 56, 92)' : '#fff'}
            size={30}
            stroke={bookMark ? '' : 'black'}
            className="absolute top-2 left-2"
          />
        </HoverSvg>
        <Link
          to={`/accommodation/${id}`}
          className="flex focus:outline-none"
          onClick={prevent}
        >
          <Carousel size="Large" img={img} />
          <div className="relative w-54rem truncate ml-5">
            <span className="text-#717171 text-1.4rem inline-block">
              {gu}의 {buildingType} {accommodationType}
            </span>
            <div className="w-34rem">
              <div className="text-1.8rem w-34rem truncate">{title}</div>
              <div className="w-2.4rem border-t mt-4 mb-4"></div>
              <div className="text-1.4rem text-#717171">
                최대 인원 {capacity}명 · 침실 {bedroomNum}개 · 침대 {bedNum}개 ·
                욕실 {bathroomNum}개
              </div>
              <div className="text-1.4rem text-#717171">
                무료 주차 공간 · 주방 · 난방 · 무선 인터넷
              </div>
            </div>
            {rating !== 0 && (
              <div className="text-1.4rem mt-2 inline-block absolute top-17rem">
                <AiFillStar
                  size={20}
                  fill={'#FF385C'}
                  className="inline-block"
                />
                <span>
                  {rating} ({reviewNum})
                </span>
              </div>
            )}
            <div className="absolute top-17.4rem right-0 text-1.8rem">
              <span className="font-extrabold"> ₩{price} </span> / 월
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default AccommList;