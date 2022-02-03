import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {backURL, imageURL} from "../../config/config";
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_REPLY_REQUEST,
  LIKED_POST_REQUEST, LOAD_FULL_POST_REQUEST, UNLIKED_POST_REQUEST
} from "../../config/event/eventName/postEvent";
import Comment from "../../component/Comment";
import {Button, Col, Container, Image, Modal, Row} from "react-bootstrap";
import FavoriteModal from "../../component/FavoriteModal";
import wrapper from "../../store/store-wrapper";
import {LOAD_MY_PROFILE_REQUEST, LOAD_USER_REQUEST} from "../../config/event/eventName/userEvent";
import {END} from "redux-saga";
import Profile from "../profile/[pid]";
import AppLayout from "../../component/AppLayout";

const Post = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.userReducer)
  const { commentPicked, commentToReply, postInfo } = useSelector(state => state.postReducer)
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState("");

  useEffect( () => {
    if(typeof postInfo.comment !== 'undefined') {
      const temp = [];

      if(postInfo.comment.length === 0) {
        axios
          .get(backURL + "/comment?id=" + postInfo.id)
          .then(res => {
            if(res.length > 0) {
              dispatch({
                type: ADD_COMMENT_SUCCESS,
                data: res,
                plus: {
                  postId: postInfo.id
                }
              })
              for(let i=0; i<res.length; i++) {
                temp.push(
                  <Comment key={i} commentInfo={res[i]} replyComment={res[i].replyComment}/>
                )
              }
            }
          })
      } else {
        for(let i=0; i<postInfo.comment.length; i++) {
          temp.push(
            <Comment key={i} commentInfo={postInfo.comment[i]} replyComment={postInfo.comment[i].replyComment}/>
          )
        }
      }
      setComments(temp)
    }
  }, [postInfo.comment])

  const handleCommentChange = useCallback((e) => {
    setCommentData(e.target.value)
  }, [commentData])

  const handleSubmitComment = useCallback(() => {
    if(commentPicked) {
      dispatch({
        type: ADD_REPLY_REQUEST,
        data: {
          userId: user.id,
          commentId: commentToReply,
          content: commentData
        },
        plus: {
          userId: user.id,
          commentId: commentToReply,
          content: commentData,
          writerName: user.username,
          createdAt: new Date().toISOString()
        }
      })
    } else {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          userId: user.id,
          postId: postInfo.id,
          content: commentData
        },
        plus: {
          userId: user.id,
          postId: postInfo.id,
          content: commentData
        }
      })
    }
    setCommentData("")
  }, [commentData, user, postInfo])

  const [liked, setLiked] = useState(false)
  const [showFavorite, setShowFavorite] = useState(false);

  const handleShowFavorite = () => setShowFavorite(true);

  useEffect(() => {
    setLiked(false)
    if(typeof postInfo.likerAccount !== "undefined") {
      postInfo.likerAccount.map(v => {
        if(v.id === user.id) {
          setLiked(true)
        }
      })
    }
  }, [postInfo.likerAccount])

  const onClickHeart = useCallback((e) => {
    if(liked === false) {
      dispatch({
        type: LIKED_POST_REQUEST,
        data: {
          userId: user.id,
          postId: postInfo.id,
        },
        plus: {
          postId: postInfo.id,
          user: user
        }
      })
    } else {
      dispatch({
        type: UNLIKED_POST_REQUEST,
        data: {
          userId: user.id,
          postId: postInfo.id
        },
        plus: {
          postId: postInfo.id,
          user: user
        }
      })
    }
  }, [liked, postInfo])

  return(
    <AppLayout>
      <Row style={{height: "600px", marginTop: "10%"}}>
        <Col xs={8}>
          <div style={{height: "600px", position: "relative"}}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              msTransform: "translate(-50%, -50%)"
            }}>
              <Image style={{objectFit: "contain", width:"600px", height: "600px"}} src={imageURL + postInfo.image}/>
            </div>
          </div>
        </Col>
        <Col xs={4}>
          <Row>
            <div className="ui large feed">
              <div className="event">
                <div className="label">
                  <img style={{marginTop: "10px"}} src={imageURL + postInfo.writer.profileImage}/>
                </div>
                <div className="content">
                  <div className="summary">
                    <a className="user">
                      {postInfo.writer.name}
                    </a> {"- " + postInfo.title}
                    <div className="date">
                      {postInfo.createdAt.substring(0, 10)}
                    </div>
                  </div>
                  {/*<div className="meta">*/}
                  {/*  <a className="like">*/}
                  {/*    <i className="like icon"/> Follow*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
            <div style={{marginTop: "-10px"}} className="ui divider"/>
          </Row>
          <Row>
            <div className="ui comments" style={{overflowY: "scroll", marginLeft: "-5px", height: "390px", overflowX: "hidden"}}>
              {comments}
            </div>
          </Row>
          <Row>
            <form className="ui reply form" >
              <div className="ui divider"/>
              <span>
                <div style={{ marginBottom: "10px" }}>
                  {
                    liked ?
                      <Image src="https://img.icons8.com/color/48/000000/like--v3.png" style={{cursor: "pointer", width: "30px"}} onClick={onClickHeart}/> :
                      <Image src="https://img.icons8.com/ios/50/000000/hearts--v1.png" style={{cursor: "pointer", width: "30px"}} onClick={onClickHeart}/>
                  }

                  <Image onClick={handleShowFavorite} src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-bookmark-interface-kiranshastry-lineal-kiranshastry.png" style={{cursor: "pointer", width: "30px"}}/>
                </div>
                <span className="ui icon input" style={{width: "87%"}}>
                  <input type="text" placeholder={commentPicked ? "Reply..." : "Add..."} onChange={handleCommentChange} value={commentData}/>
                  <Button variant="outline-primary" style={{marginLeft: "5%"}} onClick={handleSubmitComment} disabled={!commentData}>Post</Button>
                </span>
              </span>
            </form>
          </Row>
        </Col>
      </Row>
      { user && <FavoriteModal show={showFavorite} setShow={setShowFavorite} favoriteList={user.favorites} postInfo={postInfo}/>}
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store =>
  async ({ req, res, ...etc}) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    axios.defaults.withCredentials = true;

    const { postId } = etc.query

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;

      store.dispatch({
        type: LOAD_USER_REQUEST
      });

      store.dispatch({
        type: LOAD_FULL_POST_REQUEST,
        params: {
          postId: postId
        }
      });
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default Post;