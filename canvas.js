function coordonnees_sourie(event, ctx) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    draw();
    console.log(x.toString()+y.toString());
    ctx.fillText("x = "+x.toString()+", y = "+y.toString(), -300*scale, -300*scale);
}

document.addEventListener("DOMContentLoaded", function() {
    body = document.querySelector("body");
    x = document.querySelector("tr").nextElementSibling.childNodes.childNodes;
    canvas = document.querySelector("canvas");
    canvas.width = cal_size(document.querySelector("#input_").offsetWidth, 100);
    canvas.height = cal_size(window.innerHeight, 85);
    ctx = canvas.getContext("2d");
    ctx.translate(canvas.width/2, canvas.height/2);
    text_position = -400;
    text_ecart = 20;
    font = "20px sans-serif";
    ctx.font = font;
    change_style();
    scale = 1;
    draw();
    canvas.addEventListener("click", function(event) {
        coordonnees_sourie(event, ctx)});
});

document.querySelector("#zoomIn").addEventListener("click", zoomIn);
document.querySelector("#zoomOut").addEventListener("click", zoomOut);


function zoomIn() {
    const centerX = 0;
    const centerY = 0;
    ctx.translate(centerX, centerY);
    scale += 0.1; //Augmente l'echelle du canvas
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
  
    draw();
}
  
function zoomOut() {
    const centerX = 0;
    const centerY = 0;
    ctx.translate(centerX, centerY);
    scale -= 0.1; // Diminuer l'echelle du canvs
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    draw();
}


function find_x() {
    x = document.querySelector("#first_x");
    return x.value;
}

function draw() {
    ctx.clearRect(-100*50, -100*50, 100000, 100000);
    graph();
}
function graph_line(str) {
    for(let i=-500;i<1000*scale;i+=1) {
        ctx.fillRect(-500*scale+i, 500*scale-parse_math(str, i), 1, 1);
        final = parse_math(str, i);
        console.log(final);
    }
}

function graph() {
    find_x();
    ctx.fillRect(0, -10000, 1, 1000000000000);
    ctx.fillRect(-10000,0, 1000000000000, 1);
    for(let i=-100000; i<100000;i+=5) {
        ctx.fillRect(0, i, 5, 1);
        ctx.fillRect(i, 0, 1, 5);
    }
    for(let i=-100000; i<100000;i+=25) {
        ctx.fillRect(0, i, 8, 1);
        ctx.fillRect(i, 0, 1, 8);
    }
    if(last_cal.includes("x")) {
        graph_line(last_cal);
    }
}
function result_canvas(str) {
    if(text_position > 400) {
        draw();
        text_position = -400*scale;
        ctx.fillStyle = __canvasColorSecond;
        ctx.fillText(str, 350, text_position*scale*0.75);
        text_position += text_ecart;
    }else {
        ctx.fillStyle = __canvasColorSecond;
        ctx.fillText(str, 350, text_position*scale*0.75);
        text_position += text_ecart*scale;
    }
}
function change_style() {
    __primaire = getComputedStyle(body).getPropertyValue('----primaire');
    __secondaire = getComputedStyle(body).getPropertyValue('--secondaire');
    __canvsColor = getComputedStyle(body).getPropertyValue('--canvs-color');
    __canvasColorSecond = getComputedStyle(body).getPropertyValue('--canvas-color-second');
    __textColor = getComputedStyle(body).getPropertyValue('--text-color');
    __canvasFill = getComputedStyle(body).getPropertyValue('--text-color');
    ctx.fillStyle = __canvasFill;
}

function cal_size(x, ratio) {
    return (x*ratio/100);
}
//zoomIn = document.querySelector("#zoomIn");
//zoomOut = document.querySelector("#zoomOut");

//zoomIn.addEventListener("click", zoomIn);
//zoomOut.addEventListener("click", zoomOut);
/*
class canvas_ {
    constructor(width, height, origine) {
        this.__width = width;
        this.__height = height;
        this.__origine = origine;
        this.__ratio_rect = ratio;
    }
    zoomIn() {
        // Augmenter le facteur d'échelle
        scale += 0.1;
        // Appliquer l'échelle au contexte
        ctx.scale(scale, scale);
        // Redessiner le contenu
        draw();
    }
    zoomIn() {
        // Augmenter le facteur d'échelle
        scale -= 0.1;
        // Appliquer l'échelle au contexte
        ctx.scale(scale, scale);
        // Redessiner le contenu
        draw();
    }
    get_width() {
        return this.__width;
    }
    get_height() {
        return this.__height
    }
    get_origine() {
        return this.__origine;
    }
}

class point {
    constructor(x=0, y=0, suivant=null) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.suivant = suivant;
    }
    est_vide() {
        return this.suivant === null;
    }
    add_last(x,y) {
        if(this.suivant === null)
        this.suivant = new point(x,y);
        else {
            this.add_last(x,y);
        }
    }
    find(x,y) {
        if(this.x == parseFloat(x) && this.y == parseFloat(y)) return this;
        return this.find(x,y);
    }
}*/