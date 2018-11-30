import React, { Component } from 'react';
import api from '../../api';


class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: "",
      answers: [],
      visibility: "public",
      difficulty: "beginner",
      message: null,
      // const {deckId} = props.location.state
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.question, this.state.answers)
    let data = {
      question: this.state.question,
      answers: this.state.answers,
      difficulty: this.state.difficulty,
    }
    api.postCards(data, this.state.deckId)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          question: "",
          answers: "",
          difficulty: "",
          message: `Your card '${this.state.question}' has been created`
        })

        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  

  
  render() {   

    return (
      <div className="AddCard">
        <h2>New card</h2>
        <form>
          Question: <input type="text" value={this.state.question} onChange={(e) => { this.handleInputChange("question", e) }} /> <br />
          Answers: <input type="text" value={this.state.answers} onChange={(e) => { this.handleInputChange("answers", e) }} /> <br />
          <br />
          Difficulty:
          <select onChange={(e) => { this.handleInputChange("difficulty", e) }} value={this.state.difficulty}>
            <option value="beginner">beginner</option>
            <option value="advanced-beginner">advanced-beginner</option>
            <option value="experienced">experienced</option>
            <option value="expert">expert</option>
          </select>
          {/* Difficulty: <textarea value={this.state.difficulty} cols="30" rows="10" onChange={(e) => { this.handleInputChange("difficulty", e) }} ></textarea> <br /> */}
          <button onClick={(e) => this.handleClick(e)}>Create card</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }


  componentDidMount() {
    let id = this.props.match.params.deckId
    api.getDeckDetail(id)
      .then(deck => {
        this.setState({
          deckId: deck._id
        })
      })
  }

}





export default AddCard;
