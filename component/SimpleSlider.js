import React, {Component, useCallback, useReducer, useState} from "react";
import Slider from "react-slick";
import {Col, Image, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {imageURL} from "../config/config";
import PostModal from "./PostModal";
import SlideImage from "./SlideImage";

const SimpleSlider = () => {
  const { top20LikedPosts } = useSelector(state => state.postReducer)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [show, setShow] = useState(false)
  const onClickShow = useCallback((e) => {
    setShow(true)
  }, [show])

  return (
    <div>
      <Slider {...settings} style={{marginBottom: "50px"}}>
        <table>
          <tr>
            {
              top20LikedPosts.map(v => (
                <td>
                  <SlideImage postInfo={v}/>
                </td>
              ))
            }
          </tr>
        </table>
        <div/>
      </Slider>
    </div>

  );
}

export default SimpleSlider;