import { useState } from "react"
import "./styles/SudokuPageStyle.css"

export const SudokuPage =()=>{

    const [inUse, setInUse]=useState("")

    const boxClickHandle=(boxName)=>{
        setInUse(boxName)
    }

    return(<>
    <h2>Sudoku</h2>
    <div className="board">
        <div className="row">
            <div className={`box ${inUse=="box1"?'selected':""}`} id="box1" onClick={()=>boxClickHandle("box1")}></div>
            <div className={`box ${inUse=="box2"?'selected':""}`} id="box2" onClick={()=>boxClickHandle("box2")}></div>
            <div className={`box ${inUse=="box3"?'selected':""}`} id="box3" onClick={()=>boxClickHandle("box3")}></div>
        </div>
        <div className="row">
            <div className={`box ${inUse=="box4"?'selected':""}`} id="box4" onClick={()=>boxClickHandle("box4")}></div>
            <div className={`box ${inUse=="box5"?'selected':""}`} id="box5" onClick={()=>boxClickHandle("box5")}></div>
            <div className={`box ${inUse=="box6"?'selected':""}`} id="box6" onClick={()=>boxClickHandle("box6")}></div>
        </div>
        <div className="row">
            <div className={`box ${inUse=="box7"?'selected':""}`} id="box7" onClick={()=>boxClickHandle("box7")}></div>
            <div className={`box ${inUse=="box8"?'selected':""}`} id="box8" onClick={()=>boxClickHandle("box8")}></div>
            <div className={`box ${inUse=="box9"?'selected':""}`} id="box9" onClick={()=>boxClickHandle("box9")}></div>
        </div>
    </div>
    </>)
}
