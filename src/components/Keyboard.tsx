import { Button, Col, Container, Row } from "react-bootstrap";

type KeyboardProps = {
    keyPressed: any;
    board: number[]
}

export function Keyboard({keyPressed, board} : KeyboardProps) {
    const counts: number[] = [];
    for (const num of board) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    return (
        <Container style={{marginTop: "2%"}}> 
            <Row style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%", margin: "2px"}}> 
            <Button style={{opacity: counts[1] == 9 ? ".7" : "", width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="1" onClick={keyPressed}>1</Button>
            <Button style={{opacity: counts[2] == 9 ? ".7" : "", width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="2" onClick={keyPressed}>2</Button>
            <Button style={{opacity: counts[3] == 9 ? ".7" : "",width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="3" onClick={keyPressed}>3</Button>
            <Button style={{opacity: counts[4] == 9 ? ".7" : "",width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="4" onClick={keyPressed}>4</Button>
            <Button style={{opacity: counts[5] == 9 ? ".7" : "",width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="5" onClick={keyPressed}>5</Button>
            </Row>
            <Row style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%", margin: "2px"}}>
            <Button style={{opacity: counts[6] == 9 ? ".7" : "",width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="6" onClick={keyPressed}>6</Button>
            <Button style={{opacity: counts[7] == 9 ? ".7" : "",width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="7" onClick={keyPressed}>7</Button>
            <Button style={{opacity: counts[8] == 9 ? ".7" : "",width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="8" onClick={keyPressed}>8</Button>
            <Button style={{opacity: counts[9] == 9 ? ".7" : "",width: "10%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="9" onClick={keyPressed}>9</Button>
            <Button style={{width: "10%", aspectRatio: "1", fontSize: "1.5rem", alignItems: "center", justifyContent: "center", marginRight: "2px"}} id="0" onClick={keyPressed}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-eraser-fill" viewBox="0 0 18 18">
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                </svg>
            </Button>
            </Row>
        </Container>

    )
}