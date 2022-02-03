import React, {useState} from "react";
import {Button, Form, FormControl, FormLabel, InputGroup, Modal} from "react-bootstrap";
import {Divider} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {
  ADD_TO_FAVORITE_LIST_REQUEST,
  CREATE_FAVORITE_LIST_REQUEST,
  REMOVE_TO_FAVORITE_LIST_REQUEST
} from "../config/event/eventName/userEvent";
import FavoriteListCheckBox from "./FavoriteListCheckBox";

const FavoriteModal = ({show, setShow, favoriteList, postInfo}) => {
  const {user} = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  const [showInput, setShowInput] = useState(false);
  const [listName, setListName] = useState("");
  const [addIdList, setAddIdList] = useState([])
  const [removeIdList, setRemoveIdList] = useState([])

  const handleClose = () => {
    setShow(false)
  }

  const handleSubmit = () => {
    let idAddStr = "";
    let idRemoveStr = "";

    for(let i=0; i<addIdList.length; i++) {
      idAddStr += addIdList[i] + ",";
    }

    for(let i=0; i<removeIdList.length; i++) {
      idRemoveStr += removeIdList[i] + ",";
    }

    if(idAddStr !== "") {
      dispatch({
        type: ADD_TO_FAVORITE_LIST_REQUEST,
        data: {
          ownerName: user.username,
          postId: postInfo.id,
          favoriteId: idAddStr.substring(0, idAddStr.length-1)
        },
        plus: {
          postId: postInfo.id,
          favoriteList: addIdList
        }
      })
    }

    if(idRemoveStr !== "") {
      dispatch({
        type: REMOVE_TO_FAVORITE_LIST_REQUEST,
        data: {
          ownerName: user.username,
          postId: postInfo.id,
          favoriteId: idRemoveStr.substring(0, idRemoveStr.length-1),
        },
        plus: {
          postId: postInfo.id,
          favoriteList: removeIdList
        }
      })
    }
    setShow(false)
    setAddIdList([]);
    setRemoveIdList([]);
    alert("저장되었습니다.")
  }

  const onClickInputShow = () => {
    setShowInput(!showInput);
  }

  const onClickCreateList = () => {
    let flag = false;

    for(let i=0; i<favoriteList.length; i++) {
      if(favoriteList[i].name === listName) {
        flag = true;
      }
    }

    if(flag) {
      alert("이름이 중복됩니다.")
    } else {
      dispatch({
        type: CREATE_FAVORITE_LIST_REQUEST,
        data: {
          ownerId: user.id,
          favoriteTitle: listName
        }
      })
    }

    setShowInput(false);
  }

  const onChangeInput = (e) => {
    setListName(e.target.value)
  }

  const onClickCheckBox = (e, isContained) => {
    const checked = e.target.checked
    let index = -1;

    let new_removeList = [...removeIdList];
    let new_addList = [...addIdList];

    if(isContained) {
      for(let i=0; i<removeIdList.length; i++) {
        if(removeIdList[i] === e.target.id) {
          index = i;
          break;
        }
      }
      if(checked) {
        if(index !== -1) {
          new_removeList.splice(index, 1);
          setRemoveIdList(new_removeList)
        }
      } else {
        if(index === -1) {
          new_removeList.push(e.target.id);
          setRemoveIdList(new_removeList)
        }
      }
    } else {
      for(let i=0; i<addIdList.length; i++) {
        if(addIdList[i] === e.target.id) {
          index = i;
          break;
        }
      }
      if(checked) {
        if(index === -1) {
          new_addList.push(e.target.id);
          setAddIdList(new_addList)
        }
      } else {
        if(index !== -1) {
          new_addList.splice(index, 1);
          setAddIdList(new_addList)
        }
      }
    }
  }

  return (
    <Modal size="sm" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Favorite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          favoriteList.map(v => {
            return (
              <FavoriteListCheckBox key={v.id} onClickCheckBox={onClickCheckBox} postId={postInfo.id} listInfo={v} posts={v.posts}/>
            )
          })
        }
        {
          showInput ?
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                onChange={onChangeInput}
              />
              <Button variant="outline-secondary" id="button-addon1" onClick={onClickCreateList}>
                Button
              </Button>
            </InputGroup> :
            null
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClickInputShow}>
          Create Favorite
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          저장하기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FavoriteModal;