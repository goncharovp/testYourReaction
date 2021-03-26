import React from 'react';
import './App.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            color: "red",
            startTime: null,
            tooEarly: null,
            rndTime: null,
            result: 0
        }
        this.getGreen = this.getGreen.bind(this)
        this.getRed = this.getRed.bind(this)
    }
    
    
getGreen() {
  
  
  const time = getRandomInt(1000,10000)

  this.setState ({
    startTime: new Date(),
    rndTime: time,
    color: "yellow",
    result: 0
  })


  setTimeout(
    () => this.setState({
      color: "green"
    }), time
  );
}

getRed() {
  if (this.state.color === "green") {
    this.setState({
      color: "red"
    });
    this.setState({
      result: new Date() - this.state.startTime - this.state.rndTime
    })
  } ;
  
  

  
}
    render() {
        return (
            <div className="App">
                <Header />
                <StartButton onClick = {this.getGreen}/>
                <ReactZone onClick = {this.getRed} color = {this.state.color} />
                <ResultZone result={this.state.result} color={this.state.color}/>
                <Instruction />
            </div>
        );
    }
}

class Header extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <h1>Проверь свою реакцию!</h1>
    )
  }
}

class StartButton extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
    <button onClick = {this.props.onClick}>
      Старт!
      </button>
    )
  }
}

class ReactZone extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div 
                className ={this.props.color === "red" ? "red" : this.props.color === "yellow" ? "yellow" : "green"}
                onClick = {this.props.onClick}
                >
                </div>
    )
  }
}

class ResultZone extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
    <div>
      <h1>
        { this.props.color === "yellow" ? <h1>Слишком рано!</h1> : this.props.color === "green" ? <h1>{this.props.result + "ms"}</h1> : <h1>{this.props.result + "ms"}</h1>}
        </h1>
        </div>
    )
  }
}

class Instruction extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
    <div>
      <p>
        После нажатия кнопки "Старт!", поле, в какой-то момент, поменяет цвет на зеленый. Задача - как можно быстрее на него нажать и получить свое время реакции в милисекундах! <br />
        Для следующей попытки нажми кнопку "Старт!" еще раз.
        </p>
        </div>
    )
  }
}

export default App;