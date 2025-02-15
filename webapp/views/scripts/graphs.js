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
}

function getR() {
    let r = 1;
    
    let i = 0;
    let cboxes = document.querySelectorAll('#form input[type="checkbox"]');
    cboxes.forEach((cbox) => {
        if (cbox.checked) r = i;
        i++;
    })

    return r;
}

let graph = document.getElementById("graph");
let canvas = graph.getContext("2d");

const W = 200;
const H = 200;

const scale = (W-20)/10;

drawGraph(getR()*25);
