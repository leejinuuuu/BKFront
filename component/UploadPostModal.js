import React, {useCallback, useState} from 'react'
import {Button, Modal, Form, InputGroup, FormControl, Badge} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {UPLOAD_POST_REQUEST} from "../config/event/eventName/postEvent";

const UploadPostModal = ({show, setShow}) => {

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);

  const {user} = useSelector(state => state.userReducer)

  const [hashtag, setHashtag] = useState([]);
  const [tagName, setTagName] = useState("");

  const onChangeTagInput = (e) => {
    setTagName(e.target.value);
  }

  const onClickTagButton = () => {
    if(!hashtag.includes(tagName)) {
      setHashtag([...hashtag, tagName]);
    }
    setTagName("");
  }

  const onClickTagBadge = (e) => {
    let index = 0;
    hashtag.forEach((v, i) => {
      if(v === e.target.id) {}
      index = i;
    })
    setHashtag(hashtag.splice(index, 1))
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if(user && user.id) {
      let tagData = "";
      hashtag.map(v => tagData += "#" + v);

      const formData = new FormData();
      formData.append("File", e.target.querySelector("#formFileMultiple").files[0]);
      formData.append("Pny", e.target.querySelector("#formFileMultiple").files[0]);
      formData.append("writer", user.id);
      formData.append("title", e.target.querySelector("#formGroupEmail").value);
      formData.append("hashtag", tagData);
      formData.append("type", "image")

      dispatch({
        type: UPLOAD_POST_REQUEST,
        data: formData
      })
      setHashtag([]);
    } else {
      alert("로그인을 하셔야 합니다!")
    }
    setShow(false)
  }, [user, hashtag])

  const onChange = useCallback((e) => {

  }, [])

  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="게시물 제목" />
          </Form.Group>
          <Form.Label>태그</Form.Label>
          <InputGroup onChange={onChangeTagInput} className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={tagName}
              onChange={onChange}
            />
            <Button onClick={onClickTagButton} variant="outline-secondary" id="button-addon2">
              Button
            </Button>
          </InputGroup>
          <div>
            {hashtag.map(v => <span key={v}><Badge id={v} onClick={onClickTagBadge} bg="primary" style={{cursor: "pointer"}}>{v}</Badge>{' '}</span>)}
          </div>
          <Form.Group style={{marginTop: "20px"}} controlId="formFileMultiple" className="mb-3">
            <Form.Label>게시물 사진</Form.Label>
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