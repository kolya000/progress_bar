'use strict';

class ProgressBar{
    constructor(option = {}){ // якщо створювати ProgressBar і не передвати обэкт буде помилка, но тепере по замовчуванны буде пустий обэкт
        const {
            start = 10,
            end = 100,
            bg = 'green',
            height = 20,
            textColor = 'white',
            border = '1px solid black',
            showText = false
        } = option; // значення задані по замовчуванні

    this.start = start;
    this.end = end;
    this.bg = bg;
    this.height = height;
    this.textColor = textColor;
    this.border = border;
    this.showText = showText;
    }

    init(selector) {
        document.querySelector(selector).append(this.createProgressBar());
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        const bar = this.createBar();
        progressBar.append(bar);
        progressBar.style.width = '100%';
        progressBar.style.border = this.border;
        this.animateBar(bar);

        return progressBar;
    }

    createBar() {
        const bar = document.createElement('div');
        bar.style.cssText = `
            text-align: center;
            background-color: ${this.bg};
            height: ${this.height}px;
            line-height: ${this.height}px; 
            color: ${this.textColor};
        `;
        bar.style.height = this.height;
        // в line-height я передаю таку є саму висоту як height для div, тому мені не прийдеться виставляти текст по середині 

        this.stateProgres(bar);

        return bar;
    }

    stateProgres(elem) {
        elem.style.width = `${this.start}%`;
        elem.textContent = `${this.showText ? this.start + '%' : ''}`;
    }

    animateBar(bar) {
        const animate = () => {
            if(this.start < this.end){
                this.start += 0.5;
                this.stateProgres(bar);
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

}

class RoundedProgressBar extends ProgressBar {
    constructor(option = {}){
        super(option);
        const { rounded } = option;
        this.rounded = rounded;
    }

    createProgressBar() {
        const progressBar = super.createProgressBar();
        this.roundedBar(progressBar);
        return progressBar;
    }

    roundedBar(elem){
        elem.style.borderRadius = this.rounded;
        elem.style.overflow = 'hidden';
    }

}