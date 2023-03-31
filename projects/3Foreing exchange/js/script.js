
let fromSelect = document.getElementById('fromSelect')
let toSelect = document.getElementById('toSelect')
let dateInput = document.getElementById('dateInput')
let converterOk = document.getElementById('converterOk')
let converterOutput = document.getElementById('converterOutput')
let conversionAmount = document.getElementById('conversionAmount')

let latestCont = document.getElementById('latestCont')
let latestTitle = document.getElementById('latestTitle')
let latestContent = document.getElementById('latestContent')
let latestContentTd = document.getElementById('latestContentTd')
let latestContentTh = document.getElementById('latestContentTh')
dateInput.valueAsDate = new Date();

let monthBase = document.getElementById('monthBase')
let monthCurrency = document.getElementById('monthCurrency')
let monthInput = document.getElementById('monthInput')
let monthInputEnd = document.getElementById('monthInputEnd')
let monthOk = document.getElementById('monthOk')
let canvasCont = document.getElementById('canvasCont')
// monthInput.valueAsDate = new Date();

const ctx = document.getElementById('myChart').getContext('2d');

let dateArr = []
let valuteArr = []

window.onload = () => {
    let url = `https://api.exchangerate.host/${dateInput.value}`
    let urlLatest = `https://api.exchangerate.host/latest`

    axios.get(url)
        .then((responce) => {
            // console.log(responce.data);

            for (const key in responce.data.rates) {
                let optionFrom = document.createElement('option')
                optionFrom.setAttribute('value', `${key}`)
                optionFrom.innerText = `${key}`
                fromSelect.appendChild(optionFrom)

                let optionTo = document.createElement('option')
                optionTo.setAttribute('value', `${key}`)
                optionTo.innerText = `${key}`
                toSelect.appendChild(optionTo)
            }
        })
        .catch((error) => {
            console.log(error);
        })

    axios.get(urlLatest)
        .then((responce) => {
            // console.log(responce.data);
            latestContent.style.padding = 0
            latestContent.style.display = 'flex'

            for (const key in responce.data.rates) {
                let latestTd = document.createElement('div')
                latestTd.innerText = `${key}`
                latestTd.classList.add('converter-cell')
                latestContentTd.appendChild(latestTd)

                let latestTh = document.createElement('div')
                latestTh.innerText = `${responce.data.rates[key]}`
                latestTh.classList.add('converter-cell')
                latestContentTh.appendChild(latestTh)

                let monthBaseOption = document.createElement('option')
                monthBaseOption.setAttribute('value', `${key}`)
                monthBaseOption.innerText = `${key}`
                monthBase.appendChild(monthBaseOption)

                let monthCurrencyOption = document.createElement('option')
                monthCurrencyOption.setAttribute('value', `${key}`)
                monthCurrencyOption.innerText = `${key}`
                monthCurrency.appendChild(monthCurrencyOption)
            }
            latestTitle.innerHTML = `Latest <span class='latestSpan'>${new Date().toLocaleDateString()}</>`
        })
        .catch((error) => {
            console.log(error);
        })
}

latestCont.style.position = 'relative'
let latestHint = document.createElement('div')
latestCont.appendChild(latestHint)
latestHint.innerHTML = 'To search for currency, use <br> <span style=\'color: red; font-weight: bold;\'>ctrl + f</span> on your browser'
latestHint.style.color = 'white'
latestHint.style.padding = '10px'
latestHint.style.borderRadius = '20px'
latestHint.style.backgroundColor = 'rgb(24, 170, 189)'
latestHint.style.position = 'absolute'
latestHint.style.top = '50px'
latestHint.style.right = '20px'
latestHint.style.display = 'none'
latestCont.style.cursor = 'help'
latestCont.addEventListener('mouseover', () => {
    latestHint.style.display = 'block'
})
latestCont.addEventListener('mouseleave', () => {
    latestHint.style.display = 'none'
})

converterOk.addEventListener('click', () => {
    let url = `https://api.exchangerate.host/${dateInput.value}`

    axios.get(url, {
        params: {
            base: `${fromSelect.value}`,
            symbols: `${toSelect.value}`,
            amount: `${conversionAmount.value}`
        }
    })
        .then((responce) => {
            for (const key in responce.data.rates) {
                converterOutput.innerText = `${responce.data.rates[key]}`
            }
        })
        .catch((error) => {
            console.log(error);
        })

})

monthOk.addEventListener('click', () => {
    let urlMonth = `https://api.exchangerate.host/timeseries`
    axios.get(urlMonth, {
        params: {
            base: `${monthBase.value}`,
            symbols: `${monthCurrency.value}`,
            // start_date: `${new Date().getFullYear()}-${new Date().getMonth()}-01`,
            // end_date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`
            // start_date: `2022-01-01`,
            // end_date: `2022-02-01`

            start_date: `${monthInput.value}`,
            end_date: `${monthInputEnd.value}`

        }
    })
        .then((responce) => {
            // console.log(responce.data);
            for (const key in responce.data.rates) {
                dateArr.push(key) // дати
                valuteArr.push(responce.data.rates[key][`${monthCurrency.value}`]) // цінність валюти
            }

            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dateArr,
                    datasets: [{
                        label: `${monthInput.value}, ${monthBase.value} ➡ ${monthCurrency.value}`,
                        data: valuteArr,
                        backgroundColor: [
                            'rgba(24, 170, 189, 0.5)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            dateArr.length = 0
            valuteArr.length = 0

        })
        .catch((error) => {
            console.log(error);
            monthOk.style.backgroundColor = 'red'
            monthOk.value = 'Error: restart the page'
        })

})


