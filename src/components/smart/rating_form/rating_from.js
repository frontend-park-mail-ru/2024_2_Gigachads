import Action from '../../../api/modules/action';
import { GetValue, ItemButton } from '../../dumb/rating_scale/rating_scale';
function HandleSubmit(actionName) {
    const buttons = document.querySelectorAll('.rating-form__submit');
   
    buttons.forEach(currButton => {
        currButton.addEventListener('click', () => {
            const value = GetValue();
            const response = new Action().postValueQuestionByAction({ action: actionName, value: value });

            const iframe = window.parent.document.querySelector('.iframe');
        
            iframe.remove();
        });
    });
}

export function AttachEventHandlers(actionName) {
    ItemButton();
    HandleSubmit(actionName);
}

