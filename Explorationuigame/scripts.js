// scripts.js

// A cute one‐line cactus poem to start
const defaultPoem =
  "Cute cactus codes under the sun, blooming ideas one by one!";

// All questions, with "No Repeat" removed and "Text Spotlight" added
const questions = [
  {
    prompt:
      "Cute Cactus loves blue but can't figure out how to paint his poem blue inside the box. Can you help?",
    heading: "🌵 Paint It Blue!",
    segments: [
      {
        type: "css",
        code: "#greeting { color: blue; }",
        label: "#greeting { color: blue; }",
      },
      {
        type: "css",
        code: "#greeting { font-size: 24px; }",
        label: "#greeting { size: 24px; }",
      },
      {
        type: "js",
        code: "document.getElementById('greeting').style.color='blue';",
        label: "JS: color='blue'",
      },
      {
        type: "js",
        code: "document.getElementById('greeting').textContent='Hi!';",
        label: "JS: change text",
      },
    ],
    check: (d) =>
      /color\s*:\s*blue/.test(d.code) ||
      /style\.color\s*=\s*'blue'/.test(d.code),
  },
  {
    prompt:
      "Cactus loves sunshine and dreams of a bright yellow room, but only inside his special box. He needs your help to make the box background sunny yellow. Will you show him how?",
    heading: "🌞 Sunny Yellow!",
    segments: [
      {
        type: "css",
        code: "#ui-box { background-color: yellow; }",
        label: "#ui-box { background: yellow; }",
      },
      {
        type: "css",
        code: "#greeting { color: green; }",
        label: "#greeting { color: green; }",
      },
      {
        type: "js",
        code: "document.getElementById('ui-box').style.backgroundColor='yellow';",
        label: "JS: bg yellow",
      },
      {
        type: "js",
        code: "console.log('sunshine');",
        label: "JS: console.log",
      },
    ],
    check: (d) =>
      /background-color\s*:\s*yellow/.test(d.code) ||
      /backgroundColor\s*=\s*'yellow'/.test(d.code),
  },
  {
    prompt:
      "Cactus found a cute photo file named **cactus.webp** in his folder and wants it as the background of his magic box. Can you help him set that image inside the box?",
    heading: "📷 Photo Fun!",
    segments: [
      {
        type: "css",
        code: "#ui-box { background-image: url('cactus.webp'); }",
        label: "#ui-box { background-image: url('cactus.webp'); }",
      },
      {
        type: "css",
        code: "#ui-box { background-color: pink; }",
        label: "#ui-box { background-color: pink; }",
      },
      {
        type: "js",
        code: "document.getElementById('ui-box').style.backgroundImage=\"url('cactus.webp')\";",
        label: "JS: backgroundImage = 'cactus.webp'",
      },
      {
        type: "js",
        code: "console.log('no image');",
        label: "JS: console.log(...)",
      },
    ],
    check: (d) =>
      /background-image\s*:\s*url\(['\"]?cactus\.webp['\"]?\)/.test(d.code) ||
      /backgroundImage\s*=\s*["'].*cactus\.webp/.test(d.code),
  },
  {
    prompt:
      "The cactus photo looks too small! He wants it to *cover* the entire box without repeating. Can you help him fill every corner?",
    heading: "🔍 Cover It Up!",
    segments: [
      {
        type: "css",
        code: "#ui-box { background-size: cover; }",
        label: "#ui-box { background-size: cover; }",
      },
      {
        type: "css",
        code: "#ui-box { background-repeat: no-repeat; }",
        label: "#ui-box { background-repeat: no-repeat; }",
      },
      {
        type: "js",
        code: "document.getElementById('ui-box').style.backgroundSize='cover';",
        label: "JS: backgroundSize = 'cover'",
      },
      {
        type: "js",
        code: "console.log('sizing');",
        label: "JS: console.log(...)",
      },
    ],
    check: (d) =>
      /background-size\s*:\s*cover/.test(d.code) ||
      /backgroundSize\s*=\s*['"]cover['"]/.test(d.code),
  },
  {
    prompt:
      "Cactus wants a white box behind his poem text so the words pop against the busy background image. Can you help him add a white backdrop just behind the greeting?",
    heading: "🤍 Text Spotlight!",
    segments: [
      {
        type: "css",
        code: "#greeting { background-color: white; }",
        label: "#greeting { background-color: white; }",
      },
      {
        type: "css",
        code: "#greeting { background-color: black; }",
        label: "#greeting { background-color: black; }",
      },
      {
        type: "js",
        code: "document.getElementById('greeting').style.backgroundColor='white';",
        label: "JS: backgroundColor='white'",
      },
      {
        type: "js",
        code: "console.log('highlight');",
        label: "JS: console.log(...)",
      },
    ],
    check: (d) =>
      /background-color\s*:\s*white/.test(d.code) ||
      /backgroundColor\s*=\s*['"]white['"]/.test(d.code),
  },
  {
    prompt:
      "Cactus adores classic books and wants his poem to look like one from an old library. He needs the box text in Times New Roman, but can’t switch fonts. Will you help him?",
    heading: "📚 Times New Roman Time!",
    segments: [
      {
        type: "css",
        code: "#ui-box { font-family: 'Times New Roman'; }",
        label: "#ui-box { font-family: 'Times New Roman'; }",
      },
      {
        type: "css",
        code: "#ui-box { font-family: Arial; }",
        label: "#ui-box { font-family: Arial; }",
      },
      {
        type: "js",
        code: "document.getElementById('ui-box').style.fontFamily='Times New Roman';",
        label: "JS: fontFamily = 'Times New Roman'",
      },
      {
        type: "js",
        code: "alert('Library vibes');",
        label: "JS: alert('Library vibes')",
      },
    ],
    check: (d) =>
      /font-family\s*:\s*'Times New Roman'/.test(d.code) ||
      /fontFamily\s*=\s*'Times New Roman'/.test(d.code),
  },
  {
    prompt:
      "Cactus wants his greeting perfectly centered in the middle of his box, but can't seem to move the words. Could you help him align the greeting dead center?",
    heading: "🎯 Center Magic!",
    segments: [
      {
        type: "css",
        code: "#greeting { text-align: center; }",
        label: "#greeting { text-align: center; }",
      },
      {
        type: "css",
        code: "#greeting { margin: 0 auto; }",
        label: "#greeting { margin: 0 auto; }",
      },
      {
        type: "js",
        code: "document.getElementById('greeting').style.textAlign='center';",
        label: "JS: textAlign center",
      },
      {
        type: "js",
        code: "document.getElementById('greeting').style.fontWeight='bold';",
        label: "JS: make bold",
      },
    ],
    check: (d) =>
      /text-align\s*:\s*center/.test(d.code) ||
      /margin\s*=\s*'0 auto'/.test(d.code),
  },
  {
    prompt:
      "Every drop into the cactus box is magical. Cactus wants the drop zone inside the box to glow light green, but he’s stuck. Will you help him paint that special zone?",
    heading: "🟢 Green Zone!",
    segments: [
      {
        type: "css",
        code: "#ui-box { background-color: lightgreen; }",
        label: "#ui-box { lightgreen; }",
      },
      {
        type: "css",
        code: "#ui-box { background-color: orange; }",
        label: "#ui-box { orange; }",
      },
      {
        type: "js",
        code: "document.getElementById('ui-box').style.backgroundColor='lightgreen';",
        label: "JS: dropzone green",
      },
      { type: "js", code: "alert('Green Box!');", label: "JS: alert" },
    ],
    check: (d) => /lightgreen/.test(d.code),
  },
  {
    prompt:
      "Cactus dreams his poem leaps off the screen in big, bold letters. He wants the greeting inside his box to grow to 48 px tall. Can you make those words gigantic?",
    heading: "📈 Go Big!",
    segments: [
      {
        type: "css",
        code: "#greeting { font-size: 48px; }",
        label: "#greeting { 48px; }",
      },
      {
        type: "css",
        code: "#greeting { font-size: 20px; }",
        label: "#greeting { 20px; }",
      },
      {
        type: "js",
        code: "document.getElementById('greeting').style.fontSize='48px';",
        label: "JS: fontSize = 48px",
      },
      {
        type: "js",
        code: "console.log('big');",
        label: "JS: console.log(...)",
      },
    ],
    check: (d) => /48px/.test(d.code),
  },
];

// State
let current = 0,
  score = 0,
  dropped = null;

// DOM refs
const qEl = document.getElementById("question");
const segs = document.getElementById("segments");
const dropzone = document.getElementById("dropzone");
const greeting = document.getElementById("greeting");
const scoreEl = document.getElementById("score-value");
const curQEl = document.getElementById("current-question");
const totQEl = document.getElementById("total-questions");
const uiHeading = document.getElementById("ui-heading");

// Initialize
totQEl.textContent = questions.length;

function loadQuestion() {
  dropped = null;
  greeting.textContent = defaultPoem;
  dropzone.textContent = "🖱️ Drag an option in!";
  curQEl.textContent = current + 1;
  scoreEl.textContent = score;

  const q = questions[current];
  qEl.textContent = q.prompt;
  uiHeading.textContent = q.heading;

  segs.innerHTML = "";
  q.segments.forEach((s) => {
    const d = document.createElement("div");
    d.className = "segment";
    d.draggable = true;
    d.textContent = s.label;
    d.dataset.code = s.code;
    d.dataset.type = s.type;
    d.addEventListener("dragstart", (e) =>
      e.dataTransfer.setData("text/plain", JSON.stringify(s))
    );
    segs.appendChild(d);
  });
}

dropzone.addEventListener("dragover", (e) => e.preventDefault());
dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  dropped = data;

  if (questions[current].check(data)) {
    if (data.type === "css") {
      const [sel, decls] = data.code.split("{");
      decls
        .replace("}", "")
        .split(";")
        .forEach((part) => {
          const [prop, val] = part.split(":").map((x) => x.trim());
          if (!prop || !val) return;
          document
            .querySelectorAll(sel.trim())
            .forEach((el) => el.style.setProperty(prop, val, "important"));
        });
    } else {
      eval(data.code);
    }
    score++;
    scoreEl.textContent = score; // immediately update the visible score
  }

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      qEl.textContent = "🎉 You're done!";
      segs.innerHTML = "";
      dropzone.innerHTML = `
        <p>Your final score is ${score}/${questions.length}.</p>
        <button id="retry" class="try-again">Try Again</button>
        <div></div>
        <button id="home" class="home">Go Back</button>

      `;
      document
        .getElementById("retry")
        .addEventListener("click", () => location.reload());

      document
      .getElementById("home")
      .addEventListener("click", () => window.location.href = "../../exploration.html");
    }
  }, 800);
});

// Kick things off
loadQuestion();
