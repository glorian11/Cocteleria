



export async function snow() {
    const snow = document.querySelector(".snow");
    let i = 0;

function createSnowflake() {
  if (i === 70) {clearInterval(createSnowflake);}
  else {
  i = i + 1;
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.top = `${Math.random() * 1}vh`;
  snowflake.style.left = `${Math.random() * 100}%`;
  snowflake.style.animationDuration = `${Math.random() * 5 + 10}s`;
  snow.appendChild(snowflake);
}
}
setInterval(createSnowflake, 1000);
}
