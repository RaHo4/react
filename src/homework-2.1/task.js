import React, { Component } from "react";

const coffeeShop = () => {
  return class coffee extends Component {
    state = {
      good: 0,
      neutral: 0,
      bad: 0,
    };

    handleGoodButton = () => {
      this.setState({ good: this.state.good + 1 });
    };

    handleNeutralButton = () => {
      this.setState({ neutral: this.state.neutral + 1 });
    };

    handleBadButton = () => {
      this.setState({ bad: this.state.bad + 1 });
    };

    calculateTotalFeedback = () => {
      return this.state.bad + this.state.good + this.state.neutral;
    };

    render() {
      return (
        <>
          <h2>Please, leave your feedback</h2>
          <br></br>
          <button onClick={this.handleGoodButton}>Good</button>
          <button onClick={this.handleNeutralButton}>Neutral</button>
          <button onClick={this.handleBadButton}>Bad</button>
          <h2>Statistics</h2>
          {this.state.bad != 0 ||
          this.state.neutral != 0 ||
          this.state.good != 0 ? (
            <div>
              <div>Good: {this.state.good}</div>
              <div>Neutral: {this.state.neutral}</div>
              <div>Bad: {this.state.bad}</div>
              <div>Total: {this.calculateTotalFeedback()}</div>
              <div>
                Positive Feedback:{" "}
                {Math.round(
                  (this.state.good / this.calculateTotalFeedback()) * 100
                )}
                %
              </div>
            </div>
          ) : (
            <span>No feedback given</span>
          )}
        </>
      );
    }
  };
};

export default coffeeShop();
// const Stats = () => {
//     return (

//     )
// }
