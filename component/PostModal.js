import React, {useCallback, useState} from 'react'
import {Button, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL, SHOW_MODAL} from "../config/event/eventName/modal";

const PostModal = () => {
  const dispatch = useDispatch()

  const { show } = useSelector(state => state.modalReducer)

  const handleModalClose = useCallback(() => {
    dispatch({
      type: CLOSE_MODAL
    })
  }, [show])

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
                <Image width={"410px"} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
              </Col>
              <Col xs={5}>
                <div className="ui comments" style={{overflowY: "scroll", marginLeft: "-5px", height: "400px", overflowX: "hidden"}}>
                  <div className="comment">
                    <a className="avatar">
                      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                    </a>
                    <div className="content">
                      <a className="author">Matt</a>
                      <div className="metadata">
                        <span className="date">Today at 5:42PM</span>
                      </div>
                      <div className="text">
                        How artistic!
                      </div>
                      <div className="actions">
                        <a className="reply">Reply</a>
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <a className="avatar">
                      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                    </a>
                    <div className="content">
                      <a className="author">Elliot Fu</a>
                      <div className="metadata">
                        <span className="date">Yesterday at 12:30AM</span>
                      </div>
                      <div className="text">
                        <p>This has been very useful for my research. Thanks as well!</p>
                      </div>
                      <div className="actions">
                        <a className="reply">Reply</a>
                      </div>
                    </div>
                    <div className="comments">
                      <div className="comment">
                        <a className="avatar">
                          <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                        </a>
                        <div className="content">
                          <a className="author">Jenny Hess</a>
                          <div className="metadata">
                            <span className="date">Just now</span>
                          </div>
                          <div className="text">
                            Elliot you are always so right :)
                          </div>
                          <div className="actions">
                            <a className="reply">Reply</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <a className="avatar">
                      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                    </a>
                    <div className="content">
                      <a className="author">Joe Henderson</a>
                      <div className="metadata">
                        <span className="date">5 days ago</span>
                      </div>
                      <div className="text">
                        Dude, this is awesome. Thanks so much
                      </div>
                      <div className="actions">
                        <a className="reply">Reply</a>
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <a className="avatar">
                      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                    </a>
                    <div className="content">
                      <a className="author">Matt</a>
                      <div className="metadata">
                        <span className="date">Today at 5:42PM</span>
                      </div>
                      <div className="text">
                        How artistic!
                      </div>
                      <div className="actions">
                        <a className="reply">Reply</a>
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <a className="avatar">
                      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                    </a>
                    <div className="content">
                      <a className="author">Elliot Fu</a>
                      <div className="metadata">
                        <span className="date">Yesterday at 12:30AM</span>
                      </div>
                      <div className="text">
                        <p>This has been very useful for my research. Thanks as well!</p>
                      </div>
                      <div className="actions">
                        <a className="reply">Reply</a>
                      </div>
                    </div>
                    <div className="comments">
                      <div className="comment">
                        <a className="avatar">
                          <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                        </a>
                        <div className="content">
                          <a className="author">Jenny Hess</a>
                          <div className="metadata">
                            <span className="date">Just now</span>
                          </div>
                          <div className="text">
                            Elliot you are always so right :)
                          </div>
                          <div className="actions">
                            <a className="reply">Reply</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <a className="avatar">
                      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
                    </a>
                    <div className="content">
                      <a className="author">Joe Henderson</a>
                      <div className="metadata">
                        <span className="date">5 days ago</span>
                      </div>
                      <div className="text">
                        Dude, this is awesome. Thanks so much
                      </div>
                      <div className="actions">
                        <a className="reply">Reply</a>
                      </div>
                    </div>
                  </div>
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