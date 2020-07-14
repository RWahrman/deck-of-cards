import React, { Component } from "react";
import axios from "axios";

import Card from "./Card";

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";

export default class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = { deck: null, drawn: [] };
		this.getCard = this.getCard.bind(this);
	}

	async componentDidMount() {
		let newDeck = await axios.get(API_URL);
		console.log(newDeck);
		this.setState({ deck: newDeck.data });
	}

	async getCard() {
		const { deck_id } = this.state.deck;
		try {
			let cardRes = await axios.get(
				`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
			);
			if (!cardRes.data.success) {
				throw new Error("No cards remaining!");
			}
			let card = cardRes.data.cards[0];
			console.log(card);
			this.setState((st) => ({
				drawn: [
					...st.drawn,
					{
						id: card.code,
						image: card.image,
						name: `${card.value} of ${card.suit}`,
					},
				],
				deck: { ...st.deck, remaining: cardRes.data.remaining },
			}));
		} catch (err) {
			alert(err);
		}
	}

	render() {
		return (
			<div>
				<h1>Card Dealer</h1>
				<button onClick={this.getCard}>GIMME A CARD!</button>
				<p style={{ marginBottom: "75px" }}>
					Cards Remaining:{" "}
					{this.state.deck ? this.state.deck.remaining : "null"}
				</p>
				{this.state.drawn.map((card) => (
					<Card key={card.id} image={card.image} name={card.name} />
				))}
			</div>
		);
	}
}
