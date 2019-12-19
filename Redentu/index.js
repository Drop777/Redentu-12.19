const fontSize = document.querySelector(".font-size");
const textColor = document.querySelector(".text-color");
const backgroundColor = document.querySelector(".background-text-color");
const textField = document.querySelector(".text-field");
const converButton = document.querySelector(".convert-button");

function execCmd (command, value = null) {
  document.execCommand(command, false, value);
}

fontSize.addEventListener('change', () => ( execCmd("fontSize", fontSize.value)));
textColor.addEventListener('input', () => ( execCmd("foreColor", textColor.value)));
backgroundColor.addEventListener('input', () => ( execCmd("hiliteColor", backgroundColor.value)));
textField.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') { 
    event.preventDefault();
    execCmd("insertLineBreak");
  }
});

converButton.addEventListener('click', () => {
  const innerNodes = textField.querySelectorAll("*");
  const filteredInnerNodes = [...innerNodes].filter(item => {
    if((item.tagName ===  "SPAN" || item.tagName === "FONT") && item.children.length === 0) {
      return true;
    }
    return false;
  });

  const listOfNodesWithStyle = [];

  for(let i = 0; i < filteredInnerNodes.length; i++) {
      const style = window.getComputedStyle(filteredInnerNodes[i], null);
      const nodeWhitStyle = {
        text: filteredInnerNodes[i].innerText,
        color: style.color,
        fontSize: style.fontSize,
        background: style.backgroundColor
      };

      listOfNodesWithStyle.push(nodeWhitStyle);
  }

  const josnContainer = document.querySelector(".json-container");
  josnContainer.innerText = JSON.stringify(listOfNodesWithStyle, 2, 4);
});
