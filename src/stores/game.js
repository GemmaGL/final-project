import {ref} from "vue";

let grupoTarjetas = ref(["🐼", "⭐️", "🌍", "🌵", "👻", "🎂", "🍉", "🚀", "📒", "🦊")];

function reparteTarjetas() {
  const mesa = document.querySelector("#mesa");
  console.log(mesa);
  mesa.innerHTML = "";
}