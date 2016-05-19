var React = require("react");
var BoardSquare = require("./BoardSquare.react");
var $ = require("jquery");

var tableStyle = {
	margin: 'auto'
};

var cellStyle = {
	verticalAlign: 'middle',
	textAlign: 'center',
};

var Board = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		e.stopPropagation();
		if(this.props.winningLine.length > 0){
			this.props.startNewGame();
		}	
	},
	render: function(){
		var board = this.props.board;
		return (
		<table className="table" style={tableStyle} onClick={this.handleClick}>
			<tbody>
				<tr>
					<BoardSquare tid="s00" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[0][0]} currentIcon={this.props.currentIcon}/>
					<BoardSquare tid="s01" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[0][1]} currentIcon={this.props.currentIcon}/>
					<BoardSquare tid="s02" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[0][2]} currentIcon={this.props.currentIcon}/>
				</tr>
				<tr>
					<BoardSquare tid="s10" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[1][0]} currentIcon={this.props.currentIcon}/>
					<BoardSquare tid="s11" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[1][1]} currentIcon={this.props.currentIcon}/>
					<BoardSquare tid="s12" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[1][2]} currentIcon={this.props.currentIcon}/>
				</tr>
				<tr>
					<BoardSquare tid="s20" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[2][0]} currentIcon={this.props.currentIcon}/>
					<BoardSquare tid="s21" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[2][1]} currentIcon={this.props.currentIcon}/>
					<BoardSquare tid="s22" currentPlayer={this.props.currentPlayer} singlePlayer={this.props.singlePlayer} winningLine={this.props.winningLine} onSquareClick={this.props.onSquareClick} cellStyle={cellStyle} display={board[2][2]} currentIcon={this.props.currentIcon}/>
				</tr>
			</tbody>
		</table>
		);
	}
});

module.exports = Board;

