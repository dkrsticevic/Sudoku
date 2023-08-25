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
        <Container style={{width: "90%"}}> 
            <Row style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%", margin: "2px"}}> 
            <Button style={{opacity: counts[1] == 9 ? ".7" : "", width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="1" onClick={keyPressed}>1</Button>
            <Button style={{opacity: counts[2] == 9 ? ".7" : "", width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="2" onClick={keyPressed}>2</Button>
            <Button style={{opacity: counts[3] == 9 ? ".7" : "",width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="3" onClick={keyPressed}>3</Button>
            </Row>
            <Row style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%", margin: "2px"}}> 
            <Button style={{opacity: counts[4] == 9 ? ".7" : "",width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="4" onClick={keyPressed}>4</Button>
            <Button style={{opacity: counts[5] == 9 ? ".7" : "",width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="5" onClick={keyPressed}>5</Button>
            <Button style={{opacity: counts[6] == 9 ? ".7" : "",width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="6" onClick={keyPressed}>6</Button>
            </Row>
            <Row style={{display: "flex",  justifyContent: "center", alignItems: "center", width: "100%", margin: "2px"}}>
            <Button style={{opacity: counts[7] == 9 ? ".7" : "",width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="7" onClick={keyPressed}>7</Button>
            <Button style={{opacity: counts[8] == 9 ? ".7" : "",width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="8" onClick={keyPressed}>8</Button>
            <Button style={{opacity: counts[9] == 9 ? ".7" : "",width: "30%", aspectRatio: "1", fontSize: "1.5rem", marginRight: "2px"}} id="9" onClick={keyPressed}>9</Button>
            </Row>
        </Container>

    )
}