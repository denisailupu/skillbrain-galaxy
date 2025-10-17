//Scrieți o funcție pentru a adăuga numere nelimitate
//Funcția addNumber() returnează suma tuturor numerelor transmise ca argumente funcției. Numărul de argumente nu este definit. Se poate transmite un număr nelimitat de numere.

//Exemplu 1:
//Input: addNumber(1, 2, 3)
//Output: 6

//Exemplu 2:
//Input: addNumber(1, 2, 3, 4, 5)
//Output: 15

//Hint: Pentru a rezolva problema, vom folosi operatorul spread / rest (...) pentru a defini argumentele funcției:
//const addNumber = (…argumente) ⇒ {}

const addNumber = (...numbers) => {
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    return sum;
};

console.log("Suma numerelor 1, 2, 3 este " + addNumber(1, 2, 3));
console.log("Suma numerelor 1, 2, 3, 4, 5 este " + addNumber(1, 2, 3, 4, 5));
console.log("Suma numerelor 10, 20 este " + addNumber(10, 20));
console.log("Suma numerelor 7, 8, 9, 10 este " + addNumber(7, 8, 9, 10));