var React = require("react");

var BoardSquare = React.createClass({
	getInitialState: function(){
		return ({
			mouseOver: false
		});	
	},
	checkIfWinningSquare: function(){
		var winningLine = this.props.winningLine;
		for (var i in winningLine){
			var sqr = winningLine[i];
			var wid = 's'+String(sqr[0])+String(sqr[1]);
			if(this.props.tid === wid){
			    return true;
			}
		}
		return false;
	},
	render: function(){
		var winningSquare = this.checkIfWinningSquare();
		var gameOver = this.props.winningLine.length > 0;
		var ClassNames = "col-xs-4 board-square";
		if(gameOver){
    		if (winningSquare){
    		    ClassNames += " winning-square animated tada";
    		} else {
    		    ClassNames += " losing-square";
    		}
		}
		
		var display = this.props.display;
		var content = <p className={"icon"}></p>;
		if(this.props.singlePlayer){
			if(this.state.mouseOver && display === undefined && !gameOver && this.props.currentPlayer==="p1"){
				content = <p className={"icon"} style={{color: '#4D4D4D'}}>{this.props.currentIcon}</p>;
			} 
			else if(display) {
				content = <p className={"icon animated bounceIn"}>{display}</p>;
			}
		} else{
			if(this.state.mouseOver && display === undefined && !gameOver){
				content = <p className={"icon"} style={{color: '#4D4D4D'}}>{this.props.currentIcon}</p>;
			} 
			else if(display) {
				content = <p className={"icon animated bounceIn"}>{display}</p>;
			}	
		}
		var self = this;
		return (
			<td id={this.props.tid}
			    className={ClassNames}
			    onClick={this.props.onSquareClick} 
			    onMouseEnter={function(){self.setState({mouseOver:true})}}
			    onTouchMove={function(){self.setState({mouseOver:false})}}
			    onTouchEnd={function(){self.setState({mouseOver:false})}}
			    onTouchCancel={function(){self.setState({mouseOver:false})}}
			    onMouseLeave={function(){self.setState({mouseOver:false})}}
			    style={this.props.cellStyle}>
				{content}
			</td>
		);
	}
});

module.exports = BoardSquare;

