import React, {useCallback, useEffect, useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_REQUEST} from "../config/event/eventName/userEvent";
import Link from 'next/link'
import {Divider} from "semantic-ui-react";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import { signIn, signOut, useSession } from "next-auth/client"
import GoogleButton from "react-google-button";

const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, user } = useSelector(state => state.userReducer);
  const [cookies, setCookie] = useCookies(['user']);
  const [session, loadingSession] = useSession();

  if(user && user.accessToken) {
    alert("LogIn SUCCEED!!!")
    setCookie("accessToken", user.accessToken, {path: "/"})
    setCookie("platform", user.platform, {path: "/"})
    setCookie("SUID", user.username, {path: "/"})
    router.push("/")
  }

  if(session) {
    router.push("/")
    setCookie("SUID", session.user.name, {path: "/"})
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
          {
            !session && (
              <GoogleButton onClick={() => signIn()}>Sign In</GoogleButton>
            )
          }
        </Form>
      </Col>
      <Col xs={"4"}/>
    </Row>

  )
}

export default login;