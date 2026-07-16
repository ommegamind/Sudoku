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

    const boxClickHandle=(boxName)=>{
        if(boxName in puzzle) return
        setInUse(boxName)
    }

    const boxInputHandle =(e)=>{
        const input =e.target.value

        if (/^[1-9]?$/.test(input)){
            setBoard((prev)=>{return {...prev, [inUse]:[input]}})
        }
    }

    const resetHandle=()=>{
        setBoard({...boxes})
        setInUse("")
    }

    const newGameHandle=()=>{
        resetHandle()
        const finalBoard=randomNumSetHandle()
        setPuzzle(finalBoard)
        setBoard((prev)=>{
            return{...prev,
                ...finalBoard
            }
        })
    }

    return(<>
    <h2>Sudoku</h2>
    <div className="board">
        <div className="row">
            <input className={`box ${inUse=="box1"?'selected':""}`} onClick={()=>boxClickHandle("box1")} value={board.box1} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box2"?'selected':""}`} onClick={()=>boxClickHandle("box2")} value={board.box2} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box3"?'selected':""}`} onClick={()=>boxClickHandle("box3")} value={board.box3} onChange={boxInputHandle}/>
        </div>
        <div className="row">
            <input className={`box ${inUse=="box4"?'selected':""}`} onClick={()=>boxClickHandle("box4")} value={board.box4} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box5"?'selected':""}`} onClick={()=>boxClickHandle("box5")} value={board.box5} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box6"?'selected':""}`} onClick={()=>boxClickHandle("box6")} value={board.box6} onChange={boxInputHandle}/>
        </div>
        <div className="row">
            <input className={`box ${inUse=="box7"?'selected':""}`} onClick={()=>boxClickHandle("box7")} value={board.box7} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box8"?'selected':""}`} onClick={()=>boxClickHandle("box8")} value={board.box8} onChange={boxInputHandle}/>
            <input className={`box ${inUse=="box9"?'selected':""}`} onClick={()=>boxClickHandle("box9")} value={board.box9} onChange={boxInputHandle}/>
        </div>
    </div>
    <div>
        <button onClick={newGameHandle}>New Game</button>
        <button onClick={resetHandle}>Clear</button>
    </div>
    </>)
}
