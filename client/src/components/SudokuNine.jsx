import "./styles/SudokuNineStyle.css"

export const SudokuNine=()=>{

    const boardElement={}
    for(let i=1;i<10;i++){
        for(let j=1;j<10;j++){
            boardElement[`box${i}${j}`]=""
        }
    }

    const boardBoxes= Object.entries(boardElement).map(([key, value])=> {
            return(<input key={key} className="box" value={key}/>)
        })



    return(<>
        <h1>Sudoku 9x9</h1>
        <div className="playBoard">
        {boardBoxes}
        </div>
    </>)
}