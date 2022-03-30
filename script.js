$(document).ready(function(){

    let turn = "player1";
    let play = false;
    let tp = false;
    let alive = [];
    let increment = 0;
    let mode = 4;

    function Square(long,lat,player){
        this.long = long;
        this.lat = lat;
        this.player = "";
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
            turn = changeTurn(turn)
        }
        else {
            increment ++;
        }
        n = 3 - increment;
        $("#nbr").children().remove();
        $("#nbr").append("<div><p>coups restants : " + n + "</p><h2>" + turn +"</h2></div>")
    }


    const changeTurn = (t) => {
        if(t === "player1"){
            if(alive[1] === true){
                return "player2";
            }
            else if(alive[2] === true){
                return "player3";
            }
            else if(alive[3] === true){
                return "player4";
            }
            else {
                alert('FIN');
            }
        }
        else if(t === "player2"){
            if(alive[2] === true){
                return "player3";
            }
            else if(alive[3] === true){
                return "player4";
            }
            else if(alive[0] === true){
                return "player1";
            }
            else {
                alert('FIN');
            }
        }
        else if(t === "player3"){
            if(alive[3] === true){
                return "player4";
            }
            else if(alive[0] === true){
                return "player1";
            }
            else if(alive[1] === true){
                return "player2";
            }
            else {
                alert('FIN');
            }
        }
        else if(t === "player4"){
            if(alive[0] === true){
                return "player1";
            }
            else if(alive[1] === true){
                return "player2";
            }
            else if(alive[2] === true){
                return "player3";
            }
            else {
                alert('FIN');
            }
        }
        else{
            console.log("problem, ");
            console.log(alive);
        }
    }


    const displayBoard = (nbr) => {
        let i = 0;
        mode = nbr;
        while(i<4){
            if(i<nbr){
                alive.push(true);
            }
            else{
                alive.push(false);
            }
            i++;
        }

        i = 0;

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
        str += "</div><div id='nbr'></div>"
        $("#game").append(str);

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

        $(".square").on("click", function(){
            let id = $(this).attr("id");
            let long = parseInt(id.split("-")[0]);
            let lat = parseInt(id.split("-")[1]);
            let square = getObjSquare(long,lat);
            touch(square);
        })
    }

    const verif = (n) => {
        let i = 0;
        let arr = [];
        while(i<4){
            if(i===n){
                arr.push(false);
            }else {arr.push(alive[i]);}
            i++;
        }
        alive = arr;
    }
   

    const turnPlayerObj = () => {
        let i = 0;
        while(i<listSquares.length){
            if(turn === listSquares[i].player){
                return listSquares[i]
            }
            i++;
        }
    }

    const touch = (square) => {
        if(!play){
            if(turn === "player1" && square.long === 1){
                if(square.lat === 3 || square.lat === 4 || square.lat === 5 || square.lat === 11 || square.lat === 12 || square.lat === 13){
                    square.player = "player1";
                    getJqSquare(square.long, square.lat).addClass("player1");
                    turn = changeTurn(turn);
                }
            }else if (turn === "player2" && square.long ===15){
                if(square.lat === 3 || square.lat === 4 || square.lat === 5 || square.lat === 11 || square.lat === 12 || square.lat === 13){
                    square.player = "player2";
                    getJqSquare(square.long, square.lat).addClass("player2");
                    turn = changeTurn(turn);
                    if(mode === 2){
                        play = true;
                    }
                }
            }
            else if (turn === "player3" && square.lat ===15){
                if(square.long === 3 || square.long === 4 || square.long === 5 || square.long === 11 || square.long === 12 || square.long === 13){
                    square.player = "player3";
                    getJqSquare(square.long, square.lat).addClass("player3");
                    turn = changeTurn(turn);
                    if(mode === 3){
                        play = true;
                    }
                }
            }
            else if (turn === "player4" && square.lat ===1){
                if(square.long === 3 || square.long === 4 || square.long === 5 || square.long === 11 || square.long === 12 || square.long === 13){
                    square.player = "player4";
                    getJqSquare(square.long, square.lat).addClass("player4");
                    turn = changeTurn(turn);
                    if(mode > 3){
                        play = true;
                    }
                }
            }
            else{
                if(turn) alert("Veuillez une case de la première ligne à au moins deux cases d'un téléport." );
                else alert ("Veuillez une case de la dernière ligne à au moins deux cases d'un téléport.");
            }
        }
        else if(tp && square.teleport){
            let sq = turnPlayerObj();
            sq.player = "";
            sq.teleport = false;
            sq.wall = true;
            getJqSquare(sq.long, sq.lat)
                .removeClass("player1")
                .removeClass("player2")
                .removeClass("player3")
                .removeClass("player4")
                .removeClass("teleport")
                .addClass("wall");
            getJqSquare(square.long, square.lat).removeClass("teleport");
            square.teleport = false;
            square.player = turn;  
            if(turn === "player1"){
                $(".square").removeClass("player1");
                getJqSquare((square.long),square.lat).addClass("player1");
                
            }else if(turn === "player2"){
                $(".square").removeClass("player2");
                getJqSquare((square.long),square.lat).addClass("player2");
                
            }
            else if(turn === "player3"){
                $(".square").removeClass("player3");
                getJqSquare((square.long),square.lat).addClass("player3");
                
            }
            else if(turn === "player4"){
                $(".square").removeClass("player4");
                getJqSquare((square.long),square.lat).addClass("player4");
                
            }
            else{
                alert("PROBLEM");
            }
            doAction();
            tp = false;
        }
        else console.log("touch");
    }

    $(document).keyup(function(touche){
        let s = parseInt(turn.split('r')[1]) - 1;
        if(alive[s] === false){
            doAction();
            return;
        }
        var press = touche.which || touche.keyCode; 
    
        if(press === 90 || press === 38){
            if(turnPlayerObj().long>1 && getObjSquare((turnPlayerObj().long - 1),turnPlayerObj().lat).wall === false && tp === false){
                let sq = turnPlayerObj();
                if(getJqSquare((sq.long - 1),sq.lat).hasClass("player1") || getJqSquare((sq.long - 1),sq.lat).hasClass("player2") || getJqSquare((sq.long - 1),sq.lat).hasClass("player3") || getJqSquare((sq.long - 1),sq.lat).hasClass("player4")){
                    getJqSquare((sq.long - 1),sq.lat).removeClass("player1").removeClass("player2").removeClass("player3").removeClass("player4");
                    let n = parseInt(getObjSquare((sq.long - 1),sq.lat).player.split("r")[1]) - 1;
                    
                    verif(n);
                }
                sq.player = "";
                sq.wall = true;
                getObjSquare((sq.long - 1),sq.lat).player = turn;
                if(turn === "player1"){
                    $(".square").removeClass("player1");
                    getJqSquare((sq.long - 1),sq.lat).addClass("player1");
                }else if(turn === "player2"){
                    $(".square").removeClass("player2");
                    getJqSquare((sq.long - 1),sq.lat).addClass("player2");
                }
                else if(turn === "player3"){
                    $(".square").removeClass("player3");
                    getJqSquare((sq.long - 1),sq.lat).addClass("player3");
                }
                else if(turn === "player4"){
                    $(".square").removeClass("player4");
                    getJqSquare((sq.long - 1),sq.lat).addClass("player4");
                }
                getJqSquare((sq.long),sq.lat).addClass("wall");
                if(turnPlayerObj().teleport){ tp = true;}
                else {doAction();}
            }
        }
        else if(press === 83 || press === 40 ){
            if(turnPlayerObj().long<15 && getObjSquare((turnPlayerObj().long + 1),turnPlayerObj().lat).wall === false && tp === false){
                let sq = turnPlayerObj();
                if(getJqSquare((sq.long + 1),sq.lat).hasClass("player1") || getJqSquare((sq.long + 1),sq.lat).hasClass("player2") || getJqSquare((sq.long + 1),sq.lat).hasClass("player3") || getJqSquare((sq.long + 1),sq.lat).hasClass("player4")){
                    getJqSquare((sq.long + 1),sq.lat).removeClass("player1").removeClass("player2").removeClass("player3").removeClass("player4");
                    let n = parseInt(getObjSquare((sq.long + 1),sq.lat).player.split("r")[1]) - 1;
                    
                    verif(n)
                }
                sq.player = "";
                sq.wall = true;
                getObjSquare((sq.long + 1),sq.lat).player = turn;
                if(turn === "player1"){
                    $(".square").removeClass("player1");
                    getJqSquare((sq.long + 1),sq.lat).addClass("player1");
                }else if(turn === "player2"){
                    $(".square").removeClass("player2");
                    getJqSquare((sq.long + 1),sq.lat).addClass("player2");
                }
                else if(turn === "player3"){
                    $(".square").removeClass("player3");
                    getJqSquare((sq.long + 1),sq.lat).addClass("player3");
                }
                else if(turn === "player4"){
                    $(".square").removeClass("player4");
                    getJqSquare((sq.long + 1),sq.lat).addClass("player4");
                }
                getJqSquare((sq.long),sq.lat).addClass("wall");
                if(turnPlayerObj().teleport) {tp = true;}
                else {doAction();}
            }
            
        }
        else if(press === 81 || press === 37){
            if(turnPlayerObj().lat>1 && getObjSquare(turnPlayerObj().long,(turnPlayerObj().lat - 1)).wall === false && tp === false){
                let sq = turnPlayerObj();
                if(getJqSquare(sq.long,(sq.lat - 1)).hasClass("player1") || getJqSquare(sq.long,(sq.lat - 1)).hasClass("player2") || getJqSquare(sq.long,(sq.lat - 1)).hasClass("player3") || getJqSquare(sq.long,(sq.lat - 1)).hasClass("player4")){
                    getJqSquare(sq.long,(sq.lat - 1)).removeClass("player1").removeClass("player2").removeClass("player3").removeClass("player4");
                    let n = parseInt(getObjSquare(sq.long,(sq.lat - 1)).player.split("r")[1]) - 1;
                    
                    verif(n)
                }
                sq.player = "";
                sq.wall = true;
                getObjSquare(sq.long,(sq.lat - 1)).player = turn;
                if(turn === "player1"){
                    $(".square").removeClass("player1");
                    getJqSquare(sq.long,(sq.lat - 1)).addClass("player1");
                }else if (turn === "player2"){
                    $(".square").removeClass("player2");
                    getJqSquare(sq.long,(sq.lat - 1)).addClass("player2");
                }
                else if (turn === "player3"){
                    $(".square").removeClass("player3");
                    getJqSquare(sq.long,(sq.lat - 1)).addClass("player3");
                }
                else if (turn === "player4"){
                    $(".square").removeClass("player4");
                    getJqSquare(sq.long,(sq.lat - 1)).addClass("player4");
                }
                getJqSquare((sq.long),sq.lat).addClass("wall");
                if(turnPlayerObj().teleport) {tp = true;}
                else {doAction();}
            }
            
        }
        else if(press === 68 || press === 39){
            if(turnPlayerObj().lat<15 && getObjSquare(turnPlayerObj().long,(turnPlayerObj().lat + 1)).wall === false && tp === false){
                let sq = turnPlayerObj();
                if(getJqSquare(sq.long,(sq.lat + 1)).hasClass("player1") || getJqSquare(sq.long,(sq.lat + 1)).hasClass("player2") || getJqSquare(sq.long,(sq.lat + 1)).hasClass("player3") || getJqSquare(sq.long,(sq.lat + 1)).hasClass("player4")){
                    getJqSquare(sq.long,(sq.lat + 1)).removeClass("player1").removeClass("player2").removeClass("player3").removeClass("player4");
                    let n = parseInt(getObjSquare(sq.long,(sq.lat + 1)).player.split("r")[1]) - 1;
                    
                    verif(n);
                }
                sq.player = "";
                sq.wall = true;
                getObjSquare(sq.long,(sq.lat + 1)).player = turn;
                if(turn === "player1"){
                    $(".square").removeClass("player1");
                    getJqSquare(sq.long,(sq.lat + 1)).addClass("player1");
                }else if (turn === "player2"){
                    $(".square").removeClass("player2");
                    getJqSquare(sq.long,(sq.lat + 1)).addClass("player2");
                }
                else if (turn === "player3"){
                    $(".square").removeClass("player3");
                    getJqSquare(sq.long,(sq.lat + 1)).addClass("player3");
                }
                else if (turn === "player4"){
                    $(".square").removeClass("player4");
                    getJqSquare(sq.long,(sq.lat + 1)).addClass("player4");
                }
                getJqSquare((sq.long),sq.lat).addClass("wall");
                if(turnPlayerObj().teleport){ tp = true;}
                else {doAction();}
            }
        }
        try{
            let id = turnPlayerObj()
            let long = id.long
            let lat = id.lat
            if(turnPlayerObj().lat<15 && turnPlayerObj().lat>1 && turnPlayerObj().long<15 && turnPlayerObj().long>1){
                if (getObjSquare((long+1),lat).wall===true && getObjSquare(long,(lat+1)).wall===true && getObjSquare((long-1),lat).wall===true && getObjSquare(long,(lat-1)).wall===true){
                    console.log('!!!!')
                    getObjSquare(long,lat).player = "";
                    getJqSquare(long,lat).removeClass(turn);
                    let n = parseInt(turn.split("r")[1]) - 1;
                    verif(n);
                    turn = changeTurn(turn);
                    increment =0;
                }
            }
            else if(turnPlayerObj().lat===15){
                if(turnPlayerObj().lat>1 && turnPlayerObj().long<15 && turnPlayerObj().long>1){
                    if (getObjSquare((long+1),lat).wall===true && getObjSquare((long-1),lat).wall===true && getObjSquare(long,(lat-1)).wall===true){
                        console.log('!!!!')
                        getObjSquare(long,lat).player = "";
                        getJqSquare(long,lat).removeClass(turn);
                        let n = parseInt(turn.split("r")[1]) - 1;
                        verif(n);
                        turn = changeTurn(turn);
                        increment = 0;
                    }
                }else if(turnPlayerObj().long===15){
                    if (getObjSquare((long-1),lat).wall===true && getObjSquare(long,(lat-1)).wall===true){
                        console.log('!!!!')
                        getObjSquare(long,lat).player = "";
                        getJqSquare(long,lat).removeClass(turn);
                        let n = parseInt(turn.split("r")[1]) - 1;
                        verif(n);
                        turn = changeTurn(turn);
                        increment = 0;
                    }
                }
                else if(turnPlayerObj().long===1){
                    if (getObjSquare((long+1),lat).wall===true && getObjSquare(long,(lat-1)).wall===true){
                        console.log('!!!!')
                        getObjSquare(long,lat).player = "";
                        getJqSquare(long,lat).removeClass(turn);
                        let n = parseInt(turn.split("r")[1]) - 1;
                        verif(n);
                        turn = changeTurn(turn);
                        increment = 0;
                    }
                }
            }
            else if(turnPlayerObj().lat===1){
                if(turnPlayerObj().lat<15 && turnPlayerObj().long<15 && turnPlayerObj().long>1){
                    if (getObjSquare((long+1),lat).wall===true && getObjSquare((long-1),lat).wall===true && getObjSquare(long,(lat+1)).wall===true){
                        console.log('!!!!')
                        getObjSquare(long,lat).player = "";
                        getJqSquare(long,lat).removeClass(turn);
                        let n = parseInt(turn.split("r")[1]) - 1;
                        verif(n);
                        turn = changeTurn(turn);
                        increment = 0;
                    }
                }else if(turnPlayerObj().long===15){
                    if (getObjSquare((long-1),lat).wall===true && getObjSquare(long,(lat+1)).wall===true){
                        console.log('!!!!')
                        getObjSquare(long,lat).player = "";
                        getJqSquare(long,lat).removeClass(turn);
                        let n = parseInt(turn.split("r")[1]) - 1;
                        verif(n);
                        turn = changeTurn(turn);
                        increment = 0;
                    }
                }
                else if(turnPlayerObj().long===1){
                    if (getObjSquare((long+1),lat).wall===true && getObjSquare(long,(lat+1)).wall===true){
                        console.log('!!!!')
                        getObjSquare(long,lat).player = "";
                        getJqSquare(long,lat).removeClass(turn);
                        let n = parseInt(turn.split("r")[1]) - 1;
                        verif(n);
                        turn = changeTurn(turn);
                        increment = 0;
                    }
                }else {
                    console.log("aie aie aie");
                }
            }
        }catch{console.log("catch")}
        
        
        
    });


    

    // displayBoard();

    $("#2").on("click", () => {
        displayBoard(2);
        $("#game").css({ "z-index" : "2"});
    })
    $("#3").on("click", () => {
        displayBoard(3);
        $("#game").css({ "z-index" : "2"});
    })
    $("#4").on("click", () => {
        displayBoard(4);
        $("#game").css({ "z-index" : "2" });
    })

});