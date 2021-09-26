import React from 'react'
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Form,
  FormControl, Image,
  Nav,
  Navbar,
  Row
} from "react-bootstrap";

const AppLayout = ({ children }) => {
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
                  <Form className="d-flex" style={{ marginLeft: "28%", width: "400px" }}>
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="mr-2"
                      aria-label="Search"
                    />
                  </Form>
                </Navbar.Collapse>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle split variant="light" id="dropdown-custom-2">
                    <Image src="https://i.stack.imgur.com/frlIf.png" roundedCircle style={{width: "25px", marginRight: "6px"}}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="super-colors">
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3" active>
                      Active Item
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Navbar>
          </Row>
          <Row>
            {children}
          </Row>
        </Col>
        <Col lg={"2"} xxl={"3"}/>
      </Row>
    </div>
  )
};

export default AppLayout;