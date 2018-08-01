// JavaScript source code

function category(id1,id2) {
    var x = document.getElementById(id1);
    var y = document.getElementById(id2);
    if (x.className.indexOf("a-show") == -1 && y.className.indexOf("b-show") == -1) {
        x.className += " a-show";
        y.className += " b-show";
        document.getElementById(id1).style.backgroundImage = "url('picture/new2.png')"
    }
    else {
      x.className = x.className.replace(" a-show", "");
      y.className = y.className.replace(" b-show", "");
      document.getElementById(id1).style.backgroundImage = "url('picture/new1.png')"
    }
}

function explain_over(id1,id2) {
    var x = document.getElementById(id1);
    var y = document.getElementById(id2);

	if(id1 == "b1")
	{	
		var str = "<h2>멸종</h2>생태학에서 절멸(extinction) 또는 멸종은 생존해 있던 종의 개체가 더 이상 세계에서 확인되지 않게 되는 것을 말한다. 해당 종을 구성하던 마지막 개체가 사망하는 시점을 멸종 시기로 본다.<br><br>▶멸종된 종에 대해 알고 싶다면?<br><a href='extinct.html' style='color:red;'>&nbsp&nbsp클릭!</a>";	
	}
	else if(id1 == "b2")
	{	
		var str = "<h2>멸종위기</h2>자연적 또는 인위적 위협 요인으로 개체 수가 감소하거나 소수만 남아 있어 가까운 장래에 절멸될 위기에 처해 있는 야생조류를 말한다.<br><br>▶멸종된 종에 대해 알고 싶다면?<br><a href='endangerd.html' style='color:red;'>&nbsp&nbsp클릭!</a>";
	}
	else if(id1 == "b3")
	{	
		var str = "<h2>관찰보호</h2>현재에는 위기에 해당하지 않으나 가까운 장래에 멸종우려 범주 중 하나에 근접하거나 멸종우려 범주 중 하나로 평가될 수 있는 상태<br><br>▶멸종된 종에 대해 알고 싶다면?<br><a href='observation.html' style='color:red;'>&nbsp&nbsp클릭!</a>";
	}

	if (x.className.indexOf("ai-show") == -1 && y.className.indexOf("e-show") == -1) {
       		x.className += " ai-show";
        	y.className += " e-show";
		document.getElementById(id1).style.backgroundSize = "150px 120px";
		document.getElementById("ex").style.lineHeight = "30px";
		document.getElementById("ex").style.color = "#323131";
		document.getElementById(id1).style.transition =".2s ease-out";
		document.getElementById(id2).style.transition =".5s ease-out";
		document.getElementById("ex").innerHTML = str;
    	}

}

function explain_out(id1,id2) {
    var x = document.getElementById(id1);
    var y = document.getElementById(id2);

    x.className = x.className.replace(" ai-show", "");
    document.getElementById(id2).style.transition ="1.8s ease-out";
    y.className = y.className.replace(" e-show", "");
    document.getElementById(id1).style.backgroundSize = "150px 50px";
}