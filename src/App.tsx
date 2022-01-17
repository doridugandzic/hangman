import { useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import { getRandomQuote, postScore } from './apiRequests/services';
import { IRandomQuote, IStoreData } from './model/model.gametypes';
import { start } from 'repl';
import Login from './components/login';
import Scoreboard from './components/scoreboard';
import { connect, Provider } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from './stuff/store';


interface IAppProps {
  storeData?: any
}


export function calcScores(timeToFinish: number, quoteLength: number, uniques: number, mistakes: number) {
  const finalScore = 100 / (1 + mistakes)
  return finalScore;
}



function App(props: IAppProps) {
  const [quote, setQuote] = useState({} as IRandomQuote);
  const [quoteSecret, setQuoteSecret] = useState("" as string);
  const [letter, setLetter] = useState("");
  const [filledVariables, setFilledVariables] = useState(false);
  const [usedLetter, setUsedLetter] = useState([] as any);

  const [inputVal, setInputVal] = useState("");
  const [enableInput, setEnableInput] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [uniques, setUniques] = useState([] as any)
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState(0 as any)
  const [endTime, setEndTime] = useState(0 as any);

  const [loginOpen, setLoginOpen] = useState(false);
  const [scoreboardOpen, setScoreboardOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  async function getQuote() {
    setUsedLetter([]);
    setEnableInput(true);
    let getQuote = await getRandomQuote()
    await setQuoteSecret(getQuote.content.replace(/[a-z]/gi, '_'))

    getQuote.content = getQuote.content.split("")
    await setQuote(getQuote);
    let unique = await [...new Set(getQuote.content)];
    setUniques(unique)
  }

  function timeToFinish() {
    return Math.floor(((startTime - endTime) / 1000) % 60);
  }

  function attemptResolve(letter: any) {
    usedLetter.push(letter as string);

    if (quote.content.includes(letter)) {
      revealLetter();
      setInputVal("")
      setEnableSubmit(true)
    } else {
      setMistakes(mistakes + 1);
      setInputVal("")
      setEnableSubmit(true)
    }

    var startDate = getDate();
    setStartTime(startDate)
  }

  function getDate() {
    let d: Date = new Date(Date.now());
    return d;
  }


  function setButton(letter: any) {
    if (usedLetter.includes(letter)) {
      setEnableSubmit(true);;
      setInputVal(letter);
      return;
    }

    setEnableSubmit(false);
    setInputVal(letter);
    if (quote.content.length > 0 && letter.length > 0) {
      setLetter(letter);
      setFilledVariables(true)
    } else setFilledVariables(false);
  }

  function revealLetter() {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var alph1 = alphabet.filter(val => !usedLetter.includes(val));
    let regex = new RegExp(alph1.join("|"), 'gi')
    let stringify = quote.content.join("");
    var quoteforthe5thtime = stringify.toLowerCase().replace(regex, '_');


    setQuoteSecret(quoteforthe5thtime)

    if (!quoteforthe5thtime.includes('_')) {
      var endDate = getDate();
      setEndTime(endDate)
      const timeToEnd: any = timeToFinish();
      calcScores(timeToEnd, quote.content.length, uniques.length, mistakes);
      setUsedLetter([]);
    }
  }



  function closeModal(modalId: string) {
    if (modalId === "login") {
      setLoginOpen(false)
    } else {
      setScoreboardOpen(false)
    }
  }

  function postToScoreboard() {
    const result = {
      quoteId: quote._id,
      length: quote.content.length,
      uniqueCharacters: uniques.length,
      userName: props.storeData.actions.userName,
      errors: mistakes,
      duration: timeToFinish()
    }
    postScore(result);
  }

  return (
    <div className="App">
      <header className="App-header"><button onClick={() => setLoginOpen(true)}>open login</button>
        <button onClick={() => setScoreboardOpen(true)}>open scoreboard</button>
        <Modal
          style={customStyles}
          isOpen={props.storeData.actions.userName === "" ? true : loginOpen}>
          <Login closeModal={closeModal} />
        </Modal>
        <Modal
          style={customStyles}
          isOpen={scoreboardOpen}>
          <Scoreboard closeModal={closeModal} />
        </Modal>
        <h1>Dori's hangman</h1>
        <h6>Who hasn't bothered to make decent styling</h6>
        <button onClick={() => getQuote()}>{(quote.length === 0) ? "Replace quote!" : "Get quote!"}</button>
        <div>{quoteSecret}</div>
        <div>{quote.content}</div>
        <div>
          Take your guess here:
          <input type={"text"} disabled={!enableInput} value={inputVal} maxLength={1} onChange={(e) => setButton(e.target.value.toLowerCase())}></input>
          <button disabled={!filledVariables || enableSubmit} onClick={() => attemptResolve(letter)}>Check letter</button>
        </div>
        <h1>Error counter {mistakes}</h1>
        {endTime > 0 ? <button onClick={() => postToScoreboard()}>Post your score!</button> : ""}
      </header>
    </div>
  );
}
const MapStateToProps = (store: AppState) => {
  return {
    storeData: store
  };
};


const MapDispatchToProps = (dispatch: Dispatch) => {
  return {

  }
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(App);
