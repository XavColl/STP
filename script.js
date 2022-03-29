$(document).ready(function(){

    let turn = true;
    let play = false;
    let tp = false;
    let preWall = [];
    let increment = 0;

    function Square(long,lat,player){
        this.long = long;
        this.lat = lat;
        this.player = '';
        this.wall = false;
        this.teleport = false;
    }

    let listSquares = [];
    const arrNbr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    const getJqSquare = (long, lat) => {
        return $("#" + long + "-" + lat)
    }


    const getObjSquare = (long,lat) => {
        let a = 0;
        while(a < listSquares.length){
            if(listSquares[a].long === long && listSquares[a].lat === lat){
                return listSquares[a]
            }
            a++;
        }
    }

    const doAction = () => {
        if(increment>=2){
            increment = 0;
            turn = !turn;
        }
        else {
            increment ++;
        }
    }


    const displayBoard = () => {
        let i = 0;

        while(i<arrNbr.length){
            let j = 0;
            while(j<arrNbr.length){
                let newSquare = new Square(arrNbr[i], arrNbr[j]);
                listSquares.push(newSquare);
                j++;
            }
            i++;
        }

        i = 0;
        let str = "<div id='board'> ";
        
        while(i<arrNbr.length){
            let j = 0;
            str += "<div class='row' id='row" + arrNbr[i] + "'>";
            while(j<arrNbr.length){
                str += "<div class='square' id='" + arrNbr[i] + "-" + arrNbr[j] +"'></div>"
                j++;
            }
            str += "</div>";
            i++;
        }
        str += "</div>"
        $('#game').append(str);

        getObjSquare(1,1).teleport = true;
        getObjSquare(8,1).teleport = true;
        getObjSquare(15,1).teleport = true;
        getObjSquare(6,2).teleport = true;
        getObjSquare(10,2).teleport = true;
        getObjSquare(2,6).teleport = true;
        getObjSquare(6,6).teleport = true;
        getObjSquare(10,6).teleport = true;
        getObjSquare(14,6).teleport = true;
        getObjSquare(1,8).teleport = true;
        getObjSquare(15,8).teleport = true;
        getObjSquare(2,10).teleport = true;
        getObjSquare(6,10).teleport = true;
        getObjSquare(10,10).teleport = true;
        getObjSquare(14,10).teleport = true;
        getObjSquare(6,14).teleport = true;
        getObjSquare(10,14).teleport = true;
        getObjSquare(8,15).teleport = true;
        getObjSquare(1,15).teleport = true;
        getObjSquare(15,15).teleport = true;

        i = 0;

        while(i<listSquares.length){
            if (listSquares[i].teleport){
                const jq = getJqSquare(listSquares[i].long, listSquares[i].lat);
                jq.addClass("teleport");
            }
            i++;
        }

        $('.square').on('click', function(){
            let id = $(this).attr("id");
            console.log(id);
            let long = parseInt(id.split('-')[0]);
            let lat = parseInt(id.split('-')[1]);
            let square = getObjSquare(long,lat);
            touch(square);
        })
    }

   

    const turnPlayer = () => {
        if(turn) return "player 1";
        else return "player 2"
    }

    const turnPlayerObj = () => {
        let a = 0;
        while(a<listSquares.length){
            if(turnPlayer() === listSquares[a].player){
                return listSquares[a]
            }
            a++;
        }
    }

    const touch = (square) => {
        if(!play){
            if(turn && square.long === 1){
                if(square.lat === 3 || square.lat === 4 || square.lat === 5 || square.lat === 11 || square.lat === 12 || square.lat === 13){
                    square.player = "player 1";
                    getJqSquare(square.long, square.lat).addClass('player1');
                    turn = false;
                }
            }else if (!turn && square.long ===15){
                if(square.lat === 3 || square.lat === 4 || square.lat === 5 || square.lat === 11 || square.lat === 12 || square.lat === 13){
                    square.player = "player 2";
                    getJqSquare(square.long, square.lat).addClass('player2');
                    turn = true;
                    play = true;
                }
            }
            else{
                if(turn) alert("Veuillez une case de la première ligne à au moins deux cases d'un téléport." );
                else alert ("Veuillez une case de la dernière ligne à au moins deux cases d'un téléport.");
            }
        }
        else if(tp && square.teleport){
            console.log(square);
            let sq = turnPlayerObj();
            sq.player = '';
            sq.teleport = false;
            sq.wall = true;
            console.log(sq.long + "," + sq.lat)
            getJqSquare(sq.long, sq.lat).removeClass('player1').removeClass('player2').removeClass('teleport').addClass('wall');
            getJqSquare(square.long, square.lat).removeClass('teleport');
            square.teleport = false;
            square.player = turnPlayer();  
            if(turnPlayer() === 'player 1'){
                $('.square').removeClass('player1');
                getJqSquare((square.long),square.lat).addClass('player1');
                console.log('player 1')
            }else if(turnPlayer() === 'player 2'){
                $('.square').removeClass('player2');
                getJqSquare((square.long),square.lat).addClass('player2');
                console.log('player 2')
            }
            else{
                alert('PROBLEM');
            }
            doAction();
            tp = false;
        }
        else console.log('touch');
    }

    $(document).keyup(function(touche){

        var press = touche.which || touche.keyCode; 
    
        if(press === 90 || press === 38){
            if(turnPlayerObj().long>1 && getObjSquare((turnPlayerObj().long - 1),turnPlayerObj().lat).wall === false && tp === false){
                let sq = turnPlayerObj();
                sq.player = '';
                sq.wall = true;
                getObjSquare((sq.long - 1),sq.lat).player = turnPlayer();
                if(turnPlayer() === 'player 1'){
                    $('.square').removeClass('player1');
                    getJqSquare((sq.long - 1),sq.lat).addClass('player1');
                }else {
                    $('.square').removeClass('player2');
                    getJqSquare((sq.long - 1),sq.lat).addClass('player2');
                }
                getJqSquare((sq.long),sq.lat).addClass('wall');
                if(turnPlayerObj().teleport){ tp = true;}
                else {doAction();}
            }
        }
        else if(press === 83 || press === 40 ){
            if(turnPlayerObj().long<15 && getObjSquare((turnPlayerObj().long + 1),turnPlayerObj().lat).wall === false && tp === false){
                let sq = turnPlayerObj();
                sq.player = '';
                sq.wall = true;
                getObjSquare((sq.long + 1),sq.lat).player = turnPlayer();
                if(turnPlayer() === 'player 1'){
                    $('.square').removeClass('player1');
                    getJqSquare((sq.long + 1),sq.lat).addClass('player1');
                }else {
                    $('.square').removeClass('player2');
                    getJqSquare((sq.long + 1),sq.lat).addClass('player2');
                }
                getJqSquare((sq.long),sq.lat).addClass('wall');
                if(turnPlayerObj().teleport) {tp = true;}
                else {doAction();}
            }
            
        }
        else if(press === 81 || press === 37){
            if(turnPlayerObj().lat>1 && getObjSquare(turnPlayerObj().long,(turnPlayerObj().lat - 1)).wall === false && tp === false){
                let sq = turnPlayerObj();
                sq.player = '';
                sq.wall = true;
                getObjSquare(sq.long,(sq.lat - 1)).player = turnPlayer();
                if(turnPlayer() === 'player 1'){
                    $('.square').removeClass('player1');
                    getJqSquare(sq.long,(sq.lat - 1)).addClass('player1');
                }else {
                    $('.square').removeClass('player2');
                    getJqSquare(sq.long,(sq.lat - 1)).addClass('player2');
                }
                getJqSquare((sq.long),sq.lat).addClass('wall');
                if(turnPlayerObj().teleport) {tp = true;}
                else {doAction();}
            }
            
        }
        else if(press === 68 || press === 39){
            if(turnPlayerObj().lat<15 && getObjSquare(turnPlayerObj().long,(turnPlayerObj().lat + 1)).wall === false && tp === false){
                let sq = turnPlayerObj();
                sq.player = '';
                sq.wall = true;
                getObjSquare(sq.long,(sq.lat + 1)).player = turnPlayer();
                if(turnPlayer() === 'player 1'){
                    $('.square').removeClass('player1');
                    getJqSquare(sq.long,(sq.lat + 1)).addClass('player1');
                }else {
                    $('.square').removeClass('player2');
                    getJqSquare(sq.long,(sq.lat + 1)).addClass('player2');
                }
                getJqSquare((sq.long),sq.lat).addClass('wall');
                if(turnPlayerObj().teleport){ tp = true;}
                else {doAction();}
            }
        }
    });


    

    displayBoard();

});