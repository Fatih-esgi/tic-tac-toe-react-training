import { useEffect, useState } from "react";
import GameCase from "./GameCase";
import { Button, Container } from "./style";
import { motion } from "framer-motion";

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

  //start game
  useEffect(() => {
    initGameArray();
  }, [gameStarted]);

  //rules of game
  useEffect(() => {
    checkRules();
    console.log(playerTurn)
  }, [gameCases]);

  //check 1st 3 games winner
  useEffect(() => {
    checkGameWinner();
  }, [scoreP1, scoreP2]);

  //function init game array
  const initGameArray = () => {
    if (gameStarted === true) {
      let gameArray = [] as ICases[];
      for (let i = 0; i < 9; i++) {
        gameArray.push({ id: i, status: undefined });
      }
      setGameCases(gameArray);
      initPlayerTurn();
    } else {
      setGameCases([] as ICases[]);
      setScoreP1(0);
      setScoreP2(0);
    }
  };

  //function check if player has 3 win
  const checkGameWinner = () =>{
    if(scoreP1 === 3){
      alert("winner p1")
      setGameStarted(false);
    }
    else if( scoreP2 === 3){
      alert("winner p2")
      setGameStarted(false);
    }
  }

  //function init player turn
  const initPlayerTurn = () => {
    const getRandomInt = Math.floor(Math.random() * 2);
    setPlayerTurn(getRandomInt === 0 ? true : false);
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

        if (Object.keys(FilledCaseCount).length === 0) {
           initGameArray();
           return;
        }

        if (winArray.includes(undefined)) {
          return;
        }

        if (winArray.every((v) => v === winArray[0]) === false) {
          return;
        }

        const playerWin = winArray[0];
        alert(`${playerWin} win`);
        playerWin === "p1"
          ? setScoreP1((prev) => {
              return prev + 1;
            })
          : setScoreP2((prev) => {
              return prev + 1;
            });

        initGameArray();
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
    let NewCases = [...gameCases];
    let NewCase = { ...NewCases[id] };
    NewCase.status = playerTurn ? "p1" : "p2";
    NewCases[id] = NewCase;

    setGameCases(NewCases);
    setPlayerTurn(!playerTurn);
  };

  //animations
  const button = {
    hidden: { scale: 0, rotate: 0 },
    visible: { scale: 1, rotate: 357 },
  };
  return (
    <>
      {!gameStarted && (
        <Button
          as={motion.div}
          initial="hidden"
          animate="visible"
          transition={{ type: "spring", stiffness: 100, duration: 1 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.4 },
          }}
          whileTap={{ scale: 0.9 }}
          variants={button}
          className="btn"
          onClick={(e: any) => setGameStarted(true)}
        >
          Démarrer une partie
        </Button>
      )}
      {gameStarted && (
        <Container>
          <div className="scores">
            <p className={`${playerTurn === false ? "":"active"} score1`}>
              joueur 1 : <span>{scoreP1}</span>
            </p>
            <p className={`${playerTurn === true ? "":"active"} score2`}>
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
