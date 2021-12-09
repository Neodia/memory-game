import React from "react";
import "./Game.css"

const STARTING_AMOUNT = 3;
const CIRCLES_PER_ROUND = 1;
const NUMBER_OF_COLORS = 3;
const COLORS = ["red", "blue", "black"];
const REFRESH_TIME = 100;
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endGame: props.endGame,
            gameSettings: props.gameSettings,
            remainingTime: props.gameSettings.maxTime * 1000,
            round: 0,
            gameCircles: [],
            playerCircles: [],
            playing: false
        }
    }

    endGame() { this.state.endGame() }

    componentDidMount() { 
        this.startRound(0)
        let interval = setInterval(() => {
            if(this.state.remainingTime <= REFRESH_TIME) {
                this.setState({remainingTime: 0});
                clearInterval(interval);
                alert(`You did ${this.state.round} rounds in ${this.state.gameSettings.maxTime} milliseconds.`)
                this.endGame()
            } else
                this.setState({remainingTime: this.state.remainingTime - REFRESH_TIME});
        }, REFRESH_TIME)
    }

    startRound(round) {
        let amountToGenerate = STARTING_AMOUNT + (round * CIRCLES_PER_ROUND);
        console.log(amountToGenerate)
        let gameCircles = Array.from({length: amountToGenerate}, () => Math.floor(Math.random() * NUMBER_OF_COLORS));
        this.setState({
            round: round,
            gameCircles: gameCircles,
            playerCircles: Array.from({length: amountToGenerate}, () => 0),
            playing: false
        });
        setTimeout(() => this.setState({playing: true}), this.state.gameSettings.timeCircle * 1000)
    }

    generateCircles(values) {
        return values.map(((val) => <Circle value={val} />));
    }

    generatePlayingCircles(values) {
        return values.map((val, index) => <PlayerCircle value={val} onClick={() => this.incrementPlayerCircle(index)} />)
    }

    incrementPlayerCircle = (index) => {
        let values = this.state.playerCircles
        let currentValue = values[index]
        values[index] = currentValue === (NUMBER_OF_COLORS - 1) ? 0 : currentValue + 1
        this.setState({
            playerCircles: values
        })
    }

    showAgain() {
        // Remove time from remaining time
        this.setState({
            playing: false,
            remainingTime: this.state.remainingTime - this.state.gameSettings.timePenalty * 1000
        })
        setTimeout(() => this.setState({playing: true}), this.state.gameSettings.timeCircle * 1000)
    }

    validate() {
        let gameVals = this.state.gameCircles;
        let playerVals = this.state.playerCircles;
        let round = this.state.round;
        if(gameVals.length === playerVals.length && gameVals.every(function(value, index) { return value === playerVals[index]})) {
            round++
        }
        this.startRound(round);
    }

    render() {
        return (
            <div>
                <div><b>ROUND {this.state.round + 1}</b></div>
                <div>{(this.state.remainingTime / 1000).toFixed(1)}</div>
                <ul>
                    {!this.state.playing ? this.generateCircles(this.state.gameCircles) : null}
                </ul>
                <ul>
                    {this.state.playing ? this.generatePlayingCircles(this.state.playerCircles) : null}
                </ul>
                <button onClick={() => this.showAgain()}>View again</button>
                <button onClick={() => this.validate()}>Ok</button>
            </div>
        )
    }
}

function Circle(props) {
    return <li><div className={`circle ${COLORS[props.value]}`}></div></li>
}

function PlayerCircle(props) {
    return <li><div onClick={props.onClick} className={`circle ${COLORS[props.value]}`}></div></li>
}

export default Game;
