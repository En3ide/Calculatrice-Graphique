function parse_math(str, x) {
// gestion de x si il est donner ou non
    if(x === 0) {
        x = 1;
    }
// Effectue les premières operation
    function priorite_cal(str, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (str) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            case '%':
                return a % b;
            case '.' || ',':
                return parseFloat(a.toString()+"."+b.toString());
            case '**':
                return Math.pow(a, b);
            default:
                console.log("Opérateur non pris en charge : "+str);
        }
    }
// cinde la chaine de caractères
    function strtoMath(str, x) {
        str = str.replace(/x/g, x);
        math_ = str.match(/\d+|\*\*|[\,.%+\-*/()]/g) || [];
        res = [];
        tmp = [];
        for (i = 0; i < math_.length; i+=1) {
            element = math_[i];
            if (!isNaN(element)) {
                res.push(element);
            } else if (element === '(') {
                tmp.push(element);
            } else if (element === ')') {
                while (tmp.length > 0 && tmp[tmp.length - 1] !== '(') {
                    res.push(tmp.pop());
                }
                tmp.pop();
            } else if (element === '**') {
                // Priorité plus élevée pour la puissance
                while (
                    tmp.length > 0 &&
                    (regle_math(tmp[tmp.length - 1]) >= regle_math(element))
                ) {
                    res.push(tmp.pop());
                }
                tmp.push(element);
            } else {
                while (tmp.length > 0 && 
                    (regle_math(tmp[tmp.length - 1]) >= regle_math(element))){
                    res.push(tmp.pop());
                }
                tmp.push(element);
            }
        }
        while (tmp.length > 0)
            res.push(tmp.pop());
        return res;
    }
// renvoie la priorité d'execution en fonction du signe
    function regle_math(str) {
        switch (str) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '.':
            case ',':
            case '%':
            case '**':
                return 3;
            default:
                return 0;
        }
    }
// rassemble les nombre et applique l'opperation
    function test_1(math_) {
        liste = [];
        for (i = 0; i < math_.length; i+=1) {
            element = math_[i];
            if (!isNaN(element)) {
                liste.push(element);
            } else {
                b = parseFloat(liste.pop());
                a = parseFloat(liste.pop());
                liste.push(priorite_cal(element, a, b));
            }
        }
        return liste[0];
    }
    res = strtoMath(str, x);
    return test_1(res);
}