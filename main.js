document.addEventListener(
    "keyup",
    (event) => {
      const keyName = event.key;
      if (keyName === "Enter") {
        calcul();
      }
    },
    false,
);
last_cal = ""; // contient la dernière operation
prompt = document.querySelector("#input_"); // Entrer de la calcultrice
result_x = document.querySelector("#result_x");

document.querySelector("#inconnue").addEventListener("click", ()=> {
    prompt.value += 'x';
});

function button_click(element){
    if(element.value <= 9 && element.value >= 0) {
        prompt.value = prompt.value + element.value;
        console.log("Entrer = "+element.value);
    }
    else {
        switch (element.innerHTML) {
            case 'i':
                console.log("test");
                prompt.value += "x";
                break;
            case ',':
                prompt.value += ',';
                break;
            case '.':
                prompt.value += '.';
                break;
            case '+':
                prompt.value += '+';
                break;
            case '-':
                prompt.value += '-';
                break;
            case 'X':
                prompt.value += '*';
                break;
            case '/':
                prompt.value += '/';
                break;
            case '%':
                prompt.value += '%';
                break;
            case '(':
                prompt.value += '(';
                break;
            case ')':
                prompt.value += ')';
                break;
            case 'C':
                prompt.value = '';
                result_x.value = 0;
                last_cal = ""; 
                draw();
                break;
            case 'DEL':
                prompt.value = prompt.value.slice(0, -1);
                break;
            case 'ZOOM+':
                //canvas +
                break;
            case 'ZOOM-':
                //canvas -
                break;
            case 'EXE':
                calcul();
                break;
        }
    }
    }

function calcul() {
    if(prompt.value != '') {
        /*output = document.querySelector("#prompt");
        output.textContent += "□"+prompt.value;*/
        last_cal = prompt.value;
        if(last_cal.includes("x")) {
            graph_line(last_cal);
        }
        res = parse_math(prompt.value, x.value)
        //output.textContent += " -> "+(res);
        result_canvas(prompt.value+" = "+ res);
        result_x.value = res;
        prompt.value = " ";
    }
    return res;
}

/*
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
    //button.textContent = `Click count: ${event.detail}`;
    prompt = document.querySelector("#prompt");
    console.log("eqgb");
    if(button.value <= 9 || button.value >= 0) {
        prompt += button.value;
        console.log("Va te faire foutre");
    }
    else {
        switch (button.value) {
            case ',':
                prompt.value += ',';
                break;
            case '.':
                prompt.value += '.';
                break;
            case '+':
                prompt.value += '+';
                break;
            case '-':
                prompt.value += '-';
                break;
            case 'X':
                prompt.value += 'X';
                break;
            case '/':
                prompt.value += '/';
                break;
            case '%':
                prompt.value += '%';
                break;
        }
    }
});*/