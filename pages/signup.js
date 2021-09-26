import React, {useCallback} from 'react'

import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {SIGNUP_REQUEST} from "../config/event/eventName/userEvent";
import {useRouter} from "next/router";

const signup = () => {

    const dispatch = useDispatch();
    const {isSignedUp} = useSelector(state => state.userReducer)
    const router = useRouter();

    if(isSignedUp) {
        alert("SignUp SUCCESSED!!!")
        router.push("/login")
    }

    const handleSubmit = useCallback( e => {
        e.preventDefault();

        const username = e.target.querySelector("#formGridUsername").value;
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


        dispatch({
            type: SIGNUP_REQUEST,
            data: {
                username: username,
                password: password,
                birth: birth
            }
        })
    }, [])

    return(
      <Row style={{marginTop: "20%"}}>
          <Col xs={"4"}/>
          <Col xs={"4"}>
              <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} controlId="formGridUsername" style={{marginBottom: "20px"}}>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="Enter username" required/>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formGridPassword" style={{marginBottom: "20px"}}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" required/>
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

                  <Button variant="outline-dark" type="submit" style={{marginLeft: "26%", width: "50%"}}>
                      Submit
                  </Button>
              </Form>
          </Col>
          <Col xs={"4"}/>
      </Row>
    )
}

export default signup;