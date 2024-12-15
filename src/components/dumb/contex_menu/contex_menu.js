import contexMenuTemplate from './contex_menu_for_menu.hbs';
import ModalTemplate from '../../dumb/modal/modal.hbs';
import { RenameFolder, ExitModal } from '../../dumb/modal/modal.js';
import Folder from '../../../api/modules/folder';
import Notification from '../../dumb/notification/notification';
import Email from '../../../api/modules/email';
export async function createContextMenu(element, mouseX, mouseY, flags) {
    const existingMenu = document.querySelector('.context_menu');
    if (existingMenu) {
        existingMenu.remove();
    }

    const contextMenu = document.createElement('div');
    contextMenu.classList.add('context_menu');
    const contentData = {
        isFolder: flags.isFolder,
        isEmail: flags.isEmail,
        isMove: flags.isMove,
    };
    
    if (flags.isMove) {
        contentData.moveFolders = [];
        const response = await Folder.getFolders();
        if (response.ok) {
            const moveFolders = await response.json();
            moveFolders.forEach(folder => {
                if (folder !== 'Входящие' && folder !== 'Отправленные' && folder !== 'Черновики') {
                    contentData.moveFolders.push(folder);
                }
            });
        }
        else {
            return;
        }
    }
    contextMenu.innerHTML = contexMenuTemplate(contentData);
    document.body.appendChild(contextMenu);

    // Устанавливаем позицию меню справа от курсора
    contextMenu.style.position = 'absolute';
    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX + 10}px`; // Смещение на 10px вправо

    // Проверяем, не выходит ли меню за пределы окна браузера по горизонтали
    const menuRect = contextMenu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth) {
        contextMenu.style.left = `${mouseX - menuRect.width - 10}px`; // Смещаем влево, если выходит
    }

    // Проверяем, не выходит ли меню за пределы окна браузера по вертикали
    if (menuRect.bottom > window.innerHeight) {
        contextMenu.style.top = `${window.innerHeight - menuRect.height - 10}px`; // Смещаем вверх, если выходит
    }

    contextMenu.style.display = 'block';

    // Закрываем меню при клике вне его
    document.addEventListener('click', handleClickOutside);

    function handleClickOutside(e) {
        if (!contextMenu.contains(e.target)) {
            contextMenu.remove();
            document.removeEventListener('click', handleClickOutside);
        }
    }

    // Добавьте обработчики для элементов меню при необходимости
    deleteFolder(element, contextMenu);
    renameFolder(element, contextMenu);
    hoverToFolder(element, contextMenu);
    moveToFolder(element, contextMenu);
}

function hoverToFolder(element, contextMenu) {
    const moveToFolder = contextMenu.querySelector('.move_to_folder');
    if (moveToFolder) {
        moveToFolder.addEventListener('mouseover', async (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            createContextMenu(element, mouseX, mouseY, { isFolder: false, isEmail: false, isMove: true });
        });
        moveToFolder.addEventListener('mouseout', async () => {
            // document.querySelector('.move_menu').remove();
        });
    }
}

function moveToFolder(element, contextMenu) {
    const moveMenu = contextMenu.querySelectorAll('.folder_element');
    if (moveMenu) {
        moveMenu.forEach(menu => {
            menu.addEventListener('click', async (e) => {
                const response = await Email.changeEmailFolder(element.dataset.id, menu.textContent);
                if (response.ok) {
                    element.remove();
                    contextMenu.remove();
                    Notification.show('Письмо перемещено', 'success');
                }
                else {
                    Notification.show('Ошибка перемещения письма', 'error');
                }
            });
        });
    }
}

async function deleteFolder(element, contextMenu) {
    const deleteFolder = contextMenu.querySelector('.delete_folder');
    if (deleteFolder) {
        deleteFolder.addEventListener('click', async () => {
            const response = await Folder.deleteFolder(element.querySelector('.element_text').textContent);
            if (response.ok) {
                element.remove();
                contextMenu.remove();
                Notification.show('Папка удалена', 'success');
            } else {
                Notification.show('Папка не удалена', 'error');
            }
        });
    }
}

function renameFolder(element, contextMenu) {
    const renameFolder = contextMenu.querySelector('.rename_folder');
    if (renameFolder) {
        renameFolder.addEventListener('click', async () => {
            // Логика переименования папки
            const div_modal = document.querySelector('.div_modal');
            if (div_modal) {
                div_modal.remove();
            }
            const modal = document.createElement('div');
            modal.classList.add('div_modal');
            modal.innerHTML = ModalTemplate({ button_text: 'Переименовать' });
            document.body.appendChild(modal);
            RenameFolder(element.querySelector('.element_text').textContent);
            ExitModal();
            contextMenu.remove();
        });
    }
}

