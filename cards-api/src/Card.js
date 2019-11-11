import React, { Component } from "react"
import "./Card.css"

class Card extends Component {

   static defaultProps = {
      deck_id: ""
   }

   constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
   }

   handleClick() {
      this.props.gimmeACard()
   }

   render() {
      return (
         <div>
            <div>
               {this.props.cardsRem > 0 && <button onClick={this.handleClick}>Gimme a Card</button>}
            </div>
            <div className="Card">
               <img src={this.props.img} alt={this.props.name} />

            </div>
         </div>
      )
   }
}

export default Card