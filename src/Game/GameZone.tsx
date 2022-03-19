import { useEffect, useState } from "react";
import GameCase from "./GameCase";
import { Container } from "./style";

export interface ICases {
  id: number;
  status: string;
}

const GameZone = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCases, setGameCases] = useState([] as ICases[]);
  const [playerTurn, setPlayerTurn] = useState<boolean>();
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [gameEnded, setGameEnded] = useState(false);

  //start game
  useEffect(() => {
    initGameArray();
    initPlayerTurn();
    initRules();
  }, [gameStarted]);

  //rules of game
  useEffect(() => {
    initRules();
  }, [gameCases]);

  //function init game array
  const initGameArray = () => {
    if (gameStarted === true) {
      let gameArray = [] as ICases[];
      for (let i = 0; i < 9; i++) {
        gameArray.push({ id: i, status: "" });
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
  };

  //function games rules
  const initRules = () => {
    if (gameStarted === true) {
      const winCondition = (x: number, y: number, z: number) => {
        const winArray = [
          gameCases[x]?.status,
          gameCases[y]?.status,
          gameCases[z]?.status,
        ];

        const allEqual = (winArray:string[]):boolean => {
          if (Object.values(winArray).every(x => ( x === '')) === true) {
            return  false;
          }else{
            return winArray.every(v => 
              v === winArray[0]
              );
            }
        };
        return allEqual(winArray);
      };

      // console.log(winCond1)
      //if case 0 1 2 same value
      winCondition(0, 1, 2);
      //if case 3 4 5 same value
      //if case 6 7 8 same value
      //if case 0 3 6 same value
      //if case 1 4 7 same value
      //if case 2 5 8 same value
      //if case 0 4 8 same value
      //if case 2 4 6 same value

      //check if all cases filed without Winner
      const FilledCaseCount = gameCases.filter((obj) => {
        return obj.status === "";
      });

      if (Object.keys(FilledCaseCount).length === 0) {
        initGameArray();
      }
    }
  };

  const restartGame = () => {
    initGameArray();
  };
  // initRules
  //init PlayerTurn

  //initScores

  //initGameRules

  // console.log(Object.keys(FilledCaseCount).length)

  // check

  const handleCaseClick = (id: number) => {
    if (gameCases[id].status !== "") {
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
              joueur 1 : <span>0</span>
            </p>
            <p>
              joueur 2 : <span>0</span>{" "}
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
