import React, {useCallback, useEffect, useState} from 'react'
import {Accordion, Button,  Col, Image, Row} from "react-bootstrap";
import AppLayout from "../../component/AppLayout";
import FollowAccount from "../../component/FollowAccount";
import {connect, useDispatch, useSelector} from "react-redux";
import wrapper from "../../store/store-wrapper";
import axios from "axios";
import {
  FOLLOW_ACCOUNT_REQUEST,
  LOAD_MY_PROFILE_REQUEST,
  LOAD_USER_REQUEST,
  UNFOLLOW_ACCOUNT_REQUEST
} from "../../config/event/eventName/userEvent";
import {END} from "redux-saga";
import ThumbnailPostCard from "../../component/ThumbnailPostCard";
import ClanMakeModal from "../../component/ClanMakeModal";
import JoinedClan from "../../component/JoinedClan";

const Profile = () => {
  const dispatch = useDispatch()

  const { user, myProfile } = useSelector(state => state.userReducer)

  const [show, setShow] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const followers = user.followers;
    setIsFollowing(false);
    for(let i=0; i<followers.length; i++) {
      if(followers[i] === myProfile.username) {
        setIsFollowing(true);
        break;
      }
    }
  }, [])

  const onClickFollow = useCallback(() => {
    if(isFollowing) {
      dispatch({
        type: UNFOLLOW_ACCOUNT_REQUEST,
        data: {
          followerId: user.id,
          followeeId: myProfile.id
        }
      })
    } else {
      dispatch({
        type: FOLLOW_ACCOUNT_REQUEST,
        data: {
          followerId: user.id,
          followeeId: myProfile.id
        }
      })
    }
  }, [])

  return (
    <>
      <AppLayout/>
      <Row style={{marginTop: "-4%"}}>
        <Col>
          <div style={{maxHeight: "45%", maxWidth: "100%", overflow: "hidden"}}>
            <Image width="100%" src={"https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png"}/>
          </div>
          <div style={{textAlign: "center"}}>
            <Image style={{marginTop: "-150px"}} width="200px" src={"http://localhost:8081/image/" + myProfile.profileImage} roundedCircle  />
            <h2>{myProfile.username}</h2>
          </div>
          <div style={{textAlign: "center", margin: "30px"}}>
            {
              user.username === myProfile.username ?
                <Button variant="outline-dark" onClick={handleShow}>Create Clan</Button> :
                isFollowing ?
                  <Button variant="outline-dark" onClick={handleShow}>unFollow</Button> :
                  <Button variant="outline-dark" onClick={handleShow}>Follow</Button>
            }
          </div>
        </Col>
      </Row>
      <Row style={{marginLeft: "10px", marginTop: "-30%"}}>
        <Col lg={5}>
          <h3 className="ui header">Follwer / Following</h3>
          <div>
            <div className="ui segment" style={{overflowY: "scroll" , marginLeft: "-5px", height: "200px", overflowX: "hidden"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <FollowAccount accounts={myProfile.follower} isFollower={true}/>
              <FollowAccount accounts={myProfile.followee} isFollower={false}/>
            </div>
          </div>
          <div style={{marginBottom: "20px", marginTop: "10px"}}>
            <h3 className="ui header">Friends</h3>
            <div className="ui segment" style={{overflowY: "scroll", marginLeft: "-5px", height: "200px", overflowX: "hidden", marginTop: "-3px"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <FollowAccount accounts={myProfile.friend}/>
            </div>
          </div>
          <div style={{marginBottom: "20px", marginTop: "10px"}}>
            <h3 className="ui header">Clans</h3>
            <div className="ui segment" style={{overflowY: "scroll", marginLeft: "-5px", height: "200px", overflowX: "hidden", marginTop: "-3px"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <JoinedClan clans={myProfile.clans}/>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <Row style={{marginTop: "5%"}}>
            <Col>
              <Row>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header><h3 className="ui header">내가 쓴 글</h3></Accordion.Header>
                    <Accordion.Body style={{padding: "2%"}}>
                      {myProfile.writePostAsAccount.map(v => <ThumbnailPostCard postInfo={v}/>)}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header><h3 className="ui header">그룹이 쓴 글</h3></Accordion.Header>
                    <Accordion.Body>
                      <div style={{padding: "2%"}}>
                        {myProfile.writePostAsClan.map(v => <ThumbnailPostCard postInfo={v}/>)}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
            </Col>
          </Row>
        </Col>
      </Row>
      <ClanMakeModal show={show} setShow={setShow} />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store =>
  async ({ req, res, ...etc}) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    axios.defaults.withCredentials = true;

    const { pid } = etc.query

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch({
      type: LOAD_USER_REQUEST
    });

    store.dispatch({
      type: LOAD_MY_PROFILE_REQUEST,
      params: {
        username: pid
      }
    });


    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default connect(state => state)(Profile);