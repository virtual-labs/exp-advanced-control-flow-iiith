window.model = {
  // Line numbers (in index.html) of each statement in the factorial programs
  simpleLines: {
    for: { prefix: "f", main: 1, declareP: 2, scanP: 3, initFact: 4, ifZero: 5, printOne: 7, returnEarly: 8, loopHead: 10, multiply: 12, printFact: 14, returnEnd: 15 },
    while: { prefix: "w", main: 1, declareP: 2, scanP: 3, initFact: 4, initI: 5, ifZero: 6, printOne: 8, returnEarly: 9, loopHead: 11, multiply: 13, decrement: 14, printFact: 16, returnEnd: 17 },
    "do-while": { prefix: "d", main: 1, declareP: 2, scanP: 3, initFact: 4, initI: 5, ifZero: 6, printOne: 8, returnEarly: 9, doHead: 11, multiply: 13, decrement: 14, loopTail: 15, printFact: 16, returnEnd: 17 },
  },
  // Runs the selected factorial program for input p and records every executed line
  buildSimpleSteps: function (loop, p) {
    var L = this.simpleLines[loop];
    var steps = [];
    var vars = { p: "", i: "", fact: "" };
    var record = function (line, note, out) {
      steps.push({ line: L.prefix + line, vars: { p: vars.p, i: vars.i, fact: vars.fact }, note: note, out: out || null });
    };
    var check = function () {
      return "check i>=1 → " + vars.i + ">=1 is " + (vars.i >= 1);
    };
    record(L.main, "Program execution starts from main().");
    vars.p = "?";
    record(L.declareP, "p is declared. It has no value yet.");
    vars.p = p;
    record(L.scanP, "The value " + p + " is read from input into p.");
    vars.fact = 1;
    record(L.initFact, "fact is declared and initialised to 1.");
    if (loop !== "for") {
      vars.i = p;
      record(L.initI, "i is declared and initialised to p, so i = " + p + ".");
    }
    record(L.ifZero, "check p==0 → " + p + "==0 is " + (p === 0));
    if (p === 0) {
      record(L.printOne, "0! is 1, so 1 is printed.", { type: "output", text: "1" });
      record(L.returnEarly, "main() returns. Program ends.");
      return steps;
    }
    var multiply = function () {
      var old = vars.fact;
      vars.fact = old * vars.i;
      record(L.multiply, "fact = fact*i = " + old + "*" + vars.i + " = " + vars.fact,
        { type: "trace", text: old + " * " + vars.i + " = " + vars.fact });
    };
    if (loop === "for") {
      vars.i = p;
      record(L.loopHead, "i is initialised to p, so i = " + p + "; " + check());
      while (vars.i >= 1) {
        multiply();
        vars.i--;
        record(L.loopHead, "i-- → i = " + vars.i + "; " + check());
      }
      // i was declared inside the for statement, so it no longer exists
      vars.i = "out of scope";
    }
    else if (loop === "while") {
      record(L.loopHead, check());
      while (vars.i >= 1) {
        multiply();
        vars.i--;
        record(L.decrement, "i-- → i = " + vars.i);
        record(L.loopHead, check());
      }
    }
    else {
      record(L.doHead, "A do-while loop runs its body once before checking the condition.");
      do {
        multiply();
        vars.i--;
        record(L.decrement, "i-- → i = " + vars.i);
        record(L.loopTail, check());
      } while (vars.i >= 1);
    }
    record(L.printFact, "The loop has ended. fact = " + vars.fact + " is printed." +
      (loop === "for" ? " i was declared inside the for statement, so it is now out of scope." : ""),
      { type: "output", text: String(vars.fact) });
    record(L.returnEnd, "main() returns. Program ends.");
    return steps;
  },
  // Runs the pyramid program for the given height and records every executed line
  buildNestedSteps: function (height) {
    var steps = [];
    var vars = { height: "", i: "", j: "", k: "" };
    var record = function (line, note, out) {
      steps.push({ line: "n" + line, vars: { height: vars.height, i: vars.i, j: vars.j, k: vars.k }, note: note, out: out || null });
    };
    var spaceLoop = function (line, printLine) {
      vars.j = 0;
      record(line, "j = 0; check j<height-i-1 → 0<" + (height - vars.i - 1) + " is " + (0 < height - vars.i - 1));
      while (vars.j < height - vars.i - 1) {
        record(printLine, "A space is printed.", { type: "char", text: " " });
        vars.j++;
        record(line, "j++ → j = " + vars.j + "; check j<height-i-1 → " + vars.j + "<" + (height - vars.i - 1) + " is " + (vars.j < height - vars.i - 1));
      }
    };
    record(1, "Program execution starts from main().");
    vars.i = vars.j = vars.k = "?";
    record(2, "i, j and k are declared. They have no values yet.");
    vars.height = "?";
    record(3, "height is declared. It has no value yet.");
    vars.height = height;
    record(4, "The value " + height + " is read from input into height.");
    vars.i = 0;
    record(5, "i = 0; check i<height → 0<" + height + " is " + (0 < height));
    while (vars.i < height) {
      spaceLoop(7, 9);
      vars.k = vars.j;
      record(11, "k = j = " + vars.k + "; check k<height-1 → " + vars.k + "<" + (height - 1) + " is " + (vars.k < height - 1));
      while (vars.k < height - 1) {
        record(13, "A star is printed.", { type: "char", text: "*" });
        record(14, "A space is printed.", { type: "char", text: " " });
        vars.k++;
        record(11, "k++ → k = " + vars.k + "; check k<height-1 → " + vars.k + "<" + (height - 1) + " is " + (vars.k < height - 1));
      }
      record(16, "The last star of row " + (vars.i + 1) + " is printed.", { type: "char", text: "*" });
      spaceLoop(17, 19);
      record(21, "A newline is printed. Row " + (vars.i + 1) + " is complete.", { type: "char", text: "\n" });
      vars.i++;
      record(5, "i++ → i = " + vars.i + "; check i<height → " + vars.i + "<" + height + " is " + (vars.i < height));
    }
    record(23, "main() returns. Program ends.");
    return steps;
  },
};

window.view = {
  mode: "simple",
  steps: [],
  stepIndex: 0,
  codeContainers: {
    for: "forLoopContent",
    while: "whileLoopContent",
    "do-while": "dowhileLoopContent",
    nested: "nestedLoopContent",
  },
  activeContainer: "",
  addClickEvent: function (id, method) {
    var element = document.getElementById(id);
    element.addEventListener("click", method, false);
  },
  replaceDiv: function (x, y) {
    document.getElementById(x).style.display = "none";
    document.getElementById(y).style.display = "block";
  },
  changeClass: function (id, className) {
    document.getElementById(id).className = className;
  },
  disableButton: function (buttonId) {
    document.getElementById(buttonId).disabled = true;
  },
  enableButton: function (buttonId) {
    document.getElementById(buttonId).disabled = false;
  },
  activateEvents: function () {
    this.addClickEvent("btnStart", function () {
      view.startBtn();
    });
    this.addClickEvent("btnNext", function () {
      view.nextBtn();
    });
    this.addClickEvent("nestedStartBtn", function () {
      view.startBtnNested();
    });
    this.addClickEvent("nestedNextBtn", function () {
      view.nextBtn();
    });
    this.addClickEvent("btnNestedLoop", function () {
      view.switchMultipleDivForNestedLoop();
    });
    this.addClickEvent("btnSimpleLoop", function () {
      view.switchMultipleDivForSimpleLoop();
    });
    document.getElementById("loopList").addEventListener("change", function () {
      view.clearExecutionSection();
      view.clearDivs();
    });
  },
  switchMultipleDivForNestedLoop: function () {
    this.endExecution();
    this.mode = "nested";
    this.replaceDiv("inputDivisionSimpleLoop", "nested");
    this.changeClass("nestedLoopLocalVariables", "localVariables");
    this.changeClass("simpleLoopLocalVariables", "localVariables hide");
    this.clearExecutionSection();
    this.clearDivs();
  },
  switchMultipleDivForSimpleLoop: function () {
    this.endExecution();
    this.mode = "simple";
    this.replaceDiv("nested", "inputDivisionSimpleLoop");
    this.changeClass("simpleLoopLocalVariables", "localVariables");
    this.changeClass("nestedLoopLocalVariables", "localVariables hide");
    this.clearExecutionSection();
    this.clearDivs();
  },
  getSelectedLoop: function () {
    return document.getElementById("loopList").value;
  },
  // Returns the integer in the input box, or null if it is not an integer in [min, max]
  readInput: function (inputId, min, max) {
    var value = document.getElementById(inputId).value.trim();
    var number = Number(value);
    if (value === "" || isNaN(number) || number % 1 !== 0 || number < min || number > max)
      return null;
    return number;
  },
  codeLinesOf: function (containerId) {
    return document.getElementById(containerId).children;
  },
  displayLoop: function (containerId) {
    this.clearExecutionSection();
    this.activeContainer = containerId;
    var lines = this.codeLinesOf(containerId);
    for (var i = 0; i < lines.length; i++)
      lines[i].className = "showDiv";
  },
  clearExecutionSection: function () {
    for (var key in this.codeContainers) {
      var lines = this.codeLinesOf(this.codeContainers[key]);
      for (var i = 0; i < lines.length; i++)
        lines[i].className = "hide";
    }
    this.activeContainer = "";
  },
  clearDivs: function () {
    var ids = ["localVariableP", "localVariableI", "localVariableFact", "nestedlocalVariableHeight",
      "nestedlocalVariableI", "nestedlocalVariableJ", "nestedlocalVariableK", "stepNote", "resultDisplay"];
    for (var i = 0; i < ids.length; i++)
      document.getElementById(ids[i]).innerHTML = "";
  },
  setVariables: function (vars) {
    if (this.mode === "simple") {
      document.getElementById("localVariableP").innerHTML = vars.p;
      document.getElementById("localVariableI").innerHTML = vars.i;
      document.getElementById("localVariableFact").innerHTML = vars.fact;
    }
    else {
      document.getElementById("nestedlocalVariableHeight").innerHTML = vars.height;
      document.getElementById("nestedlocalVariableI").innerHTML = vars.i;
      document.getElementById("nestedlocalVariableJ").innerHTML = vars.j;
      document.getElementById("nestedlocalVariableK").innerHTML = vars.k;
    }
  },
  appendOutput: function (out) {
    var display = document.getElementById("resultDisplay");
    if (out.type === "trace")
      display.innerHTML += "fact = " + out.text + "<br>";
    else if (out.type === "output")
      display.innerHTML += '<div class="programOutput">Output: ' + out.text + "</div>";
    else if (out.text === "\n")
      display.innerHTML += "<br>";
    else {
      var span = document.createElement("span");
      span.style.color = out.text === "*" ? "#0389C1" : "#FF4208";
      span.innerHTML = out.text === "*" ? "*" : "_";
      display.appendChild(span);
    }
    display.scrollTop = display.scrollHeight;
  },
  showStep: function () {
    var step = this.steps[this.stepIndex];
    var lines = this.codeLinesOf(this.activeContainer);
    for (var i = 0; i < lines.length; i++)
      lines[i].className = lines[i].id === step.line ? "showDivInRed" : "showDiv";
    this.setVariables(step.vars);
    document.getElementById("stepNote").textContent = step.note;
    if (step.out)
      this.appendOutput(step.out);
  },
  startExecution: function (startId, nextId, inputIds) {
    this.disableButton(startId);
    this.changeClass(startId, "buttonDisable startButton");
    this.enableButton(nextId);
    this.changeClass(nextId, "button nextButton");
    for (var i = 0; i < inputIds.length; i++)
      this.disableButton(inputIds[i]);
    this.changeClass("loopList", "buttonDisable loopList");
    this.clearDivs();
    this.stepIndex = 0;
    this.showStep();
  },
  endExecution: function () {
    var ids = [["btnStart", "btnNext"], ["nestedStartBtn", "nestedNextBtn"]];
    for (var i = 0; i < ids.length; i++) {
      this.enableButton(ids[i][0]);
      this.changeClass(ids[i][0], "button startButton");
      this.disableButton(ids[i][1]);
      this.changeClass(ids[i][1], "buttonDisable nextButton");
    }
    this.enableButton("loopList");
    this.changeClass("loopList", "button loopList");
    this.enableButton("simpleLoopInput");
    this.enableButton("nestedLoopInput");
  },
  startBtn: function () {
    var p = this.readInput("simpleLoopInput", 0, 12);
    if (p === null) {
      alert("Please enter an integer P from 0 to 12 (13! is too large for an int).");
      return;
    }
    var loop = this.getSelectedLoop();
    this.mode = "simple";
    this.steps = model.buildSimpleSteps(loop, p);
    this.displayLoop(this.codeContainers[loop]);
    this.startExecution("btnStart", "btnNext", ["loopList", "simpleLoopInput"]);
  },
  startBtnNested: function () {
    var height = this.readInput("nestedLoopInput", 1, 7);
    if (height === null) {
      alert("Please enter an integer height from 1 to 7.");
      return;
    }
    this.mode = "nested";
    this.steps = model.buildNestedSteps(height);
    this.displayLoop(this.codeContainers.nested);
    this.startExecution("nestedStartBtn", "nestedNextBtn", ["nestedLoopInput"]);
  },
  nextBtn: function () {
    if (this.stepIndex < this.steps.length - 1) {
      this.stepIndex++;
      this.showStep();
    }
    else {
      var lines = this.codeLinesOf(this.activeContainer);
      for (var i = 0; i < lines.length; i++)
        lines[i].className = "showDiv";
      document.getElementById("stepNote").innerHTML = "Execution finished. Press Start to run again.";
      this.endExecution();
    }
  },
  init: function () {
    this.activateEvents();
  },
};
window.onload = function () {
  view.init();
};
