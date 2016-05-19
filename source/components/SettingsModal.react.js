var React = require("react");

var SettingsModal = React.createClass({
	getInitialState: function(){
		return ({
			mode: 'singlePlayer',
			p1Icon: 'X',
			difficulty: 'hard'
		});
	},
	onModeClick: function(e){
		var id = e.currentTarget.id;
		this.setState({mode: id});
	},
	onIconClick: function(e){
		var id = e.currentTarget.id;
		this.setState({p1Icon: id});
	},
	onDifficultyClick: function(e){
		var id = e.currentTarget.id;
		this.setState({difficulty: id});
	},
	onPlayClick: function(){
		this.props.newSettings(this.state);
	},
	render: function(){
		var difficultyClass = "disabled";
		if(this.state.mode === 'singlePlayer'){
			difficultyClass = "";
		}
		return (
	<div>
		<button style={{display:'none'}} id="settings-btn" type="button" data-toggle="modal" data-target="#settings-modal">Launch modal</button>		
		<div id="settings-modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="settings-dialog">
		  <div className="modal-dialog">
		    <div className="modal-content">
		      <div className="modal-header">
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 className="modal-title">Play Tic-Tac-Toe !!!</h4>
		      </div>
		      
		      <div className="modal-body">
			      <div className="row" style={{marginBottom: 10}}>
			      	<div className="col-xs-4">
			      	Mode:
			      	</div>
			      	<div className="col-xs-8">
				      	<div className="btn-group" data-toggle="buttons">
						  <label onClick={this.onModeClick} id="singlePlayer" className="btn btn-default active">
						    <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked />Single Player
						  </label>
						  <label onClick={this.onModeClick} id="twoPlayer" className="btn btn-default">
						    <input type="radio" name="options" id="option2" autoComplete="off" />Two Player
						  </label>
						</div>
					</div>
				</div>
				<div className="row" style={{marginBottom: 10}}>
					<div className="col-xs-4">
					Player 1 Icon:
					</div>
			      	<div className="col-xs-8">
				      	<div className="btn-group" data-toggle="buttons">
						  <label onClick={this.onIconClick} id="X" className="btn btn-default active">
						    <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked />X's
						  </label>
						  <label onClick={this.onIconClick} id="O" className="btn btn-default">
						    <input type="radio" name="options" id="option2" autoComplete="off" />O's
						  </label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-4">
					Computer Difficulty:
					</div>
			      	<div className="col-xs-8">
				      	<div className="btn-group" data-toggle="buttons">
						  <label onClick={this.onDifficultyClick} id="easy" className={"btn btn-default "+difficultyClass}>
						    <input type="radio" name="options" id="option1" autoComplete="off" />Easier
						  </label>
						  <label onClick={this.onDifficultyClick} id="hard" className={"btn btn-default active "+difficultyClass}>
						    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked />Harder
						  </label>
						</div>
					</div>
				</div>
			</div>

		    <div className="modal-footer">
		    	<button onClick={this.onPlayClick} data-dismiss="modal" type="button" className="btn btn-primary">Play</button>
		    </div>
		   </div>
		  </div>
		</div>
	</div>
		);
	}
});

module.exports = SettingsModal;

