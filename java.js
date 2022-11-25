let Container = document.querySelector(".arxa");
let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let valutaParagraphFrom = document.querySelector(".birinci");
let valutaParagraphTo = document.querySelector(".ikinci");
let from, to;
eventListeners();
function eventListeners() {
    Container.addEventListener("click", handleValueta);
    input1.addEventListener("keyup", getDataByFrom);
    input2.addEventListener("keyup", getDataByTo);
}
function handleValueta(e) {
    let targetSpace = e.target;
    Array.from(targetSpace.parentElement.children).forEach((x) => x.removeAttribute("style"));
    if (targetSpace.parentElement.className.indexOf("div2") !== -1) {
        targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
        from = targetSpace.textContent;
        getDataByFrom();
    } else if (targetSpace.parentElement.className.indexOf("div3") !== -1) {
        targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
        to = targetSpace.textContent;
        getDataByFrom();
    }
}
async function getDataByFrom() {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const data = await res.json();
    input2.value = (Object.values(data.rates)[0] * input1.value.replace(",", ".")).toFixed(2);
    if (from && to) {
        valutaParagraphFrom.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
        valutaParagraphTo.textContent = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(2)} ${data.base}`;
    }
}
async function getDataByTo() {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const data = await res.json();
    input1.value = (input2.value.replace(",", ".") / Object.values(data.rates)[0]).toFixed(2);
}