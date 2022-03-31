import React, {useCallback, useEffect, useState} from 'react'
import {Accordion, Button, Card, Col, Image, Modal, Row, useAccordionButton} from "react-bootstrap";
import AppLayout from "../../component/AppLayout";
import {connect, useDispatch, useSelector} from "react-redux";
import { END } from "redux-saga";
import wrapper from "../../store/store-wrapper";
import {useRouter} from "next/router";
import {
  DELETE_CLAN_FAILURE, DELETE_CLAN_REQUEST,
  GET_CLAN_DATA_REQUEST,
  LOAD_USER_REQUEST,
  SUBSCRIBE_CLAN_REQUEST,
  UNSUBSCRIBE_CLAN_REQUEST
} from "../../config/event/eventName/userEvent";
import FollowAccount from "../../component/FollowAccount";
import {imageURL} from "../../config/config";
import UploadClanPostModal from "../../component/UploadClanPostModal";
import ThumbnailPostCard from "../../component/ThumbnailPostCard";
import UpdateClanModal from "../../component/UpdateClanModal";

const clan = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { clanInfo, user } = useSelector(state => state.userReducer)

  const { pid } = router.query;

  const [show, setShow] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleShow = () => setShow(true);

  const onClickSubscribe = useCallback(() => {
    dispatch({
      type: SUBSCRIBE_CLAN_REQUEST,
      data: {
        userId: user.id,
        clanId: clanInfo.id
      }
    });
  }, [])

  const onClickUnSubscribe = useCallback(() => {
    dispatch({
      type: UNSUBSCRIBE_CLAN_REQUEST,
      data: {
        userId: user.id,
        clanId: clanInfo.id
      }
    });
  }, [])

  useEffect(() => {
    setIsSubscribing(false);
    let subscriber = clanInfo.subscriber;
    for(let i=0; i<subscriber.length; i++) {
      if(subscriber[i].id === user.id) {
        setIsSubscribing(true);
        break;
      }
    }
  }, [clanInfo, user])

  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const onClickUpdateClan = useCallback(e => {
    setShowUpdateModal(true)
  }, [])

  const onClickDeleteClan = useCallback(e => {
    dispatch({
      type: DELETE_CLAN_REQUEST,
      params: {
        clanId: clanInfo.id
      }
    })

    router.push("/")
  }, [])

  return (
    <>
      <AppLayout/>
      <Row style={{marginTop: "-3%"}}>
        <Col>
          <div style={{overflow: "hidden"}}>
            <Image style={{height: "500px", objectFit: "cover"}} width="100%" src={imageURL + clanInfo.backgroundImage}/>
          </div>
          <div style={{textAlign: "center"}}>
            <Image style={{marginTop: "-150px"}} width="200px" src={imageURL + clanInfo.profileImage} roundedCircle  />
            <h2>{pid}</h2>
            <div>{clanInfo.message}</div>
          </div>
          <div style={{textAlign: "center", margin: "30px"}}>
            <div >
              <span><Button onClick={onClickUpdateClan} style={{margin: "5px"}}>수정</Button></span>
              <span><Button onClick={onClickDeleteClan} style={{margin: "5px"}}>삭제</Button></span>
             </div>
            {user.username === clanInfo.master ?
              <Button onClick={handleShow}>POST</Button> :
              isSubscribing ?
                <Button onClick={onClickUnSubscribe}>구독취소</Button> :
                <Button onClick={onClickSubscribe}>구독</Button>
            }
          </div>
        </Col>
      </Row>
      <Row style={{marginLeft: "10px"}}>
        <Col lg={5}>
          <h3 className="ui header">Subscribers</h3>
          <div>
            <div className="ui segment" style={{overflowY: "scroll" , marginLeft: "-5px", height: "200px", overflowX: "hidden"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <FollowAccount accounts={clanInfo.subscriber} isFollower={true}/>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <Row style={{marginTop: "4%"}}>
            <Col>
              <Row>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header><h3 className="ui header">Group Posts</h3></Accordion.Header>
                    <Accordion.Body style={{padding: "2%"}}>
                      {
                        clanInfo.posts.map(v => <ThumbnailPostCard key={v.id} postInfo={v}/>)
                      }
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
      <UploadClanPostModal show={show} setShow={setShow} clanId={clanInfo.id}/>
      <UpdateClanModal show={showUpdateModal} setShow={setShowUpdateModal} clanInfo={clanInfo}/>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store =>
  async ({ req, res, ...etc}) => {
    const { pid } = etc.query

    store.dispatch({
      type: LOAD_USER_REQUEST
    });

    store.dispatch({
      type: GET_CLAN_DATA_REQUEST,
      params: {
        name: pid
      }
    })

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default connect(state => state)(clan);