
function Draw (paper,system) {
	this.paper = paper;	
	this.system = (system) ? system : "absolute";

	//Отрисовка контуров
	this.regions = function (data){
		for (var i = 0; i<data.length;  i++) {			
			
			//Инициализация контура
			var frame = new FrameObj(data[i]);
			//Внутренние контуры (рекурсия)	
			//frame.calcIncludeRegions(data[i]);

			//Создаем группу для контура
			var gLayer = this.paper.append("g").attr("id",i).attr("class","frame");
			//Отрисовка границы контура	
			gLayer.append("path").attr("d", this.path(frame.region));
			if(frame.internal.length){
				gLayer.append("path").attr("d", this.path(frame.internal)).style("stroke", "blue");
			}

			//Слой импостов
			if(frame.imposts){
				var gImpost = gLayer.append("g").attr("class","imposts");
				for (var k = 0; k < frame.imposts.length;  k++) {
					gImpost.append("path").attr("d", this.path(frame.imposts[k]["region"]));
				}
			}
			

		}	
	}	


	//Создание тега path из JSON
	this.path = function(data){
		//data = this.utils.RelToAbs(data);
		var comm = (this.system === "absolute") 
			? {"M":"M", "L":" L", "A":" A"}
			: {"M":"m", "L":" l", "A":" a"};
		var d = "";
		var first = true;
		for (var i = 0; i<data.length;  i++) {
			if(first){
				d += comm["M"]+data[i];
				first = false;
			}
			else{
				switch (data[i].length){
					case 2 : d += comm["L"]+data[i]; break;
					case 3 : d += comm["A"]+data[i][2]+','+data[i][2]+' 0 0,0 '+data[i][0]+','+data[i][1]; break;
				}	
			}			
		}
		return d;
	}


}

//Главный класс объектов рисования
function Obj (){
	this.utils = new Utils();
	this.geom = new Geom();
}

FrameObj.prototype  = new Obj;

//Класс описания контуров
function FrameObj (data){
	this.region = data['region'];
	this.sizes = data['sizes'];
	this.imposts = data['imposts'];

	this.ark = this.checkArk();	
	console.log('d');
	this.internal = this.calcIncludeRegions();
}

//Прверка наличия арки в контуре
FrameObj.prototype.checkArk = function(){
	for (var i = 0; i<this.region.length;  i++) {
		if(this.region[i][2]) return true;
	}
	return false;
}

// Расчет координат внутренних контуров
FrameObj.prototype.calcIncludeRegions = function(){
	var ret = [];
	// расчет при наличии импостов
	//if(this.imposts){

	//}
	//Нет импостов, только контур
	//else{
		var Parallel = [];
		var Cross = [];
		//Нет арок
		//if(this.ark === false){
			for (var i = 0; i<this.region.length-1;  i++) {				
				//if(! this.region[i][2]) {
					//Получение координат отрезка основного контура
					var Point1 = this.region[i];
					var Point2 = this.region[i+1];
					console.log(this.region[i]);
					//Находим паралельный отрезкок со смещнеим
					var ParLine = (! this.region[i+1][2]) 
						? this.geom.LineParallel(Point1,Point2,this.sizes["r"][i])
						: this.geom.ArkParallel(Point1,Point2,this.sizes["r"][i]);
					console.log(ParLine);
					Parallel.push(ParLine);
				//}
			}
			if(Parallel.length>1){
				for (var i = 0; i<Parallel.length;  i++) {
					Cross[i] = (Parallel[i+1]) 
						? this.geom.LineCross(Parallel[i],Parallel[i+1])
						: this.geom.LineCross(Parallel[i],Parallel[0]);
				}
			}
			else{
				Cross = Parallel;
			}
			if(Cross.length > 0){
				//Добавляем первую координату в конец, чтобы замкнуть контур
				Cross.push(Cross[0]);
				ret.push(Cross);
			}
		//}
	//}	
	return ret;	
}

