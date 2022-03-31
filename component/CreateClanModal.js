import React, {useEffect} from 'react'
import {Button, Modal, Form} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {UPLOAD_POST_REQUEST} from "../config/event/eventName/postEvent";
import {CREATE_CLAN_REQUEST} from "../config/event/eventName/userEvent";

const CreateClanModal = ({show, setShow}) => {

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);

  const {user, createClanError} = useSelector(state => state.userReducer)

  useEffect(() => {
    if(createClanError) {
      alert("이름이 중복됩니다.")
    }
  }, [createClanError])

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile", e.target.querySelector("#formFileMultiple").files[0]);
    formData.append("background", e.target.querySelector("#formFileMultiple2").files[0]);
    formData.append("masterId", user.id);
    formData.append("name", e.target.querySelector("#formBasicTitle").value)
    formData.append("message", e.target.querySelector("#formBasicMessage").value)

    dispatch({
      type: CREATE_CLAN_REQUEST,
      data: formData
    })

    setShow(false)
  }

  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make Your Clan!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Label>상태메세지</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>프로필</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
          <Form.Group controlId="formFileMultiple2" className="mb-3">
            <Form.Label>배경 이미지</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default connect(state => state)(CreateClanModal);