const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const diceBtn = document.getElementById("zar-btn");

async function getAdvice() {
  console.log("Butonul a fost apăsat ✅");

  diceBtn.disabled = true;
  diceBtn.style.opacity = "0.6";
  diceBtn.style.cursor = "not-allowed";
  console.log("Trebuie să aștepți 5 secunde ⏳");

  const waitMessage = document.createElement("p");
  waitMessage.textContent = "Așteaptă 5 secunde...";
  waitMessage.style.color = "hsl(150, 100%, 66%)";
  waitMessage.style.marginTop = "1rem";
  waitMessage.id = "wait-msg";
  adviceText.insertAdjacentElement("afterend", waitMessage);

  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();

  adviceId.textContent = data.slip.id;
  adviceText.textContent = `"${data.slip.advice}"`;

  setTimeout(() => {
    diceBtn.disabled = false;
    diceBtn.style.opacity = "1";
    diceBtn.style.cursor = "pointer";

    waitMessage.remove();

    console.log("Au trecut cele 5 secunde ✅ Poți apăsa din nou.");
  }, 5000);
}

diceBtn.addEventListener("click", getAdvice);

