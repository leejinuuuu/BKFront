import React from 'react'
import {Button, Modal, Form} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {UPLOAD_POST_REQUEST} from "../config/event/eventName/postEvent";

const UploadPostModal = ({show, setShow}) => {

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);

  const {user} = useSelector(state => state.userReducer)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( e.target.querySelector("#formFileMultiple").files[0])

    const formData = new FormData();
    formData.append("File", e.target.querySelector("#formFileMultiple").files[0])
    formData.append("writer", user.id)

    dispatch({
      type: UPLOAD_POST_REQUEST,
      data: formData
    })

    setShow(false)
  }

  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Multiple files input example</Form.Label>
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

export default connect(state => state)(UploadPostModal);