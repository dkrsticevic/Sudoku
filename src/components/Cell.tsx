type CellProps = {
    id: string, 
    row: string, 
    col: string, 
    group: string, 
    value: string,
    selected: string,
    selectedValue: string, 
    handleCellClick: any,
    groupSelected: string, 
    rowSelected: string, 
    colSelected: string, 
    def: boolean,
    error: string, 
}


export function Cell({ id, row, col, group, value, selected, selectedValue, handleCellClick, 
                    groupSelected, rowSelected, colSelected, def, error}: CellProps) {
    return ( 
        <div id={id+","+row+","+col+","+group} onClick={handleCellClick}
        style={{ display: "flex", width: "10%", aspectRatio: "1", border: "1px solid black", 
        justifyContent: "center", alignItems: "center", 
        borderRight: col === "2" ? "solid black 3px" : col === "5" ? "solid black 3px" : "1px solid black",
        borderBottom: row === "2" ? "solid black 3px" : row === "5" ? "solid black 3px" : "1px solid black",
        background: error === id ? "red" : selected === id ? "#0071c5" : 
        selectedValue === value && value !== "0" ? "dodgerblue" : 
        groupSelected === group ? "lightblue" : 
        rowSelected === row ? "lightblue" : colSelected === col ? "lightblue" : "",
        }}> 
           <span style={{color: "black", fontSize: "4vmin", fontWeight: def ? "bold" : "light"}}>{value !== "0" ? value : ""}</span>
        </div>
    )

}