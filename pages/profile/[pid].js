import React, {useCallback, useEffect, useState} from 'react'
import {
  Button,
  Col, Form,
  FormControl,
  Image,
  InputGroup,
  ListGroup,
  Modal,
  Row,
  Tab,
  Tabs
} from "react-bootstrap";
import AppLayout from "../../component/AppLayout";
import FollowAccount from "../../component/FollowAccount";
import {useDispatch, useSelector} from "react-redux";
import wrapper from "../../store/store-wrapper";
import axios from "axios";
import {
  FOLLOW_ACCOUNT_REQUEST,
  LOAD_MY_PROFILE_REQUEST,
  LOAD_USER_REQUEST, REMOVE_ALBUM_REQUEST, REMOVE_ALBUM_SUCCESS,
  UNFOLLOW_ACCOUNT_REQUEST, UPDATE_ALBUM_REQUEST, UPDATE_ALBUM_SUCCESS, UPDATE_PROFILE_REQUEST
} from "../../config/event/eventName/userEvent";
import {END} from "redux-saga";
import ThumbnailPostCard from "../../component/ThumbnailPostCard";
import ClanMakeModal from "../../component/CreateClanModal";
import JoinedClan from "../../component/JoinedClan";
import {useSession} from "next-auth/client";
import {imageURL} from "../../config/config";
import AlbumPostModal from "../../component/AlbumPostModal";
import UpdateProfileModal from "../../component/UpdateProfileModal";

const Profile = () => {
  const dispatch = useDispatch()

  const { user, myProfile } = useSelector(state => state.userReducer)

  const [isFollowing, setIsFollowing] = useState(false)
  const [session, loadingSession] = useSession();
  const [showInput, setShowInput] = useState(false);
  const [targetAlbum, setTargetAlbum] = useState({})
  const [albumName, setAlbumName] = useState("")
  const [isPublic, setIsPublic] = useState(true)

  const [showCreateClan, setShowCreateClan] = useState(false);
  const handleShowCreateClan = () => setShowCreateClan(true);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const handleShowUpdateProfile = () => setShowUpdateProfile(true)

  const [showAlbums, setShowAlbums] = useState(Array(user.albums.length).fill(false))
  const handleShowAlbums = (index) => () => {
    let temp = [...showAlbums]
    temp[index] = true
    setShowAlbums(temp)
  }
  const handleCloseAlbums = (index) => () => {
    let temp = [...showAlbums]
    temp[index] = false
    setShowAlbums(temp)
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

  const onClickDeleteAlbum = useCallback((albumId) => () => {
    dispatch({
      type: REMOVE_ALBUM_REQUEST,
      params: {
        albumId: albumId
      },
      plus: {
        albumId: albumId
      }
    })
  }, [])

  const onClickUpdateAlbum = useCallback((albumId) => () => {
    dispatch({
      type: UPDATE_ALBUM_REQUEST,
      params: {
        albumId: albumId,
        name: albumName,
        isPublic: isPublic ? "false" : "true"
      },
      plus: {
        albumId: albumId,
        name: albumName,
        isPublic: isPublic ? "false" : "true"
      }
    })
    setShowInput(false)
  }, [albumName])

  const handleInputClose = () => {
    setTargetAlbum("")
    setShowInput(false);
  }
  const handleInputShow = (album) => () => {
    setTargetAlbum(album)
    setShowInput(true);
  }

  const onChangeAlbumName = (e) => {
    setAlbumName(e.target.value)
  }

  const onClickRadio = useCallback(() => {
  setIsPublic(!isPublic)
  }, [isPublic])

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
              user.username === myProfile.username &&
                <span>
                  <Button variant="outline-dark" style={{marginRight: "10px"}} onClick={handleShowUpdateProfile}>프로필 수정</Button>
                  {
                    user.username === myProfile.username ?
                        <Button variant="outline-dark" onClick={handleShowCreateClan}>Create Clan</Button> :
                        isFollowing ?
                            <Button variant="outline-dark" onClick={onClickUnFollow}>unFollow</Button> :
                            <Button variant="outline-dark" onClick={onClickFollow}>Follow</Button>
                  }
                </span>
            }
          </div>
        </Col>
      </Row>
      {
        (myProfile.isPublic || (user.username === myProfile.username)) &&
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
                    {myProfile.writePost.map(v => <ThumbnailPostCard key={v.id} postInfo={v}/>)}
                  </Tab>
                  <Tab eventKey="album" title="앨범">
                    <ListGroup>
                      {
                        myProfile.albums.map((v, i) => (
                            (user.username === myProfile.username || v.isPublic) &&
                              <ListGroup.Item key={v.id}>
                                <Row>
                                  <Col style={{paddingTop:"5px"}}><span style={{fontWeight: "900", fontSize: "large"}}>{v.name}</span></Col>
                                  <Col/>
                                  <Col>
                                    <Button style={{width: "30%", marginRight: "2%"}} onClick={handleShowAlbums(i)}>보기</Button>
                                    {
                                        myProfile.username === user.username &&
                                        <span>
                                        <Button style={{width: "30%", marginRight: "2%"}} variant="primary" onClick={handleInputShow(v)}>수정</Button>
                                        <Button style={{width: "30%"}} onClick={onClickDeleteAlbum(v.id)}>삭제</Button>
                                      </span>
                                    }
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                        ))
                      }
                    </ListGroup>
                  </Tab>
                  {
                      myProfile.username === user.username &&
                      <Tab eventKey="likedPost" title="즐겨찾기">
                        {user.bookmarkedPosts.map(v => <ThumbnailPostCard key={v.id} postInfo={v}/>)}
                      </Tab>
                  }
                </Tabs>
              </Row>
            </Col>
          </Row>
      }

      <ClanMakeModal show={showCreateClan} setShow={setShowCreateClan} />

      { myProfile.albums.map((v, i) =>  <AlbumPostModal key={v.id} show={showAlbums[i]} setClose={handleCloseAlbums(i)} albumInfo={v}/>)}

      <UpdateProfileModal show={showUpdateProfile} setShow={setShowUpdateProfile} profile={myProfile}/>

      <Modal show={showInput} onHide={handleInputClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder={targetAlbum.name}
              aria-label={targetAlbum.name}
              aria-describedby="basic-addon2"
              onChange={onChangeAlbumName}
              value={albumName}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={onClickUpdateAlbum(targetAlbum.id)}>
              Button
            </Button>
          </InputGroup>
          <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                label="공개여부"
                checked={isPublic}
                onClick={onClickRadio}
            />
          </Form>
        </Modal.Body>
      </Modal>
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