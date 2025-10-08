//Scrieți o funcție care returnează un obiect nou fără proprietățile furnizate
//Funcția primește 2 parametri ca date de intrare. Unul dintre parametrii obiectului, 
// iar celălalt este proprietatea care nu se dorește să persiste în rezultatul returnat.

//Exemplul 1:
//Intrare: obiect = { a: 1, b: 2 }, proprietate = “b”
//Ieșire: { a: 1 }

function eliminaPropietate (obiect, proprietate) {
    const obiectNou = {...obiect};

    delete obiectNou[proprietate];

    return obiectNou;
}

const obiectInitial = {
    a: 1,
    b: 2,
};

const rezultat = eliminaPropietate(obiectInitial, "a");

console.log(rezultat);