var React = require("react");
var Board = require("./Board.react");
var Scores = require("./Scores.react");
var SettingsModal = require("./SettingsModal.react");
var minimax = require('../utils/minimax.js');
var $ = require("jquery");

var Application = React.createClass({
	getInitialState: function(){
		return ({
			board: [[undefined,undefined,undefined],
					[undefined,undefined,undefined],
					[undefined,undefined,undefined]],
			p1: 'X',
			p2: 'O',
			currentPlayer: 'p1',
			winningLine: [],
			scores: {
				p1: 0,
				p2: 0,
				ties: 0
			},
			singlePlayer: true,
			difficulty: 'hard'
		});	
	},
	getDefaultProps: function(){
		console.log('default props run');
		var lines = [];
		lines.push([[0,0],[0,1],[0,2]]);
		lines.push([[1,0],[1,1],[1,2]]);
		lines.push([[2,0],[2,1],[2,2]]);
		
		lines.push([[0,0],[1,0],[2,0]]);
		lines.push([[0,1],[1,1],[2,1]]);
		lines.push([[0,2],[1,2],[2,2]]);
		
		lines.push([[0,0],[1,1],[2,2]]);
		lines.push([[0,2],[1,1],[2,0]]);
		
		return ({winningLines: lines});
	},
	startNewGame: function(){
		if(this.state.singlePlayer){
			this.setState({
				board: [[undefined,undefined,undefined],
						[undefined,undefined,undefined],
						[undefined,undefined,undefined]],
				currentPlayer: 'p2',
				winningLine: []
			});
			window.setTimeout(this.makeComputerMove,500);
		} else {
			this.setState({
				board: [[undefined,undefined,undefined],
						[undefined,undefined,undefined],
						[undefined,undefined,undefined]],
				winningLine: []
			});
		}
	},
	makeMove: function([row,col]){
		if(this.state.winningLine.length > 0){
			return; //game over
		}
		
		var currentPlayer = this.state.currentPlayer;
		var icon = this.state[currentPlayer];
		var board = this.state.board;
		if(board[row][col] === undefined){
			board[row][col] = icon;
			this.setState({board: board});
		}
		var scores;
		if(this.checkForWin()){
			console.log('[ttt] winner!!! :', this.checkForWin());
			scores = this.state.scores;
			scores[this.state.currentPlayer] += 1;
			this.setState({
				winningLine: this.checkForWin(),
				scores: scores});
		} 
		else if(this.checkForTie()){
			console.log('[ttt] cat wins?! Tie...');
			scores = this.state.scores;
			scores.ties += 1;
			this.setState({
				winningLine: ['tie'],
				scores: scores
			});
		}
		this.switchPlayer();
	},
	makeComputerMove: function(difficulty){
		if(!difficulty){
			difficulty = this.state.difficulty;
		}

		var move;
		if(difficulty === "easy"){
			console.log('[ttt] makeComputerMove() getting easy move');
			move = this.AI_GetRandomMove();
		} else {
			console.log('[ttt] makeComputerMove() getting hard move');
			move = this.AI_GetMinimaxMove();
		}
		this.makeMove(move);
	},
	AI_GetRandomMove: function(){
		var availableMoves = [];
		var board = this.state.board;
		var i,j;
		for(i in board){
			var row = board[i];
			for(j in row){
				if(board[i][j] === undefined){
					availableMoves.push([i,j]);
				}
			}
		}
		
		if(availableMoves.length > 0){
			var randomMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
			return randomMove;
		}
	},
	AI_GetMinimaxMove: function(){
		var boardcopy = this.state.board.slice(0);
		return minimax(boardcopy, this.state.p2, this.state.p1);
	},
	onSquareClick: function(e){
		var id = e.currentTarget.id;
		var square = [id[1],id[2]];
		if(this.state.singlePlayer){
			if(this.state.currentPlayer === "p1"){
				this.makeMove(square);
			}
		} else {
		this.makeMove(square);
		}
	},
	switchPlayer: function(){
		var currentPlayer = this.state.currentPlayer;
		var newPlayer;
		if(currentPlayer === 'p1'){
			newPlayer = 'p2';
			if(this.state.singlePlayer){
				window.setTimeout(this.makeComputerMove, 400);
			}
		} else {
			newPlayer = 'p1';
		}
		this.setState({currentPlayer: newPlayer});

	},
	checkForWin: function(board){
		if(!board){
			board = this.state.board;
		}
		var winningLines = this.props.winningLines;
		var x,line;
		for(x in winningLines){
			line = winningLines[x];
			var a = line[0];
			var b = line[1];
			var c = line[2];
			if(board[a[0]][a[1]] === board[b[0]][b[1]] 
				&& board[b[0]][b[1]] === board[c[0]][c[1]] 
				&& board[a[0]][a[1]] !== undefined){
				return line;
			}
		}
		return false;
	},
	checkForTie: function(board){
		if(!board){
			board = this.state.board;
		}
		var i,j;
		var tie = true;
		for(i in board){
			for (j in board[i]){
				if (board[i][j] === undefined){
					tie = false;
				}
			}
		}
		return tie;
	},
	newSettings: function(settings){
		var p1, p2, singlePlayer;
		if(settings.p1Icon === 'X'){
			p1 = 'X';
			p2 = 'O';
		} else {
			p1 = 'O';
			p2 = 'X';
		}
		if(settings.mode === 'singlePlayer'){
			singlePlayer = true;
			window.setTimeout(this.switchPlayer,100);
		} else {
			singlePlayer = false;
		}
		console.log('check');
		this.setState({
			p1:p1,
			p2:p2,
			singlePlayer:singlePlayer,
			difficulty: settings.difficulty
		});
	},
	componentDidMount: function(){
		$("#settings-btn").click();
	},
	render: function(){
		return (
		<div className="container" style={{marginTop:20}}>
			<div className="row">
				<div className="col-sm-12">
					<Scores
						currentPlayer={this.state.currentPlayer}
						scores={this.state.scores}
						p1={this.state.p1}
						p2={this.state.p2}
						winningLine={this.state.winningLine}
						singlePlayer={this.state.singlePlayer}/>
				</div>
			</div>
			<Board 
				singlePlayer={this.state.singlePlayer}
				startNewGame={this.startNewGame}
				winningLine={this.state.winningLine}
				board={this.state.board}
				onSquareClick={this.onSquareClick}
				currentPlayer={this.state.currentPlayer}
				currentIcon={this.state[this.state.currentPlayer]}/>
			<SettingsModal newSettings={this.newSettings} />
		</div>
		);
	}
});

module.exports = Application;

