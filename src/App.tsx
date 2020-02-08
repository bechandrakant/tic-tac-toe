import React from 'react';

enum Player {
  None = 0, One = 1, Two = 2
}

interface IState {
  board: Player[],
  isGameWon: boolean,
  playerTurn: Player,
  totalMoves: number
}

class App extends React.Component<{}, IState> {

  public state: IState = {
    board: [Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None],
    isGameWon: false,
    playerTurn: Player.One,
    totalMoves: 0
  }

  public checkForWin(combination: Player[]): boolean {
    if (combination[0] !== Player.None
      && combination[0] === combination[1]
      && combination[1] === combination[2])
      return true
    return false
  }

  public isGameWon(moveCount: number): boolean {
    if (moveCount < 5)
      return false
    else {
      const possibleWinningCombinations = [
        [this.state.board[0], this.state.board[1], this.state.board[2]],
        [this.state.board[3], this.state.board[4], this.state.board[5]],
        [this.state.board[6], this.state.board[7], this.state.board[8]],
        [this.state.board[0], this.state.board[3], this.state.board[6]],
        [this.state.board[1], this.state.board[4], this.state.board[7]],
        [this.state.board[2], this.state.board[5], this.state.board[8]],
        [this.state.board[0], this.state.board[4], this.state.board[8]],
        [this.state.board[2], this.state.board[4], this.state.board[6]],
      ]

      for (let i = 0; i < possibleWinningCombinations.length; i++) {
        if (this.checkForWin(possibleWinningCombinations[i]) === true)
          return true
      }
      return false
    }
  }

  public handleClick(index: number) {
    const newBoard = this.state.board
    if (newBoard[index] === Player.None) {
      newBoard[index] = this.state.playerTurn
      this.setState({board: newBoard})
    }
    else {
      alert('Cell has already been filled')
      return
    }

    const moveCount: number = 1 + this.state.totalMoves

    // Check if game is won
    const hasWon = this.isGameWon(moveCount)

    this.setState(
      { isGameWon: hasWon, playerTurn: 3 - this.state.playerTurn, totalMoves: moveCount })

    console.log(this.state.board)
    console.log(moveCount)  
  }

  public renderBoard(): JSX.Element[] {
    return this.state.board.map((cell, index: number) => <div className="cell" onClick={() => this.handleClick(index)}>{cell === Player.One ? 'X' : (cell === Player.Two) ? 'O' : ''}</div>)
  }

  public setNewGame(): void {
    const newBoard = this.state.board.map((board: Player, index: number) => Player.None)

    this.setState({
      board: newBoard,
      isGameWon: false,
      playerTurn: Player.One,
      totalMoves: 0
    })
  }
 
  public render(): JSX.Element {
    return (
      <>
        <h1>Tic Tac Toe</h1>
        <div className="container">{this.renderBoard()}</div>
        <h3>{(this.state.isGameWon || this.state.totalMoves === 9) && 'Game Over'}
        </h3>
        <button onClick={() => this.setNewGame()}> New Game </button>
      </>
    )
  }
}

export default App;