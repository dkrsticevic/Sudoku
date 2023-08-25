import { useState } from "react"

type CellProps = {
    id: number, 
    row: number, 
    col: number, 
    group: number, 
    value: number,
    selected: number,
    selectedValue: number, 
    handleCellClick: any,
    groupSelected: number, 
    rowSelected: number, 
    colSelected: number, 
    def: boolean,
    error: number, 
    planned: string
}


export function Cell({ id, row, col, group, value, selected, selectedValue, handleCellClick, 
                    groupSelected, rowSelected, colSelected, def, error, planned}: CellProps) {
    
    return ( 
        <div id={id+","+row+","+col+","+group} onClick={handleCellClick}
        style={{ display: "flex", width: "10%", aspectRatio: "1/1", border: "1px solid black", 
        justifyContent: "center", alignItems: "center", 
        borderRight: col == 2 ? "solid black 3px" : col == 5 ? "solid black 3px" : "1px solid black",
        borderBottom: row == 2 ? "solid black 3px" : row == 5 ? "solid black 3px" : "1px solid black",
        background: error == id ? "red" : selected == id ? "#0071c5" : 
        selectedValue == value && value != 0 ? "dodgerblue" : 
        groupSelected == group ? "lightblue" : 
        rowSelected == row ? "lightblue" : colSelected == col ? "lightblue" : "", padding: "0"}}> 
        {value != 0 ? <span style={{height: "100%", width: "100%", fontSize: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: def ? "bold" : ""}}>
            {value != 0 ? value : ""}</span>
         : 
            <div style={{display: "flex", flexWrap: "wrap", color: "#3f3f40", height: "100%", width: "100%", fontSize: "50%", alignItems: "center"}}>
                {["1","2","3","4","5","6","7","8","9"].map(i => <div key={i} style={{flexGrow: 1, width: "33%", height: "33%", textAlign: "center"}}>{planned.includes(i) ? i : " "}</div>)}
            </div>
        }
        </div>
    )

}