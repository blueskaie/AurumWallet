import React from 'react';
import { useRecoilValue } from 'recoil';
import { tokenList } from '../store/atoms';
import Slider from "react-slick";
import Slidering from "./slider";


export default function SliderList() {
  const list = useRecoilValue(tokenList);

  console.log("SliderList",list);
  const [activeIndex, setActiveIndex] = React.useState(1);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "80px",
    slidesToShow: 0.98,
    speed: 500,
    beforeChange :(oldIndex, newIndex)=>{
      newIndex = (newIndex+1)% list.length;
      setActiveIndex(newIndex);
    }
  };
  return (
    <div className="slidebar">
      <Slider {...settings}>
      {list.map((item, index) => {

         return (
           <Slidering
             {...item}
             key={`slider-${index}`}
             active={index === activeIndex ? true : false}
           />
         );
       })}
        </Slider>
    </div>
  )
}