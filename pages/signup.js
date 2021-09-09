import React, {useCallback} from 'react'

import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch} from "react-redux";
import {SIGNUP_REQUEST} from "../config/event/eventName/userEvent";

const signup = () => {

    const dispatch = useDispatch();

    const handleSubmit = useCallback( e => {
        e.preventDefault();
        dispatch({
            type: SIGNUP_REQUEST,
            data: {
                username: e.target.querySelector("#formGridUsername").value,
                password: e.target.querySelector("#formGridPassword").value,
                birth: e.target.querySelector("#formGridBirthYear").value + "-" +
                    e.target.querySelector("#formGridBirthMonth").value + "-" +
                    e.target.querySelector("#formGridBirthDay").value
            }
        })
    }, [])



    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group as={Row} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridBirthYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Select defaultValue="...">
                        {Array.from(Array(20)).map((e, i) => (
                            <option key={i}>{i + 1993}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBirthMonth">
                    <Form.Label>Month</Form.Label>
                    <Form.Select defaultValue="...">
                        {Array.from(Array(12)).map((e, i) => (
                            <option key={i}>{i + 1}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBirthDay">
                    <Form.Label>Day</Form.Label>
                    <Form.Select defaultValue="...">
                        {Array.from(Array(31)).map((e, i) => (
                            <option key={i}>{i + 1}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default signup;