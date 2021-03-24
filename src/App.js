import React from 'react';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            green : false,
            yellow : false,
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
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  const time = getRandomInt(1000,10000)

  this.setState ({
    startTime: new Date(),
    rndTime: time,
    color: "yellow"
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
  } 
  

  
}
    render() {
      const tooEarly = <h1>Слишком рано!</h1>
      const yourTime = <h1>{this.state.result + "ms"}</h1>
        return (
            <div className="App">
                <h1>Проверь свою реакцию!</h1>
                <br />
                <button onClick = {this.getGreen}>
                  Старт!
                </button>
                <div 
                className ={this.state.color === "red" ? "red" : this.state.color === "yellow" ? "yellow" : "green"}
                onClick = {this.getRed}
                >

                </div>
                <div>
                  <h1>
                    { this.state.color === "yellow" ? tooEarly : this.state.color === "green" ? yourTime : yourTime}
                  </h1>
                </div>
                <div>
                  <p>
                    После нажатия кнопки "Старт!", поле, в какой-то момент, поменяет цвет на зеленый. Задача - как можно быстрее на него нажать и получить свое время реакции в милисекундах! <br />
                    Для следующей попытки нажми кнопку "Старт!" еще раз.
                  </p>
                </div>
            </div>
        );
    }
}

export default App;