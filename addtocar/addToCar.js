(function () {
	var actionBar = document.getElementById("actionBar");
	var carContainer = "";
	var prefixes = ['', '-ms-', '-moz-', '-webkit-', '-khtml-', '-o-'];
	addtoCartAnimation = {
		a: "",
		b: "",
		c: "",
		startX: "",
		startY: 0,
		endX: "",
		endY: 0,
		second: 0,
		speed: 5,
		callback: null,
		init: function (startX, endX, rC, url, speed, cb) {
			if (!document.getElementById("carContainer")) {
				var _carContainer = document.createElement("img");
				_carContainer.className = "carContainer";
				_carContainer.id = "carContainer";
				_carContainer.src = url;
				_carContainer.style.left = startX + "px";
				actionBar.appendChild(_carContainer);
				carContainer = _carContainer;
				_carContainer = null;
				this.startX = startX;
				this.endX = endX;
				this.formula(rC);
				this.speed = speed;
				this.second = Math.abs(startX - endX) * this.speed / 1000;
				this.callback = cb;
				return this;
			}
		},
		formula: function (rC) {
			var centerX = (this.startX - this.endX) / 2 + this.endX;
			this.a = rC;
			this.b = -2 * this.a * centerX;
			this.c = -1 * this.a * this.startX * this.startX - this.b * this.startX;
		},
		move: function () {
			var that = this;
			for (var i in prefixes) {
				carContainer.style[prefixes[i] + prefixes[i] ? "A" : "a" + "nimation"] = "moveAnimation " + that.second + "s forwards";
			}
			carContainer.style.display = "block";
			var s = setInterval(function () {
				var startLeft = carContainer.offsetLeft;
				if (startLeft <= that.endX) {
					clearInterval(s);
					that.resetPosition();
					that.callback && that.callback();
					return that;
				}
				carContainer.style.left = startLeft - 1 + "px";
				startLeft = carContainer.offsetLeft;
				// y = a*x*x + b*x + c
				carContainer.style.top = that.a * startLeft * startLeft + that.b * startLeft + that.c + "px";
				console.log(carContainer.style.top)
			}, that.speed)
		},
		resetPosition: function () {
			carContainer.style.display = "none";
			carContainer.style.left = this.startX + "px";
			carContainer.style.top = this.startY + "px";

		}
	}
})()