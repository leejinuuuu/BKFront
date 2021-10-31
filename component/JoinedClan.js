import React from 'react'
import {Image} from "react-bootstrap";
import {imageURL} from "../config/config";
import Link from 'next/link'

const JoinedClan = ({clans}) => {
  return(
    <div className="ui items" style={{marginLeft: "30px"}}>
      {clans.map(clan => {
        return (
          <Link href={"/clan/" + clan.name} >
            <div id={clan.id} className="item" style={{cursor: "pointer"}}>
              <div className="ui small image">
                  <Image style={{width: "40px"}} src={imageURL + clan.profileImage} roundedCircle />
              </div>
              <div className="content" style={{marginLeft: "-120px", paddingTop: "2px"}}>
                <div className="header" style={{fontSize: "90%"}}>{clan.name}</div>
                <div className="meta" style={{marginTop: "1px"}}>
                  <span className="price" style={{fontSize: "90%"}}>{clan.master}</span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default JoinedClan;