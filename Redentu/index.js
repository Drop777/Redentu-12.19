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
  console.log(innerNodes)
  const allChield = [];
  const filteredInnerNodes = [...innerNodes].forEach(item => {
    console.log(item.childNodes);
    for(let i = 0; i < item.childNodes.length; i++) {
      if(item.childNodes[i].nodeName === "#text") {
        allChield.push(item.childNodes[i]);
      }
    }
    }
  );

  const filteredAllChield = allChield.filter(item => item.data.trim() !== "");
  console.log(filteredAllChield)
  const listOfNodesWithStyle = [];

  for(let i = 0; i < filteredAllChield.length; i++) {
    console.log(filteredAllChield[i])
      const style = window.getComputedStyle(filteredAllChield[i].parentNode, null);
      const nodeWhitStyle = {
        text: filteredAllChield[i].textContent,
        color: style.color,
        fontSize: style.fontSize,
        background: style.backgroundColor
      };

      listOfNodesWithStyle.push(nodeWhitStyle);
  }

  const josnContainer = document.querySelector(".json-container");
  josnContainer.innerText = JSON.stringify(listOfNodesWithStyle, 2, 4);
});
