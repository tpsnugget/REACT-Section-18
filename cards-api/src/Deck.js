import React, {Component} from "react"
import axios from "axios"
import Card from "./Card"

// var deck_id = ""

class Deck extends Component{

   static defaultProps = {
      
   }

   constructor(props){
      super(props)
      this.state = {
         cardsRem: "",
         deck_id: "",
         img: ""
      }
      this.gimmeACard = this.gimmeACard.bind(this)
   }

   async gimmeACard(){
      let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
      this.setState({
         cardsRem: res.data.remaining,
         img: res.data.cards[0].image
      })
   }

   async componentDidMount(){
      let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      this.setState({
         cardsRem: res.data.remaining,
         deck_id: res.data.deck_id
      })
   }

   render(){
      if(this.state.cardsRem > 0){return(<Card gimmeACard={this.gimmeACard} deck_id={this.state.deck_id} img={this.state.img}/>)}
      else {return(<h2>No more cards left!</h2>)}
      
   }
}

export default Deck

