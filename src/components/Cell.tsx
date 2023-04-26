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
}


export function Cell({ id, row, col, group, value, selected, selectedValue, handleCellClick, 
                    groupSelected, rowSelected, colSelected, def, error}: CellProps) {
    return ( 
        <div id={id+","+row+","+col+","+group} onClick={handleCellClick}
        style={{ display: "flex", width: "10%", aspectRatio: "1", border: "1px solid black", 
        justifyContent: "center", alignItems: "center", 
        borderRight: col == 2 ? "solid black 3px" : col == 5 ? "solid black 3px" : "1px solid black",
        borderBottom: row == 2 ? "solid black 3px" : row == 5 ? "solid black 3px" : "1px solid black",
        background: error == id ? "red" : selected == id ? "#0071c5" : 
        selectedValue == value && value != 0 ? "dodgerblue" : 
        groupSelected == group ? "lightblue" : 
        rowSelected == row ? "lightblue" : colSelected == col ? "lightblue" : "",
        }}> 
           <span style={{fontSize: "1.5rem", fontWeight: def ? "bold" : ""}}>{value != 0 ? value : ""}</span>
        </div>
    )

}