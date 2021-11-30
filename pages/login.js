import React, {useCallback, useEffect, useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_REQUEST} from "../config/event/eventName/userEvent";
import Link from 'next/link'
import GoogleButton from "react-google-button";
import {Divider} from "semantic-ui-react";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";

const login = () => {
    const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?" +
        "client_id=512265054010-31avv85pu1ufi1jbrd9vu3s5kj1006pa.apps.googleusercontent.com&" +
        "redirect_uri=http://localhost:8081/auth&" +
        "response_type=code&" +
        "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&" +
        "access_type=offline"
    ;

    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoggedIn, user } = useSelector(state => state.userReducer);
    const [cookies, setCookie] = useCookies(['user']);

    if(isLoggedIn) {
        alert("LogIn SUCCEED!!!")
        console.log(user.accessToken)
        setCookie("accessToken", user.accessToken, {path: "/"})
        setCookie("platform", user.platform, {path: "/"})
        router.push("/")
    }

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

    const handleGoogleLogin = useCallback(e => {

    }, [])

    return (
        <Row style={{marginTop: "18%"}}>
            <Col xs={"4"}/>
            <Col xs={"4"}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" style={{width: "100%", marginBottom: "2%"}}>
                        로그인
                    </Button>
                    <Link href="/signup"><Button style={{width: "100%"}} variant="outline-success">회원 가입</Button></Link>{' '}
                    <Divider horizontal>Or</Divider>
                    <Link href={googleURL}><GoogleButton onClick={() => console.log("Clicked!!!")} style={{width: "100%", marginBottom: "2%"}}>Google</GoogleButton></Link>
                </Form>
            </Col>
            <Col xs={"4"}/>

        </Row>

    )
}

export default login;