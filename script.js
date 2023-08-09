
const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

var length = 8,
pass = "";

const generatePassword = async () => {
    let staticPassword = "",
    randomPassword = "hello",
    uppercase = false,
    digit = false,
    schar = false;
    
    options.forEach(option => { // looping through each option's checkbox
        if(option.checked) { // if checkbox is checked
            if(option.id === "Uppercase"){
                uppercase = true
            }
            else if(option.id === "numbers"){
                digit = true
            }
            else if(option.id === "Symbols"){
                schar = true
            }
        }
    });

    const url = `https://generate-password.up.railway.app/generate?digit=${digit}&uppercase=${uppercase}&schar=${schar}&length=${length}`
    console.log('fetching',url)
    
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.password)
    pass = data.password
 
    passwordInput.value = pass; // passing randomPassword to passwordInput value
}

const upadatePassIndicator = () => {
    // if lengthSlider value is less than 8 then pass "weak" as passIndicator id else if lengthSlider 
    // value is less than 16 then pass "medium" as id else pass "strong" as id
    passIndicator.id = lengthSlider.value <= 6 ? "weak" : lengthSlider.value < 12 ? "medium" : "strong";
    length = lengthSlider.value
}

const updateSlider = () => {
    // passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    // generatePassword();
    upadatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // copying random password
    copyIcon.innerText = "check"; // changing copy icon to tick
    copyIcon.style.color = "#4285F4";
    setTimeout(() => { // after 1500 ms, changing tick icon back to copy
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);