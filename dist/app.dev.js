"use strict";

// function to get the json q and a's
fetch("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple").then(function (res) {
  return res.json();
}).then(function (data) {
  document.querySelector(".quizQuestion").innerHTML = data.results[0].question; // document.querySelector("#correct").innerHTML = data.results[0].correct_answer;

  var incorrectAnswers = data.results[0].incorrect_answers;
  var answersObj = incorrectAnswers.map(function (incorrect_answers) {
    var incorrectObj = {
      value: incorrect_answers
    };
    return incorrectObj;
  });
  answersObj.push({
    value: data.results[0].correct_answer
  });

  var shuffle = function shuffle(answersObj) {
    var oldElement;

    for (var i = answersObj.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      oldElement = incorrectAnswersObj[i];
      answersObj[i] = answersObj[rand];
      answersObj[rand] = oldElement;
    }

    return answersObj;
  };

  console.log(answersObj);
  document.querySelector(".answer0").innerHTML = answersObj[0].value;
  document.querySelector(".answer1").innerHTML = answersObj[1].value;
  document.querySelector(".answer2").innerHTML = answersObj[2].value;
  document.querySelector(".answer3").innerHTML = answersObj[3].value; // const resultAnswersArr = shuffle(incorrectAnswersObj)
  // console.log(resultAnswersArr);
  // const createBtns = (answersObj) => {
  //   var btn1 = document.createElement("BUTTON");
  //   btn1.classlist.add("answer");
  //   btn1.innerHTML = resultAnswersArr[0];
  // let btn = document.createElement("button");
  // btn.innerHTML = answersObj[0];
  //   var btn2 = document.createElement("BUTTON");
  //   btn2.classlist.add("answer");
  //   btn2.innerHTML = resultAnswersArr[1];
  //   var btn3 = document.createElement("BUTTON");
  //   btn3.classlist.add("answer");
  //   btn3.innerHTML = resultAnswersArr[2];
  //   var btn4 = document.createElement("BUTTON");
  //   btn4.classlist.add("answer");
  //   btn4.innerHTML = resultAnswersArr[3];
  // responseBtnsContainer.appendChild(btn)
  //   responseBtnsContainer.appendChild(btn2)
  //   responseBtnsContainer.appendChild(btn3)
  //   responseBtnsContainer.appendChild(btn4)
  // createBtns()
  // };
  // for(let i = 0; i < 4; i++) [
  //   const createBtns = document.createElement("button");
  //   const btncontent = resultAnswersArr[i];
  //   createBtns.innerHTML = btncontent;
  //   responseBtnsContainer.appendChild(createBtns);
  // }
});