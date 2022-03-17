import React, {useCallback, useEffect, useState} from 'react'
import {Button, Modal, Form, Row, Col, InputGroup, FormControl} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {UPLOAD_POST_REQUEST} from "../config/event/eventName/postEvent";
import {CREATE_CLAN_REQUEST, SIGNUP_REQUEST, UPDATE_PROFILE_REQUEST} from "../config/event/eventName/userEvent";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import axios from "axios";
import {backURL} from "../config/config";

const ClanMakeModal = ({show, setShow, profile}) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleClose = () => setShow(false);

  const [username, setUsername] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isValidUsername, setIsValidUsername] = useState(false)

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onClickUsernameCheck = useCallback(e => {
    axios
        .get(backURL + "/username/check?username=" + username)
        .then(
            res => {
              if(res.data) {
                alert("가능한 아이디 입니다!!!")
                setUsername(res.data)
              } else {
                alert("중복된 아이디 입니다!!!")
              }
              setIsValidUsername(res.data)
            }
        )
  }, [username, isValidUsername])

  const handleSubmit = useCallback( async e => {
    e.preventDefault();
    e.stopPropagation();

    if(isValidUsername || !username || username === "") {
      const formData = new FormData();
      formData.append("accountId", profile.id)
      let finalUsername = username
      if(username === "" || !username) {
        finalUsername = profile.username
      }
      formData.append("username", finalUsername);
      formData.append("password", e.target.querySelector("#formGridPassword").value);
      formData.append("profile", e.target.querySelector("#formFileMultiple").files[0]);
      formData.append("background", e.target.querySelector("#formFileMultiple2").files[0]);
      formData.append("message", e.target.querySelector("#formGridMessage").value);
      formData.append("isPublic", isPublic ? "true" : "false")

      dispatch({
        type: UPDATE_PROFILE_REQUEST,
        data: formData
      })
      alert("수정이 완료되었습니다.")
      await router.push("/")
    } else {
      alert("아이디 중복을 확인해 주세요")
    }
  }, [username, profile, isValidUsername])

  const onClickRadio = useCallback((e) => {
    setIsPublic(!isPublic)
  }, [isPublic])

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
              <Button variant="outline-secondary" id="button-addon2" onClick={onClickUsernameCheck}>
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
          <Form.Check
              type="switch"
              id="custom-switch"
              label="공개여부"
              onClick={onClickRadio}
              checked={isPublic}
          />
          <Button type="submit" variant="outline-dark" style={{marginLeft: "26%", width: "50%", marginTop: "20px"}}>
            확인
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default connect(state => state)(ClanMakeModal);