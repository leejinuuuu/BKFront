import React, {useCallback, useEffect, useState} from 'react'

import {Button, Col,  Form, FormControl, InputGroup, Row, Dropdown, Modal} from 'react-bootstrap'
import {connect, useDispatch, useSelector} from "react-redux";
import {AUTH_WITH_EMAIL_REQUEST, SIGNUP_REQUEST} from "../config/event/eventName/userEvent";
import {useRouter} from "next/router";
import Link from 'next/link'
import wrapper from "../store/store-wrapper";

const signup = () => {
  const dispatch = useDispatch();
  const {isSignedUp, emailCode} = useSelector(state => state.userReducer)
  const router = useRouter();

  const [isAuthed, setIsAuthed] = useState(true);
  const [validated, setValidated] = useState(true);

  const [defaultName, setDefaultName] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("@gmail.com");
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  if(isSignedUp) {
    alert("SignUp SUCCESSED!!!")
    router.push("/login")
  }

  useEffect(() => {
    if(router.query !== null) {
      if(router.query.google !== null) {
        setDefaultName(router.query.google);
      }
    }
  }, [])

  const handleSubmit = useCallback( e => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if(form.checkValidity() === true) {
      const username = e.target.querySelector("#formGridUsername").value;
      const password = e.target.querySelector("#formGridPassword").value;
      const email = email1 + email2;
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
      formData.append("profile", e.target.querySelector("#formFileMultiple").files[0])
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("birth", birth)

      dispatch({
        type: SIGNUP_REQUEST,
        data: formData
      })
    }
    setValidated(true);
  }, [email1, email2])

  const onChangeEmail1 = useCallback((e) => {
    setEmail1(e.target.value)
  }, [email1])

  const onChangeEmail2 = useCallback((e) => {
    setEmail2(e.target.value)
  }, [email2])

  const onChangeCode = useCallback(e => {
    setCode(e.target.value)
  }, [code])

  const onClickEmailAuth = useCallback((e) => {
    setShow(true)
    dispatch({
      type: AUTH_WITH_EMAIL_REQUEST,
      data: {
        email: email1 + email2
      }
    })
  }, [email1, email2])

  const onClickCheckCode = useCallback(e => {
    if(emailCode === code) {
      setIsAuthed(true);
      setShow(false)
    } else {
      alert("Wrong Code")
    }
  }, [emailCode, code])

  return(
    <div>
      <Row style={{marginTop: "15%"}}>
        <Col lg={"4"}/>
        <Col lg={"4"}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formGridUsername" >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required defaultValue={defaultName} disabled={defaultName}/>
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridPassword" style={{marginBottom: "20px"}}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required/>
              <Form.Control.Feedback type="invalid">
                Please enter password
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Email</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon2"
                required
                onChange={onChangeEmail1}
                disabled={isAuthed}
              />
              <Form.Select defaultValue="@gmail.com" onChange={onChangeEmail2} disabled={isAuthed}>
                {["@gmail.com"].map((e, i) => (
                  <option key={i}>{e}</option>
                ))}
              </Form.Select>
              <Button disabled={isAuthed} variant="outline-secondary" id="button-addon2" onClick={onClickEmailAuth}>
                인증하기
              </Button>
            </InputGroup>
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
                Please choose a profileImage.
              </Form.Control.Feedback>
            </Form.Group>
            <Button disabled={!isAuthed} type="submit" variant="outline-dark" style={{marginLeft: "26%", width: "50%"}}>
              {isAuthed ? "회원가입" : "입력창 혹은 이메일 인증을 완료해 주세요"}
            </Button>
          </Form>
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