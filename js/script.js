// main js file:
// ========== scripts ==========
// 1.bg canvas 
// 2.loader, animation on load
// 3.render projects 
// 4.elements reveal 
// 5.setting of sorting, filtering (mixitup) 
// 6.on scroll add animation classes (freelancer for life)
// 7.show something in end projects
// 8.сalculation of technology percentages

// ========== bg canvas ==========
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// ще потрібно змінити колір потрібно ще в функції ресайз змінити значення
gradient.addColorStop(0.5, "rgb(0, 3, 249)");
gradient.addColorStop(0.5, "yellow");

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters =
            //   "✧F☹︎☠︎☸︎☣︎☢︎☯︎♾♲✰❤︎✦⚛︎☮︎⚔︎⚒︎☄︎✵⚰︎☘︎⚘♨︎✞☺︎♘♞☆☃︎★☼☀︎☾◎☽☁︎™Ω℞№ℹ︎❂❁✡︎✣✶✺✷◦◉⦿☒✗☐☞◇☛⚙︎☑︎⌘✘✔︎✓⌔⌫⌁⌨︎⌗⌬⌖⌰⌭⌌⌏⌍⌱⌯⎔⍋⍒⍟⍊⎓⏍⍣⍦␗␄␡␢␛␀␥␦⑆⑇⑉⑈⏧⏦";
            "10";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }
    draw(context) {
        this.text = this.characters.charAt(
            Math.floor(Math.random() * this.characters.length)
        );
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        // console.log(this.symbols);
    }
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeigth = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient; //"#0aff0a";
        // ctx.font = effect.fontSize + "px monospace";
        ctx.font = effect.fontSize + "px Roboto";
        effect.symbols.forEach((symbol) => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0.5, "rgb(0, 3, 249)");
    gradient.addColorStop(0.5, "yellow");
});

// ========== loader, animation on load ==========
let Loader = document.querySelector('.page-loader')
let heroText = document.querySelector('.hero__text')
let heroBtn = document.querySelector('.hero__btn')

window.addEventListener('load', () => {
    setTimeout(() => Loader.style.display = 'none', 300);
    setTimeout(() => heroText.classList.add('magictime', 'vanishIn'), 500);
    setTimeout(() => heroBtn.classList.add('magictime', 'vanishIn'), 1500);
})

// ========== render projects ==========
// для імпорту в нативному js потрібно в тег де підключається скрипт додати 
// type="module" але буде працювати тільки на сервері або лайв серсері
// import { projectsArr } from './projects.js'

let projects__content = document.querySelector('.projects__content')
// projectsArr import from data.js
for (let index = 0; index < projectsArr.length; index++) {
    let e = projectsArr[index];

    let adaptiveStr;
    e.hasAdaptive ? adaptiveStr = 'adaptive' : adaptiveStr = ''

    projects__content.innerHTML += `
    <div class="projects__item projects__item${index + 1} | mix ${e.projectType}">
        <div class="project-mobileBtn project-mobileBtn${index + 1}">
            ◀show info
        </div>
        <div class="project__img">
            <img src="${e.imgPath}">
        </div>
        <div class="project__description project__description${index + 1}">
            <div class="project__text-wrap" data-hasAdaptive="${adaptiveStr}">
                <div class="project__text-title"> ${e.projectTitle} </div>
                <div class="project__text"> ${e.projectText} </div>
            </div>
            <div class="project__btn-wrap">
                <a href="${e.toRepoLink}" target="_blank">
                    <button class="cybr-btn toRepo-btn" title="link to the repository">
                        <i class="bi bi-github"></i>
                        <span aria-hidden class="cybr-btn__glitch">
                            <i class="bi bi-github"></i>
                        </span>
                    </button>
                </a>
                <a href="${e.mainLink}" target="_blank">
                    <button class="cybr-btn cybr-btn_settings">
                        SEE WORK_
                        <span aria-hidden class="cybr-btn__glitch">SEE WORK_</span>
                        <span aria-hidden class="cybr-btn__tag">rA9</span>
                    </button>
                </a>
            </div>
        </div>
    </div>
    `
}

for (let index = 0; index < projectsArr.length; index++) {
    let btn = document.querySelector(`.project-mobileBtn${index + 1}`)
    let des = document.querySelector(`.project__description${index + 1}`)
    let btnActive = false
    btn.style.transition = 'all 1s'

    btn.addEventListener('click', () => {
        if (btnActive == false) {
            des.style.transform = 'translateX(0%)'
            des.style.opacity = '1'
            btn.innerText = 'hide info▶'
            btnActive = true
        } else {
            des.style.transform = 'translateX(150%)'
            des.style.opacity = '0'
            btn.innerText = '◀show info'
            btnActive = false
        }

    })

    window.addEventListener('resize', () => {
        des.style.transform = 'translateX(150%)'
        des.style.opacity = '0'
        btn.innerText = '◀show info'
        btnActive = false
    });

}

// ========== setting of sorting, filtering (mixitup) ==========
let containerEl = document.querySelector('.projects__content');
let radiosFilter = document.querySelector('.radios-filter');
let radiosSort = document.querySelector('.radios-sort');

let mixer = mixitup(containerEl);

radiosFilter.addEventListener('change', function () {
    let checked = radiosFilter.querySelector(':checked');
    let selector = checked ? checked.value : 'all';
    mixer.filter(selector);
});

radiosSort.addEventListener('change', function () {
    let checked = radiosSort.querySelector(':checked');
    let order = checked.value;
    mixer.sort(order);
});

// ========== on scroll add animation classes ==========
const animItems = document.querySelectorAll('.anim-item')

if (animItems.length > 0) {
    function animOnScroll(items) {
        for (let i = 0; i < items.length; i++) {
            const animItem = items[i]
            const animItemHeight = animItem.offsetHeight // висота елемента
            const animItemOffset = window.scrollY + animItem.getBoundingClientRect().top // координати елемента відностно початку сторінки
            const animStart = 4 // коефіцієнт звідки стартує анімація (в даному випадку одна четверта)

            let animItemPoint = window.innerHeight - animItemHeight / animStart

            // на випадок якщо анімований елемент більший за вікно браузера
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if ((window.scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                if (animItem.classList.contains('technical-per')) animItem.classList.add('_anim-init');
                // if (animItem.classList.contains('projects__title')) animItem.classList.add('magictime', 'openDownLeftReturn');
                if (animItem.classList.contains('projects__title')) animItem.classList.add('magictime', 'tinRightIn');
            } else {
                // якщо елемент має клас _no-repeat то анімація не повторюється
                if (!animItem.classList.contains('_anim-no-repeat')) {
                    animItem.classList.remove('_anim-init')
                }
            }
        }
    }
}
window.addEventListener('scroll', () => {
    animOnScroll(animItems)
})

// ========== show something in end projects ==========
let allProjects = document.querySelectorAll('.projects__item')
let projectsControls = document.querySelector('.projects__controls')
let footerBack = document.querySelector('.footer__back')
let pointAtEndProjects = false
let oneTrigger = false

function showSomethingAtEndProjects(items) {
    for (let i = 0; i < items.length; i++) {
        const lastElement = items[items.length - 1];
        let lastElementOffset = window.scrollY + lastElement.getBoundingClientRect().top
        let lastElementHeigth = lastElement.offsetHeight

        window.scrollY >= lastElementOffset - lastElementHeigth ? pointAtEndProjects = true : null;
    }

    if (pointAtEndProjects && oneTrigger == false) {
        alertify.set('notifier', 'position', 'top-center');
        alertify.notify('More soon...', 'success');
        oneTrigger = true

        footerBack.classList.add('magictime', 'vanishIn');
    }
}
window.addEventListener('scroll', () => {
    showSomethingAtEndProjects(allProjects)
})

// ========== сalculation of technology percentages ==========
let percentItems = document.querySelectorAll('.technical-per')
let onlyProjectsTypes = projectsArr.slice(0).map(item => item.projectType)

function сalculatePercents(items) {

    let jsCount = 0, reactCount = 0, angularCount = 0
    for (let i = 0; i < items.length; i++) {
        const typeStr = items[i];
        if (typeStr === 'javascript') jsCount += 1;
        if (typeStr === 'react') reactCount += 1;
        if (typeStr === 'angular') angularCount += 1;
    }

    changeElementPercent(percentItems[0], jsCount)
    changeElementPercent(percentItems[1], reactCount)
    changeElementPercent(percentItems[2], angularCount)

    function changeElementPercent(element, count) {
        element.setAttribute('per', Math.floor(count / (items.length / 100)) + '%')
        element.style.maxWidth = Math.floor(count / (items.length / 100)) + '%'
    }
}
сalculatePercents(onlyProjectsTypes)
