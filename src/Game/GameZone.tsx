import { useEffect, useState } from "react";
import GameCase from "./GameCase";
import { Container } from "./style";

export interface ICases {
  id: number;
  status: undefined | string;
}

const GameZone = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCases, setGameCases] = useState([] as ICases[]);
  const [playerTurn, setPlayerTurn] = useState<boolean>();
  const [scoreP1, setScoreP1] = useState(0);
  const [scoreP2, setScoreP2] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  //start game
  useEffect(() => {
    initGameArray();
  }, [gameStarted]);
  
  //rules of game
  useEffect(() => {
    checkRules();
  }, [gameCases]);
  
  //function init game array
  const initGameArray = () => {
    if (gameStarted === true) {
      let gameArray = [] as ICases[];
      for (let i = 0; i < 9; i++) {
        gameArray.push({ id: i, status: undefined });
      }
      return setGameCases(gameArray);
    } else {
      setGameCases([] as ICases[]);
    }
  };
  
  //function init player turn
  const initPlayerTurn = () => {
    const getRandomInt = Math.floor(Math.random() * 2);
    setPlayerTurn(getRandomInt === 0 ? true : false);
    alert(`${getRandomInt === 0 ? "player1 begin" : "player2 begin"}`)
  };
  
  //function games rules
  const checkRules = () => {
    if (gameStarted === true) {
      const winCondition = (x: number, y: number, z: number) => {
        const winArray = [
          gameCases[x]?.status,
          gameCases[y]?.status,
          gameCases[z]?.status,
        ];
        
        const FilledCaseCount = gameCases.filter((obj) => {
          return obj.status === undefined;
        });
        
        console.log("filled", FilledCaseCount);
        if (Object.keys(FilledCaseCount).length === 0) {
          initGameArray();
        }
        
        if (winArray.includes(undefined)) {
          return;
        }
        
        if (winArray.every((v) => v === winArray[0]) === false) {
          return;
        }
        
        const playerWin = winArray[0];
        alert(`${playerWin} has win`);
        playerWin === "p1" ?(
          setScoreP1(prev =>{return prev +1})
          
          ):(
            setScoreP2(prev =>{return prev +1})
            
            )
            initGameArray();
            initPlayerTurn();
          };
      winCondition(0, 1, 2);
      winCondition(3, 4, 5);
      winCondition(6, 7, 8);
      winCondition(0, 3, 6);
      winCondition(1, 4, 7);
      winCondition(2, 5, 8);
      winCondition(0, 4, 8);
      winCondition(2, 4, 6);
    }
  };

  const handleCaseClick = (id: number) => {
    if (gameCases[id].status !== undefined) {
      return;
    }
    setPlayerTurn(!playerTurn);
    let NewCases = [...gameCases];
    let NewCase = { ...NewCases[id] };
    NewCase.status = playerTurn ? "p1" : "p2";
    NewCases[id] = NewCase;

    setGameCases(NewCases);
  };
  return (
    <>
      {!gameStarted && (
        <button onClick={(e) => setGameStarted(true)}>
          Démarrer une partie
        </button>
      )}
      {gameStarted && (
        <Container>
          <div className="scores">
            <p>
              joueur 1 : <span>{scoreP1}</span>
            </p>
            <p>
              joueur 2 : <span>{scoreP2}</span>{" "}
            </p>
          </div>
          <div className="gameBoard">
            {gameCases.map((gameCase: ICases) => {
              return (
                <div
                  className="gameCaseWrapper"
                  key={gameCase.id}
                  onClick={(e) => handleCaseClick(gameCase.id)}
                >
                  <GameCase gameCase={gameCase} />
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
};

export default GameZone;
