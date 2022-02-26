const imageSelect = document.querySelector("input[type='file']")
const divContent = document.querySelector("div[class='image-container']")
const canvas = document.querySelector('canvas')
const slider = document.querySelector("input[type='range']")
const button = document.querySelector('button')
const ctx = canvas.getContext('2d')
const img1 = new Image()

let output = document.getElementById("slider-value")

function getImage() {
    let selection = imageSelect.files[0]
    let imgLink = URL.createObjectURL(selection)
    return imgLink
}

slider.addEventListener('input', () => output.innerHTML = slider.value)

button.addEventListener('click', () => slider.value = 384)
button.addEventListener('click', () => output.innerHTML = slider.value)

function drawImage(source) {

    img1.src = source

    img1.addEventListener('load', () => {
        canvas.width = img1.naturalWidth;
        canvas.height = img1.naturalHeight;

        ctx.drawImage(img1, 0, 0)
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixel = imgData.data

        for (let index = 0; index < imgData.data.length; index += 4) {
            const red = index + 0
            const green = index + 1
            const blue = index + 2

            let total = pixel[red] + pixel[green] + pixel[blue]

            let value = total <= slider.value ? 0 : 255
            pixel[red] = value
            pixel[green] = value
            pixel[blue] = value

        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.putImageData(imgData, 0, 0)
    })
}

imageSelect.addEventListener('input', () => {
    drawImage(getImage())
})

slider.addEventListener('change', () => {
    drawImage(getImage())
})

button.addEventListener('click', () => slider.value = 384)
button.addEventListener('click', () => output.innerHTML = slider.value)
button.addEventListener('click', () => drawImage(getImage()))