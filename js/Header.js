class Header {
    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-header-overlay]',
        burgerButton: '[data-js-header-burger-button]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay);
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
        this.bindEvents();
    }

    onBurgerButtonClick = () => {
        this.toggleMenu();
    }

    onMenuLinkClick = () => {
        this.closeMenu();
    }

    toggleMenu = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    }

    closeMenu = () => {
        this.burgerButtonElement.classList.remove(this.stateClasses.isActive);
        this.overlayElement.classList.remove(this.stateClasses.isActive);
        document.documentElement.classList.remove(this.stateClasses.isLock);
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
        
        this.overlayElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('header__menu-link')) {
                this.onMenuLinkClick();
            }
        });
    }
}

export default Header;