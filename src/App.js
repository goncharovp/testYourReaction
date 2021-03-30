import React from 'react';
import './App.css';

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
        this.getGreen = this.getGreen.bind(this)
        this.getRed = this.getRed.bind(this)
        this.submitAndContinue = this.submitAndContinue.bind(this)
    }
    
    
getGreen() {
   
  const time = getRandomInt(1000,5000)

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

    render() {
        return (
            <div className="App">
                <Header />
                <StartButton onClick = {this.getGreen} avgResult = {this.state.avgResult}/>
                {this.state.result !== '' && <ContinueButton onClick = {this.submitAndContinue}/>}
                <ReactZone onClick = {this.getRed} color = {this.state.color} />
                {this.state.result !== '' && <ResultZone result = {this.state.result}/>}
                {this.state.avgResult.length !== 0 && <Results avgResult = {this.state.avgResult}/>}
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
        {this.props.result + "ms"}
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