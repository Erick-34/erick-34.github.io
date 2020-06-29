let quizQuestions = [
    {
      question:
        "Como Harry consegue respirar debaixo d'água durante a segunda tarefa do Torneio Tribruxo?",
      a: "Ele transfigura em um tubarão",
      b: "Ele beija uma sereia",
      c: "Ele come gillyweed",
      d: "Ele executa o feitiço cabeça de bolha",
      answer: "c",
    },
    {
      question: "Qual é o nome da loja de piadas de Fred e George?",
      a: "Weasley Joke Emporium",
      b: "Weasley's Wizard Wheezes",
      c: "Fred & George's Wonder Emporium",
      d: "Zonko's Joke Shop",
      answer: "b",
    },
    {
      question: "Qual dessas NÃO é uma das Maldições Imperdoáveis?",
      a: "Cruciatus Curse",
      b: "Imperius Curse",
      c: "Sectumsempra",
      d: "Avada Kedavra",
      answer: "c",
    },
    {
      question: "Quem guarda a entrada da sala comunal da Grifinória?",
      a: "A Dama Cinzenta",
      b: "O Barão Sangrento",
      c: "Nick Quase Sem Cabeça",
      d: "A Dama Gorda",
      answer: "d",
    },
    {
      question: "O que Rony vê no Prayer Mirror?",
      a: "Ele mesmo beijando Hermione",
      b: "Ele mesmo com muito ouro",
      c: "Ele mesmo lutando contra os dementadores",
      d: "Ele mesmo segurando a Taça de Quadribol",
      answer: "d",
    },
    {
      question: "Quem é um membro da Ordem da Fênix?",
      a: "Severus Snape",
      b: "Harry Potter",
      c: "Cornelius Fudge",
      d: "Rufus Scrimgeor",
      answer: "a",
    },
    {
      question: "O que o O.W.L. ?",
      a: "Ordinary Wizarding Level",
      b: "Official Wizarding Level",
      c: "Outstanding Wizard Learning",
      d: "Outstanding Wizarding Level",
      answer: "a",
    },
    {
      question: "O que o feitiço obliviate faz?",
      a: "Destrói objetos",
      b: "Torna os objetos invisíveis",
      c: "Remove partes da memória de alguém",
      d: "Teleporta objetos para outro local",
      answer: "c",
    },
    {
      question:
        "O que Dumbledore diz a Harry que ele vê no Mirror of Erised?",
      a: "Ele mesmo segurando um par de meias",
      b: "Ele mesmo como uma fênix",
      c: "Ele mesmo caindo do céu para a morte",
      d: "Ele mesmo gemendo em profunda agonia em uma caverna escura",
      answer: "a",
    },
    {
      question: "Onde Hermione prepara seu primeiro lote de Poção Polissuco?",
      a: "Banheiro da Murta que geme",
      b: "A cozinha de Hogwarts",
      c: "A sala necessária",
      d: "Sala Comum da Grifinória",
      answer: "a",
    },
  ],
  
  correct = new Audio("assets/sounds/correct.mp3"),
  incorrect = new Audio("assets/sounds/wrong.mp3"),
  sound = true,
  index = 0,
  time = 14,
  quizFinished = false,
  resultTime,
  intervalID,
  right = 0,
  wrong = 0,
  timeout = 0;

function createButton(dataAnswer, text) {
  let newButton = $("<button>");
  newButton.text(text);
  newButton.attr("data-answer", dataAnswer);
  newButton.addClass("answer btn btn-light btn-lg btn-block");
  $("#answers").append(newButton);
}

function setupQuestion(question) {
  $("#question").html("<p>" + question.question + "</p>");
  createButton("a", question.a);
  createButton("b", question.b);
  createButton("c", question.c);
  createButton("d", question.d);
}

function clearScreen() {
  $("#question").empty();
  $("#answers").empty();
}

function reset() {
  $("#countdown").removeClass();
  $("#countdown").addClass("text-success");
  time = 14;
  $("#countdown").text("15");
  index++;
  if (index == quizQuestions.length) {
    quizFinished = true;
  }
  clearTimeout(resultTime);
  if (!quizFinished) {
    intervalID = setInterval(countdown, 1000);
    $("#question").show();
    $("#whole-countdown").show();
    $("#answers").show();
    $("#results").hide();
    clearScreen();
    setupQuestion(quizQuestions[index]);
  } else {
    $("#results")
      .html("<p>Perguntas respondidas corretamente: " + right + "</p>")
      .append("<p>Perguntas respondidas incorretamente: " + wrong + "</p>")
      .append("<p>Perguntas em que você ficou sem tempo: " + timeout + "</p>");
    $("#restart").show();
  }
}

function showResults() {
  $("#results").show();
  $("#question").hide();
  $("#whole-countdown").hide();
  $("#answers").hide();
}

function countdown() {
  $("#countdown").text(time);
  switch (time) {
    case 5:
      $("#countdown").removeClass();
      $("#countdown").addClass("text-warning");
      break;
    case 3:
      $("#countdown").removeClass();
      $("#countdown").addClass("text-danger");
      break;
    case 0:
      clearInterval(intervalID);
      $("#results").text("Acabou seu tempo! Tente pensar mais rápido...");
      showResults();
      timeout++;
      resultTime = setTimeout(reset, 3500);
      break;
  }
  time--;
}

$("#sound").on("click", function () {
  if (sound) {
    $(this).html('<i class="fas fa-volume-off"></i>');
    sound = false;
  } else {
    $(this).html('<i class="fas fa-volume-up"></i>');
    sound = true;
  }
});

$("#restart").hide();
$("#whole-countdown").hide();
$("#start").on("click", "button", function () {
  $("#whole-countdown").show();
  intervalID = setInterval(countdown, 1000);
  setupQuestion(quizQuestions[index]);
  $(this).hide();
});
$("#answers").on("click", ".answer", function () {
  const userAnswer = $(this).attr("data-answer");
  let answerString;
  clearInterval(intervalID);

  if (userAnswer == quizQuestions[index].answer) {
    if (sound) {
      correct.play();
    }
    $("#results").text("50 pontos para Grifinória!");
    right++;
    showResults();
    resultTime = setTimeout(reset, 2000);
  } else {
    if (sound) {
      incorrect.play();
    }
    switch (quizQuestions[index].answer) {
      case "a":
        answerString = quizQuestions[index].a;
        break;
      case "b":
        answerString = quizQuestions[index].b;
        break;
      case "c":
        answerString = quizQuestions[index].c;
        break;
      case "d":
        answerString = quizQuestions[index].d;
        break;
    }
    $("#results").html(
      "Avada kedavra!! A resposta seria &quot;" + answerString + "&quot;"
    );
    wrong++;
    showResults();
    resultTime = setTimeout(reset, 4000);
  }
});

$("#restart").on("click", "button", function () {
  index = -1;
  quizFinished = false;
  right = 0;
  wrong = 0;
  timeout = 0;
  reset();
  $(this).hide();
});
