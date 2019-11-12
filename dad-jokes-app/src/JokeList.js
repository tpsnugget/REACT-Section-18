import React, { Component } from "react"
import Joke from "./Joke"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLaugh } from "@fortawesome/free-solid-svg-icons"
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
         jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
         loading: false
      }
      this.seenJokes = new Set(this.state.jokes.map(j => j.joke))
      console.log(this.seenJokes)
      this.updateVotes = this.updateVotes.bind(this)
      this.handleClick = this.handleClick.bind(this)
   }

   componentDidMount() {
      console.log("this.state.jokes.length = ", this.state.jokes.length)
      if (this.state.jokes.length === 0) { this.getJokes() }
   }

   async getJokes() {
      try {
         let temp = []
         while (temp.length < this.props.numJokesToGet) {
            let res = await axios.get(url, { headers: { Accept: "application/json" } })
            if (!this.seenJokes.has(res.data.joke)) {
               temp.push({ id: res.data.id, joke: res.data.joke, votes: 0 })
            }
            else {
               console.log("Matched a joke, try again.")
               console.log(res.data.joke)
            }
         }
         this.setState(st => ({
            loading: false,
            jokes: [...st.jokes, ...temp]
         }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
         )
         window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      }
      catch(e){alert(e)}
   }

   updateVotes(id, vote) {
      let temp = [...this.state.jokes]
      temp.map(e => e.id === id ? e.votes += vote : e.votes
      )
      this.setState({
         jokes: temp
      },
         () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
   }

   handleClick() {
      this.setState({ loading: true }, this.getJokes)
   }

   render() {
      if (this.state.loading) {
         return (
            <div className="JokeList-spinner">
               <FontAwesomeIcon className="far fa-8x fa-laugh fa-spin" icon={faLaugh} />
               <h1 className="JokeList-title">Loading...</h1>
            </div>
         )
      }
      let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
      return (
         <div className="JokeList">
            <div className="JokeList-sidebar">
               <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
               <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="smiley face icon" />
               <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
            </div>

            <div className="JokeList-jokes">
               {jokes.map(e => <Joke
                  key={e.id}
                  id={e.id}
                  joke={e.joke}
                  votes={e.votes}
                  updateVotes={this.updateVotes} />)}
            </div>
         </div>
      )
   }
}

export default JokeList