import {
  attr,
  clearContents,
  diceAnimation,
  endScroll,
  getNode,
  getNodes,
  insertLast,
} from "./lib/index.js";

// [phase-1] 주사위 굴리기
// 1. dice animation 불러오기
// 2. 주사위 굴리기 버튼을 클릭하면 diceAnimation 실행 될 수 있도록
//       - 주사위 굴리기 버튼을 가져온다.
//       - 이벤트 핸들러를 연결한다.
//       - 애니메이션 코드를 작성한다.
// 3. 애니메이션 토글 제어
// 4. 클로저 + IIFE 를 사용한 변수 보호

const [dice, record, reset] = getNodes("button");
const recordListWrapper = getNode(".recordListWrapper");
const tbody = getNode("tbody");

//Disable 관리
function disableElement(node) {
  if (typeof node === "string") node = getNode(node);
  node.disabled = true;
  return true;
}

function enableElement(node) {
  if (typeof node === "string") node = getNode(node);
  node.disabled = false;
  return false;
}

function isDisableState(node) {
  if (typeof node === "string") node = getNode(node);
  node.disabled === true ? console.log(true) : console.log(false);
}

//Hidden 관리
function visibleElement(node) {
  if (typeof node === "string") node = getNode(node);
  node.hidden = false;
}

function inVisibleElement(node) {
  if (typeof node === "string") node = getNode(node);
  node.hidden = true;
}

function isVisibleState(node) {
  if (typeof node === "string") node = getNode(node);

  node.hidden === true ? console.log(true) : console.log(false);
}

const handleDice = (() => {
  let isClicked = false;
  let stopDice;

  return () => {
    if (!isClicked) {
      stopDice = setInterval(diceAnimation, 100);
      disableElement(record);
      disableElement(reset);
      isDisableState(record);
    } else {
      clearInterval(stopDice);
      enableElement(record);
      enableElement(reset);
      isDisableState(record);
    }

    isClicked = !isClicked;
  };
})();

let count = 1;
let total = 0;
function handleHidden() {
  const diceValue = +attr("#cube", "data-dice");
  const template = /* html */ `
  <tr>
    <td>${count++}</td>
    <td>${diceValue}</td>
    <td>${(total += diceValue)}</td>
  </tr>
  `;
  insertLast(tbody, template);
  visibleElement(recordListWrapper);
  isVisibleState(recordListWrapper);

  endScroll(recordListWrapper);
}

function handleReset() {
  inVisibleElement(recordListWrapper);
  isVisibleState(recordListWrapper);
  disableElement(record);
  disableElement(reset);
  tbody.textContent = "";
  count = 1;
  total = 0;
}

dice.addEventListener("click", handleDice);
record.addEventListener("click", handleHidden);
reset.addEventListener("click", handleReset);
