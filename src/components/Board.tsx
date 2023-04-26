import { Button, Card, Container, Row } from "react-bootstrap"
import { Cell }  from "./Cell"
import { useState, useEffect } from "react"
import { Keyboard } from "./Keyboard"

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const arrowMap = new Map<string,number>();
arrowMap.set("ArrowUp", -9)
arrowMap.set("ArrowDown", 9)
arrowMap.set("ArrowRight", 1)
arrowMap.set("ArrowLeft", -1)

type BoardProps = {
    newBoard : string[]
}

export function Board({newBoard}: BoardProps) {
    const [board, setBoard] = useState<string[]>(newBoard)
    const [selectedCell, setSelectedCell] = useState("")
    const [won, setWon] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState("")
    const [selectedRow, setSelectedRow] = useState("")
    const [selectedCol, setSelectedCol] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        document.addEventListener('keydown', keyDownEvent)
        return () => document.removeEventListener('keydown', keyDownEvent)
    }, [selectedCell, error])

    const keyDownEvent = (event: any) => {
        changeValue(event.key)
    }

    const changeValue = (id: string) =>{
        if (selectedCell === ""){
            return
        }        
        if (won){
            return
        }
        if (arrowMap.has(id) && error === ""){
            const temp = parseInt(selectedCell) + arrowMap.get(id)!;
            if (temp >= 0 && temp < 81){
                const col = (temp%9)
                const row = Math.floor(temp /9)
                setSelectedCell((temp).toString())
                setSelectedCol(col.toString())
                setSelectedRow(row.toString())
                setSelectedGroup((Math.floor((row)/3)*3 + Math.floor((col)/3)).toString())
            }
        }
        if (newBoard[parseInt(selectedCell)] !== "0")
        {
            return
        }
        if (id === "Backspace"){
            setBoard((board) => ({ ...board, [selectedCell]: "0"}))
        }
        if (!keys.includes(id)){
            return
        }
            setBoard((board) => ({ ...board, [selectedCell]: id}))
        
    }

    useEffect(() => {
        if (selectedCell !== "")
        checkError();
        checkWin();
    }, [board])

    const handleKeyboard = (e: React.MouseEvent<HTMLElement>) =>{
        const id = e.currentTarget.id
        e.currentTarget.blur()
        changeValue(id)
    }

    const handleCellClick = (e: React.MouseEvent<HTMLElement>) => {
        if (error !== "" || won){
            return
        }

        const id = e.currentTarget.id;
        const values = id.split(",")

        if (selectedCell === values[0]){
            setSelectedCell("");
            setSelectedGroup("");
            setSelectedRow("");
            setSelectedCol("");
            return
        }

        setSelectedCell(values[0]);
        setSelectedGroup(values[3]);
        setSelectedRow(values[1]);
        setSelectedCol(values[2]);
    }

    function checkError() {
        let set = new Set()
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const value = board[i*9+j]
                if (value !== "0") {
                    const row = `${value} at row ${i}`
                    const column = `${value} at column ${j}`
                    const box = `${value} at box ${Math.floor(i/3)}, ${Math.floor(j/3)}`
                    if (set.has(row) || set.has(column) || set.has(box)) {
                        setError(selectedCell)
                        return false
                    } else {
                        set.add(row)
                        set.add(column)
                        set.add(box)
                    }
                }
            }
        }
        setError("")
        return true
    };

    function checkWin() {
        let temp: string = JSON.stringify(board)
        if (!temp.replaceAll("0\":","").includes("0")){
            setSelectedCell("")
            setSelectedCol("")
            setSelectedGroup("")
            setSelectedRow("")
            setWon(true)
        }
    }

    return(
            
            <Card style={{marginTop: "20px", marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "400px", width: "650px", aspectRatio: "8/10"}}>
            <Card.Title>
                {won ? "You won!" : ""}
            </Card.Title>
            {[...Array(9)].map((e, i) =>        
            <Row style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%"}}>
                {[...Array(9)].map((e, k) =>
                <Cell id={((i*9)+k).toString()} row={i.toString()} col={k.toString()} group={(Math.floor((i)/3)*3 + Math.floor((k)/3)).toString()}
                 value={board[(i*9)+k]} selected={selectedCell} selectedValue={board[parseInt(selectedCell)]} handleCellClick={handleCellClick}
                 groupSelected={selectedGroup} rowSelected={selectedRow} colSelected={selectedCol} def={newBoard[(i*9)+k] !== "0"} error={error}
                 ></Cell>
                )}
            </Row> )}
            <Keyboard keyPressed={handleKeyboard}></Keyboard>
            <Button style={{marginTop: "4%"}} onClick={(e) => {won ? undefined : setBoard(newBoard); e.currentTarget.blur()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
                <span> Reset Board</span>
            </Button>
            </Card>
        
    )
}