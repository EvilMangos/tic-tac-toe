type Cell = 'X' | 'O' | null;
type Board = Cell[][];

function isBoardFull(board: Board): boolean {
	return board.every((row) => row.every((cell) => cell !== null));
}

function getAvailableMoves(board: Board): [number, number][] {
	const moves: [number, number][] = [];
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] === null) {
				moves.push([row, col]);
			}
		}
	}
	return moves;
}

function evaluateBoard(board: Board): number {
	for (let row = 0; row < 3; row++) {
		if (
			board[row][0] === board[row][1] &&
			board[row][1] === board[row][2] &&
			board[row][0] !== null
		) {
			return board[row][0] === 'X' ? 10 : -10;
		}
	}

	for (let col = 0; col < 3; col++) {
		if (
			board[0][col] === board[1][col] &&
			board[1][col] === board[2][col] &&
			board[0][col] !== null
		) {
			return board[0][col] === 'X' ? 10 : -10;
		}
	}

	if (
		board[0][0] === board[1][1] &&
		board[1][1] === board[2][2] &&
		board[1][1] !== null
	) {
		return board[1][1] === 'X' ? 10 : -10;
	}

	if (
		board[2][0] === board[1][1] &&
		board[1][1] === board[0][2] &&
		board[1][1] !== null
	) {
		return board[1][1] === 'X' ? 10 : -10;
	}

	return 0;
}

function minimax(board: Board, isMaximizingPlayer: boolean): number {
	const score = evaluateBoard(board);

	if (score === 10) {
		return score;
	} else if (score === -10) {
		return score;
	} else if (isBoardFull(board)) {
		return 0;
	}

	if (isMaximizingPlayer) {
		let bestScore = -Infinity;
		for (const [row, col] of getAvailableMoves(board)) {
			board[row][col] = 'X';
			const score = minimax(board, false);
			board[row][col] = null;
			bestScore = Math.max(bestScore, score);
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (const [row, col] of getAvailableMoves(board)) {
			board[row][col] = 'O';
			const score = minimax(board, true);
			board[row][col] = null;
			bestScore = Math.min(bestScore, score);
		}
		return bestScore;
	}
}

function findBestMove(board: Board): [number, number] {
	let bestMove: [number, number] = [-1, -1];
	let bestScore = -Infinity;

	for (const [row, col] of getAvailableMoves(board)) {
		board[row][col] = 'X';
		const score = minimax(board, false);
		board[row][col] = null;
		if (score > bestScore) {
			bestScore = score;
			bestMove = [row, col];
		}
	}
	return bestMove;
}

//Example usage:
const X = 'X';
const O = 'O';

let board: Board = [
	[X, O, null],
	[null, null, null],
	[null, null, null],
];
const bestMove = findBestMove(board);
console.log('Best Move: ', bestMove);
