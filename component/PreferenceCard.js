import React from 'react'
import {useDispatch} from "react-redux";
import {Image} from "react-bootstrap";

const PreferenceCard = ({postInfo, isClicked, keyValue}) => {
  const dispatch = useDispatch();

  return(
    <div style={{marginBottom: "15%"}}>
      {isClicked ?
        <div>
          <div style={{opacity: "30%"}} className="ui card">
            <a className="image">
              <Image key={keyValue} id={keyValue} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
            </a>
          </div>
        </div> :
        <div>
          <div className="ui card">
            <a className="image">
              <Image key={keyValue} id={keyValue} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
            </a>
          </div>
        </div>
      }
    </div>
  )
}

export default PreferenceCard;