import React, { Component } from "react";
import Slider from "react-slick";
import {Col, Image, Row} from "react-bootstrap";

export default class SimpleSlider extends Component {
  render() {
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
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
              <td><Image width="60" style={{margin: "19px"}} roundedCircle src={"https://yt3.ggpht.com/ytc/AKedOLTQqgurRSivjU2ahR6UCt_vLqRN0r-RaGQ7G_uNMw=s900-c-k-c0x00ffffff-no-rj"}/></td>
            </tr>
          </table>
          <div/>
        </Slider>
    );
  }
}