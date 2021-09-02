import React, {useCallback, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {LOGIN_REQUEST} from "../config/event/eventName/userEvent";
import Link from 'next/link'

import getFormInput from "../utils/getFormInput";
import {useRouter} from "next/router";

const login = () => {
    const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?" +
        "client_id=512265054010-g3t0difpimrb59jr33dqld08gqkr7ijf.apps.googleusercontent.com&" +
        "redirect_uri=http://localhost:8081/auth&" +
        "response_type=code&" +
        "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&" +
        "access_type=offline"
    ;

    const dispatch = useDispatch();
    const router = useRouter();

    const [username, onChangeUsername] = getFormInput();
    const [password, onChangPassword] = getFormInput();

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        console.log(username)
        const data = {
            username: username,
            password: password
        }
        dispatch({
            type: LOGIN_REQUEST,
            data
        })
    }, [username, password])

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={onChangeUsername}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={onChangPassword}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
                <Link href={googleURL}><Button variant="primary">Google</Button></Link>
            </Form>
        </div>

    )
}

export default login;