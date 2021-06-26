
    
// setTimeOut
const wait = (duration) => new Promise(resolve => setTimeout(resolve, duration));

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(500);
  popup.remove();
}

function ask(options) {

  return new Promise(async function(resolve) {
    // Create Popup Form
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML('afterbegin',
    `<fieldset>
        <label>${options.title}</label>
        <input type= 'text' name = 'input'>
        <button type="submit">Submit</button>
      </fieldset>
    `
    );
    
    popup.addEventListener('submit', function(e) {
      e.preventDefault();
      resolve(e.target.input.value);
      destroyPopup(popup);
    },
    {once: true}
    )
 

    // add cancel if it has
    if(options.cancel) {
      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.textContent = 'Cancel';
      popup.firstChild.appendChild(cancelButton); // firstElementChild

      // cancel prompt
      cancelButton.addEventListener('click',() => destroyPopup(popup));
    }

    

    // insert popup into the fomr
    document.body.appendChild(popup);
    await wait(500);   
    popup.classList.add('open');   
      
  });
}

// ask({title: 'name', cancel: 'true', desc: 'Enter your name', type: 'text'})



async function askQuestion(e) {
  const button = e.currentTarget;
  const cancel = e.target.hasAttribute('data-cancel');
  const answer = await ask({
    title: button.dataset.question,
    cancel: cancel
  });
  console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

const questions = [
  { title: 'What is your name?'},
  { title: 'What is your age?'},
  { title: 'What is your Goal?'}
];

// const res = questions.map(ask);
async function askMany() {
  for(const question of questions) {
    const answer = await ask(question);
    console.log(answer);
  }
}

askMany();
  