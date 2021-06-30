
// function to get the json q and a's
fetch ("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple")
.then(res => {
  return res.json()
}) .then(data => {
  console.log(data)
  document.querySelector(".quizQuestion").innerHTML = data.results[0].question;
  document.querySelector("#correct").innerHTML = data.results[0].correct_answer;
  document.querySelector("#incorrect").innerHTML = data.results[0].incorrect_answers;
})
.catch(err => {
  console.log(err)
})




