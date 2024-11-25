import actionPageTemplate from '../../components/smart/rating_form/rating_form.hbs';
import Action from '../../api/modules/action';
import ErrorPage from '../error/error';
import { AttachEventHandlers } from '../../components/smart/rating_form/rating_from';

class ActionPage {
    async render(params) {
        const question = await new Action().getQuestionByAction(params.actionName);
        if (question.ok) {
            const questionData = await question.json();
            let items = []; 
            let isStar = false;
            let isNumber = false;
            if (questionData.type === 'Star') {
                isStar = true;
                items = [2, 4, 6, 8, 10];
            }
            else if (questionData.type === 'Number') {
                isNumber = true;
                items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            }
            return actionPageTemplate({
                description: questionData.description,
                type: questionData.type,
                items: items,
                isStar: isStar,
                isNumber: isNumber
            });
        }
        else {
            return ErrorPage.render(404, 'Страница не найдена');
        }
    }

    attachEventListeners(params) {
        AttachEventHandlers(params.actionName);
    }
}

export default ActionPage;

