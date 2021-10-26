let option1 = document.getElementById("option1");


async function select1() {
  let res = await fetch("https://libretranslate.de/languages");
  let data = await res.json();
  data.forEach((element) => {
    let option = document.createElement("option");
    option.setAttribute("value", element.code);
    option.textContent = element.name;
    option1.append(option);
  });
}
let option2 = document.getElementById("option2");
let translateBtn = document.getElementById("translate");



async function select2() {
  let res = await fetch("https://libretranslate.de/languages");
  let data = await res.json();
  data.forEach((element) => {
    let option = document.createElement("option");
    option.setAttribute("value", element.code);
    option.textContent = element.name;
    option2.append(option);
  });
}
let translateit = document.getElementById("translateit");
let showcontent = document.getElementById("showcontent");

async function translate(source, target) {
  console.log(showcontent);
  if (
    showcontent.innerText == null ||
    showcontent.innerText == "" ||
    showcontent.innerText == undefined
  ) {
    translateit.innerText = "Please write a correct text";
  } else {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: showcontent.innerText,
        source,
        target,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let data = await res.json();
    translateit.innerText = data.translatedText;
  }
}

async function getLanguage() {
  if (option1.value != "Detect") {
    translate(option1.value, option2.value);
  } else {
    const res = await fetch("https://libretranslate.de/detect", {
      method: "POST",
      body: JSON.stringify({
        q: showcontent.innerText,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let data = await res.json();
    translate(data[0].language, option2.value);
  }
}
select1();
select2();
translateBtn.addEventListener("click", () => {
  getLanguage();
});


