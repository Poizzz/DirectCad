
//Класс утилит

function Utils () {

	//Перевод координат из относительных в абсолютные
	this.RelToAbs = function(data){
		var out = [];
		var base = [0,0];
		for (var i = 0; i<data.length;  i++) {
			var x = base[0]+data[i][0];
			var y = base[1]+data[i][1];
			base = [x,y];
			if(!data[i][2]) out.push([x,y]);
			else out.push([x,y,data[i][2]]);
		}
		//console.log(out);
		return out;
	}

	//Перевод координат из абсолютных в относительные
	this.AbsToRel = function(data){

	}

}