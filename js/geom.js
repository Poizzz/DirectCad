/*
* Методы расчета геометрии
*/

/*       радианы
*        PI/2   
*  3/4PI  |    PI/4
*         |
*  PI-----0------0
*         |
*  -3/4PI |   -PI/4 
*       -PI/2  
*/

/*      cos/sin
*        0/1   
*         |    
*  -1/0   |     1/0
*    -----0------ 
*         |
*         |    
*       0/-1  
*/


function Geom () {
	
	//Получение координат центра окружности по двум точкам на окружности и радиусу
	this.CircleCenter = function(Point1, Point2 ,Radius){
		//длина хорды
		var Hl = this.LineLength(Point1,Point2);
		console.log(Hl);
		//Координаты середины хорды
		var Hcp = this.LineCenter (Point1,Point2);
		//длина высоты до центра окружноси
		var Vl = Math.sqrt(Radius*Radius-(Hl/2)*(Hl/2));
		console.log(Vl);
	};

	//Расчет длины линии
	this.LineLength = function(Point1,Point2){
		var xdif = Point2[0]-Point1[0];
		var ydif = Point2[1]-Point1[1];
		var ret = Math.sqrt(xdif*xdif+ydif*ydif);
		return ret;
	}

	//Нахождение координат серидины отрезка
	this.LineCenter = function(Point1,Point2){
		var ret = [];
		ret[0] = (Point2[0]+Point1[0])/2;
		ret[1] = (Point2[1]+Point1[1])/2;
		return ret;
	}

	//Расчет угла наклона линии
	this.LineCorner = function (Point1,Point2,show_dec){
		var rad = Math.atan2(Point2[1]-Point1[1],Point2[0]-Point1[0]); //угол в радианах
		var dec = rad*(180/Math.PI); //угол в градусах
		if (show_dec) return dec;
		return rad;
	}

	//Координаты конца отрезка (начало, угол и длина)
	this.LineEnd = function(Point1, Lenght, Corner){
		var x = Point1[0]+Lenght*Math.cos(Corner);//x=x0+R*cos(a) 
		var y = Point1[1]+Lenght*Math.sin(Corner);//y=y0+R*sin(a)		
		x = Math.round(x,0);
		y = Math.round(y,0);
		return [x,y];		
	}

	//Нахождение координат паралельного отрезка со смещением (side - право/лево right/left)
	this.LineParallel = function (Point1,Point2,Flash,side){		
		var ang = (side == 'right') ? (90 * Math.PI/180) : -(90 * Math.PI/180);
		//Находим угол наклона отрезка
		var cor = this.LineCorner(Point1,Point2);
		//Вычисляем смещенные точки начала и конца отрезка (угол +90)
		var st = this.LineEnd(Point1, Flash, cor+ang);
		var fn = this.LineEnd(Point2, Flash, cor+ang);
		return [st,fn];
	}
	
	//Нахождение координат паралельной арки со смещением (side - в центр/наружу in/out)
	this.ArkParallel = function(Point1,Point2,Flash,side){
		//Найти центр окружности
		var Center = this.CircleCenter(Point1, Point2 ,Point2[2]);
		console.log(Center);
		//Найти углы наколона радиусов до центра из концов арки
		//Найти точки начала паралельной арки на радиусе со смещением от начальных точек
		if (side == 'out') {
			Radius = Point2[2] + Flash; 	
		}
		else{
			Radius = Point2[2] - Flash; 	
		}
		var st = [Point1[0],Point1[1]];
		var fn = [Point2[0],Point2[1],Radius];
		return [st,fn];
	}

	//Параметры уровнения прямой для отрезка (Ax+By+C=0)
	this.LineEquation = function(Point1,Point2){
		var A = Point1[1]-Point2[1];
		var B = Point2[0]-Point1[0];
		var C = Point1[0]*Point2[1]-Point2[0]*Point1[1];
		return {"A":A,"B":B,"C":C};
	}

	//Точка пересечения двух прямых
	this.LineCross = function(Line1,Line2){
		//Находим параметры уравнения прямых
		var LQ1 = this.LineEquation(Line1[0],Line1[1]);
		var LQ2 = this.LineEquation(Line2[0],Line2[1]);
		
		var A1 = LQ1["A"];
		var B1 = LQ1["B"];
		var C1 = LQ1["C"];
		var A2 = LQ2["A"];
		var B2 = LQ2["B"];
		var C2 = LQ2["C"];
		//Решаем систему уравнений
		var x = (B1*C2-B2*C1)/(A1*B2-A2*B1);
		var y = (C1*A2-C2*A1)/(A1*B2-A2*B1);

		return [x,y];
	}

}

