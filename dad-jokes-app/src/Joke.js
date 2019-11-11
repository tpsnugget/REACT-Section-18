import React, {Component} from "react"

class Joke extends Component{

   constructor(props){
      super(props)
      this.state = {

      }
   }

   render(){
      return(
         <p>{this.props.joke}</p>
      )
   }
}

export default Joke