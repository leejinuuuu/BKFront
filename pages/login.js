import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_USER_REQUEST,
  LOGIN_REQUEST,
} from "../config/event/eventName/userEvent";
import Link from "next/link";
import { Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { signIn, signOut, useSession } from "next-auth/client";
import GoogleButton from "react-google-button";
import axios from "axios";
import { backURL } from "../config/config";
import wrapper from "../store/store-wrapper";
import {
  LOAD_ALL_POST_REQUEST,
  LOAD_TOP20_LIKED_POST_REQUEST,
} from "../config/event/eventName/postEvent";
import { END } from "redux-saga";

const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { logInError, user, LoadingUserError } = useSelector(
    (state) => state.userReducer
  );
  const [cookies, setCookie] = useCookies(["user"]);
  const [session, loadingSession] = useSession();

  useEffect(() => {
    if (session) {
      axios
        .get(backURL + "/username/id?username=" + session.user.name)
        .then((res) => {
          if (!res.data) {
            router.push("/signup");
          } else {
            setCookie("SUID", res.data, { path: "/" });
            router.push("/");
          }
        });
    } else if (user) {
      if (!user.username) {
        alert("아이디 혹은 비밀번호가 잘못되었습니다.");
      } else {
        setCookie("accessToken", user.accessToken, { path: "/" });
        setCookie("platform", user.platform, { path: "/" });
        setCookie("SUID", user.id, { path: "/" });
        router.push("/");
      }
    }

    if (logInError) {
      alert("아이디 혹은 비밀번호가 잘못되었습니다.");
    }
  }, [session, user, logInError]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const data = {
      username: e.target.querySelector("#formBasicEmail").value,
      password: e.target.querySelector("#formBasicPassword").value,
    };
    dispatch({
      type: LOGIN_REQUEST,
      data,
    });
  }, []);

  return (
    <Row style={{ marginTop: "18%" }}>
      <Col xs={"4"} />
      <Col xs={"4"}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username1234</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            variant="outline-primary"
            type="submit"
            style={{ width: "100%", marginBottom: "2%" }}
          >
            로그인
          </Button>
          <Link href="/signup">
            <Button style={{ width: "100%" }} variant="outline-success">
              회원 가입
            </Button>
          </Link>{" "}
          <Divider horizontal>Or</Divider>
          {!session && (
            <GoogleButton onClick={() => signIn()}>Sign In</GoogleButton>
          )}
        </Form>
      </Col>
      <Col xs={"4"} />
    </Row>
  );
};

export default login;
