//Variables
const questionInput = document.getElementById('questionInput');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const warningDiv = document.getElementById('warningDiv');
const outputDiv = document.getElementById('outputDiv');

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
    addFlashCard(flash) {
        let html = `
            <div class="flash">
                <h4>${flash.question}</h4>
                <a href="javascript:;" class="showOrHideBtn" onclick="UI.showOrHide(this)">Show/Hide Answer</a>
                <h5 class="answer" style="display: none;">${flash.answer}</h5>
                <div>
                    <button class="editBtn" onclick="UI.editCard(this)">Edit</button>
                    <button class="deleteBtn" onclick="UI.deleteCard(this)">Delete</button>
                </div>
            </div>
        `;
        outputDiv.innerHTML += html;
    }

    static showOrHide(e) {
        let answer = e.parentNode.children[2];
    
        if(answer.style.display === 'none') {
            answer.style.display = 'block';
        }
        else {
            answer.style.display = 'none';    
        }
    }

    static editCard(e) {
        let parentEl = e.parentNode.parentNode;
        questionInput.value = parentEl.children[0].textContent;
        answerInput.value = parentEl.children[2].textContent;
        parentEl.remove();
    }

    static deleteCard(e) {
        let parentEl = e.parentNode.parentNode;
        parentEl.remove();
    }

    clearFields(question, answer) {
        question.value = '';
        answer.value = '';
    }
}

//Event Listeners
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let question = questionInput.value;
    let answer = answerInput.value;

    //Instantiate Flash Card class
    let flashCard = new FlashCard(question, answer);

    //Instantiate UI class
    let ui = new UI();

    //Add flash card to output div
    ui.addFlashCard(flashCard);

    //Add flash card to html collection
    showOrHideBtn = document.getElementsByClassName('showOrHideBtn');
    
    //Empty input fields
    ui.clearFields(questionInput, answerInput);
});

