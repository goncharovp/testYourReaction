import React from 'react';
import './App.css';
import mylogo from './mylogosmall.png';



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function sum() {
  let sum = 0;
   for (let i=0; i<arguments.length; i++) {
    sum += arguments[i];
   }
   return sum;
  }

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            color: "red",
            startTime: null,
            rndTime: null,
            result: '',
            avgResult: []
        }
        this.getGreen = this.getGreen.bind(this);
        this.getRed = this.getRed.bind(this);
        this.submitAndContinue = this.submitAndContinue.bind(this);
        this.getYourResult = this.getYourResult.bind(this);
    }
    
    
getGreen() {
   
  const time = getRandomInt(1000,2000)

  this.setState ({
    startTime: new Date(),
    rndTime: time,
    color: "yellow",
    result: "",
    avgResult:[]
  })


  setTimeout(
    () => this.setState({
      color: "green"
    }), time
  );
};



getRed() {
  if (this.state.color === "yellow") {
    this.setState ({
      result: "Слишком рано!",
    })
  } else {
    if (this.state.color !== "red") {
      this.setState({
        color: "red",
        result: new Date() - this.state.startTime - this.state.rndTime,
      });
    }
  }; 
};

submitAndContinue() {
  this.state.avgResult.splice(this.state.avgResult.length,0,this.state.result)
   
  const time = getRandomInt(1000,5000)

  this.setState ({
    startTime: new Date(),
    rndTime: time,
    color: "yellow",
    result: "",
  })


  setTimeout(
    () => this.setState({
      color: "green"
    }), time
  );
};

getYourResult() {
  this.state.avgResult.splice(this.state.avgResult.length,0,this.state.result)

  this.setState({
    color: "red"
  })
}

    render() {
        return (
            <div className="App">
                <Logo />
                <StartButton onClick = {this.getGreen} avgResult = {this.state.avgResult}/>
                {this.state.avgResult.length < 4 && this.state.result !== '' && <ContinueButton onClick = {this.submitAndContinue}/>}
                {this.state.avgResult.length === 4 && <ResultButton onClick = {this.getYourResult} />}
                <ReactZone onClick = {this.getRed} color = {this.state.color} />
                {this.state.avgResult.length < 5 && this.state.result !== '' && <ResultZone result = {this.state.result}/>}
                {this.state.avgResult.length !== 0 && <Results avgResult = {this.state.avgResult}/>}
                <Instruction />
            </div>
        );
    }
}

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img className = "Logo" src={mylogo} alt ='logo'/>
      </div>
    )
  }
}

class Header extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className = 'header'>
      <h1>Проверь свою реакцию!</h1>
      </div>
    )
  }
}

class StartButton extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
    <button onClick = {this.props.onClick}>
      {this.props.avgResult.length !== 0 ? "Заново" : "Старт!"}
      </button>
      </div>
    )
  }
}

class ContinueButton extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
      <button onClick = {this.props.onClick}>
        Далее
      </button>
      </div>
    )
  }
}

class ResultButton extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <button onClick = {this.props.onClick}>
          Узнать результат!
        </button>
      </div>
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
        {this.props.result === "Слишком рано!" ? this.props.result : this.props.result + "ms"}
        </h1>
        </div>
    )
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h2>{this.props.avgResult.length === 5 ? "Ваш средний результат: " + this.props.avgResult.reduce((total, amount) => total + amount) /5 + "ms" : "Ваши результаты: " + this.props.avgResult.join('ms, ') + 'ms'}</h2>
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
    <div className = "Instruction">
      <p>
        После нажатия кнопки "Старт!", поле, в какой-то момент, поменяет цвет на зеленый. Задача - как можно быстрее на него нажать и получить свое время реакции в милисекундах! <br />
        У Вас будет 5 попыток, после которых, Вы получите среднее время реакции! <br />
        Для следующей попытки нажми кнопку "Далее", для того, чтобы начать заново - нажминет кнопку "Заново".
        </p>
        </div>
    )
  }
}

export default App;