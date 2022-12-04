import { useEffect, useState } from 'react'
import './App.css'


type CardType = {
  value: number
  index: number
  up: boolean
}

const startBoard = [
  {value: 1, index: 0, up: false},
  {value: 2, index: 1, up: false},
  {value: 3, index: 2, up: false},
  {value: 4, index: 3, up: false},
  {value: 5, index: 4, up: false},
  {value: 6, index: 5, up: false},
  {value: 1, index: 6, up: false},
  {value: 2, index: 7, up: false},
  {value: 3, index: 8, up: false},
  {value: 4, index: 9, up: false},
  {value: 5, index: 10, up: false},
  {value: 6, index: 11, up: false}
]

let values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6].sort(() => Math.random() - 0.5);
const title = 'Memory'

const App = () => {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [firstCard, setFirstCard] = useState<CardType | null>(null)
  const [secondCard, setSecondCard] = useState<CardType | null>(null)

  const [board, setBoard] = useState<Array<CardType>>(startBoard)

  useEffect(() => {
  }, [])

  const handleCardClicked = (card: CardType) => {
    let newBoard = [...board]
    setScore(prev => prev + 1)

    // This is the first card we're clicking
    if (!firstCard) {
      setFirstCard(card)
      // Turn up first card
      newBoard[card.index].up = true
      setBoard(newBoard)
      return;
    }

    // We have clicked both first and second card
    if (firstCard && !secondCard) {
      setSecondCard(card)
      newBoard[card.index].up = true
      setBoard(newBoard)

      // We have a pair
      if (firstCard.value === card.value) {
        // Check if all Cards are pair
        setFirstCard(null)
        setSecondCard(null)
        checkGameOver()
      } else {
      // We have NOT a pair
      setTimeout(() => {
        newBoard[firstCard.index].up = false
        newBoard[card.index].up = false
        setFirstCard(null)
        setSecondCard(null)
        setBoard(newBoard)
      }, 1000);
    }

  }
}

const checkGameOver = () => {
  let gameOver = board.every(card => card.up)

  if (gameOver) {
    console.log('game is over')
    setGameOver(true)
  } else {
    return
  }
}

const shuffleBoard = () => {
  let newBoard = board
  values.sort(() => Math.random() - 0.5);
  newBoard.map(card => {
    card.up = false
    card.value = values[card.index]
  })
  setBoard(newBoard)
}

const playAgain = () => {
  setScore(0)
  setGameOver(false)
  setFirstCard(null)
  setSecondCard(null)

  shuffleBoard()
}

  return (
    <div className="App">
      <h1>{title}</h1>
      <div className="board">
        {board.map((card, index) => {
          const status = card.up ? 'card not-clickable' : 'card'
          return (
            <div key={index} className={status} onClick={() => handleCardClicked(card)}>
            {card.up ? card.value : ""}
          </div>

          )
        })}
      </div>
      {gameOver && (<div className="game-over">
        <h2>Game Over</h2>
        <h3>Score: {score}</h3>
        <button className="btn play-again" onClick={playAgain}>Play Again</button>
      </div>)}
    </div>
  )
}


export default App