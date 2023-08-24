import { Button, ButtonGroup, Card, Container, Row } from "react-bootstrap"
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
    const [planned, setPlanned] = useState<string[]>(Array(81).fill(""))
    const [selectedCell, setSelectedCell] = useState<number>(-1)
    const [won, setWon] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<number>(-1)
    const [selectedRow, setSelectedRow] = useState<number>(-1)
    const [selectedCol, setSelectedCol] = useState<number>(-1)
    const [error, setError] = useState(-1)
    const [plan, setPlan] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', keyDownEvent)
        return () => document.removeEventListener('keydown', keyDownEvent)
    }, [selectedCell, error, planned, plan])

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
        if (plan && id != "0"){
            changePlanValue(id)
            return
        }
            const tempBoard = [...board]
            tempBoard[selectedCell] = parseInt(id)
            setBoard(tempBoard) 
    }

    const changePlanValue = (id: string) => {
            let p = [...planned]
            let value = p[selectedCell]
            if (!value.includes(id)){
                p[selectedCell] = p[selectedCell] ? p[selectedCell] + id : id
            }else{
                p[selectedCell] = p[selectedCell].replace(id, '')
            }

            setPlanned(p)
    }

    useEffect(() => {
        if (selectedCell != -1){
            if (checkError() && board[selectedCell] != 0) {
                checkNotes()
            }
        }
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
        let col = selectedCell %9
        let row = Math.floor(selectedCell/9)
        let boxCol = col < 3 ? 0 : col < 6 ? 3 : 6    
        let boxRow =  row < 3 ? -1 : row < 6 ? 2 : 5    

        for (let i = 0; i < 9; i++) {
            if ( i % 3 == 0){ boxRow = boxRow +1 }

            let colText = board[(row*9)+i] +"c"
            let rowText = board[(i*9)+col] +"r"
            let boxText = board[((boxRow*9) + (boxCol+(i%3)))] +"b"

            if (set.has(colText) || set.has(rowText) || set.has(boxText)) {
                setError(selectedCell)
                return false
            } else{
                if (board[(row*9)+i] != 0) set.add(colText)
                if (board[(i*9)+col] != 0) set.add(rowText)
                if (board[((boxRow*9) + (boxCol+(i%3)))] != 0) set.add(boxText)
            }
        }
        setError(-1)
        checkWin();
        return true
    };

    function checkNotes(){
        let value = board[selectedCell].toString()
        const notes = [...planned]
        let col = selectedCell %9
        let row = Math.floor(selectedCell/9)
        let boxCol = col < 3 ? 0 : col < 6 ? 3 : 6    
        let boxRow =  row < 3 ? -1 : row < 6 ? 2 : 5 
        console.log(value)   

        for (let i = 0; i < 9; i++) {
            if ( i % 3 == 0){ boxRow = boxRow +1 }

            notes[(row*9)+i] = notes[(row*9)+i].replace(value, "")
            notes[(i*9)+col] = notes[(i*9)+col].replace(value, "")
            notes[((boxRow*9) + (boxCol+(i%3)))] = notes[((boxRow*9) + (boxCol+(i%3)))].replace(value, "")
            console.log(notes[(row*9)+i])
        }


        setPlanned(notes)
    }


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
            <Row m={2} s={1} lg={2} style={{marginTop: "20px", display: "flex", justifyContent: "center", columnGap: "50px", alignItems: "center", width: "100%"}}>
            <Card style={{marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "400px", width: "650px", paddingBottom: "30px"}}>
            <Card.Title style={{height: "30px",}}>
                {won ? "Board Complete!" : ""}
            </Card.Title>
            {[...Array(9)].map((e, i) =>        
            <Row key={i} style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%"}}>
                {[...Array(9)].map((e, k) =>
                <Cell key={((i*9)+k)} id={((i*9)+k)} row={i} col={k} group={(Math.floor((i)/3)*3 + Math.floor((k)/3))}
                 value={board[(i*9)+k]} selected={selectedCell} selectedValue={board[selectedCell]} handleCellClick={handleCellClick}
                 groupSelected={selectedGroup} rowSelected={selectedRow} colSelected={selectedCol} def={newBoard[(i*9)+k] != 0} error={error}
                 planned={planned[(i*9)+k]}
                 ></Cell>
                )}
            </Row> )}
            </Card>

            <Card style={{marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "300px", paddingTop: "30px"}}>
            <Keyboard board={board} keyPressed={handleKeyboard}></Keyboard>
            <div style={{display: "flex", marginTop: "5px", justifyContent: "space-around", width: "100%", textAlign: "center"}}>
                <div>
                    <Button style={{borderRadius: "50%", height: "50px", aspectRatio: "1/1"}} onClick={() => setPlan(!plan)}> {plan ? "On" : "Off"}</Button>
                    <h6>Notes</h6>
                </div>
                <div>
                <Button style={{borderRadius: "50%", height: "50px", aspectRatio: "1/1"}} id="0" onClick={handleKeyboard}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-eraser-fill" viewBox="0 0 18 18">
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                </svg>
                </Button>
                <h6>Eraser</h6>
                </div>
                <div>
                    <Button style={{borderRadius: "50%", height: "50px", aspectRatio: "1/1"}} onClick={(e) => {won ? undefined :setBoard(newBoard); setError(-1); setPlanned(Array(81).fill("")); e.currentTarget.blur()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </Button>
                    <h6>Restart</h6>
                </div>
            </div>
            </Card>
            </Row>
        
    )
}