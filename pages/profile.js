import React from 'react'
import {Col, Image, Row} from "react-bootstrap";
import AppLayout from "../component/AppLayout";
import RecommendAccount from "../component/RecommendAccount";
import FollowAccount from "../component/FollowAccount";

const Profile = () => {
  return (
    <>
      <AppLayout/>
      <Row style={{marginTop: "-4%"}}>
        <Col>
          <div style={{maxHeight: "45%", maxWidth: "100%", overflow: "hidden"}}>
            <Image width="100%" src="https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png"/>
          </div>
          <div style={{textAlign: "center"}}>
            <Image style={{marginTop: "-150px"}} width="200px" src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png" roundedCircle  />
            <h2>다라바</h2>
          </div>
        </Col>
      </Row>
      <Row style={{marginLeft: "10px", marginTop: "-30%"}}>
        <Col lg={5}>
          <h3 className="ui header">Follwer</h3>
          <div>
            <div className="ui segment" style={{overflowY: "scroll", marginLeft: "-5px", height: "200px", overflowX: "hidden"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <FollowAccount/>
            </div>
          </div>
          <div style={{marginBottom: "20px", marginTop: "10px"}}>
            <h3 className="ui header">Following</h3>
            <div className="ui segment" style={{overflowY: "scroll", marginLeft: "-5px", height: "200px", overflowX: "hidden", marginTop: "-3px"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <FollowAccount/>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <Row>
            <Col>
              <h3 className="ui header">내가 쓴 글</h3>
              <Row>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="ui section divider"></div>
          <Row>
            <Col>
              <h3 className="ui header">그룹이 쓴 글</h3>
              <Row>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
                <Col lg={2}>
                  <Image thumbnail width={"120px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                </Col>
              </Row>
            </Col>
          </Row>
          
        </Col>
      </Row>
    </>
  )
}

export default Profile