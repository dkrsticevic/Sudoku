import { useState } from "react";
import { Button, Card, Row } from "react-bootstrap";

type DifficultySelectProps = {
    handleDiffSelect: any,
}

export function DifficultySelect({handleDiffSelect}: DifficultySelectProps) {
    const [optionSelected, setOptionSelected] = useState("")

    return (
        <Card style={{marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "400px", width: "650px" }}> 
        <Card.Body> 
          {optionSelected === "" ?
          <>
          <Card.Title>Select Difficulty</Card.Title>
          <Row>
            <Button onClick={() => {setOptionSelected("Easy"); handleDiffSelect('easy')}} style={{marginBottom: "10px"}}>Easy</Button>
          </Row>
          <Row>
            <Button onClick={() => {setOptionSelected("Medium"); handleDiffSelect('medium')}} style={{marginBottom: "10px"}}>Medium</Button>
          </Row>
          <Row>
            <Button onClick={() => {setOptionSelected("Hard"); handleDiffSelect('hard')}} style={{marginBottom: "10px"}} >Hard</Button>
          </Row>
          </>
            : 
            <Card.Title>Loading {optionSelected} Sudoku...</Card.Title>
            }
        </Card.Body>
    </Card>

    )

}