let labTitle = document.getElementById("lab");

colors = ["red", "orange", "yellow", "green"]

function paintLetters() {
    let tags = Array();

    let chars = labTitle.textContent.split('');

    chars.forEach((char) => {
        let ranNum = Math.round(Math.random()*10);
        ranNum = ranNum>3 ? ranNum%4 : ranNum;
        tags.push(`<span style="color: ${colors[ranNum]}">${char}</span>`);
    })

    labTitle.innerHTML = tags.join("");
}

function drawCircle(radius) {
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, 2*Math.PI, true);
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(radius, radius, radius-0.5, 0, 2*Math.PI, true);
    ctx.arc(radius, radius, radius-1, 0, 2*Math.PI, true);
    ctx.stroke();

    ctx.drawImage(document.getElementById("homer"), 50, 50, 100, 100);
}

function getCurrentTime() {
    let time = new Date();
    
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    
    return [hours, minutes, seconds];
}


function getArrowPos(radius, angle) {
    let x = radius * Math.sin(angle);
    let y = Math.abs(radius * Math.cos(angle));

    if (angle >= Math.PI/2 && angle < 3*Math.PI/2) return [x, radius+y];
    if (angle = 3*Math.PI/2) return [x, radius-y];

    return [x, radius-y];
}


function drawArrows(radius) {
    let currTime = getCurrentTime();

    let hours = currTime[0];
    let minutes = currTime[1];
    let seconds = currTime[2];
    
    let hourAngle = ((2*Math.PI)/12) * (Number(hours)%12);
    let minuteAngle = ((2*Math.PI)/60) * Number(minutes);
    let secondAngle = ((2*Math.PI)/60) * Number(seconds);

    let hourArrowPos = getArrowPos(radius/2, hourAngle);
    let minuteArrowPos = getArrowPos(radius, minuteAngle);
    let secondArrowPos = getArrowPos(radius, secondAngle);


    ctx.clearRect(0, 0, 200, 200);
    drawCircle(radius);
    
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius+secondArrowPos[0], secondArrowPos[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius+minuteArrowPos[0], minuteArrowPos[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius+hourArrowPos[0], hourArrowPos[1]);
    ctx.stroke();
}

let clock = document.getElementById("clock");
let ctx = clock.getContext("2d");

const radius = 99;

drawCircle(radius);

setInterval(drawArrows, 1000, radius);
setInterval(paintLetters, 1000);

let arrow = document.getElementById("arrow");

arrow.onclick = (() => {
    // arrow.src = "img/next.png";
    arrow.style.cssText = "transform: scale(100%); right: -450px;" // bottom: -800px; right: -500px";
    setTimeout((() => {location.href = "pages/";}), 1000);
});
