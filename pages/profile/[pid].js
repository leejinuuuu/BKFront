import React, {useCallback, useEffect, useState} from 'react'
import {Accordion, Button, Col, Image, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
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
import {useSession} from "next-auth/client";
import {imageURL} from "../../config/config";
import {object} from "prop-types";
import FavoriteModal from "../../component/FavoriteModal";
import FavoriteListModal from "../../component/FavoriteListModal";

const Profile = () => {
  const dispatch = useDispatch()

  const { user, myProfile } = useSelector(state => state.userReducer)

  const [isFollowing, setIsFollowing] = useState(false)
  const [session, loadingSession] = useSession();

  const [showCreateClan, setShowCreateClan] = useState(false);
  const handleShowCreateClan = () => setShowCreateClan(true);

  const [showFavorites, setShowFavorites] = useState(Array(user.favorites.length).fill(false))
  const handleShowFavorites = (index) => () => {
    let temp = [...showFavorites]
    temp[index] = true
    console.log(temp)
    setShowFavorites(temp)
  }
  const handleCloseFavorites = (index) => () => {
    let temp = [...showFavorites]
    temp[index] = false
    console.log(temp)
    setShowFavorites(temp)
  }

  useEffect(() => {
    const followers = user.followers;
    setIsFollowing(false);
    for(let i=0; i<followers.length; i++) {
      if(followers[i] === myProfile.username) {
        setIsFollowing(true);
        break;
      }
    }
  }, [session])

  const onClickFollow = useCallback(() => {
    dispatch({
      type: FOLLOW_ACCOUNT_REQUEST,
      data: {
        followerId: user.id,
        followeeId: myProfile.id
      }
    })
  }, [])

  const onClickUnFollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_ACCOUNT_REQUEST,
      data: {
        followerId: user.id,
        followeeId: myProfile.id
      }
    })
  }, [])
  return (
    <>
      <AppLayout/>
      <Row>
        <Col>
          <div style={{overflow: "hidden"}}>
            <Image style={{height: "500px", objectFit: "cover"}} width="100%" src={imageURL + myProfile.backgroundImage}/>
          </div>
          <div style={{textAlign: "center"}}>
            <Image style={{marginTop: "-150px", height: "200px", objectFit: "cover"}} width="200px" src={"http://localhost:8081/image/" + myProfile.profileImage} roundedCircle  />
            <h2>{myProfile.username}</h2>
            <p>{myProfile.message}</p>
          </div>
          <div style={{textAlign: "center", margin: "20px"}}>
            {
              user.username === myProfile.username ?
                <Button variant="outline-dark" onClick={handleShowCreateClan}>Create Clan</Button> :
                isFollowing ?
                  <Button variant="outline-dark" onClick={onClickUnFollow}>unFollow</Button> :
                  <Button variant="outline-dark" onClick={onClickFollow}>Follow</Button>
            }
          </div>
        </Col>
      </Row>
      <Row style={{marginLeft: "10px"}}>
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
          <Row style={{marginTop: "3%", padding: "10px", paddingRight: "18%"}}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="home" title="내가 쓴 글">
                {myProfile.writePostAsAccount.map(v => <ThumbnailPostCard postInfo={v}/>)}
              </Tab>
              <Tab eventKey="profile" title="그룹이 쓴 글">
                {myProfile.writePostAsClan.map(v => <ThumbnailPostCard postInfo={v}/>)}
              </Tab>
            </Tabs>
          </Row>
          <Row style={{marginTop: "3%", padding: "10px", paddingRight: "18%"}}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="home" title="저장한 그림">
              </Tab>
            </Tabs>
            <ListGroup>
              {
                user.favorites.map((v, i) => (
                  <ListGroup.Item onClick={handleShowFavorites(i)}>
                    <div>{v.name}</div>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </Row>
        </Col>
      </Row>
      <ClanMakeModal show={showCreateClan} setShow={setShowCreateClan} />
      { user.favorites.map((v, i) => <FavoriteListModal show={showFavorites[i]} setClose={handleCloseFavorites(i)} favoriteInfo={v}/>)}
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

      store.dispatch({
        type: LOAD_USER_REQUEST
      });

      store.dispatch({
        type: LOAD_MY_PROFILE_REQUEST,
        params: {
          username: pid
        }
      });
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default Profile;