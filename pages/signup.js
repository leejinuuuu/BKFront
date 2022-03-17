import React, {useCallback, useEffect, useState} from 'react'

import {Button, Col,  Form, FormControl, InputGroup, Row, Dropdown, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {SIGNUP_REQUEST} from "../config/event/eventName/userEvent";
import {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/client";
import {useCookies} from "react-cookie";
import axios from "axios";
import {backURL} from "../config/config";

const signup = () => {
  const dispatch = useDispatch();
  const {isSignedUp, emailCode} = useSelector(state => state.userReducer)
  const router = useRouter();
  const [removeCookie] = useCookies(['user']);
  const [session, loadingSession] = useSession();

  const [isAuthed, setIsAuthed] = useState(true);
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [usernameChecked, setUsernameChecked] = useState(false);

  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if(session) {
      setDefaultName(session.user.name);
      setUsername(session.user.name);
      setUsernameChecked(true)
    }

    if(isSignedUp && usernameChecked) {
      alert("SignUp SUCCESSED!!!")
      router.push("/login")
    }
  }, [isSignedUp, usernameChecked, router.query.google])

  const handleSubmit = useCallback( e => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if(form.checkValidity() !== true) {
      return;
    }

    if(usernameChecked) {
      const password = e.target.querySelector("#formGridPassword").value;
      let birthYear = e.target.querySelector("#formGridBirthYear").value;
      let birthMonth = e.target.querySelector("#formGridBirthMonth").value;
      let birthDay = e.target.querySelector("#formGridBirthDay").value;

      birthMonth = birthMonth.length === 2 ? "0" + birthMonth : birthMonth;
      birthDay = birthDay.length === 2 ? "0" + birthDay : birthDay;

      const birth =
        birthYear.substring(0, birthYear.length-1) + "-" +
        birthMonth.substring(0, birthMonth.length-1) + "-" +
        birthDay.substring(0, birthDay.length-1);

      const formData = new FormData();
      formData.append("username", defaultName ? defaultName : username);
      formData.append("password", password);
      formData.append("birth", birth);
      formData.append("profile", e.target.querySelector("#formFileMultiple").files[0]);
      formData.append("background", e.target.querySelector("#formFileMultiple2").files[0]);
      formData.append("isPublic", "true")

      dispatch({
        type: SIGNUP_REQUEST,
        data: formData
      })
      setValidated(true);
    } else {
      alert("아이디를 확인해 주세요!!!!")
    }
  }, [username, defaultName, usernameChecked])

  const onChangeCode = useCallback(e => {
    setCode(e.target.value)
  }, [code])

  const onClickCheckCode = useCallback(e => {
    if(emailCode === code) {
      setIsAuthed(true);
      setShow(false)
    } else {
      alert("Wrong Code")
    }
  }, [emailCode, code])

  const onClickCancel = useCallback(e => {
    if(session) return signOut()
    else {
      removeCookie("accessToken")
      removeCookie("platform")
    }
    router.push("/login")
  }, [emailCode, code])

  const onChangeName = useCallback(e => {
    setUsername(e.target.value);
  }, [username])

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
          setUsernameChecked(res.data)
        }
      )
  }, [username, usernameChecked])

  return(
    <div>
      <Row style={{marginTop: "10%"}}>
        <Col lg={"4"}/>
        <Col lg={"4"}>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} md="4" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="아이디를 입력해 주세요"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  disabled={defaultName || usernameChecked}
                  value={defaultName ? defaultName : username}
                  onChange={onChangeName}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={onClickUsernameCheck} disabled={defaultName || usernameChecked}>
                  중복 체크
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridPassword" style={{marginBottom: "20px", paddingLeft:"10px", paddingRight: "10px"}}>
              <Form.Label style={{marginLeft: "-10px"}}>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required/>
              <Form.Control.Feedback type="invalid">
                Please enter password
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBirthYear" style={{marginBottom: "40px"}}>
                <Form.Label>Year</Form.Label>
                <Form.Select defaultValue="...">
                  {Array.from(Array(20)).map((e, i) => (
                    <option key={i}>{i + 1993 + "년"}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBirthMonth">
                <Form.Label>Month</Form.Label>
                <Form.Select defaultValue="...">
                  {Array.from(Array(12)).map((e, i) => (
                    <option key={i}>{i + 1 + "월"}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBirthDay">
                <Form.Label>Day</Form.Label>
                <Form.Select defaultValue="...">
                  {Array.from(Array(31)).map((e, i) => (
                    <option key={i}>{i + 1 + "일"}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Select Profile Image</Form.Label>
              <Form.Control type="file" multiple required/>
              <Form.Control.Feedback type="invalid">
                프로필 사진을 입력해 주세요.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formFileMultiple2" className="mb-3">
              <Form.Label>Select Profile Background Image</Form.Label>
              <Form.Control type="file" multiple required/>
              <Form.Control.Feedback type="invalid">
                프로필 배경사진을 입력해 주세요.
              </Form.Control.Feedback>
            </Form.Group>
            <Button disabled={!isAuthed} type="submit" variant="outline-dark" style={{marginLeft: "26%", width: "50%"}}>
              {isAuthed ? "회원가입" : "입력창 혹은 이메일 인증을 완료해 주세요"}
            </Button>
          </Form>
          <div style={{textAlign: "center", marginTop: "10px"}}>
            <Button style={{width: "40%"}} variant="outline-secondary" id="button-addon2" onClick={onClickCancel}>
              Cancel
            </Button>
          </div>
        </Col>
        <Col lg={"4"}/>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Input Code"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={onChangeCode}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={onClickCheckCode}>
              Button
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default signup;