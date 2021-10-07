import React, {useCallback, useState} from 'react'
import {Button, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL, SHOW_MODAL} from "../config/event/eventName/modal";
import Comment from "./Comment";

const PostModal = () => {
  const dispatch = useDispatch()

  const { show, postInfo } = useSelector(state => state.modalReducer)

  const handleModalClose = useCallback(() => {
    dispatch({
      type: CLOSE_MODAL
    })
  }, [show])

  const comments = [];

  if(typeof postInfo.comment !== 'undefined') {
    for(let i=0; i<postInfo.comment.length; i++) {
      comments.push(
        <Comment commentInfo={postInfo.comment[i]} replyComment={postInfo.comment[i].replyComment}/>
      )
    }
  }

  return(
    <div>
      <Modal
        size="lg"
        show={show}
        onHide={handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={7}>
                <Image width={"410px"} src={"http://localhost:8081/image/" + postInfo.image}/>
              </Col>
              <Col xs={5}>
                <div className="ui comments" style={{overflowY: "scroll", marginLeft: "-5px", height: "400px", overflowX: "hidden"}}>
                  {comments}
                  <form className="ui reply form">
                    <span style={{position: "fixed", bottom: "255px", backgroundColor: "white"}}>
                      <span className="ui icon input" >
                        <input type="text" placeholder="Add..." style={{width: "220px"}}/>
                        <Button variant="outline-primary" style={{marginLeft: "5%", width: "80px" }}>Post</Button>
                      </span>
                    </span>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default PostModal;