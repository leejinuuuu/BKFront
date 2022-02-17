import React, {Component, useReducer} from "react";
import Slider from "react-slick";
import {Col, Image, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {imageURL} from "../config/config";

const SimpleSlider = () => {
  const { top20LikedPosts } = useSelector(state => state.postReducer)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings} style={{marginBottom: "50px"}}>
      <table>
        <tr>
          {
            top20LikedPosts.map(v => (
              <td><Image width="60" height="60" style={{margin: "19px", objectFit: "cover"}} roundedCircle src={ imageURL + v.image}/></td>
            ))
          }
        </tr>
      </table>
      <div/>
    </Slider>
  );
}

export default SimpleSlider;