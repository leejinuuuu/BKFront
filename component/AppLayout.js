import React, { useCallback, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Navbar,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import UploadPostModal from "./UploadPostModal";
import { imageURL } from "../config/config";
import { useCookies } from "react-cookie";
import { signIn, signOut, useSession } from "next-auth/client";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [session, loadingSession] = useSession();

  const { isLoggedIn, user } = useSelector((state) => state.userReducer);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const onClickLogout = useCallback(() => {
    if (session) return signOut();
    else {
      setCookie("accessToken", "");
      setCookie("platform", "");
      setCookie("SUID", "");
      router.push("/");
    }
  }, [session, cookies]);

  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        style={{ position: "fixed", width: "100%", zIndex: 100 }}
      >
        <Container>
          {isLoggedIn ? (
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split variant="light" id="dropdown-custom-2">
                <Image
                  src={imageURL + user.profileImage}
                  roundedCircle
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "6px",
                    objectFit: "cover",
                  }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                <Dropdown.Item eventKey="1" href={"/profile/" + user.username}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" href={"/alarm"}>
                  Alarm
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4" onClick={onClickLogout} href={"/"}>
                  Log-Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <span>
              <Link href="/login">
                <Button variant="outline-success">Sign-Up</Button>
              </Link>{" "}
            </span>
          )}
          <div>
            <Link href={"/"}>
              <Button>Home</Button>
            </Link>
          </div>
          <DropdownButton
            as={ButtonGroup}
            id={`dropdown-variants-Secondary`}
            variant="outline-secondary"
            title="Menu"
          >
            <Dropdown.Item eventKey="1" href={"/history"}>
              History
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" href={"/alarm"}>
              Alarm
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>
      <Row style={{ width: "100%" }}>
        <Col lg={"2"} xxl={"3"} />
        <Col lg={"8"} xxl={"6"}>
          <Row />
          <Row style={{ marginTop: "50px" }}>{children}</Row>
          <div style={{ position: "fixed", bottom: "10%", right: "22%" }}>
            <Button
              onClick={handleShow}
              variant="outline-info"
              style={{
                borderRadius: "50%",
                height: "60px",
                width: "60px",
                position: "absolute",
                zIndex: "0",
              }}
            >
              <i className="plus icon" />
            </Button>
          </div>
          {isLoggedIn ? (
            <UploadPostModal show={show} setShow={setShow} />
          ) : null}
        </Col>
        <Col lg={"2"} xxl={"3"} />
      </Row>
    </div>
  );
};

export default AppLayout;
