import { useState } from "react"
import "./styles/SudokuPageStyle.css"

export const SudokuPage =()=>{

    const randomNumSetHandle=()=>{
        const nums=new Set()
        while(nums.size<9){
            nums.add(Math.floor(Math.random()*9)+1)
        }
        const numsArray=[...nums]

        const tips=Math.floor(Math.random()*4)+1

        const boardIndex=[]
        while(boardIndex.length<=tips){
            boardIndex.push(Math.floor(Math.random()*9)+1)
        }
        
        const finalBoard={}
        for(let i=0; i<=tips; i++){
            finalBoard[`box${boardIndex[i]}`]=numsArray[boardIndex[i]-1]
        }

        return finalBoard
    }

    const boxes={
        "box1":"",
        "box2":"",
        "box3":"",
        "box4":"",
        "box5":"",
        "box6":"",
        "box7":"",
        "box8":"",
        "box9":""
    }
    const [inUse, setInUse]=useState("")
    const [board, setBoard]=useState({...boxes})
    const [puzzle, setPuzzle]=useState("")
    const [result, setResult]=useState("in game")

    const boxClickHandle=(boxName)=>{
        if(boxName in puzzle) return
        setInUse(boxName)
    }

    const boxInputHandle =(e)=>{
        if(e.target.id in puzzle) return
        const input =e.target.value

        if (/^[1-9]?$/.test(input)){
            setBoard((prev)=>{return {...prev, [inUse]:input}})
        }
    }

    const resetHandle=()=>{
        setBoard(()=>{
            return{...boxes, ...puzzle}
        })
        setInUse("")
    }

    const newGameHandle=()=>{
        const finalBoard=randomNumSetHandle()
        setPuzzle(finalBoard)
        setBoard({...boxes, ...finalBoard})
    }
    
    const submitHandle=()=>{
        const checkSet = new Set()
        for(const[key, val] of Object.entries(board)){
            checkSet.add(val)
        }
        if(checkSet.size<8){
            setResult("Not Solved")
            return
        }
        setResult("Solved")
    }

    return(<>
    <h2>Sudoku</h2>
    <div className="board">
        <div className="row">
            <input className={`box ${inUse=="box1"?'selected':""}`} id="box1" onClick={()=>boxClickHandle("box1")} value={board.box1} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box2"?'selected':""}`} id="box2" onClick={()=>boxClickHandle("box2")} value={board.box2} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box3"?'selected':""}`} id="box3" onClick={()=>boxClickHandle("box3")} value={board.box3} onChange={boxInputHandle}/>
        </div>
        <div className="row">
            <input className={`box ${inUse=="box4"?'selected':""}`} id="box4" onClick={()=>boxClickHandle("box4")} value={board.box4} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box5"?'selected':""}`} id="box5" onClick={()=>boxClickHandle("box5")} value={board.box5} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box6"?'selected':""}`} id="box6" onClick={()=>boxClickHandle("box6")} value={board.box6} onChange={boxInputHandle}/>
        </div>
        <div className="row">
            <input className={`box ${inUse=="box7"?'selected':""}`} id="box7" onClick={()=>boxClickHandle("box7")} value={board.box7} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box8"?'selected':""}`} id="box8" onClick={()=>boxClickHandle("box8")} value={board.box8} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box9"?'selected':""}`} id="box9" onClick={()=>boxClickHandle("box9")} value={board.box9} onChange={boxInputHandle}/>
        </div>
    </div>
    <div>
        <button onClick={newGameHandle}>New Game</button>
        <button onClick={resetHandle}>Clear</button>
        <button onClick={submitHandle}>Submit</button>
        <br />
        <h2>Result: {result}</h2>
    </div>
    </>)
}
