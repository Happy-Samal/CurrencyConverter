console.log("Java Script is Running");
// 93863d4d6fecd3cd8ef70111 my api key
// https://v6.exchangerate-api.com/v6/93863d4d6fecd3cd8ef70111/pair/EUR/GBP
const BASE_URL ="https://v6.exchangerate-api.com/v6/93863d4d6fecd3cd8ef70111/pair/";

const dropDownSelectors = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".fromSelector");
const toCurr = document.querySelector(".toSelector");
const msg = document.querySelector(".msg")

for(let select of dropDownSelectors){
    for(let currCode in countryList){ // currCode = INR
        let NewOption = document.createElement("option");
        NewOption.innerText=currCode;
        NewOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            NewOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            NewOption.selected="selected";
        }
        select.append(NewOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}
const updateFlag =(element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode] // countryCode = IN 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // flag img src
    let img = element.parentElement.querySelector("img"); // element is now select its parent is select-container
    img.src = newSrc;
}
const updateExchangeRate = async()=>{
    let input = document.querySelector(".amount input");
    let inputValue = input.value;
    if (inputValue ==="" || inputValue < 1){
        inputValue = 1;
        input.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`; // fromCurr = select of from class and get that value . like USD , INR etc

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rate;
    console.log(rate)
    let finalAmount = inputValue * rate ;
    msg.innerText = `${inputValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate()
})
window.addEventListener("load", () => {
    updateExchangeRate();
});
