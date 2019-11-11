import React, { Component } from "react"
import Joke from "./Joke"
import "./JokeList.css"
import axios from "axios"

const url = "https://icanhazdadjoke.com/"

class JokeList extends Component {

   static defaultProps = {
      numJokesToGet: 10
   }

   constructor(props) {
      super(props)
      this.state = {
         jokes: [{ id: "", joke: "" }]
      }
   }

   async componentDidMount() {
      let temp = [...this.state.jokes]
      while (temp.length <= this.props.numJokesToGet) {
         let res = await axios.get(url, { headers: { Accept: "application/json" } })
         if ((temp.findIndex(e => e.id === res.data.id)) === -1) {
            temp.push({ id: res.data.id, joke: res.data.joke })
         }
         else { console.log("Matched a joke, try again.") }
      }
      this.setState({
         jokes: temp
      })
   }

   render() {
      return (
         <div className="JokeList">
            <div className="JokeList-sidebar">
               <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
               <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="smiley face icon" />
               <button className="JokeList-getmore">New Jokes</button>
            </div>

            <div className="JokeList-jokes">
               {this.state.jokes.map(e => <Joke key={e.id} id={e.id} joke={e.joke} />)}
            </div>
         </div>
      )
   }
}

export default JokeList