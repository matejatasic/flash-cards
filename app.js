//Variables
const questionInput = document.getElementById('questionInput');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const warningDiv = document.getElementById('warningDiv');
const outputDiv = document.getElementById('outputDiv');
let keys = Math.max(...Object.keys(localStorage).map(n => parseInt(n)))+1;
let id = localStorage.length === 0 ? 0 : keys;


//Classes
class FlashCard {
    constructor(question, answer) {
        //Check input and if empty throw an error
        if(FlashCard.checkInput(question,answer)) {
            throw new Error("Fields cannot be empty");
        }
        //If input is valid instantiate object
        else {
            this.question = question;
            this.answer = answer;
        }
    }
    
    //Check input and display message if empty
    static checkInput(question, answer) {
        if(question === '' || answer === '') {
            warningDiv.style.display = 'inline-block';
            setTimeout(() => {
                warningDiv.style.display = 'none';
            }, 2000);
            return true;
        }
        else return false;
    }
}

class UI {
    //Add card to html
    addFlashCard(flash) {
        let html = `
            <div class="flash">
                <h4>${flash.question}</h4>
                <a href="javascript:;" class="showOrHideBtn" onclick="UI.showOrHide(this)">Show/Hide Answer</a>
                <h5 class="answer" style="display: none;">${flash.answer}</h5>
                <div>
                    <button id="${id}" class="editBtn" onclick="UI.editCard(this)">Edit</button>
                    <button id="${id}" class="deleteBtn" onclick="UI.deleteCard(this)">Delete</button>
                </div>
            </div>
        `;
        outputDiv.innerHTML += html;
    }

    //Store object with question and answer in local storage
    storeFlash(flash) {
        localStorage.setItem(`${id}`, JSON.stringify(flash));
        id++;
    }
    
    //Show or hide answer in a card
    static showOrHide(e) {
        let answer = e.parentNode.children[2];
    
        if(answer.style.display === 'none') {
            answer.style.display = 'block';
        }
        else {
            answer.style.display = 'none';    
        }
    }

    //Remove card and add values that you want to edit to the input
    static editCard(e) {
        let itemId = e.id;
        let parentEl = e.parentNode.parentNode;
        questionInput.value = parentEl.children[0].textContent;
        answerInput.value = parentEl.children[2].textContent;
        parentEl.remove();
        localStorage.removeItem(itemId-1);
    }

    //Remove card from html and object from local storage
    static deleteCard(e) {
        let itemId = e.id;
        let parentEl = e.parentNode.parentNode;
        parentEl.remove();
        localStorage.removeItem(itemId-1);
    }

    //Load HTML with local storage data
    static loadHTML() {
        if(localStorage.length !== 0) {
            let entries = Object.entries(localStorage).map(el => {
                return [JSON.parse(el[0]), JSON.parse(el[1])];
            });
            for(let entry of entries) {
                let html = `
                <div class="flash">
                <h4>${entry[1].question}</h4>
                <a href="javascript:;" class="showOrHideBtn" onclick="UI.showOrHide(this)">Show/Hide Answer</a>
                <h5 class="answer" style="display: none;">${entry[1].answer}</h5>
                <div>
                    <button id="${entry[0]+1}" class="editBtn" onclick="UI.editCard(this)">Edit</button>
                    <button id="${entry[0]+1}" class="deleteBtn" onclick="UI.deleteCard(this)">Delete</button>
                </div>
            </div>
            `;
            outputDiv.innerHTML += html;
            }
        }
    }

    //Clear input fields
    clearFields(question, answer) {
        question.value = '';
        answer.value = '';
    }
}

//Event Listeners
document.addEventListener('DOMContentLoaded', UI.loadHTML);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let question = questionInput.value;
    let answer = answerInput.value;

    //Instantiate Flash Card class
    let flashCard = new FlashCard(question, answer);

    //Instantiate UI class
    let ui = new UI();

    //Store Flash Card instance in local storage
    ui.storeFlash(flashCard);

    //Add flash card to output div
    ui.addFlashCard(flashCard);
    
    //Empty input fields
    ui.clearFields(questionInput, answerInput);
});

