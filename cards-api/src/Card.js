import React, {Component} from "react"

class Card extends Component{

   static defaultProps = {
      deck_id: ""
   }

   constructor(props){
      super(props)
      this.handleClick = this.handleClick.bind(this)
   }

   handleClick(){
      this.props.gimmeACard()
   }

   render(){
      return(
         <div>
            <img src={this.props.img} alt=""/>
            <button onClick={this.handleClick}>Gimme a Card</button>
         </div>
      )
   }
}

export default Card