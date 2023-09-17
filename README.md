# Speech-Text-Reader-using-js
## Hosted Link:- https://rohitdhawale07.github.io/Speech-Text-Reader-using-js/

This is the project of creating a speech text reader which read the users text using speechSynthesis() method.
And it will also read some saved templates for user.
In your index.html file, create the HTML structure for your speech text reader. 
You'll need an input field to enter the text, a button to trigger the speech synthesis, and an empty container to display the synthesized speech.
## HTML Code
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Speech text reader</title>
    <link rel="stylesheet" href="./style.css">
    <script defer src="./index.js"></script>
</head>
<body>
    <div class="container">
        <h1>Speech Text Reader</h1>
        <button id="toggle" class="btn">Toggle Text Box</button>
    </div>
    <div id="text-box">
        <div id="close">
            <i class="fas fa-times"></i>
        </div>
        <h3>Choose Voice</h3>
        <select name="" id="voices"></select>
        <textarea name="" id="text" cols="30" rows="5" placeholder="enter text to read.."></textarea>
        <button id="read" class="btn">Read Text</button>
    </div>
    <div id="main"></div>
    

    <script src="https://kit.fontawesome.com/86a9d28744.js" crossorigin="anonymous"></script>
</body>
</html>
```
We applied approprite styling effects to our index.html page.
In the style.css file, add some basic styling to make your application visually appealing. 
You can customize this according to your preferences.
## CSS code
```
@import url('https://fonts.googleapis.com/css2?family=Lato:ital@1&family=Mooli&family=Open+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Roboto:wght@300&display=swap');
*{
    box-sizing: border-box;
}
body{
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    background-color: rgb(225, 225, 248);
    margin: 0;
}
h1{
    text-align: center;
    color: #121212;
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: 1px;
    text-shadow: 2px 7px 5px rgba(0,0,0,0.3), 
    0px -4px 10px rgba(255,255,255,0.3);
}
.container{
    margin: auto;
    padding: 2rem;
}
#toggle, #read{
    background-color: royalblue;
    color: white;
    font-size: 1.2rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 550;
}
#toggle:hover{
    opacity: 0.8;
 }
 #read:hover{
    opacity: 0.8;
 }
.btn:active {
    transform: scale(0.97);
  }
  #toggle {
    display: block;
    margin: auto;
    margin-top: 20px;
  }
  h3{
    color: white;
  }

  #text-box {
    background-color: rgb(0,0,0,0.7);
    color: #F4F4FB;
    width: 500px;
    max-width: 90vw;
    position: absolute;
    top: 30%;
    left: 50%;
    border-radius: 1rem;
    padding: 1.25rem;
    transform: translate(-50%, -800px);
    transition: all 1s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  #text-box.show {
    transform: translate(-50%, 0);
  }
  .btn:focus, select:focus {
    outline: none;
  }
  #text-box select {
    background-color: rgb(206, 213, 250);
    color: #333;
    border-radius: 1rem;
    border: 0;
    font-size: 0.75rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }
  #text-box textarea {
    border: 1px #E2DDEA solid;
    border-radius: 1rem;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    margin: 1rem 0;
    height: 150px;
    width: 100%;
  }
  #text-box .btn {
    width: 100%;
  }
  #text-box #close {
    float: right;
    text-align: right;
    cursor: pointer;
    color: rgb(95, 14, 3);
  }

  #main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 90vw;
    margin: 0 auto;
    padding-bottom: 2rem;
  }
  
  .box {
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 0.2s ease-out;
  }
  
  .box.active {
    box-shadow: 0 0 10px 5px #6B6FA9;
  }
  
  .box img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .box .info {
    background-color: #b1b5ec;
    color: #F4F4FB;
    font-size: 1.125rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    padding: 10px;
    height: 100%;
  }
  
  @media (min-width: 576px) {
    #main {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 768px) {
    #main {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1200px) {
    #main {
      grid-template-columns: repeat(4, 1fr);
    }
  }
```
In this section, we start by getting references to the DOM elements we need. These references are stored in variables for later use:

textToReadInput: This variable holds a reference to the <textarea> element with the ID text-to-read. We use this element to input the text that we want the browser to read aloud.

readButton: This variable holds a reference to the <button> element with the ID read-button. Clicking this button triggers the text-to-speech functionality.

speechContainer: This variable holds a reference to the <div> element with the ID speech-container. We will use this element to display the text being read.

SpeechSynthesisUtterance is an object that represents the speech request. 
It contains properties like text (the text to be spoken), rate (the speed of speech), 
volume (the loudness of speech), and pitch (the pitch of the voice).
We initialize utterance with the text from the textToReadInput textarea.
synth is a reference to the SpeechSynthesis interface, which provides methods for interacting with the speech synthesis service. 
We use synth.speak(utterance) to instruct the browser to speak the text provided in the utterance object.
This line adds an event listener to the "Read" button. When the button is clicked, it calls the readText function, which initiates the text-to-speech process.
In summary, the JavaScript code sets up event listeners and uses the Web Speech API to convert text to speech. 
It gets the text from the textarea, creates a SpeechSynthesisUtterance object, and instructs the browser to speak it. 
It also updates the display to indicate what text is currently being read.

## JAVASCRIPT Code
```
const main = document.getElementById("main");
const voicesSelect = document.getElementById("voices");
const toggleButton = document.getElementById("toggle");
const closeButton = document.getElementById("close");
const textarea = document.getElementById("text");
const readButton = document.getElementById("read");

// 
const data = [
    {
        image:"drink",
        text:"I'm very Thirsty",
    },
    {
        image:"food",
        text:"I'm Hungry",
    },
    {
        image:"tired",
        text:"I'm Tired",
    },
    {
        image:"hurt",
        text:"I'm Hurt",
    },
    {
        image:"happy",
        text:"I'm happy",
    },
    {
        image:"angry",
        text:"I'm Angry",
    },
    {
        image:"sad",
        text:"I'm Sad",
    },
    {
        image:"scared",
        text:"I'm Scared",
    },
    {
        image: "outside",
        text: "I Want To Go Outside",
    },
    {
        image: "home",
        text: "I Want To Go Home",
    },
    {
        image: "school",
        text: "I Want To Go To School",
    },
    {
        image: "grandma",
        text: "I Want To Go To Grandmas",
    }
    
];
// console.log(data);

// Creating box to store the above data Array

function createBox(item){
    const box = document.createElement("div")
    const { image, text } = item;
    box.classList.add("box");
    box.innerHTML = `<img src='https://github.com/bradtraversy/vanillawebprojects/blob/master/speech-text-reader/img/${image}.jpg?raw=true'/>
    <p class="info">${text}</p>`;
    
    // console.log(box);

    box.addEventListener("click", () => handleSpeech(text, box));
    main.appendChild(box);
}

data.forEach(createBox);

let voices = [];

function getVoices(){
    voices = speechSynthesis.getVoices();
    // console.log(voices);

    voices.forEach((voice)=>{
        const option = document.createElement("option")
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option)
    });
}

function handleSpeech(text,box){
     setTextMessage(text);
     speakTest();
     box.classList.add("active");
     setTimeout(()=>box.classList.remove("active"),800);
}

const message = new SpeechSynthesisUtterance();
 function setTextMessage(text){
    message.text = text;
 }
 function speakTest(){
    speechSynthesis.speak(message);
 }
 function setVoice(e) {
    message.voice = voices.find((voice) => voice.name === e.target.value);
  }

  // Event listeners

  toggleButton.addEventListener("click", () => {
    document.getElementById("text-box").classList.toggle("show");
  });
  closeButton.addEventListener("click", () => {
    document.getElementById("text-box").classList.remove("show");
  });
  speechSynthesis.addEventListener("voiceschanged", getVoices);
  voicesSelect.addEventListener("change", setVoice);
  readButton.addEventListener("click", () => {
    setTextMessage(textarea.value);
    speakTest();
  });
  
  getVoices();
```

  




