class Masina {
    constructor(marca, model, culoare, kilometraj) {
        this.marca = marca;
        this.model = model;
        this.culoare = culoare;
        this.kilometraj = kilometraj;
    }

    get proprietati() {
        return `Masina marca=${this.marca}, model=${this.model}, culoare=${this.culoare}, kilometraj=${this.kilometraj} `;
    }
}

function main() {
    const masina1 = new Masina("BMW", "X5", "Gri", "58 000");
    const masina2 = new Masina("Audi", "A4", "Negru", "24 200");
    const masina3 = new Masina("Hyundai", "i30", "Albastru", "120 000");

    console.log(masina1.proprietati);
    console.log(masina2.proprietati);
    console.log(masina3.proprietati);
}

main();