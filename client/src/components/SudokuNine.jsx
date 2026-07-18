import "./styles/SudokuNineStyle.css"

export const SudokuNine=()=>{

    const boardElement=[]
    for(let i=1;i<10;i++){
        const row=[]
        for(let j=1;j<10;j++){
            row.push("")
        }
        boardElement.push(row)
    }

    const boardBoxes= boardElement.map((row, rIndex)=> row.map((num, cIndex)=>{
        return(<input key={`${rIndex}${cIndex}`} 
                      className="box"
                      value={`${rIndex}${cIndex}`}/>)
    }))



    return(<>
        <h1>Sudoku 9x9</h1>
        <div className="playBoard">
        {boardBoxes}
        </div>
    </>)
}