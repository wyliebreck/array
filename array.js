Array.prototype.checkSomeAndAllNumbers = function() {
  if (this.length === 0) throw new Error("Array has zero length");
  else for (let i = 0; i < this.length; i++) if (typeof this[i] !== "number" || !isFinite(this[i])) throw new Error("Array element is not a number");
  return true;
}
Array.prototype.checkSomeAndAllStrings = function() {
  if (this.length === 0) throw new Error("Array has zero length");
  else for (let i = 0; i < this.length; i++) if (typeof this[i] !== "string") throw new Error("Array element is not a string");
  return true;
}
Array.prototype.extants = function() {
  return this.filter(x => x !== null && x !== undefined && !Number.isNaN(x));
}
Array.prototype.frequencies = function() {
  let frequencies = {};
  for (let item of this) frequencies[item] = (frequencies[item] ?? 0) + 1;
  let tbl = new Table();
  for (let [key, value] of Object.entries(frequencies)) tbl.insert({value: key, frequency: value});
  return tbl;
}
Array.prototype.max = function() {
  this.checkSomeAndAllNumbers();
  return Math.max(...this);
};
Array.prototype.mean = function() {
  return this.sum()/this.length;
};
Array.prototype.median = function() {
  return this.quantile(0.5);
};
Array.prototype.min = function() {
  this.checkSomeAndAllNumbers();
  return Math.min(...this);
};
Array.prototype.pb = function(y) {
  let x0 = this.filter((elt, index) => y[index] === 0).extants();
  let x1 = this.filter((elt, index) => y[index] === 1).extants();
  let x = [...x0, ...x1];
  return (x1.mean()-x0.mean())/x.sd() * Math.sqrt(x1.length*x0.length / x.length**2);
}
Array.prototype.quantile = function(q) {
  this.checkSomeAndAllNumbers();
  this.sort((a, b) => a - b);
  let num = this.length*q;
  if (Math.floor(num) !== num) return this[Math.floor(num)]
  return (this[num - 1] + this[num])/2;
};
Array.prototype.range = function() {
  return this.max() - this.min();
};
Array.prototype.sd = function() {
  return Math.sqrt(this.variance());
};
Array.prototype.sum = function() {
  this.checkSomeAndAllNumbers();
  return this.reduce((result, x) => result + x, 0);
};
Array.prototype.ss = function() {
  let mean = this.mean();
  return this.reduce((result, x) => result + (x - mean)**2, 0);
};
Array.prototype.uniques = function() {
	return [...new Set(this)];
};
Array.prototype.variance = function() {
  return this.ss()/this.length;
};
