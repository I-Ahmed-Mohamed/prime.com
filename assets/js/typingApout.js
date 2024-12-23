const lines = [
"I'am Ahmed , a freelance full-stack .NET developer with expertise in both frontend and backend development. On the frontend, I create responsive and user-friendly interfaces using HTML, CSS, and JavaScript, while on the backend,I specialize in ASP.NET Core and SQL Server to build scalable, secure applications. My goal is to deliver high-quality, efficient solutions that meet my clients’ needs.",


  ];
  const typingSpeed = 10; // سرعة الكتابة لكل حرف
  const lineDelay = 1;   // تأخير قبل بدء السطر الجديد

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
