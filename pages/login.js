import React, {useCallback, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {LOGIN_REQUEST} from "../config/event/eventName/userEvent";
import Link from 'next/link'
const login = () => {
    const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?" +
        "client_id=512265054010-31avv85pu1ufi1jbrd9vu3s5kj1006pa.apps.googleusercontent.com&" +
        "redirect_uri=http://localhost:8081/auth&" +
        "response_type=code&" +
        "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&" +
        "access_type=offline"
    ;

    const dispatch = useDispatch();

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const data = {
            username: e.target.querySelector("#formBasicEmail").value,
            password:e.target.querySelector("#formBasicPassword").value
        }
        dispatch({
            type: LOGIN_REQUEST,
            data
        })
    }, [])

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link href={googleURL}><Button variant="primary">Google</Button></Link>
            </Form>
        </div>

    )
}

export default login;