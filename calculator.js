function calAnswer(){

    var exp = document.getElementById("id1").value; var res = eval(exp);
    document.getElementById("output").innerHTML= res+'.';
    
    }
    
    function clearAll(){ document.getElementById("id1").value = ""; document.getElementById("output").innerHTML = '0.';
    }
    
    function onFunction(){ document.getElementById("output").innerHTML = '0.'
    }
    
    
    function delBack(){
    ex = document.getElementById("id1").value; document.getElementById("id1").value = ex.slice( 0, ex.length -
    1);
    
    }
    
    function   printName(){ document.getElementById("id1").value = ""; document.getElementById("output").innerHTML = "MHITS"; setTimeout(offCalc, 1000);
    
    }
    
    function offCalc(){ document.getElementById("id1").value = "";
     
    
    
    document.getElementById("output").innerHTML= "";
    
    }
    
    function myInput1(){ document.getElementById("id1").value += '1';
    }
    
    function myInput2(){ document.getElementById("id1").value += '2';
    }
    
    function myInput3(){ document.getElementById("id1").value += '3';
    }
    
    function myInput4(){ document.getElementById("id1").value += '4';
    }
    
    function myInput5(){ document.getElementById("id1").value += '5';
    }
    
    function myInput6(){ document.getElementById("id1").value += '6';
    }
    
    function myInput7(){ document.getElementById("id1").value += '7';
    }
    
    function myInput8(){ document.getElementById("id1").value += '8';
    }
    
    function myInput9(){
     
    
    
    document.getElementById("id1").value += '9';
    
    }
    
    function myInput0(){ document.getElementById("id1").value += '0';
    }
    
    function myInputDec(){ document.getElementById("id1").value += '.';
    }
    
    function myInputAdd(){ document.getElementById("id1").value += '+';
    }
    
    function myInputSub(){ document.getElementById("id1").value += '-';
    }
    
    function myInputMult(){ document.getElementById("id1").value += '*';
    }
    
    function myInputDiv(){ document.getElementById("id1").value += '/';
    }
    