//Scrieți o funcție numită tellFortune care:
//primește 4 argumente: numărul de copii (N), numele partenerului (Z), locația geografică (Y), locul de muncă (X). afișează pe ecranul dvs. în felul următor: "Vei fi un X în Y, căsătorie cu Z și vei avea N copii." 
// În rezolvarea problemei, vom încerca să abordăm șirurile templetizate (${variabila} este o variabilă.).
//Exemplul 1:

//Input: numarCopii: 3, numePartener: “Emanuel”, locatieGeografica: “Italia”, locMunca: “Programator”
//Output: „Vei fi un Programator în Italia , căsătorie cu Emanuel și vei avea 3 copii.

function tellFortune(numarCopii, numePartener, locatieGeografica, locMunca) {
    return "Vei fi un " + (locMunca) + " in " + (locatieGeografica) + " casatorit cu " + (numePartener) + " si vei avea " + (numarCopii) + " copii ";
}
    

const text1 = tellFortune(3, "Emanuel", "Italia", "Programator");
console.log(text1);

const text2 = tellFortune(2,"Denisa", "Madrid", "Bucatar");
console.log(text2)