// !!! bg canvas
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// gradient.addColorStop(0.4, "yellow");
// gradient.addColorStop(0.6, "cyan");
// gradient.addColorStop(0.8, "blue");
gradient.addColorStop(1, "rgb(0, 3, 249)");

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
    //   gradient.addColorStop(0.4, "yellow");
    //   gradient.addColorStop(0.6, "cyan");
    //   gradient.addColorStop(0.8, "blue");
    // gradient.addColorStop(1, "yellow");
    gradient.addColorStop(1, "rgb(0, 3, 249)");
});

// !!! loader

let Loader = document.querySelector('.page-loader')

window.onload = () => {
    setTimeout(() => {
        Loader.style.display = 'none'
    }, 500);
}

// !!! render projects

projectsArr = [
    {
        id: 1,
        imgPath: './projects/Projects_photos/restoran.jpg',
        projectTitle: 'Site for "Best home food"',
        projectText: 'Made with: HTML, CSS, JavaScript Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, incidunt aspernatur vitae adipisci iure tenetur itaque assumenda? Eum laboriosam illo a modi, nisi qui quia recusandae quidem quos accusamus dolore cumque ullam similique placeat ex quae. Rem porro quas sapiente minima? Dolorem ex quidem, corporis a nisi doloribus soluta beatae! ipsum dolor sit amet consectetur adipisicing elit. Eligendi, incidunt aspernatur vitae adipisci iure tenetur itaque assumenda? Eum laboriosam illo a modi, nisi qui quia recusandae quidem quos accusamus dolore cumque ullam similique placeat ex quae. Rem porro quas sapiente minima? Dolorem ex quidem, corporis a nisi doloribus soluta beatae!',
        aHref: './projects/1restoran (best home food)'
    },
    {
        id: 2,
        imgPath: './projects/Projects_photos/landx.jpg',
        projectTitle: 'Site for "LandX"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/2LandX'
    },
    {
        id: 3,
        imgPath: './projects/Projects_photos/foreign_exchange.png',
        projectTitle: 'Site for "Foreign exchange"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/3Foreing exchange'
    },
    {
        id: 4,
        imgPath: './projects/Projects_photos/moviepedia.png',
        projectTitle: 'Site for "Moviepedia"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/4MoviePedia'
    },
    {
        id: 5,
        imgPath: './projects/Projects_photos/css_generator.png',
        projectTitle: 'Site for "CSS Generator"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/5CSS Generator'
    },
    {
        id: 6,
        imgPath: './projects/Projects_photos/audio_player.jpg',
        projectTitle: 'Site for "Audio player"',
        projectText: 'Made with: HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScript HTML, CSS, JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript JavaScriptHTML, CSS, JavaScript HTML, CSS, JavaScript',
        aHref: './projects/6Audio player'
    },
    {
        id: 7,
        imgPath: './projects/Projects_photos/tour_guide.png',
        projectTitle: 'Site for "Tour guide"',
        projectText: 'Made with: HTML, CSS, JavaScript',
        aHref: './projects/7Tour-guide'
    }
]

let projects__content = document.querySelector('.projects__content')

for (const e of projectsArr) {

    projects__content.innerHTML += `
    <div class="projects__item projects__item${e.id} random-reveal">
        <div class="project-mobileBtn project-mobileBtn${e.id}">
            ◀show info
        </div>
        <div class="project__img">
            <img src="${e.imgPath}">
        </div>
        <div class="project__description project__description${e.id}">
            <div class="project__text-wrap">
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

    (e.id % 2 == 0) ? item.classList.add('right-reveal') : item.classList.add('left-reveal');
}

// !!! elements reveal
// let sides = ['top', 'right', 'bottom', 'left']
// ScrollReveal().reveal('.random-reveal', {
//     delay: Math.random() * 500,
//     distance: '150%',
//     origin: `${sides[Math.floor(Math.random() * 4)]}`,
//     duration: 1000,
//     reset: true
// });

ScrollReveal().reveal('.left-reveal', {
    // delay: Math.random() * 500,
    distance: '150%',
    origin: 'left',
    duration: 1000,
    reset: true
});

ScrollReveal().reveal('.right-reveal', {
    // delay: Math.random() * 500,
    distance: '150%',
    origin: 'right',
    duration: 1000,
    reset: true
});



