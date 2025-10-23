const rootSelector = '[data-js-tabs]';

class Tabs {
    stateClasses = {
        isVisible: 'is-visible',
        isForward: 'is-forward',
        isBack: 'is-back',
        isActive: 'is-active'
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.isAnimating = false;
        this.init();
    }

    onAnimationEnd = (event) => {
        const el = event.currentTarget;

        if (event.animationName === 'tab-back') {
            el.classList.remove(this.stateClasses.isBack, this.stateClasses.isVisible);
            el.removeEventListener('animationend', this.onAnimationEnd);
        }
        
        this.isAnimating = false;
    };

    removeForward = (event) => {
        const el = event.currentTarget;

        if (event.animationName === 'tab-forward') {
            el.classList.remove(this.stateClasses.isForward);
            el.removeEventListener('animationend', this.removeForward);
        }
        
        this.isAnimating = false;
    };

    showTab = (event) => {
        if (this.isAnimating) return;

        const buttonElement = event.target.closest('[data-tab]');
        if (!buttonElement) return;

        const targetTab = buttonElement.dataset.tab;
        
        const targetContent = this.rootElement.querySelector(`[data-tab-content="${targetTab}"]`);
        if (!targetContent) return;

        const currentContent = this.rootElement.querySelector('.tabs__content.is-visible');
        const currentButton = this.rootElement.querySelector('.tabs__button.is-active');

        if (buttonElement === currentButton) return;

        this.isAnimating = true;

        if (currentContent) {
            currentContent.removeEventListener('animationend', this.onAnimationEnd);
            currentContent.classList.remove(this.stateClasses.isForward);
            currentContent.classList.add(this.stateClasses.isBack);
            currentContent.addEventListener('animationend', this.onAnimationEnd);
        }

        targetContent.removeEventListener('animationend', this.removeForward);
        targetContent.classList.remove(this.stateClasses.isBack); 
        targetContent.classList.add(this.stateClasses.isVisible, this.stateClasses.isForward);
        targetContent.addEventListener('animationend', this.removeForward);

        if (currentButton) {
            currentButton.classList.remove(this.stateClasses.isActive);
            currentButton.setAttribute('aria-selected', 'false');
        }
        
        buttonElement.classList.add(this.stateClasses.isActive);
        buttonElement.setAttribute('aria-selected', 'true');
    }

    init() {
        this.rootElement.addEventListener('click', this.showTab);
    }
}

class TabsCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element);
        });
    }
}

export default TabsCollection;