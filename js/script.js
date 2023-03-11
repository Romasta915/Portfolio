// main js file:
// ========== scripts ==========
// 1.bg canvas 
// 2.loader
// 3.render projects 
// 4.elements reveal 
// 5.setting of sorting, filtering (mixitup) 
// 6.custom elements reveal (freelancer for life)
// 7.show project controls and up button
// 8.сalculation of technology percentages

// ========== 1.bg canvas ==========
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

// ========== 2.loader ==========
let Loader = document.querySelector('.page-loader')

window.onload = () => {
    setTimeout(() => {
        Loader.style.display = 'none'
    }, 300);
}

// ========== 3.render projects ==========
projectsArr = [
    {
        id: 1,
        imgPath: './images/Projects_photos/restoran.jpg',
        projectTitle: 'Site for "Best home food"',
        projectText: 'Made with: HTML, CSS, JavaScript Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, incidunt aspernatur vitae adipisci iure tenetur itaque assumenda? Eum laboriosam illo a modi, nisi qui quia recusandae quidem quos accusamus dolore cumque ullam similique placeat ex quae. Rem porro quas sapiente minima? Dolorem ex quidem, corporis a nisi doloribus soluta beatae! ipsum dolor sit amet consectetur adipisicing elit. Eligendi, incidunt aspernatur vitae adipisci iure tenetur itaque assumenda? Eum laboriosam illo a modi, nisi qui quia recusandae quidem quos accusamus dolore cumque ullam similique placeat ex quae. Rem porro quas sapiente minima? Dolorem ex quidem, corporis a nisi doloribus soluta beatae!',
        aHref: './projects/1restoran (best home food)',
        projectType: 'javascript',
        hasAdaptive: true
    },
    {
        id: 2,
        imgPath: './images/Projects_photos/landx.jpg',
        projectTitle: 'Site for "LandX"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/2LandX',
        projectType: 'javascript',
        hasAdaptive: false
    },
    {
        id: 3,
        imgPath: './images/Projects_photos/foreign_exchange.png',
        projectTitle: 'Site for "Foreign exchange"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/3Foreing exchange',
        projectType: 'react',
        hasAdaptive: true
    },
    {
        id: 4,
        imgPath: './images/Projects_photos/moviepedia.png',
        projectTitle: 'Site for "Moviepedia"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/4MoviePedia',
        projectType: 'react',
        hasAdaptive: true
    },
    {
        id: 5,
        imgPath: './images/Projects_photos/css_generator.png',
        projectTitle: 'Site for "CSS Generator"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/5CSS Generator',
        projectType: 'angular',
        hasAdaptive: true
    },
    {
        id: 6,
        imgPath: './images/Projects_photos/audio_player.jpg',
        projectTitle: 'Site for "Audio player"',
        projectText: 'Made with: HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript',
        aHref: './projects/6Audio player',
        projectType: 'angular',
        hasAdaptive: true
    },
    {
        id: 7,
        imgPath: './images/Projects_photos/lazy-dog.jpg',
        projectTitle: 'Site for "LazyDog"',
        projectText: 'Technologies are used: HTML, SCSS, JavaScript',
        aHref: 'https://romasta915.github.io/LazyDog/index.html',
        projectType: 'javascript',
        hasAdaptive: true
    }
]

// projectsArr = [
//     {
//         id: 1,
//         imgPath: './projects/Projects_photos/lazy-dog.jpg',
//         projectTitle: 'Site for "LazyDog"',
//         projectText: '*Adaptive site <br> Technologies are used: HTML, SCSS, JavaScript',
//         aHref: 'https://romasta915.github.io/LazyDog/index.html',
//         projectType: 'javascript'
//     }
// ]

let projects__content = document.querySelector('.projects__content')

for (const e of projectsArr) {

    let adaptiveStr

    e.hasAdaptive ?  adaptiveStr = 'adaptive' : adaptiveStr = ''

    projects__content.innerHTML += `
    <div class="projects__item projects__item${e.id} mix ${e.projectType}">
        <div class="project-mobileBtn project-mobileBtn${e.id}">
            ◀show info
        </div>
        <div class="project__img">
            <img src="${e.imgPath}">
        </div>
        <div class="project__description project__description${e.id}">
            <div class="project__text-wrap" data-hasAdaptive="${adaptiveStr}">
                <div class="project__text-title"> ${e.projectTitle} </div>
                <div class="project__text"> ${e.projectText} </div>
            </div>
            <div class="project__btn-wrap">
                <a href="${e.aHref}" target="_blank">
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

for (const e of projectsArr) {
    let item = document.querySelector(`.projects__item${e.id}`)
    let btn = document.querySelector(`.project-mobileBtn${e.id}`)
    let des = document.querySelector(`.project__description${e.id}`)
    let btnActive = false
    des.style.transition = 'all 1s'
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

    // adding clases from 4.elements reveal 
    (e.id % 2 == 0) ? item.classList.add('right-reveal') : item.classList.add('left-reveal');
}

// ========== 4.elements reveal ==========
ScrollReveal().reveal('.left-reveal', {
    distance: '150%',
    origin: 'left',
    duration: 1000,
    // reset: true
});

ScrollReveal().reveal('.right-reveal', {
    distance: '150%',
    origin: 'right',
    duration: 1300,
});

// ========== 5.setting of sorting, filtering (mixitup) ==========
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

// ========== 6.custom elements reveal (freelancer for life) ==========
const technicalPerItems = document.querySelectorAll('.anim-item')

if (technicalPerItems.length > 0) {
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
                animItem.classList.add('_active')
            } else {
                // якщо елемент має клас _no-repeat то анімація не повторюється
                if (!animItem.classList.contains('_anim-no-repeat')) {
                    animItem.classList.remove('_active')
                }
            }

        }
    }
}
window.addEventListener('scroll', () => {
    animOnScroll(technicalPerItems)
})

// ========== 7.show project controls and up button ==========
let allProjects = document.querySelectorAll('.projects__item')
let projectsControls = document.querySelector('.projects__controls')
let upButton = document.querySelector('.footer__back')
let projectsControlsVisible = false
let oneTrigger = false

function showProjectControlsAndUpButton(items) {
    for (let i = 0; i < items.length; i++) {
        const lastElement = items[items.length - 1];
        let lastElementOffset = window.scrollY + lastElement.getBoundingClientRect().top
        let lastElementHeigth = lastElement.offsetHeight

        window.scrollY >= lastElementOffset - lastElementHeigth ? projectsControlsVisible = true : null;
    }

    if (projectsControlsVisible && oneTrigger == false) {
        // projectsControls.style.display = 'flex'
        // alertify.set('notifier', 'position', 'top-center');
        // alertify.notify('✔ Sorting is unlocked', 'success');
        oneTrigger = true

        upButton.style.transform = 'translateY(0px)'
    }
}
window.addEventListener('scroll', () => {
    showProjectControlsAndUpButton(allProjects)
})

// ========== 8.сalculation of technology percentages ==========
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
