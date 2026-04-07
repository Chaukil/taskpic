// auto-translate.js - Hệ thống dịch tự động MIỄN PHÍ

class AutoTranslate {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'vi';
        this.cache = JSON.parse(localStorage.getItem('translationCache') || '{}');
        this.translating = false;
        this.queue = [];
        this.translatedElements = new WeakMap(); 
    }

    getTranslationSync(text, targetLang) {
        if (!text || text.trim() === '') return text;
        const cacheKey = `${text}_${targetLang}`;
        return this.cache[cacheKey] || null;
    }

    // ===================================
    // API GOOGLE TRANSLATE MIỄN PHÍ
    // ===================================
    async translateText(text, targetLang = 'en') {
        if (!text || text.trim() === '') return text;

        const cacheKey = `${text}_${targetLang}`;

        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }

        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await fetch(url);
            const data = await response.json();

            let translated = '';
            if (data && data[0]) {
                translated = data[0].map(item => item[0]).join('');
            }

            this.cache[cacheKey] = translated;
            localStorage.setItem('translationCache', JSON.stringify(this.cache));

            return translated;

        } catch (error) {
            console.warn('Translation failed:', error);
            return text; 
        }
    }

    // ===================================
    // TỰ ĐỘNG PHÁT HIỆN & DỊCH CÁC ELEMENT
    // ===================================
    async autoTranslate(targetLang = 'en') {
        this.currentLang = targetLang;
        localStorage.setItem('language', targetLang);

        if (this.translating) return;
        this.translating = true;

        const elements = this.findTranslatableElements(document);

        console.log(`🌍 Found ${elements.length} elements to translate`);

        for (const el of elements) {
            await this.translateElement(el, targetLang);
        }

        this.translating = false;
        console.log('✅ Translation complete!');
    }

    // ===================================
    // TÌM CÁC ELEMENT CẦN DỊCH (Có hỗ trợ tìm trong Container)
    // ===================================
    findTranslatableElements(rootElement = document) {
        const elements = [];
        const selectors = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
            'p', 'span', 'label', 'a', 
            'button:not([data-no-translate])', 
            '.modal-title', '.form-label', '.note-title', 
            '.note-text', '.error-message', '.help-text', 
            '[placeholder]', '[title]', 'option', '.toast'
        ];

        const isRootTranslatable = selectors.some(sel => rootElement.matches && rootElement.matches(sel));
        if (isRootTranslatable && !rootElement.hasAttribute('data-no-translate') && !this.isOnlyIcon(rootElement)) {
            if (!(rootElement.tagName === 'LABEL' && rootElement.querySelector('input'))) {
                elements.push(rootElement);
            }
        }

        if (rootElement.querySelectorAll) {
            selectors.forEach(selector => {
                rootElement.querySelectorAll(selector).forEach(el => {
                    if (el.hasAttribute('data-no-translate')) return;
                    if (this.isOnlyIcon(el)) return;
                    if (el.closest('[data-no-translate]')) return;
                    if (el.tagName === 'LABEL' && el.querySelector('input')) return;

                    elements.push(el);
                });
            });
        }

        return elements;
    }

    // ===================================
    // DỊCH MỘT ELEMENT CỤ THỂ
    // ===================================
    async translateElement(el, targetLang) {
        if (this.translatedElements.get(el) === targetLang) {
            return;
        }

        const originalText = this.getOriginalText(el);
        if (!originalText) return;

        const translated = await this.translateText(originalText, targetLang);
        this.updateElement(el, translated, originalText);
        
        this.translatedElements.set(el, targetLang);
    }

    getOriginalText(el) {
        if (!el.hasAttribute('data-original-text')) {
            let text = '';

            if (el.hasAttribute('placeholder')) {
                text = el.getAttribute('placeholder');
            } else if (el.hasAttribute('title')) {
                text = el.getAttribute('title');
            } else if (el.tagName === 'OPTION') {
                text = el.textContent.trim();
            } else {
                text = Array.from(el.childNodes)
                    .filter(node => node.nodeType === 3) 
                    .map(node => node.textContent.trim())
                    .filter(str => str.length > 0) // ✅ FIX: Lọc bỏ các chuỗi rỗng/khoảng trắng
                    .join(' ');
            }

            if (text) {
                el.setAttribute('data-original-text', text);
            }
        }

        return el.getAttribute('data-original-text');
    }

    updateElement(el, translatedText, originalText) {
        if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', translatedText);
        } else if (el.tagName === 'OPTION') {
            el.textContent = translatedText;
        } else {
            const innerHTML = el.innerHTML;
            const iconMatch = innerHTML.match(/<i class="[^"]*"><\/i>/);

            if (iconMatch) {
                el.innerHTML = iconMatch[0] + ' ' + translatedText;
            } else {
                el.textContent = translatedText;
            }
        }
    }

    // ===================================
    // KIỂM TRA ELEMENT CÓ PHẢI CHỈ CHỨA ICON KHÔNG
    // ===================================
    isOnlyIcon(el) {
        // ✅ FIX LỖI PLACEHOLDER: Bắt buộc không được bỏ qua các thẻ Form (vì chúng dùng placeholder/value thay vì textContent)
        if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(el.tagName)) {
            return false; 
        }

        const text = el.textContent.trim();
        const hasIcon = el.querySelector('i.fa, i.fas, i.far, i.fab');
        return text === '' || (hasIcon && text.length < 3);
    }

    clearCache() {
        this.cache = {};
        localStorage.removeItem('translationCache');
        console.log('🗑️ Translation cache cleared');
    }

    async translateNew(element, targetLang) {
        if (this.currentLang === 'vi' || !element) return; 

        const elementsToTranslate = this.findTranslatableElements(element);
        
        for (const el of elementsToTranslate) {
            await this.translateElement(el, targetLang || this.currentLang);
        }
    }
}

const autoTranslate = new AutoTranslate();
window.autoTranslate = autoTranslate;
