var _ = require('lodash');

var minimax = function(board, computerSymbol, humanSymbol){
    console.log('[mm]in minimax.js');
    console.log('[mm]board:',board);
    console.log('[mm]computerSymbol:',computerSymbol);
    console.log('[mm]humanSymbol:',humanSymbol);
    
    var getScore = function(board, phase){
        /*@board - current board*/
        /*@phase - 1 or -1, depending on player turn*/
        var over = gameOver(board);
        if(over){
            if(over === computerSymbol){
                return 1;
            }
            else if(over === 'tie'){
                return 0;
            }
            else{
                return -1;
            }
        }
        
        var scores = [];
        var moves = getAvailableMoves(board);
        _.forEach(moves,function(move){
            var boardCopy = cloneBoard(board);
            var optBoard = makeMove(boardCopy, move, phase*-1);
            scores.push(getScore(optBoard, phase*-1));
        });
        if(phase === 1){
            return _.min(scores);
        }
        else if(phase === -1){
            return _.max(scores);
        }
        else{
            console.assert(false, 'unexpected phase value');
        }
    };
    
    var makeMove = function(board, move, phase){
        var symbol;
        if(phase === 1){
            symbol = computerSymbol;
        } 
        else if(phase === -1) {
            symbol = humanSymbol;
        }
        else {
            console.assert(false, "unexpected phase value");
        }
        var i = move[0];
        var j = move[1];
        board[i][j] = symbol;
        return board;
    };

    
    var availableMoves = getAvailableMoves(board);
    if(availableMoves.length === 9){
        return [Math.floor(Math.random()*2),Math.floor(Math.random()*2)];
    }
    var max = -10;
    var maxMove;
    var moves = {};
    _.forEach(availableMoves, function(move){
        var boardCopy = cloneBoard(board);
        var optBoard = makeMove(boardCopy, move, 1);
        var score = getScore(optBoard, 1);
        if (score > max){
            max = score;
            maxMove = move;
        }
        moves[move]=score;
    });
    
    console.log(moves);
    return maxMove;
    
    
};

var cloneBoard = function(board){
    var i;
    var boardCopy = [];
    for (i in board){
        var line = board[i];
        boardCopy.push(line.slice(0));
    }
    return boardCopy;
};

var getAvailableMoves = function(board){
	var availableMoves = [];
	var i,j;
	for(i in board){
		var row = board[i];
		for(j in row){
			if(board[i][j] === undefined){
				availableMoves.push([i,j]);
			}
		}
	}
	return availableMoves;
}

var gameOver = function(board){
    if(checkForWin(board)){
        var [i,j] = checkForWin(board)[0]; //winning symbol
        return board[i][j];
    }
    else if(checkIfFull(board)){
        return 'tie';
    }
    else{
        return false;
    }
};

var checkForWin = function(board){
		var winningLines = [];
		winningLines.push([[0,0],[0,1],[0,2]]);
		winningLines.push([[1,0],[1,1],[1,2]]);
		winningLines.push([[2,0],[2,1],[2,2]]);
		
		winningLines.push([[0,0],[1,0],[2,0]]);
		winningLines.push([[0,1],[1,1],[2,1]]);
		winningLines.push([[0,2],[1,2],[2,2]]);
		
		winningLines.push([[0,0],[1,1],[2,2]]);
		winningLines.push([[0,2],[1,1],[2,0]]);
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
};

var checkIfFull= function(board){
		var i,j;
		var full = true;
		for(i in board){
			for (j in board[i]){
				if (board[i][j] === undefined){
					full = false;
				}
			}
		}
		return full;
};

module.exports = minimax;
