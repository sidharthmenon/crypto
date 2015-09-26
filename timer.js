function timer(f) {
return function(x) {
var n1 = new Date();
f(x);
return new Date() - n1;
};
}
