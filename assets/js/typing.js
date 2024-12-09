
    const lines = [
      " I'm { Ahmed Mohamed }",
      "Backend Developer specialized in ASP.NET and Business Intelligence (BI).",
      "😎",
      "Frontend Developer specialized in Angular and Business .",
      "Let's build something amazing together!",
      
    ];
    const typingSpeed = 50; // سرعة الكتابة لكل حرف
    const lineDelay = 2000;   // تأخير قبل بدء السطر الجديد

    let currentLine = 0;
    let currentChar = 0;

    function typeLine() {
      if (currentLine < lines.length) {
        const terminalOutput = document.getElementById("terminal-output");
        const currentText = terminalOutput.innerHTML;

        // كتابة الحرف الحالي
        terminalOutput.innerHTML = currentText + lines[currentLine][currentChar];
        currentChar++;

        if (currentChar < lines[currentLine].length) {
          setTimeout(typeLine, typingSpeed); // استكمال الكتابة
        } else {
          currentChar = 0;
          currentLine++;
          terminalOutput.innerHTML += "\n"; // نزول للسطر التالي
          setTimeout(typeLine, lineDelay); // استكمال السطر التالي بعد تأخير
        }
      }
    }

    typeLine();
