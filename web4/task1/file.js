window.addEventListener('load', function () {
  const img = document.querySelector("img");


  const regexes = {
    textRegex : /^[a-zA-Z]+$/,
    numberRegex : /^[0-9]+$/,
    borderRegex: /[0-9]{1}/
  }
  const width = document.querySelector("#width");
  const height = document.querySelector("#height");
  const borderSize = document.querySelector("#border-size");
  const borderColor = document.querySelector("#border-color");
  const alt = document.querySelector("#alt-text");

  const validate = (element, regex) => {
    if(!regex.test(element.value)){
      element.style.border = "1px solid red";
      return false;
    }
      element.style.border = "";
      return true;
  };
  const applyParameters = () => {
    img.style.width = `${Number.parseInt(width.value)}px`;
    img.style.height = `${Number.parseInt(height.value)}px`;
    img.style.border = `${borderSize.value}px solid ${borderColor.value.toLowerCase()}`;
    img.setAttribute("alt", alt.value);
  };

  const save = () => {
    let isValid = true;
    isValid = validate(width,regexes["numberRegex"]) &&
    validate(height,regexes["numberRegex"]) &&
    validate(borderSize,regexes["borderRegex"]) &&
    validate(borderColor,regexes["textRegex"]);
    if(isValid){ 
      applyParameters();
    }
  };
  document.querySelector("#btn").addEventListener("click", save);
})