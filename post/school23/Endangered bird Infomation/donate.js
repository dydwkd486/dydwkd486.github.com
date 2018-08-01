function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
  
    e.dataTransfer.setData("text", e.target.id);
}

var x = 0;

function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
    if( x%2==0 )
    { 
	document.getElementById("donation").style.opacity = "1";
	document.getElementById("donation").style.transition =".5s ease-in";
    }
    else
    {
	document.getElementById("donation").style.opacity = "0";
    }
    x++;
}

var won = 0;
function money(){
	try{
		var a = document.getElementById("donate_money").value;
		if(a == "") throw "기부 할 금액을 입력해주세요!";
		if(isNaN(a)) throw "금액은 숫자로 입력해주세요!";
		
	}
	catch (error) {
		alert(error);
		document.getElementById("donate_money").value = "";
		return false;
	}
	alert(a+'원이 기부되었습니다!');
	won = parseInt(won)+ parseInt(a);
	document.getElementById("donate_money").value = "";
	document.getElementById("sum").innerHTML = '기부된 총 금액 : '+ won;
	
}