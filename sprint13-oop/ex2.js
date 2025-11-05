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

class MasinaDeCurse extends Masina {
    constructor(marca, model, culoare, kilometraj) {
        super(marca, model, culoare, kilometraj);
    }

    participaLaCampionat(pozitiaInCampionat) {
        if (pozitiaInCampionat > 0) {
            console.log(`Am castigat locul ${pozitiaInCampionat}`);
        } else {
            console.log("Nu am castigat niciun premiu");
        }
    }
}

function mainMasinaDeCurse() {
    const masina1 = new MasinaDeCurse("BMW", "M4 Competition", "Albastru", "25 000");
    const masina2 = new MasinaDeCurse("Audi", "RS7", "Rosu", "18 000");

    console.log(masina1.proprietati);
    masina1.participaLaCampionat(2);

    console.log("");

    console.log(masina2.proprietati);
    masina2.participaLaCampionat(0);
}

mainMasinaDeCurse();