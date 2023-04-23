import { useEffect, useState } from 'react'
import { Board } from "./components/Board"
import { Button, Container, Navbar } from 'react-bootstrap'
import { DifficultySelect } from './components/DifficultySelect'
import axios from "axios"

function App() {
  const [newGame, setNewGame] = useState(true)
  const [board, setBoard] = useState<string[]>([])
 
  const handleDiffSelect = (e: string) => {
    const options = {
      method: 'GET',
      url: 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate',
      params: {difficulty: e},
      headers: {
        'X-RapidAPI-Key': 'db7c32ae4amsh5bb807b8978e196p15385ejsn457f9fcea245',
        'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com'
      }
    }

    axios.request(options).then(function (response) {
      setBoard(response.data.puzzle.replaceAll(".",'0').split(""))
      setNewGame(false);

    }).catch(function (error) {
      console.error(error);
      setNewGame(true);
    });
  }

  return ( 
    <>
      <Navbar bg="dark" variant="dark" style={{display: "flex", height: "80px", 
       color: "white"}}> 
        <Container>
        <Navbar.Brand className="fs-1">Sudoku</Navbar.Brand>
        <Button onClick={() => setNewGame(true)}> New Game </Button>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center">
        { newGame ? 
        <DifficultySelect handleDiffSelect={handleDiffSelect}></DifficultySelect>
        :
        <Board newBoard={board}></Board>
      }
      </Container>
    </>
  )
}

export default App
