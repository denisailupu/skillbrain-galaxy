//Scrieți o funcție care creează un obiect pentru a păstra informații despre rețeta ta preferată
//Ar trebui să aibă proprietăți pentru titlu (un șir de caractere), porții (un număr) și ingrediente (o șir de elemente - array).
//  Va fi afișată pe rânduri separate (o instrucțiune console.log pentru fiecare) toate informațiile după crearea acestuia.

//Exemplul 1:
//Intrare: titlu = “Pizza”, portii = 3, ingrediente = [“sunca”, “cas”, “ketchup”]
//Ieșire: { titlu: “Pizza”, portii: 3, ingrediente: [”sunca”, “cas”, “ketchup”] }

function getRetetaPaste(titlu, portii, ingrediente) {
    return {
        titlu: titlu,
        portii: portii,
        ingrediente: [...ingrediente]
    };
}

const paste = retetaPaste("Paste", 5, ["paste", "parmezan", "ou", "bacon"]);

console.log("Titlu: " + paste.titlu);
console.log("Portii: " + paste.portii);
console.log("Ingrediente: " + paste.ingrediente.join(", "));


