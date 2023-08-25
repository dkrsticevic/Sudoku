import { useState } from 'react'
import { Board } from "./components/Board"
import { Button, Container, Navbar } from 'react-bootstrap'
import { DifficultySelect } from './components/DifficultySelect'
import axios from "axios"
const API_KEY = import.meta.env.VITE_PRIVATE_KEY 

function App() {
  const [newGame, setNewGame] = useState(true)
  const [board, setBoard] = useState<number[]>([])

  const handleDiffSelect = (e: string) => {
    const options = {
      method: 'GET',
      url: 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate',
      params: {difficulty: e},
      headers: {
        'X-RapidAPI-Key': API_KEY ,
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
        <Board newBoard={board} newGame={setNewGame}></Board>
      }
      </Container>
    </>
  )
}

export default App
