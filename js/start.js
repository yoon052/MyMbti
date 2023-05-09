const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const startBtn = document.querySelector("#start");
const result = document.querySelector("#result");
const endPoint = 12;

const select = new Array(12).fill(0);

function calResult() {
  let result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
  let point = calResult();
  const resultName = document.querySelector(".resultName");
  resultName.innerHTML = infoList[point].name;

  let resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  let imgURL = "img/image-" + point + ".png";
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  //qna 꺼짐
  // result 켜짐
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  setResult();
}

function addAnswer(whatAnswer, qidx, idx) {
  let a = document.querySelector(".answerBox");
  let answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");
  a.appendChild(answer);
  answer.innerHTML = whatAnswer;
  answer.addEventListener("click", () => {
    let children = document.querySelectorAll(".answerList");
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true; // 비활성화
      children[i].style.WebkitAnimation = "fadeOut .5s";
      children[i].style.animation = "fadeOut .5s";
    }
    setTimeout(() => {
      let target = qnaList[qidx].a[idx].type;
      for (let j = 0; j < target.length; j++) {
        select[target[j]] += 1;
      }
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
      }
      goNext(++qidx);
    }, 450);
  });
}

function goNext(index) {
  if (index + 1 === endPoint) {
    goResult();
    return;
  }
  let q = document.querySelector(".qBox");
  q.innerHTML = qnaList[index].q;
  for (let i in qnaList[index].a) {
    addAnswer(qnaList[index].a[i].answer, index, i);
  }
  let status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (index + 1) + "%";
}

function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
    qIdx++;
  }, 450);
}

startBtn.addEventListener("click", begin);
