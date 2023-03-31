// Дуже багато часу я сюди потратив але воно було цього варте)

let box = document.getElementById("box")
let codeOutput = document.getElementById("codeOutput")
let btnCopy = document.getElementById("btnCopy")

// size
let rangeWidth = document.getElementById("rangeWidth")
let numberWidth = document.getElementById("numberWidth")

rangeWidth.addEventListener("input", () => {
    box.style.width = `${rangeWidth.value}px`
    numberWidth.value = rangeWidth.value
    createElements(widthOut, 'outsCSS')
    widthOut.innerText = `width: ${rangeWidth.value}px;`
    btnCopy.innerText = 'Copy'
})

numberWidth.addEventListener("input", () => {
    box.style.width = `${numberWidth.value}px`
    rangeWidth.value = numberWidth.value
    createElements(widthOut, 'outsCSS')
    widthOut.innerText = `width: ${numberWidth.value}px;`
    btnCopy.innerText = 'Copy'
})
// hr
let rangeHeigth = document.getElementById("rangeHeigth")
let numberHeigth = document.getElementById("numberHeigth")

rangeHeigth.addEventListener("input", () => {
    box.style.height = `${rangeHeigth.value}px`
    numberHeigth.value = rangeHeigth.value
    createElements(heigthOut, 'outsCSS')
    heigthOut.innerText = `height: ${rangeHeigth.value}px;`
    btnCopy.innerText = 'Copy'
})

numberHeigth.addEventListener("input", () => {
    box.style.height = `${numberHeigth.value}px`
    rangeHeigth.value = numberHeigth.value
    createElements(heigthOut, 'outsCSS')
    heigthOut.innerText = `height: ${numberHeigth.value}px;`
    btnCopy.innerText = 'Copy'
})

// background
let rangeR = document.getElementById('rangeR')
let numR = document.getElementById('numR')
let rangeG = document.getElementById('rangeG')
let numG = document.getElementById('numG')
let rangeB = document.getElementById('rangeB')
let numB = document.getElementById('numB')
let rangeO = document.getElementById('rangeO')
let numO = document.getElementById('numO')

function updateRangeRgb(r, n) {
    box.style.backgroundColor = `rgb(${rangeR.value}, ${rangeG.value}, ${rangeB.value}, ${rangeO.value / 10})`
    n.value = r.value
    createElements(backgroundOut, 'outsCSS')
    backgroundOut.innerText = `background-color: rgb(${rangeR.value}, ${rangeG.value}, ${rangeB.value}, ${rangeO.value / 10});`
    btnCopy.innerText = 'Copy'
}
function updateNumRgb(r, n) {
    box.style.backgroundColor = `rgb(${rangeR.value}, ${rangeG.value}, ${rangeB.value}, ${rangeO.value / 10})`
    r.value = n.value
    createElements(backgroundOut, 'outsCSS')
    backgroundOut.innerText = `background-color: rgb(${rangeR.value}, ${rangeG.value}, ${rangeB.value}, ${rangeO.value / 10});`
    btnCopy.innerText = 'Copy'
}
function doubleInput(range, num) {
    range.addEventListener("input", () => {
        updateRangeRgb(range, num)
    })
    num.addEventListener("input", () => {
        updateNumRgb(range, num)
    })
}
doubleInput(rangeR, numR)
doubleInput(rangeG, numG)
doubleInput(rangeB, numB)
doubleInput(rangeO, numO)

// text
let addText = document.getElementById('addText')
let textR = document.getElementById('textR')
let textG = document.getElementById('textG')
let textB = document.getElementById('textB')
let fontSize = document.getElementById('fontSize')
let textAlign = document.getElementById('textAlign')
let textVertical = document.getElementById('textVertical')
let fontFamily = document.getElementById('fontFamily')

function textColor(color) {
    color.addEventListener('input', () => {
        box.style.color = `rgb(${textR.value}, ${textG.value}, ${textB.value})`
        createElements(colorOut, 'outsCSS')
        colorOut.innerText = `color: rgb(${textR.value}, ${textG.value}, ${textB.value});`
        btnCopy.innerText = 'Copy'
    })
}
textColor(textR)
textColor(textG)
textColor(textB)


addText.addEventListener('input', () => {
    box.innerText = addText.value
})


fontSize.addEventListener('input', () => {
    box.style.fontSize = `${fontSize.value}px`
    createElements(fontSizeOut, 'outsCSS')
    fontSizeOut.innerText = `font-size: ${fontSize.value}px;`
    btnCopy.innerText = 'Copy'
})


textAlign.addEventListener('input', () => {
    box.style.textAlign = `${textAlign.value}`
    createElements(textAlignOut, 'outsCSS')
    textAlignOut.innerText = `text-align: ${textAlign.value};`
    btnCopy.innerText = 'Copy'
})

textVertical.addEventListener('input', () => {
    box.style.lineHeight = `${textVertical.value}px`
    createElements(textVerticalOut, 'outsCSS')
    textVerticalOut.innerText = `line-height: ${textVertical.value}px;`
    btnCopy.innerText = 'Copy'
})

fontFamily.addEventListener('click', () => {
    box.style.fontFamily = `${fontFamily.value}`
    createElements(fontFamilyOut, 'outsCSS')
    fontFamilyOut.innerText = `font-family: ${fontFamily.value};`
    btnCopy.innerText = 'Copy'
})


// Borders
let allBordersInputs = document.getElementsByClassName('allBordersInputs')
let allBordersSize = document.getElementById('allBordersSize')
let allBordersStyle = document.getElementById('allBordersStyle')
let allBordersColor = document.getElementById('allBordersColor')

let borderTop = document.getElementById('borderTop')
let borderRight = document.getElementById('borderRight')
let borderBot = document.getElementById('borderBot')
let borderLeft = document.getElementById('borderLeft')

let borderRadius = document.getElementById('borderRadius')

for (const element of allBordersInputs) {
    element.addEventListener('input', () => {
        box.style.border = `${allBordersSize.value}px ${allBordersStyle.value} ${allBordersColor.value}`
        createElements(allBordersOut, 'outsCSS')
        allBordersOut.innerText = `border: ${allBordersSize.value}px ${allBordersStyle.value} ${allBordersColor.value};`
        btnCopy.innerText = 'Copy'
    })
}
borderTop.addEventListener('input', () => {
    box.style.borderTop = `${borderTop.value}`
    createElements(borderTopOut, 'outsCSS')
    borderTopOut.innerText = `border-top: ${borderTop.value};`
    btnCopy.innerText = 'Copy'
})
borderRight.addEventListener('input', () => {
    box.style.borderRight = `${borderRight.value}`
    createElements(borderRightOut, 'outsCSS')
    borderRightOut.innerText = `border-right: ${borderRight.value};`
    btnCopy.innerText = 'Copy'
})
borderBot.addEventListener('input', () => {
    box.style.borderBottom = `${borderBot.value}`
    createElements(borderBotOut, 'outsCSS')
    borderBotOut.innerText = `border-bottom: ${borderBot.value};`
    btnCopy.innerText = 'Copy'
})
borderLeft.addEventListener('input', () => {
    box.style.borderLeft = `${borderLeft.value}`
    createElements(borderLeftOut, 'outsCSS')
    borderLeftOut.innerText = `border-left: ${borderLeft.value};`
    btnCopy.innerText = 'Copy'
})

borderRadius.addEventListener('input', () => {
    box.style.borderRadius = `${borderRadius.value}`
    createElements(borderRadiusOut, 'outsCSS')
    borderRadiusOut.innerText = `border-radius: ${borderRadius.value};`
    btnCopy.innerText = 'Copy'
})

// Shadow
let displacementX = document.getElementById('displacementX')
let displacementY = document.getElementById('displacementY')
let shadowBlur = document.getElementById('shadowBlur')
let shadowColor = document.getElementById('shadowColor')
let shadowStyle = document.getElementById('shadowStyle')
let shadowSettings = document.getElementsByClassName('shadowSettings')

let boxRadio = document.getElementById('boxRadio')
let textRadio = document.getElementById('textRadio')

for (let element of shadowSettings) {
    element.addEventListener('input', () => {
        if (boxRadio.checked) {
            box.style.boxShadow = `${shadowStyle.value} ${displacementX.value}px ${displacementY.value}px ${shadowBlur.value}px ${shadowColor.value}`
            createElements(shadowBoxOut, 'outsCSS')
            shadowBoxOut.innerText = `box-shadow: ${shadowStyle.value} ${displacementX.value}px ${displacementY.value}px ${shadowBlur.value}px ${shadowColor.value};`
            btnCopy.innerText = 'Copy'
        } else if (textRadio.checked){
            box.style.textShadow = `${shadowStyle.value} ${displacementX.value}px ${displacementY.value}px ${shadowBlur.value}px ${shadowColor.value}`
            createElements(shadowTextOut, 'outsCSS')
            shadowTextOut.innerText = `text-shadow: ${shadowStyle.value} ${displacementX.value}px ${displacementY.value}px ${shadowBlur.value}px ${shadowColor.value};`
            btnCopy.innerText = 'Copy'
        }
    })
}


// transform
let tScale = document.getElementById('tScale')
let tRotate = document.getElementById('tRotate')
let tTranslate = document.getElementById('tTranslate')

tScale.addEventListener('input', () => {
    box.style.transform = `scale(${tScale.value})`
    createElements(tScaleOut, 'outsCSS')
    tScaleOut.innerText = `scale(${tScale.value});`
    btnCopy.innerText = 'Copy'
})

tRotate.addEventListener('input', () => {
    box.style.transform = `rotate(${tRotate.value}deg)`
    createElements(tRotateOut, 'outsCSS')
    tRotateOut.innerText = `rotate(${tRotate.value}deg);`
    btnCopy.innerText = 'Copy'
})

tTranslate.addEventListener('input', () => {
    box.style.transform = `translate(${tTranslate.value})`
    createElements(tTranslateOut, 'outsCSS')
    tTranslateOut.innerText = `translate(${tTranslate.value});`
    btnCopy.innerText = 'Copy'
})


// Out
function createElements(name, clas) {
    codeOutput.appendChild(name)
    name.setAttribute('class', `${clas}`)
}

let widthOut = document.createElement('div')
let heigthOut = document.createElement('div')

let backgroundOut = document.createElement('div')

let fontSizeOut = document.createElement('div')
let colorOut = document.createElement('div')
let textAlignOut = document.createElement('div')
let textVerticalOut = document.createElement('div')
let fontFamilyOut = document.createElement('div')

let allBordersOut = document.createElement('div')
let borderTopOut = document.createElement('div')
let borderRightOut = document.createElement('div')
let borderBotOut = document.createElement('div')
let borderLeftOut = document.createElement('div')
let borderRadiusOut = document.createElement('div')

let shadowBoxOut = document.createElement('div')
let shadowTextOut = document.createElement('div')

let tScaleOut = document.createElement('div')
let tRotateOut = document.createElement('div')
let tTranslateOut = document.createElement('div')


btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(codeOutput.innerText)
    btnCopy.innerText = 'Сopied ＼(^▽^)ノ'
})