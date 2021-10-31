import React, {useCallback, useEffect, useState} from 'react'
import {Button, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Comment from "./Comment";
import {
  ADD_COMMENT_REQUEST,
  ADD_REPLY_REQUEST,
  LIKED_POST_REQUEST,
  UNLIKED_POST_REQUEST
} from "../config/event/eventName/postEvent";
import {imageURL} from "../config/config";

const PostModal = ({postInfo, show, setShow}) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.userReducer)
  const { commentPicked, commentToReply } = useSelector(state => state.postReducer)

  const handleModalClose = useCallback(() => {
    setShow(false)
  }, [show, setShow])

  const [comments, setComments] = useState([]);

  useEffect( () => {
    if(typeof postInfo.comment !== 'undefined') {
      const temp = [];
      for(let i=0; i<postInfo.comment.length; i++) {
        temp.push(
          <Comment key={i} commentInfo={postInfo.comment[i]} replyComment={postInfo.comment[i].replyComment}/>
        )
      }
      setComments(temp)
    }
  }, [postInfo.comment])

  const [commentData, setCommentData] = useState("");
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
    <span>
      <Modal
        size="xl"
        show={show}
        onHide={handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid" >
          <Container >
            <Row style={{height: "600px"}}>
              <Col xs={8}>
                <div style={{height: "600px", position: "relative"}}>
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    msTransform: "translate(-50%, -50%)"
                  }}>
                    <Image width={"410px"} src={imageURL + postInfo.image}/>
                  </div>
                </div>
              </Col>
              <Col xs={4}>
                <div className="ui comments" style={{overflowY: "scroll", marginLeft: "-5px", height: "460px", overflowX: "hidden"}}>
                  {comments}
                </div>
                <div className="ui divider"/>
                <form className="ui reply form" >
                  <span>
                    <div style={{ marginBottom: "10px" }}>
                      {
                        liked ?
                          <Image src="https://img.icons8.com/color/48/000000/like--v3.png" style={{cursor: "pointer", width: "30px"}} onClick={onClickHeart}/> :
                          <Image src="https://img.icons8.com/ios/50/000000/hearts--v1.png" style={{cursor: "pointer", width: "30px"}} onClick={onClickHeart}/>
                      }

                        <Image src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-bookmark-interface-kiranshastry-lineal-kiranshastry.png" style={{cursor: "pointer", width: "30px"}}/>
                    </div>
                    <span className="ui icon input">
                      <input style={{width: "280px"}} type="text" placeholder={commentPicked ? "Reply..." : "Add..."} onChange={handleCommentChange} value={commentData}/>
                      <Button variant="outline-primary" style={{marginLeft: "5%"}} onClick={handleSubmitComment}>Post</Button>
                    </span>
                  </span>
                </form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </span>
  )
}

export default PostModal;