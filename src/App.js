import React from 'react';
import logo from './logo.svg';
import Moneyboard from './Moneyboard';
import Offerboard from './Offerboard';
import Cases from './Cases';
import './App.css';
import './bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      vals: [{val: .01, picked: false}, {val: 1, picked: false},
      {val: 5, picked: false}, {val: 10, picked: false},
      {val: 25, picked: false}, {val: 50, picked: false},
      {val: 75, picked: false}, {val: 100, picked: false}, 
      {val: 200, picked: false}, {val: 300, picked: false},
      {val: 400, picked: false}, {val: 500, picked: false},
      {val: 750, picked: false}, {val: 1000, picked: false},
      {val: 5000, picked: false}, {val: 10000, picked: false},
      {val: 25000, picked: false}, {val: 50000, picked: false},
      {val: 75000, picked: false}, {val: 100000, picked: false},
      {val: 200000, picked: false}, {val: 300000, picked: false},
      {val: 400000, picked: false}, {val: 500000, picked: false},
      {val: 750000, picked: false}, {val: 1000000, picked: false}
      ],
      cases: [
      ],
      currentOffer: 0,
      prevOffer: 0,
      finalOffer: 0,
      round: 1,
      casesToPick: 6,
      msg: 'Choose a case to begin',
      caseLock: '',
      myCase: {val: 0, picked: false, index: -1},
      gameEnd: false


    };
  
    var valcopy = this.state.vals.slice();
    
    var i = 0;

    while (this.state.cases.length !== 26)
    {
      
      var randIndex = getRandomInt(0, valcopy.length);

      valcopy[randIndex].index = i;
      this.state.cases.push(valcopy[randIndex]);
      valcopy.splice(randIndex, 1);


      i++;
    }  
    // Code reference to vals in order?

    this.handleCaseSelect = this.handleCaseSelect.bind(this);
    this.handleDeal = this.handleDeal.bind(this);
    this.getDeal = this.getDeal.bind(this);

    console.log(this.state.cases);
  }

  getDeal(round){
    var big = 0, small = 0, deal = undefined;

    this.state.cases.map(function(item, i){
      if (item.picked === false && item.val < 100000)
        small += item.val;
      else if (item.picked === false && item.val >= 100000)
        big += item.val;
      else;
        
      return 0;
    });

    if (round === 1)
      deal = (.0077 * big) + (.07 * small);
    else if (round === 2)
      deal = (.0144 * big) + (.09 * small);
    else if (round === 3)
      deal = (.0273 * big) + (.13 * small);
    else if (round === 4)
      deal = (.0442 * big) + (.17 * small);
    else if (round === 5)
      deal = (.062 * big) + (.2 * small);
    else if (round === 6)
      deal = (.1025 * big) + (.25 * small);
    else if (round === 7)
      deal = (.1683 * big) + (.33 * small);
    else if (round === 8)
      deal = (.305 * big) + (.5 * small);
    else if (round === 9)
      deal = (.355 * big) + (.5 * small);

      
    return deal;

  }

  handleCaseSelect(i){

    let cases = [...this.state.cases];

    if (this.state.casesToPick === 0 || this.state.gameEnd)
    {
    
      return;

    }

    else if (this.state.myCase.index === -1)
    {
      this.setState((prevState, props) => ({myCase: prevState.cases[i], msg: 'Pick ' + prevState.casesToPick + ' cases' }));
      
    }
    else if (this.state.round === 10)
    {
      if (this.state.finalOffer === 0)
        if (i === this.state.myCase.index)
        {
          this.setState((prevState, props) => ({finalOffer: prevState.myCase.val, round: prevState.round + 1}));
          cases.map((item, ind)=>{

            if (item.index !== this.state.myCase.index) item.picked = true
            else return;

           });
        }
        else
        {
          this.setState((prevState, props) => ({finalOffer: prevState.cases[i].val, round: prevState.round + 1}));
          //cases[i].picked = true;
          cases[this.state.myCase.index].picked = true;
        }
      else ;

      this.setState((prevState, props) => ({msg: 'Your final prize is ' + prevState.finalOffer, gameEnd: true}));

    } 
    else if (this.state.myCase !== this.state.cases[i] && this.state.cases[i].picked === false)
    {
      cases[i].picked = true;
      this.setState((prevState, props)=>({casesToPick: prevState.casesToPick - 1}));

      if (this.state.casesToPick === 1)
      {
        //
        this.setState((prevState, props)=>({currentOffer: this.getDeal(prevState.round).toFixed(2)}));
        this.setState((prevState, props)=>({msg: 'Your current offer is ' + prevState.currentOffer}));

        
      }
      else
        this.setState((prevState, props)=>({msg: 'Pick ' + prevState.casesToPick + ' cases'}));


    }
    else;
    // If casesToPick is 0 at this point, lock case picking until offer is considered, then change round and unlock

    this.setState((prevState, props) => ({cases}));    
  }


  handleDeal(i){

    if (this.state.gameEnd) return;
    else if (this.state.casesToPick === 0)
    {
      if (i && this.state.finalOffer == 0)
          this.setState((prevState, props) => ({finalOffer: prevState.currentOffer, msg: (<div>Your final prize is {prevState.currentOffer} <br /> Would you like to play out the rest of the game?</div>)}));

      else
      {
        if (this.state.round === 1)
          this.setState((prevState, props)=>({casesToPick: prevState.casesToPick + 5}));
        else if (this.state.round === 2)
          this.setState((prevState, props)=>({casesToPick: prevState.casesToPick + 4}));
        else if (this.state.round === 3)
          this.setState((prevState, props)=>({casesToPick: prevState.casesToPick + 3}));
        else if (this.state.round === 4)
          this.setState((prevState, props)=>({casesToPick: prevState.casesToPick + 2}));
        else
          this.setState((prevState, props)=>({casesToPick: prevState.casesToPick + 1}));


        console.log(this.state.round);

        this.setState((prevState, props) => ({round: prevState.round + 1, prevOffer: prevState.currentOffer}));

        if (this.state.round !== 9)
          this.setState((prevState, props)=>({msg: 'Pick ' + prevState.casesToPick + ' cases to eliminate'}));
        else
          this.setState((prevState, props) => ({msg: 'Choose which case to keep:'}));
      }
    }
    else return;
  }

  render(){
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs={7} style={{ display: 'flex', 
            alignItems: 'center', marginTop: '5vh'
            }}>
              <Offerboard msgs={this.state.msg} casesLeft={this.state.casesToPick} dealOrNoDeal={this.handleDeal}/>
            </Col>
            <Col xs={5} style={{ marginTop: '5vh' }}>
              <Moneyboard vals={this.state.vals}/>
            </Col>
            <Col xs={12} style={{ marginTop: '5vh' }}>
              <Cases cases={this.state.cases} onCaseSelect={this.handleCaseSelect} myCase={this.state.myCase} round={this.state.round}/>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default App;
