var React = require("react");

var divStyle = {
	paddingLeft: 5,
	paddingRight: 5
};

var Scores = React.createClass({
	render: function(){
		var p1Class = " activePlayer"; 
		var p2Class = " activePlayer";
		var tieClass = "";
		if(this.props.winningLine.length === 0){
			if(this.props.currentPlayer === "p1"){
				p2Class = " inactivePlayer";
			} else {
				p1Class = " inactivePlayer";			
			}
		}
		else{
			if(this.props.winningLine[0] === "tie"){
				tieClass += " animated tada";
			}
			else if(this.props.currentPlayer === "p1"){
				p2Class += " animated tada";
			}
			else{
				p1Class += " animated tada";
			}
		}
		
		var p1Icon,p2Icon;
		if(this.props.singlePlayer){
			p1Icon = <i className="fa fa-user" aria-hidden="true"></i>;
			p2Icon = <i className="fa fa-laptop" aria-hidden="true"></i>;
		} else {
			p1Icon = <i className="fa fa-user" aria-hidden="true"></i>;
			p2Icon = <i className="fa fa-user" aria-hidden="true"></i>;
		}
		return (
		<div className="scores-container">
			<div className = "row">
				<div className={"col-xs-4"+p1Class} style={divStyle}>
					{p1Icon}
					{" Player 1 " + "(" + this.props.p1 + ")"}
				</div>
				<div className={"col-xs-4"+tieClass}>
					Ties
				</div>
				<div className={"col-xs-4"+p2Class} style={divStyle}>
					{p2Icon}
					{" Player 2 "  + "(" + this.props.p2 + ")"}
				</div>
			</div>
			<div className = "row">
				<div className={"col-xs-4"+p1Class}>
					{this.props.scores.p1}
				</div>
				<div className={"col-xs-4"+tieClass}>
					{this.props.scores.ties}
				</div>
				<div className={"col-xs-4"+p2Class}>
					{this.props.scores.p2}
				</div>
			</div>
		</div>
		);
	}
});

module.exports = Scores;

