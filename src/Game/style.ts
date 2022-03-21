import styled from "styled-components";

export const Button = styled.button`
  /* background-color: #fff; */
  padding: 10px 20px;
  font-family: "Permanent Marker", cursive;
  font-size: 30px;
  background-color: transparent;
  border: 3px solid;
  transform: rotate(4deg);
  cursor: pointer;
`;
export const GameCaseStyle = styled.div`
  /* background-color: #fff; */
  font-size: 200%;
`;
export const Container = styled.div`
.gameCaseWrapper{
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

    .blue{color:#0786ca}
    .red{color:#c01c1c}
&:nth-child(2) { 
    border-right:2px solid;
    border-left:2px solid;
}
&:nth-child(5) { 
    border:2px solid ;
}
&:nth-child(8) { 
    border-right:2px solid ;
    border-left:2px solid ;
}
&:nth-child(4),&:nth-child(6) { 
    border-top:2px solid ;
    border-bottom:2px solid;
}

}
.scores{
    display:flex; 
    justify-content: space-between;

    .score1{color:#0786ca}
    .score2{color:#c01c1c}
}
.gameBoard{
    margin-top:3rem;
    height:40vw ;
    width:40vw ;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    
  }
}
`;
