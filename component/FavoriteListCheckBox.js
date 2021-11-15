import React, {useEffect, useState} from "react";
import {FormControl, InputGroup} from "react-bootstrap";

const FavoriteListCheckBox = ({postId, listInfo, posts, onClickCheckBox}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isContained, setIsContained] = useState(false);

  useEffect(() => {
    for(let i=0; i<posts.length; i++) {
      if(posts[i].id === postId) {
        setIsChecked(true);
        setIsContained(true);
        break;
      }
    }
  }, [listInfo, posts])

  const onClicked = (e) => {
    setIsChecked(!isChecked);
    onClickCheckBox(e, isContained)
  }

  const onChange = () => {

  }

  return (
    <InputGroup className="mb-3">
      <InputGroup.Checkbox onChange={onChange} checked={isChecked} id={listInfo.id} aria-label="Checkbox for following text input" onClick={onClicked}/>
      <FormControl onChange={onChange} style={{textAlign:"center", fontSize: "20px"}} aria-label="Text input with checkbox" value={listInfo.name}/>
    </InputGroup>
  )
}

export default FavoriteListCheckBox;