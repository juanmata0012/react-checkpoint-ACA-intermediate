import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiPicture: "",
      apiTitle: "",
      apiExlplanation: "",
      apiResult: "",
    }
    this.state = {value: 'Pretty Good'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('You thought the Picture of Today was ' + this.state.value);
    event.preventDefault();
  }


  componentWillMount() {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=gWqPuLvkWkZRIaWFw76qxLLTsNlsJeYycY6wY2Ec')
      .then((response) => {
        console.log(response);
        this.setState({apiPicture: response.data.hdurl})
        this.setState({apiTitle: response.data.title})
        this.setState({apiExplanation: response.data.explanation})
      })
      .catch((error) => {
        console.log(error);
      });

    axios.post('https://posttestserver.com/post.php', 'Hello There')
      .then((res) => {
        console.log(res);
        this.setState({apiResult: res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="App">

        <div className="App-header">
          <div className="App-logo">
            <h1>NASA</h1>
          </div>
          <h2>Picture Of The Day</h2>
        </div>

        <div className="daily">
          <div>
            <img src={this.state.apiPicture} className="App-pic" alt="dailyPic" />
          </div>
          <div>
            <h2>{this.state.apiTitle}</h2>
            <p className="App-intro">
            {this.state.apiExplanation}
            </p>
          </div>
        </div>

        <div className="post">
          <form onSubmit={this.handleSubmit}>
            <label>
            The Picture of Today is:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="garbage">Garbage</option>
                <option value="meh">Meh</option>
                <option value="pretty good">Pretty good</option>
                <option value="the best thing ever!!">The best thing ever!!</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div>
          <p className="App-intro">
            {this.state.apiResult}
          </p>
        </div>

      </div>
    );
  }
}

export default App;
