import { ICases } from "./GameZone";
import {GameCaseStyle} from "./style"

interface Props{
    gameCase:ICases;
}
const GameCase = ({gameCase}:Props) => {

    let value = "";
    switch (true) {
        case gameCase.status === "p1":
            value="X"
            break;
        case gameCase.status === "p2":
            value="O"
            break;
    
        default:
            value="";
            break;
    }
    return(
        <GameCaseStyle className={value === "X" ? "blue":"red"}>
{value}
        </GameCaseStyle>
    )
}
export default GameCase;