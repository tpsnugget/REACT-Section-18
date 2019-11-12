import React, { Component } from "react"
import "./Joke.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons"
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons"
import { faGrinStars } from "@fortawesome/free-solid-svg-icons"
import { faGrinTears } from "@fortawesome/free-solid-svg-icons"
import { faGrinTongue } from "@fortawesome/free-solid-svg-icons"
import { faSmile } from "@fortawesome/free-solid-svg-icons"
import { faFlushed } from "@fortawesome/free-solid-svg-icons"
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons"
import { faGrimace } from "@fortawesome/free-solid-svg-icons"

class Joke extends Component {

   constructor(props) {
      super(props)
      this.state = {

      }
      this.handleClickUp = this.handleClickUp.bind(this)
      this.handleClickDown = this.handleClickDown.bind(this)
   }

   handleClickUp() {
      this.props.updateVotes(this.props.id, 1)
   }

   handleClickDown() {
      this.props.updateVotes(this.props.id, -1)
   }

   render() {
      const { joke, votes } = this.props
      let icon = ""
      let color = ""
      if (votes >= 15) { icon = faGrinStars
                         color = "#4CAF50" }
      else if (votes >= 12) { icon = faGrinTears
                              color = "#8BC34A" }
      else if (votes >= 9) { icon = faGrinTongue
                             color = "#CDDC39" }
      else if (votes >= 6) { icon = faSmile
                             color = "#FFEB3B" }
      else if (votes >= 3) { icon = faFlushed
                             color = "#FFC107" }
      else if (votes >= 0) { icon = faFrownOpen
                             color = "#FF9800" }
      else { icon = faGrimace
             color = "#f44336" }
      return (
         <div className="Joke">
            <div className="Joke-buttons">
               <FontAwesomeIcon className="fas faArrowUp" icon={faArrowCircleUp} onClick={this.handleClickUp} />
               <span className="Joke-votes" style={{borderColor: color}}>{votes}</span>
               <FontAwesomeIcon className="fas faArrowDown" icon={faArrowCircleDown} onClick={this.handleClickDown} />
            </div>
            {joke}
            <div>
               <FontAwesomeIcon className="Joke-smiley" icon={icon} />
            </div>
         </div>
      )
   }
}

export default Joke