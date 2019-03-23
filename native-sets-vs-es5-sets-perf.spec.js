describe(`native sets vs es5 sets`, () => {
	var arrayOps = 0;
	var setOps = 0;
	function ArraySet() {
		this.arr = [];
	}
	ArraySet.prototype.has = function (value) {
		arrayOps += this.arr.length;
		return this.arr.indexOf(value) > -1;
	}
	ArraySet.prototype.add = function (value) {
		arrayOps++;
		if (!this.has(value)) {
			this.arr.push(value);
		}
	}
	class InstrumentedSet extends Set {
		has(value) {
			setOps++;
			return super.has(value);
		}
		add(value) {
			setOps++;
			return super.add(value);
		}
	}

	it(`should be faster than es5 array-sets`, () => {
		const arraySet = new ArraySet();
		const set = new InstrumentedSet();

		for (let x = 0; x < 1000; x++) {
			arraySet.add(x);
			set.add(x);
		}
		for (let x = 0; x < 1000; x++) {
			arraySet.has(x);
			set.has(x);
		}
		expect(arrayOps).toBeGreaterThan(setOps);
	});
});

/*

	function ObjectSet() {
		this.obj = [];
	};

	ObjectSet.prototype.has = function (value) {
		return value in this.obj;
	};

	ObjectSet.prototype.add = function (value) {
		if (!this.has(value)) {
			this.obj[value] = 1;
		}
	}


	var val = { x: 1 };
	var val2 = { x: 2 };

	var objectSet = new ObjectSet();
	objectSet.add(val);
	console.log(objectSet.has(val));
	console.log(objectSet.has(val2)); // incorrectly outputs true...
	console.log(val + ''); // because this outputs [object Object]
	console.log(val2 + ''); // and this also outputs [object Object]
 */
