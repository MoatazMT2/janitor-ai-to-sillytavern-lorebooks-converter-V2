document.addEventListener('DOMContentLoaded', () => {
    const textInputContainer = document.querySelector('.text-input-container');
    const editorArea = document.getElementById('editor-area');
    const resultArea = document.getElementById('result-area');
    const errorArea = document.getElementById('error-area');
    const downloadBtn = document.getElementById('download-btn');
    const previewBtn = document.getElementById('preview-btn');
    const resetBtn = document.getElementById('reset-btn');
    const errorResetBtn = document.getElementById('error-reset-btn');
    const saveEditsBtn = document.getElementById('save-edits-btn');
    const cancelEditsBtn = document.getElementById('cancel-edits-btn');
    const errorMessageEl = document.getElementById('error-message');
    const langToggleBtn = document.getElementById('lang-toggle');
    const textInput = document.getElementById('text-input');
    const parseBtn = document.getElementById('parse-btn');

    // --- Internationalization (i18n) ---
    const translations = {
        en: {
            subtitle: 'Janitor.ai &rarr; SillyTavern format',
            guide_title: 'How to copy the lorebook:',
            guide_note: 'Works only if the bot creator made the lorebook Public.',
            step_0: 'Open this page in a full browser window (not via Telegram/Discord)',
            step_1: 'Open the desired bot on Janitor.ai',
            step_2: 'In the <strong>more</strong> section, find <strong>Lorebook</strong>',
            step_3: 'On the opened page, click <strong>View Script</strong>',
            step_4: 'Click <strong>Clone script</strong>',
            step_5: 'On the new page, click the <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin: 0 2px;"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> icon',
            step_6: 'To the right of that icon, click the copy icon <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin: 0 2px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
            step_7: 'Paste the copied text in the field below and click Convert.',
            filename_label: 'Saved file name (leave empty for default).',
            filename_placeholder: 'Lorebook Name',
            content_label: 'Lorebook Content',
            paste_chip: 'Paste',
            parse_btn: 'Convert Lorebook',
            download_btn: 'Download Lorebook',
            preview_btn: 'Preview & Edit',
            reset_btn: 'Reset',
            success_msg: 'Successfully converted! Found <span id="entry-count">%n</span> entries.',
            error_title: 'Conversion Error',
            err_empty: 'Input is empty!',
            err_invalid: 'Invalid format. Expected JSON or Janitor Script.',
            err_no_entries: 'No lore entries found in script.',
            try_again_btn: 'Try again',
            donate_link: 'Buy Me a Coffee',
            donate_url: 'https://buymeacoffee.com/hydall',
            donate_color: '#FFDD00',
            donate_icon: 'assets/bmc-logo.svg',
            donate_icon_bg: 'transparent',
            textarea_placeholder: 'Paste Janitor script or Lorebook JSON here...',
            promo_banner_text: 'Using Tavo or SillyTavern and having trouble understanding the app? Try Glaze - a mobile AI roleplay app focused on an accessible interface.',
            main_title: 'Lorebook <span>Converter</span>',
            github_text: 'GitHub',
            conv_section_title: 'Conversion',
            err_already_st: 'This data is already in SillyTavern format.',
            err_unexpected_format: 'Unexpected data format (expected Array).',
            err_unknown: 'An error occurred during conversion.',
            editor_title: 'Preview & Edit Entries',
            save_edits_btn: 'Save & Return',
            cancel_edits_btn: 'Cancel',
            keys_label: 'Keywords (comma separated)',
            card_content_label: 'Entry Content',
            token_est: 'Tokens (est.): '
        },
        ru: {
            subtitle: 'Конвертер Janitor.ai &rarr; SillyTavern',
            guide_title: 'Как скопировать лорбук:',
            guide_note: 'Работает только если автор сделал лорбук публичным.',
            step_0: 'Откройте эту страницу в полноценном окне браузера (не через Telegram/Discord)',
            step_1: 'Откройте нужного персонажа на Janitor.ai',
            step_2: 'В разделе <strong>more</strong> выберите <strong>Lorebook</strong>',
            step_3: 'На открывшейся странице нажмите <strong>View Script</strong>',
            step_4: 'Нажмите <strong>Clone script</strong>',
            step_5: 'На новой странице нажмите на иконку <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin: 0 2px;"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
            step_6: 'Справа от этой иконки нажмите на иконку копирования <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin: 0 2px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
            step_7: 'Вставьте скопированный текст в поле ниже и нажмите «Конвертировать».',
            filename_label: 'Название сохраняемого файла.',
            filename_placeholder: 'Название Лорбука',
            content_label: 'Содержимое лорбука',
            paste_chip: 'Вставить',
            parse_btn: 'Конвертировать',
            download_btn: 'Скачать лорбук',
            preview_btn: 'Предпросмотр',
            reset_btn: 'Сбросить',
            success_msg: 'Успешно! Найдено <span id="entry-count">%n</span> записей.',
            error_title: 'Ошибка конвертации',
            err_empty: 'Поле пустое!',
            err_invalid: 'Неверный формат. Ожидался JSON или Janitor Script.',
            err_no_entries: 'В скрипте не найдено записей лорбука.',
            try_again_btn: 'Попробовать снова',
            donate_link: 'Boosty',
            donate_url: 'https://boosty.to/hydall',
            donate_color: '#f15f2c',
            donate_icon: 'assets/boosty.svg',
            donate_icon_bg: '#f15f2c',
            textarea_placeholder: 'Вставьте скрипт Janitor или JSON лорбука сюда...',
            promo_banner_text: 'Пользуетесь Tavo или SillyTavern и имеете проблемы с пониманием программы? Попробуйте Glaze - мобильное приложение для ролевых с ИИ с упором на доступный интерфейс.',
            main_title: 'Lorebook <span>Converter</span>',
            github_text: 'GitHub',
            conv_section_title: 'Конвертация',
            err_already_st: 'Данные уже находятся в формате SillyTavern.',
            err_unexpected_format: 'Неожиданный формат данных (ожидался массив).',
            err_unknown: 'Произошла ошибка при конвертации данных.',
            editor_title: 'Предпросмотр и Редактирование',
            save_edits_btn: 'Сохранить и Вернуться',
            cancel_edits_btn: 'Отмена',
            keys_label: 'Ключевые слова (через запятую)',
            card_content_label: 'Содержимое записи',
            token_est: 'Токенов (примерно): '
        }
    };

    let currentLang = 'ru'; 
    let convertedData = null;
    let backupData = null; // Used to cancel edits
    let originalFileName = "";

    function detectLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        currentLang = userLang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
        applyTranslations();
    }

    function applyTranslations() {
        const dict = translations[currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (key === 'success_msg') return;
                if (key === 'donate_link') {
                    el.href = dict['donate_url'];
                    const iconStyle = dict['donate_icon_bg'] !== 'transparent' ? `filter: invert(1);` : '';
                    el.innerHTML = `<img src="${dict['donate_icon']}" alt="Logo" style="width: 16px; height: 16px; ${iconStyle}"> <span style="vertical-align: middle;">${dict['donate_link']}</span>`;
                    el.onmouseover = () => { el.style.opacity = '1'; el.style.background = dict['donate_color']; el.style.color = '#000'; el.style.borderColor = 'transparent'; };
                    el.onmouseout = () => { el.style.opacity = '0.9'; el.style.background = 'rgba(255,255,255,0.1)'; el.style.color = 'var(--text-main)'; el.style.borderColor = 'var(--border-color)'; };
                    return;
                }
                if (key === 'preview_btn') {
                    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> ` + dict[key];
                    return;
                }
                el.innerHTML = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.placeholder = dict[key];
        });

        const langLabel = document.getElementById('lang-label');
        if (langLabel) langLabel.textContent = currentLang.toUpperCase();
        document.title = "Lorebook Converter";
    }

    function getTranslation(key) {
        return translations[currentLang][key] || key;
    }

    detectLanguage();

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ru' ? 'en' : 'ru';
            applyTranslations();
        });
    }

    // --- Parsing Logic ---
    parseBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) return showError(getTranslation('err_empty'));

        try {
            const data = JSON.parse(text);
            setFileName(data);
            processLorebook(data);
        } catch (err) {
            const jsData = extractLoreEntriesFromJS(text);
            if (jsData) {
                setFileName(null);
                processLorebook(jsData);
            } else {
                showError(getTranslation('err_invalid'), text);
            }
        }
    });

    function setFileName(data) {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.getHours().toString().padStart(2, '0') + '-' + now.getMinutes().toString().padStart(2, '0');
        originalFileName = (data && data.name) ? data.name : `lorebook_${dateStr}_${timeStr}`;
    }

    function extractLoreEntriesFromJS(text) {
        try {
            const match = text.match(/(?:(?:const|let|var)\s+)?loreEntries\s*=\s*(\[[\s\S]*?\])\s*;/);
            let arrayStr = "";
            if (match) {
                arrayStr = match[1];
            } else {
                const start = text.indexOf('[');
                const end = text.lastIndexOf(']');
                if (start === -1 || end === -1 || end < start) return null;
                arrayStr = text.substring(start, end + 1);
            }
            const entries = new Function(`return ${arrayStr}`)();
            return Array.isArray(entries) ? entries : null;
        } catch (e) {
            return null;
        }
    }

    function processLorebook(data) {
        if (data.entries && Array.isArray(data.entries)) return showError(getTranslation('err_already_st'));
        if (!Array.isArray(data)) return showError(getTranslation('err_unexpected_format'), JSON.stringify(data, null, 2));

        try {
            const stFormat = { entries: {} };

            data.forEach((item, index) => {
                let keys = [];
                let keysSecondary = [];
                let selectiveLogic = 0;

                if (Array.isArray(item.key)) keys = item.key;
                else if (item.keysRaw) keys = item.keysRaw.split(',').map(s => s.trim()).filter(s => s);

                if (keys.length === 0 && Array.isArray(item.keywords)) keys = item.keywords;

                if (item.filters && Array.isArray(item.filters.notWith) && item.filters.notWith.length > 0) {
                    keysSecondary = item.filters.notWith;
                    selectiveLogic = 7;
                }

                let content = item.content || "";
                if (!content && (item.personality || item.scenario)) {
                    const parts = [];
                    if (item.personality) parts.push(item.personality);
                    if (item.scenario) parts.push(item.scenario);
                    content = parts.join('\n');
                }

                stFormat.entries[index.toString()] = {
                    uid: index, key: keys, keysecondary: keysSecondary, comment: item.name || item.category || item.comment || `Entry ${index}`,
                    content: content, constant: !!item.constant, selective: !item.constant, order: item.priority || item.insertion_order || 100,
                    position: 0, disable: item.enabled === false, displayIndex: index, addMemo: true, group: "", groupOverride: false,
                    groupWeight: item.groupWeight || 100, sticky: 0, cooldown: 0, delay: 0,
                    probability: (item.probability !== undefined) ? (item.probability <= 1 ? item.probability * 100 : item.probability) : 100,
                    depth: 4, useProbability: true, role: null, vectorized: false, excludeRecursion: false, preventRecursion: false,
                    delayUntilRecursion: false, scanDepth: null, caseSensitive: item.case_sensitive !== undefined ? item.case_sensitive : null,
                    matchWholeWords: item.matchWholeWords !== undefined ? item.matchWholeWords : null, useGroupScoring: null, automationId: "",
                    selectiveLogic: selectiveLogic || item.selectiveLogic || 0, ignoreBudget: false, matchPersonaDescription: false,
                    matchCharacterDescription: false, matchCharacterPersonality: false, matchCharacterDepthPrompt: false, matchScenario: false,
                    matchCreatorNotes: false, outletName: "", triggers: [], characterFilter: { isExclude: false, names: [], tags: [] }
                };
            });

            convertedData = stFormat;
            showSuccess(originalFileName, Object.keys(convertedData.entries).length); 
        } catch (err) {
            showError(getTranslation('err_unknown'), err.toString());
        }
    }

    // --- NEW Editor Logic (Accordion) ---
    previewBtn.addEventListener('click', () => {
        resultArea.classList.add('hidden');
        // Create a deep copy backup before editing
        backupData = JSON.parse(JSON.stringify(convertedData));
        showEditor();
    });

    function showEditor() {
        if (textInputContainer) textInputContainer.classList.add('hidden');
        errorArea.classList.add('hidden');
        editorArea.classList.remove('hidden');

        const container = document.getElementById('editor-cards-container');
        container.innerHTML = '';

        Object.keys(convertedData.entries).forEach(key => {
            const entry = convertedData.entries[key];
            const card = document.createElement('div');
            card.className = 'editor-card';

            // --- ACCORDION HEADER ---
            const headerDiv = document.createElement('div');
            headerDiv.className = 'editor-card-header';
            
            const headerText = entry.comment || (entry.key.length > 0 ? entry.key[0] : `Entry ${key}`);
            const titleSpan = document.createElement('span');
            titleSpan.textContent = headerText.length > 40 ? headerText.substring(0, 40) + '...' : headerText;

            const chevron = document.createElement('svg');
            chevron.className = 'chevron';
            chevron.setAttribute('width', '16');
            chevron.setAttribute('height', '16');
            chevron.setAttribute('viewBox', '0 0 24 24');
            chevron.setAttribute('fill', 'none');
            chevron.setAttribute('stroke', 'currentColor');
            chevron.setAttribute('stroke-width', '2');
            chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

            headerDiv.appendChild(titleSpan);
            headerDiv.appendChild(chevron);

            // --- ACCORDION BODY (Hidden by default) ---
            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'editor-card-body';

            // Keys Field
            const keysDiv = document.createElement('div');
            const keysLabel = document.createElement('label');
            keysLabel.textContent = getTranslation('keys_label');
            keysLabel.style.display = 'block';
            keysLabel.style.fontSize = '0.85rem';
            keysLabel.style.color = 'var(--text-muted)';
            keysLabel.style.marginBottom = '0.5rem';

            const keysInput = document.createElement('input');
            keysInput.className = 'text-input';
            keysInput.value = entry.key.join(', ');
            keysInput.addEventListener('input', (e) => {
                entry.key = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
            });

            keysDiv.appendChild(keysLabel);
            keysDiv.appendChild(keysInput);

            // Content Field
            const contentDiv = document.createElement('div');
            const contentLabel = document.createElement('label');
            contentLabel.textContent = getTranslation('card_content_label');
            contentLabel.style.display = 'block';
            contentLabel.style.fontSize = '0.85rem';
            contentLabel.style.color = 'var(--text-muted)';
            contentLabel.style.marginBottom = '0.5rem';

            const contentTextarea = document.createElement('textarea');
            contentTextarea.className = 'textarea-input';
            contentTextarea.value = entry.content;
            contentTextarea.rows = 4;

            // Token Estimator
            const tokenCounter = document.createElement('div');
            tokenCounter.className = 'token-counter';

            const updateTokens = () => {
                const tokens = Math.ceil(contentTextarea.value.length / 4);
                tokenCounter.textContent = getTranslation('token_est') + tokens;
            };
            updateTokens();

            contentTextarea.addEventListener('input', (e) => {
                entry.content = e.target.value;
                updateTokens();
            });

            contentDiv.appendChild(contentLabel);
            contentDiv.appendChild(contentTextarea);
            contentDiv.appendChild(tokenCounter);

            bodyDiv.appendChild(keysDiv);
            bodyDiv.appendChild(contentDiv);

            headerDiv.addEventListener('click', () => {
                bodyDiv.classList.toggle('open');
                chevron.classList.toggle('open');
            });

            card.appendChild(headerDiv);
            card.appendChild(bodyDiv);
            container.appendChild(card);
        });
    }

    // Keep changes and return
    saveEditsBtn.addEventListener('click', () => {
        editorArea.classList.add('hidden');
        showSuccess(originalFileName, Object.keys(convertedData.entries).length);
    });

    // Revert changes and return
    cancelEditsBtn.addEventListener('click', () => {
        convertedData = backupData; // Restore original data
        editorArea.classList.add('hidden');
        showSuccess(originalFileName, Object.keys(convertedData.entries).length);
    });

    // --- UI Navigation ---
    function showSuccess(filename, count) {
        resultArea.classList.remove('hidden');
        document.getElementById('file-name').textContent = filename;
        const filenameInput = document.getElementById('filename-input');
        if (filenameInput) filenameInput.value = filename.endsWith('.json') ? filename.replace('.json', '') : filename;
        document.querySelector('#result-area p').innerHTML = getTranslation('success_msg').replace('%n', count);
    }

    function showError(message) {
        if (textInputContainer) textInputContainer.classList.add('hidden');
        resultArea.classList.add('hidden');
        editorArea.classList.add('hidden');
        errorArea.classList.remove('hidden');
        errorMessageEl.textContent = message;
    }

    function resetUI() {
        convertedData = null;
        backupData = null;
        originalFileName = "";
        resultArea.classList.add('hidden');
        errorArea.classList.add('hidden');
        editorArea.classList.add('hidden');
        if (textInputContainer) textInputContainer.classList.remove('hidden');
        textInput.value = '';
    }

    resetBtn.addEventListener('click', resetUI);
    errorResetBtn.addEventListener('click', resetUI);

    const pasteBtn = document.getElementById('paste-btn');
    if (pasteBtn) {
        pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (text) textInput.value = text;
            } catch (err) { console.error('Failed to read clipboard', err); }
        });
    }

    downloadBtn.addEventListener('click', () => {
        if (!convertedData) return;
        const dataStr = JSON.stringify(convertedData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const customName = document.getElementById('filename-input').value.trim();
        let targetName = customName ? (customName.endsWith('.json') ? customName : customName + '.json') : originalFileName + '.json';

        const a = document.createElement('a');
        a.href = url;
        a.download = targetName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); window.URL.revokeObjectURL(url); }, 100);
    });
});