import React, {useCallback, useEffect, useState} from 'react'
import {Button, Modal, Form, Row, Col, InputGroup, FormControl} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {UPLOAD_POST_REQUEST} from "../config/event/eventName/postEvent";
import {
    CREATE_CLAN_REQUEST,
    SIGNUP_REQUEST,
    UPDATE_CLAN_REQUEST,
    UPDATE_PROFILE_REQUEST
} from "../config/event/eventName/userEvent";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const ClanMakeModal = ({show, setShow, clanInfo}) => {
    const router = useRouter()
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);

    const handleSubmit = useCallback( async e => {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData();
        formData.append("clanId", clanInfo.id)
        formData.append("name", e.target.querySelector("#formGridName").value);
        formData.append("profile", e.target.querySelector("#formFileMultiple").files[0]);
        formData.append("background", e.target.querySelector("#formFileMultiple2").files[0]);

        dispatch({
            type: UPDATE_CLAN_REQUEST,
            data: formData
        })
        router.push("/")
    }, [])

    useEffect(() => {
    }, [])

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>클랜 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formGridName" style={{marginBottom: "20px", paddingLeft:"10px", paddingRight: "10px"}}>
                        <Form.Label style={{marginLeft: "-10px"}}>클랜 이름</Form.Label>
                        <Form.Control type="text" placeholder="클랜 이름"/>
                        <Form.Control.Feedback type="invalid">
                            이름
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>프로필 사진</Form.Label>
                        <Form.Control type="file" multiple/>
                        <Form.Control.Feedback type="invalid">
                            프로필 사진을 입력해 주세요.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formFileMultiple2" className="mb-3">
                        <Form.Label>배경 사진</Form.Label>
                        <Form.Control type="file" multiple/>
                        <Form.Control.Feedback type="invalid">
                            프로필 배경사진을 입력해 주세요.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="outline-dark" style={{marginLeft: "26%", width: "50%"}}>
                        확인
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default connect(state => state)(ClanMakeModal);