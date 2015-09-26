c64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(''), l64 = {};
for (i=0; i<64; i++)
l64[c64[i]] = i;

function alphar(s) {
// I only pray--let me be ready.
var i;
// s must contain only base-64 characters!
s = s.replace(/[^0-9A-Za-z+\/]+/g, '');
s = s.split('');
// preparse k into n-series
for (i=0; i<s.length; i++)
s[i] = l64[s[i]];
return s;
}

// circular--acraw(acraw(a, k, r, sec), k, r, sec) == a
function acraw(s, k, r, seed) {
/* seed is a sec feature;
read some papers about non-repeated initializations */
var i;
s = s.split('');
// isn't it thrilling?
for (i=0; i<s.length; i++)
s[i] = c64[l64[s[i]] ^ k[i%k.length] ^ r[i%r.length] ^ seed];
return s.join(''); // yahoo!
}

function alphac(s, k, r, on) { /* encrypt = on | off */
// get read, get set
var d, i; k=alphar(k), r=alphar(r);
// dump empty stuff
if (r.length == 0 || k.length == 0 || s.length == 0) return s;
// split s into bunches of base-64/non-base-64
s = s.match(/[^0-9A-Za-z+\/]+|[0-9A-Za-z+\/]+/g);
i = /[0-9A-Za-z+\/]/.test(s[0]) ? 0 : 1;
// give a 1-2 punch! go!
if (on)
for (; i<s.length; i+=2)
d = c64[Math.floor(Math.random()*64)],
s[i] = acraw(s[i], k, r, l64[d])+d; /* si + d, Sidney Hall */
else
for (; i<s.length; i+=2)
d = s[i].length-1,
s[i] = acraw(s[i].substring(0, d), k, r, l64[s[i].charAt(d)]);
// finished!
return s.join('');
}

