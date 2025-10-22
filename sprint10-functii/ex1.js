//Scrieți o funcție care returnează pătratul unui număr
//Funcția findSquare(num) returnează pătratul numărului primit ca date de intrare (este transmis ca argument în apelul funcției).

//Exemplu 1:
//Input: num = 6
//Output: 36

//Exemplu 2:
//Input: num = 0
//Output: 0

//Exemplu 3:
//Input: num = -12
//Output: 144

function findSquare(num) {
    const square = num * num;
    console.log(" Patratul numarului " + num + " este egal cu: " + square);
    return square;
}

const numbers = [6, 0, -12];

for (const num of numbers) {
    findSquare(num);
}