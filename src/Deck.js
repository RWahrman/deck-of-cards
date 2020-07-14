import React, { Component } from "react";
import axios from "axios";

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";

export default class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = { deck: null };
		this.handleClick = this.handleClick.bind(this);
	}

	async componentDidMount() {
		let newDeck = await axios.get(API_URL);
		console.log(newDeck);
		this.setState({ deck: newDeck.data });
	}

	async handleClick() {
		const { deck_id } = this.state;
		let drawnCard = await axios.get(
			`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
		);
	}

	render() {
		return (
			<div>
				<h1>Card Dealer</h1>
				<button>GIMME A CARD!</button>
				<p>{this.state.deck ? this.state.deck.remaining : "null"}</p>
			</div>
		);
	}
}
