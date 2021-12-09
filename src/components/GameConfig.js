import React from "react";

class GameConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startGame: props.startGame,
            maxTime: null,
            timeCircle: null,
            timePenalty: null,
            formValid: false
        }
        this.startGame = this.startGame.bind(this);
    }

    handleMaxTime = (event) => {
        this.setState({ maxTime: event.target.value }, this.validateForm())
    }

    handleTimeCircle = (event) => {
        this.setState({ timeCircle: event.target.value }, this.validateForm())
    }

    handleTimePenalty = (event) => {
        this.setState({ timePenalty: event.target.value }, () => this.validateForm())
    }

    filterLetters = (event) => {
        if (/^([A-zÀ-ú$])$/.test(event.key)) {
            event.preventDefault();
        }
    }

    validateForm = () => {
        let state = this.state;
        if (state.maxTime != null && state.timeCircle != null && state.timePenalty != null) {
            this.setState({
                formValid: state.maxTime.length > 0 && state.timeCircle.length > 0 && state.timePenalty.length > 0
            });
        }
    }

    startGame() {
        this.state.startGame(this.state.maxTime, this.state.timeCircle, this.state.timePenalty)
    }

    render() {
        return (
            <form onSubmit={this.startGame}>
                <p>
                    <label>
                        Maximal Time for the Test (in ms) :
                        <input type="text" onKeyPress={this.filterLetters} onChange={this.handleMaxTime} />
                    </label>
                </p>
                <p>
                    <label>
                        Time before circles disapear (in ms) :
                        <input type="text" onKeyPress={this.filterLetters} onChange={this.handleTimeCircle} />
                    </label>
                </p>
                <p>
                    <label>
                        Time penalty when viewing again (in ms) :
                        <input type="text" onKeyPress={this.filterLetters} onChange={this.handleTimePenalty} />
                    </label>
                </p>
                <input type="submit" value="Send" disabled={!this.state.formValid} />
            </form>
        )
    }
}

export default GameConfig;
