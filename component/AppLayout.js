import React, {useCallback, useState} from 'react'
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Form,
  FormControl, Image, Modal,
  Nav,
  Navbar,
  Row
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Link from 'next/link'
import {LOGOUT_REQUEST} from "../config/event/eventName/userEvent";
import {Icon} from "semantic-ui-react";
import UploadPostModal from "./UploadPostModal";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.userReducer)

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleLogOut = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST
    })
  }, [])

  return (
    <div>
      <Row style={{width: "100%"}}>
        <Col lg={"2"} xxl={"3"}/>
        <Col lg={"8"} xxl={"6"}>
          <Row>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#">Peniyo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                  </Nav>
                  <Form className="d-flex" style={{ marginLeft: "20%", width: "400px" }}>
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="mr-2"
                      aria-label="Search"
                    />
                  </Form>
                </Navbar.Collapse>
                {user !== null && user !== '' ?
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle split variant="light" id="dropdown-custom-2">
                      <Image src="https://i.stack.imgur.com/frlIf.png" roundedCircle style={{width: "25px", marginRight: "6px"}}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                      <Dropdown.Item eventKey="1" href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="4" onClick={handleLogOut}>Log-Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>:
                  <span>
                    <Link href="/login"><Button variant="outline-success">Sign-Up</Button></Link>{' '}
                    <Link href="/preference"><Button variant="outline-success">Sign-Up</Button></Link>{' '}
                  </span>
                }
              </Container>
            </Navbar>
          </Row>
          <Row>
            {children}
          </Row>
          <div style={{position: "fixed", bottom: "10%", right: "22%"}}>
            <Button onClick={handleShow} variant="outline-info" style={{borderRadius: "50%", height: "60px", width: "60px", position: "absolute", zIndex: "0"}}>
              <i className="plus icon"/>
            </Button>
          </div>
          <UploadPostModal show={show} setShow={setShow}/>
        </Col>
        <Col lg={"2"} xxl={"3"}/>
      </Row>
    </div>
  )
};

export default AppLayout;