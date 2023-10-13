let passwordRangeLength = 16;
const inputElement = document.querySelector("#gerador");
const upperCaseCheck = document.querySelector("#uppercase-check")
const numberCheck = document.querySelector("#number-check")
const symbolCheck = document.querySelector("#symbol-check")
const securityIndicatorBar = document.querySelector('#security-indicator-bar')



function generatePassaword() {
  let chars =
    "abcdefghjklmnpqrstuvwxyz";
  
  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numberChars = "123456789";
  const symbolChars = "?!@$%&*()[]";

  if(upperCaseCheck.checked){
    chars += upperCaseChars;
  };

  if (numberCheck.checked) {
    chars += numberChars; 
  }; 

  if(symbolCheck.checked){
    chars += symbolChars;
  };

  let password = "";

  for (let i = 0; i < passwordRangeLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  inputElement.value = password;
  calculateFontSize();
  calculateQuality();
}

function calculateQuality() {

  const percent = Math.round((passwordRangeLength / 64) * 25 + (upperCaseCheck.checked ? 15 : 0) + (numberCheck.checked ? 25 : 0) + (symbolCheck.checked ? 35 : 0))
  securityIndicatorBar.style.width = `${percent}%`

  if(percent > 69){
    //safe
    securityIndicatorBar.classList.remove('critical')
    securityIndicatorBar.classList.remove('warning')
    securityIndicatorBar.classList.add('safe')

  } else if(percent >50) {
    //warning
    securityIndicatorBar.classList.remove('critical')
    securityIndicatorBar.classList.add('warning')
    securityIndicatorBar.classList.remove('safe')
  }else{
    //critical
    securityIndicatorBar.classList.add('critical')
    securityIndicatorBar.classList.remove('warning')
    securityIndicatorBar.classList.remove('safe')
  }

  if (percent >= 100) {
    securityIndicatorBar.classList.add('completed')
  }else{
    securityIndicatorBar.classList.remove('completed')    
  }
}

function calculateFontSize() {
  if(passwordRangeLength > 45) {
    inputElement.classList.remove("font-sm")
    inputElement.classList.remove("font-xs")
    inputElement.classList.add("font-xxs")
  }else if(passwordRangeLength > 32){
    inputElement.classList.remove("font-sm")
    inputElement.classList.remove("font-xxs")
    inputElement.classList.add("font-xs")
  }else if(passwordRangeLength > 22){
    inputElement.classList.add("font-sm")
    inputElement.classList.remove("font-xs")
    inputElement.classList.remove("font-xxs")
  }else{
    inputElement.classList.remove("font-sm")
    inputElement.classList.remove("font-xs")
    inputElement.classList.remove("font-xxs")
  }
}

function copy() {
  navigator.clipboard.writeText(inputElement.value);
}

const passwordRange = document.querySelector("#range-password");
passwordRange.addEventListener("input", () => {
  passwordRangeLength = passwordRange.value;
  document.querySelector('#password-length-text').innerText =  passwordRangeLength;
  generatePassaword();
});
upperCaseCheck.addEventListener('click', () =>{generatePassaword})
numberCheck.addEventListener('click', () =>{generatePassaword})
symbolCheck.addEventListener('click', () =>{generatePassaword})

document.querySelector("#copiar").addEventListener("click", copy);
document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click",generatePassaword);
generatePassaword();


