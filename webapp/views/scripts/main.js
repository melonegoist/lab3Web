let snowflake1 = document.getElementById("sf1");
let snowflake2 = document.getElementById("sf2");
let snowflake3 = document.getElementById("sf3");
let snowflake4 = document.getElementById("sf4");

let counter = 0;

function makeGlow() {
    if (counter%4 == 0) {
        snowflake1.src = "../img/snowflake_red.png";
        snowflake2.src = "../img/snowflake_green.png";
        snowflake3.src = "../img/snowflake_blue.png";
        snowflake4.src = "../img/snowflake_orange.png";
    } else if (counter%4 == 1) {
        snowflake1.src = "../img/snowflake_orange.png";
        snowflake2.src = "../img/snowflake_red.png";
        snowflake3.src = "../img/snowflake_green.png";
        snowflake4.src = "../img/snowflake_blue.png";
    } else if (counter%4 == 2) {
        snowflake1.src = "../img/snowflake_blue.png";
        snowflake2.src = "../img/snowflake_orange.png";
        snowflake3.src = "../img/snowflake_red.png";
        snowflake4.src = "../img/snowflake_green.png";
    } else {
        snowflake1.src = "../img/snowflake_green.png";
        snowflake2.src = "../img/snowflake_blue.png";
        snowflake3.src = "../img/snowflake_orange.png";
        snowflake4.src = "../img/snowflake_red.png";
    }

    counter++;
}

function clearCanvas() {
    canvas.clearRect(0, 0, W, H);
}

function drawArrow(fromx, fromy, tox, toy) {
    let headlen = 10;

    let dx = tox - fromx;
    let dy = toy - fromy;

    let angle = Math.atan2(dy, dx);
    
    canvas.moveTo(fromx, fromy);
    canvas.lineTo(tox, toy);
    canvas.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    canvas.moveTo(tox, toy);
    canvas.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.lineTo(x3, y3);
    canvas.fill();
    canvas.stroke();
}

function drawSector(x0, y0, rad, deg1, deg2) {
    canvas.beginPath();
    canvas.moveTo(x0, y0);
    canvas.arc(x0, y0, rad, (Math.PI/180)*deg1, (Math.PI/180)*deg2, false);
    canvas.fill();
    canvas.stroke();
}

function drawGraph(r) {
    clearCanvas();
    console.log(r);

    canvas.fillStyle = "#3b2c27";

    canvas.beginPath();
    drawArrow(0, H/2, W, H/2);
    drawArrow(W/2, H, W/2, 0);
    canvas.stroke();

    canvas.beginPath();
    canvas.fillRect(W/2-r, H/2, r, r/2);
    canvas.fill();
    canvas.stroke();

    drawTriangle(W/2, H/2, W/2+r, H/2, W/2, H/2+r/2);
    drawSector(W/2, H/2, r, 180, 270);
    drawLabel(5*scale);
}

function drawLabel(r) {
    canvas.font = "7px Verdana";  
    canvas.fillStyle = "black";

    let edge = H/2-5*scale;
    let j = -r;

    let start = (W-H)/2 
    const jScale = parseFloat((r/5).toFixed(2));

    for (let i = start+edge; i <= W-start-edge; i+=scale) {
        canvas.fillRect(i, H/2-2.5, 2, 5);
        canvas.fillText((j/scale).toFixed(1), i-5, H/2+15);

        j+=jScale;
        j = parseFloat(j.toFixed(1));
    }

    j = r;

    for (let w = edge; w <= H-edge; w+=scale) {
        if (j != 0) {
            canvas.fillRect(W/2-2.5, w, 5, 2);
            canvas.fillText((j/scale).toFixed(1), W/2-edge-10, w+5, 10);
        } 

        j -= jScale;
        j = parseFloat(j.toFixed(1));
    }
}

function checkCboxes() {
    let cboxes = document.querySelectorAll('#form input[type="checkbox"]');
    let flag = false;

    let i = 1;
    cboxes.forEach((cbox) => {
        if (cbox.checked) {
            button.style.cssText = "display: block;";
            flag = true;
            r = i;
        }

        i++;
    })

    if (!flag) {button.style.cssText = "display: none;"; drawGraph(0);}
    else {
        drawGraph(r*scale);
    }
}

let button = document.getElementById("form\:button");
let r = 0;

let graph = document.getElementById("graph");
let canvas = graph.getContext("2d");

const W = 340;
const H = 340;

const scale = (W-20)/10;


window.onchange = checkCboxes;
checkCboxes();
setInterval(makeGlow, 500);

let dataTable = document.getElementById("dataTable");

let lastRow = dataTable.innerText.split("\n").pop();
let lastRowSplitted = lastRow.split("\t");
let lastBool = lastRowSplitted.pop();

if (lastBool == "t") {
    canvas.fillStyle = "green";
}
else {
    canvas.fillStyle = "red";
}

let localX = (Number(lastRowSplitted[0])+5)*32 + 11;
let localY = (-(Number(lastRowSplitted[1]))+5)*32 + 11;

canvas.beginPath();
canvas.arc(localX, localY, 2, 0, 2*Math.PI);
canvas.fill();

graph.addEventListener('click', function(event) {
    if (r == 0) {
        return;
    }

    let rect = graph.getBoundingClientRect();

    let x = Number((event.clientX - rect.left)).toFixed(2);
    let y = Number((event.clientY - rect.top).toFixed(2));

    x -= 11;
    y -= 11;

    let xq = Number((x/32 - 5).toFixed(2));
    let yq = Number((5 - (y/32)).toFixed(2));

    let hiddenX = document.getElementById("form\:hiddenX");
    let hiddenY = document.getElementById("form\:hiddenY");

    hiddenX.value = xq;
    hiddenY.value = yq;

    canvas.fillStyle = "black";
    canvas.strokeStyle = "black";

    let newRect = graph.getBoundingClientRect();

    canvas.beginPath();
    canvas.arc((event.clientX -  newRect.left), (event.clientY - newRect.top), 2, 0, 2*Math.PI);
    canvas.fill();
    canvas.stroke();
});
