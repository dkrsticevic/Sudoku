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
    newBoard : number[]
}

export function Board({newBoard}: BoardProps) {
    const [board, setBoard] = useState<number[]>(newBoard)
    const [selectedCell, setSelectedCell] = useState<number>(-1)
    const [won, setWon] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<number>(-1)
    const [selectedRow, setSelectedRow] = useState<number>(-1)
    const [selectedCol, setSelectedCol] = useState<number>(-1)
    const [error, setError] = useState(-1)

    useEffect(() => {
        document.addEventListener('keydown', keyDownEvent)
        return () => document.removeEventListener('keydown', keyDownEvent)
    }, [selectedCell, error])

    const keyDownEvent = (event: any) => {
        changeValue(event.key)
    }

    const changeValue = (id: string) =>{
        if (selectedCell == -1){
            return
        }        
        if (won){
            return
        }
        if (arrowMap.has(id) && error === -1){
            const temp = selectedCell + arrowMap.get(id)!;
            if (temp >= 0 && temp < 81){
                const col = (temp%9)
                const row = Math.floor(temp /9)
                setSelectedCell(temp)
                setSelectedCol(col)
                setSelectedRow(row)
                setSelectedGroup((Math.floor((row)/3)*3 + Math.floor((col)/3)))
            }
        }
        if (newBoard[selectedCell] != 0)
        {
            return
        }
        if (id === "Backspace"){
            const tempBoard = [...board]
            tempBoard[selectedCell] = 0
            setBoard(tempBoard)
        }
        if (!keys.includes(id)){
            return
        }
            const tempBoard = [...board]
            tempBoard[selectedCell] = parseInt(id)
            setBoard(tempBoard) 
    }

    useEffect(() => {
        if (selectedCell != -1)
        checkError();
    }, [board])

    const handleKeyboard = (e: React.MouseEvent<HTMLElement>) =>{
        const id = e.currentTarget.id
        e.currentTarget.blur()
        changeValue(id)
    }

    const handleCellClick = (e: React.MouseEvent<HTMLElement>) => {
        if (error != -1 || won){
            return
        }

        const id = e.currentTarget.id;
        const values = id.split(",")

        if (selectedCell === parseInt(values[0])){
            setSelectedCell(-1);
            setSelectedGroup(-1);
            setSelectedRow(-1);
            setSelectedCol(-1);
            return
        }

        setSelectedCell(parseInt(values[0]));
        setSelectedGroup(parseInt(values[3]));
        setSelectedRow(parseInt(values[1]));
        setSelectedCol(parseInt(values[2]));
    }

    function checkError() {
        let set = new Set()
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const value = board[i*9+j]
                if (value != 0) {
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
        setError(-1)
        checkWin();
        return true
    };

    function checkWin() {
        let temp: string = JSON.stringify(board)
        if (!temp.includes("0")){
            setSelectedCell(-1)
            setSelectedCol(-1)
            setSelectedGroup(-1)
            setSelectedRow(-1)
            setWon(true)
        }
    }

    return(
            
            <Card style={{marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "400px", width: "650px", aspectRatio: "7/9"}}>
            <Card.Title style={{height: "30px",}}>
                {won ? "Board Complete!" : ""}
            </Card.Title>
            {[...Array(9)].map((e, i) =>        
            <Row style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%"}}>
                {[...Array(9)].map((e, k) =>
                <Cell id={((i*9)+k)} row={i} col={k} group={(Math.floor((i)/3)*3 + Math.floor((k)/3))}
                 value={board[(i*9)+k]} selected={selectedCell} selectedValue={board[selectedCell]} handleCellClick={handleCellClick}
                 groupSelected={selectedGroup} rowSelected={selectedRow} colSelected={selectedCol} def={newBoard[(i*9)+k] != 0} error={error}
                 ></Cell>
                )}
            </Row> )}
            <Keyboard board={board} keyPressed={handleKeyboard}></Keyboard>
            <Button style={{marginTop: "2%", marginBottom: "2%"}} onClick={(e) => {won ? undefined : setBoard(newBoard); e.currentTarget.blur()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
                <span> Reset Board</span>
            </Button>
            </Card>
        
    )
}