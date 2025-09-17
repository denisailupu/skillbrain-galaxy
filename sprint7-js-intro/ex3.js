//Folosind instrucțiunea JavaScript switch se va obține ziua săptămânii
//Veți crea o funcție care va returna un șir de caractere (string) care va reprezenta numele unei zile a săptămânii în raport cu numărul acesteia pe parcursul unei săptămâni.

//Exemplu 1:
//Input: 1
//Output: “Luni”

//Exemplu 2:
//Input: 5
//Output: “Vineri”

function getDay (numar) {
    switch (numar) {
        case 0:
        day = "Sunday";
        break;
        case 1:
        day = "Monday";
        break;
        case 2:
        day = "Tuesday";
        break;
        case 3:
        day = "Wednesday";
        break;
        case 4:
        day = "Thursday";
        break;
        case 5:
        day = "Friday";
        break;
        case 6:
        day = "Saturday";
        break;
        default:
            return "Error";
    }
    return day
}

console.log (getDay(0))
console.log (getDay(4))
console.log (getDay(7))