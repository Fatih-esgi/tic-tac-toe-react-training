import styled from 'styled-components';


export const GameCaseStyle = styled.div`
/* background-color: #fff; */
font-size: 200%;
`
export const Container = styled.div`
.gameCaseWrapper{
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
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
`