import React, {useCallback, useEffect, useState} from 'react'
import {Button, Modal, Form, Row, Col, InputGroup, FormControl} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {UPLOAD_POST_REQUEST} from "../config/event/eventName/postEvent";
import {CREATE_CLAN_REQUEST, SIGNUP_REQUEST, UPDATE_PROFILE_REQUEST} from "../config/event/eventName/userEvent";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const ClanMakeModal = ({show, setShow, profile}) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleClose = () => setShow(false);

  const [username, setUsername] = useState("")

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = useCallback( e => {
    e.preventDefault();
    e.stopPropagation();

    const password = e.target.querySelector("#formGridPassword").value;
    const message = e.target.querySelector("#formGridMessage").value;

    const formData = new FormData();
    formData.append("accountId", profile.id)
    formData.append("username", username);
    formData.append("password", password);
    formData.append("profile", e.target.querySelector("#formFileMultiple").files[0]);
    formData.append("background", e.target.querySelector("#formFileMultiple2").files[0]);
    formData.append("message", message);

    dispatch({
      type: UPDATE_PROFILE_REQUEST,
      data: formData
    })
    setCookie("SUID", username, {path: "/"})
    alert("수정이 완료되었습니다.")
    router.push("/")
  }, [username])

  useEffect(() => {
  }, [])

  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make Your Clan!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} md="4" controlId="validationFormikUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="아이디를 입력해 주세요"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={username}
                onChange={onChangeUsername}
              />
              <Button variant="outline-secondary" id="button-addon2">
                중복 체크
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Row} controlId="formGridPassword" style={{marginBottom: "20px", paddingLeft:"10px", paddingRight: "10px"}}>
            <Form.Label style={{marginLeft: "-10px"}}>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
            <Form.Control.Feedback type="invalid">
              Please enter password
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Select Profile Image</Form.Label>
            <Form.Control type="file" multiple/>
            <Form.Control.Feedback type="invalid">
              프로필 사진을 입력해 주세요.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFileMultiple2" className="mb-3">
            <Form.Label>Select Profile Background Image</Form.Label>
            <Form.Control type="file" multiple/>
            <Form.Control.Feedback type="invalid">
              프로필 배경사진을 입력해 주세요.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row} controlId="formGridMessage" style={{paddingLeft:"10px", paddingRight: "10px", marginBottom: "4%"}}>
            <Form.Label>상태 메세지</Form.Label>
            <Form.Control type="text" placeholder="상태메세지"/>
            <Form.Control.Feedback type="invalid">
              상태메세지를 입력해 주세요.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="outline-dark" style={{marginLeft: "26%", width: "50%"}}>
            확인
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default connect(state => state)(ClanMakeModal);