import Folder from '../../../api/modules/folder';
import Notification from '../notification/notification';
import ElementMenu from '../../dumb/element_menu/element_menu-template.hbs';
import { openContextMenuForNewFolder } from '../../smart/navigation-email-list/navigation-email-list';
export default async function CreateFolder() {
    const ConfirmCreateButton = document.getElementById('ConfirmCreateButton');
    ConfirmCreateButton.addEventListener('click', async () => {
        const InputValue = document.getElementById('folder_name').value;
        if (InputValue === '') {
            Notification.show('Введите название папки', 'error');
            return;
        }
        const response = await Folder.createFolder(InputValue);
        if (response.ok) {
            const newElementMenuData = {
                url: '/icons/label.svg',
                navigation_url: '#' + InputValue,
                element_text: InputValue,
                active: false,
                count: 0
            };
            const newElementMenu = document.createElement('div');
            newElementMenu.innerHTML = ElementMenu(newElementMenuData);
            openContextMenuForNewFolder(newElementMenu);
            document.querySelector('.navigator').appendChild(newElementMenu);
            document.querySelector('.div_modal').remove();
            Notification.show('Папка создана', 'success');
        } else {
            Notification.show('Папка не создана', 'error');
        }
    });
}

export function RenameFolder(oldFolderName) {
    const ConfirmCreateButton = document.getElementById('ConfirmCreateButton');
    ConfirmCreateButton.addEventListener('click', async () => {
        const InputValue = document.getElementById('folder_name').value;
        if (InputValue === '') {
            Notification.show('Введите название папки', 'error');
            return;
        }
        const response = await Folder.changeFolderName(oldFolderName, InputValue);
        if (response.ok) {
            const navigator = document.querySelector('.navigator');
            const oldElementMenu = navigator.querySelector(`[data-url="#${CSS.escape(oldFolderName)}"]`);
            if (oldElementMenu) {
                oldElementMenu.setAttribute('data-url', `#${InputValue}`);
                const elementText = oldElementMenu.querySelector('.element_text');
                if (elementText) {
                    elementText.textContent = InputValue;
                    Notification.show('Папка переименована', 'success');
                    document.querySelector('.div_modal').remove();
                } else {
                    Notification.show('Папка не переименована', 'error');
                }
            } else {
            }
        } else {
            Notification.show('Папка не переименована', 'error');
        }
    });
}

export function ExitModal() {
    const exitButton = document.querySelector('.exit_button');
    exitButton.addEventListener('click', () => {
        document.querySelector('.div_modal').remove();
    });
}

