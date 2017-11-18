var calc ={
    display: "",
    clicked: "",
    currentNum: "",
    result: "",
    nextOper: "",
    repeat: false,
    ended: false
}


$(document).ready(function(){

    $(".button").on("mousedown", function(event){

        var elem = $(this);
        elem.css("boxShadow", "0px 0px 0px 0px");
        
    });

    $(".button").on("mouseup", function(event){

        var elem = $(this);
        elem.css("boxShadow", "2px 2px 2px 2px black");
        
    });


    $(".button").on("click", function(event){

        var elem = $(this);
        var value = elem.attr("value");
        

        if(!isNaN(value)){

            if(calc.ended){

                calc.display = "";
                calc.currentNum = "";
                calc.result = "";
                calc.ended = false;
            }

            if(value == 0 && calc.currentNum == "0")
                return;
            
            calc.repeat = true;

            if(calc.currentNum == "0" && calc.display == "0"){

                calc.currentNum = value;
                calc.display = value;
            }
            else if(calc.currentNum == "0"){

                calc.currentNum = value;
                calc.display = calc.display.slice(0, -1) + value;

            }
            else{

                calc.currentNum += value;
                calc.display += value;
            }

            $("#display").attr("value", calc.display);

        }

        if(value == "AC"){

            calc.display = "";
            calc.clicked = "";
            calc.currentNum = "";
            calc.result = 0;
            calc.repeat = false;
            calc.nextOper= "";
            $("#display").attr("value", "");

    
        }

        if(value == "CE"){

            

            var last = calc.display[calc.display.length - 1];
            
            if(!last)
                return;
            else if(last == " "){

                calc.display = calc.display.slice(0, -3);
                calc.nextOper = "";
                calc.repeat = true;
                $("#display").attr("value", calc.display);
            }
            else{
                calc.display = calc.display.slice(0, -1);
                calc.currentNum = calc.currentNum.slice(0,-1);
                calc.repeat = true;
                 $("#display").attr("value", calc.display);
            }
            
        }

         if(value == "x" || value == "÷" || value == "+" || value == "-"){

            if(!calc.repeat)
                return;

            operate();

            calc.currentNum = "";
            calc.nextOper = value;

            calc.display += " " + value + " ";

            $("#display").attr("value", calc.display);

            calc.ended = false;
        }

        if(value == "."){

            if(!calc.repeat || !calc.currentNum || calc.ended)    
                return;

            calc.repeat == false;

            if(!/\./.test(calc.currentNum)){
                calc.currentNum += ".";
                calc.display += ".";
            }
            
            $("#display").attr("value", calc.display);
        }

        if(value == "="){

            if(calc.currentNum && calc.nextOper){

                operate();
                calc.repeat = true;
                calc.display = calc.result;
                calc.nextOper = "";
                $("#display").attr("value", calc.display);
                calc.ended = true;
            }

        }

        
    });


});



function operate(){
  
    calc.repeat = false;

    if(!calc.result){
        calc.result = calc.currentNum;
        return;
    }

    if(calc.nextOper == "+")
        calc.result = Number(calc.result) + Number(calc.currentNum);
    else if(calc.nextOper == "-")
        calc.result = Number(calc.result) - Number(calc.currentNum);
    else if(calc.nextOper == "x")
        calc.result = Number(calc.result) * Number(calc.currentNum);
    else if(calc.nextOper == "÷")
        calc.result = Number(calc.result)/Number(calc.currentNum);   
}


