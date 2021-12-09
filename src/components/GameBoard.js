import React from "react";
import Game from "./Game";
import './GameBoard.css'
import GameConfig from "./GameConfig";

class GameBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameStarted: false,
            gameSettings: {
                maxTime: null,
                timeCircle: null,
                timePenalty: null
            }
        }
        this.startGame = this.startGame.bind(this);
    }

    startGame(maxTime, timeCircle, timePenalty) { 
        this.setState({ 
            gameStarted: true,
            gameSettings: {
                maxTime: parseInt(maxTime),
                timeCircle: parseInt(timeCircle),
                timePenalty: parseInt(timePenalty)
            }
        });
    }

    endGame() {
        this.setState({ 
            gameStarted: false,
            gameSettings: {
                maxTime: null,
                timeCircle: null,
                timePenalty: null
            }
        });
    }

    getPlayground() {
        if (this.state.gameStarted)
            return <Game gameSettings={this.state.gameSettings} endGame={() => this.endGame()} />
        else return <GameConfig startGame={this.startGame} />
    }

    render() {
        return <div className="GameBoard">
            <h1>Memory Game</h1>
            <div className="container">
                {this.getPlayground()}
            </div>
        </div>
    }
}

export default GameBoard;