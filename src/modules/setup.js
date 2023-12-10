// Description: This file contains the javascript code to setup sensor.

let bar = document.getElementById('bar');
for (var i = 0; i < 20; i++) {
    var div = document.createElement('div');
    div.className = 'bar-indicator';
    bar.appendChild(div);
}
