const canvas = document.getElementById('canvas')

// Teste de comunicação entre renderer.js e o preload.js
window.addEventListener('DOMContentLoaded', async () => {
    document.onreadystatechange = async function () {
      if (document.readyState == "complete") {
          await window.paintapp.onLoad()
          .then((res) => {
              console.log(`A página foi carregada`)
          })
      }
    };
})

canvas.addEventListener('mousedown', async (event) => {
    await window.paintapp.onMouseDown(event.clientX, event.clientY)
        .then((res) => {
            console.log(`Você clicou no mouse: ${JSON.stringify(res)}`)
        })
})

canvas.addEventListener('mouseup', async (event) => {
    await window.paintapp.onMouseUp(event.clientX, event.clientY)
        .then((res) => {
            console.log(`Você soltou o mouse: ${JSON.stringify(res)}`)
        })
})

canvas.addEventListener('mousemove', async (event) => {
    await window.paintapp.onMouseMove(event.clientX, event.clientY)
        .then((res) => {
            console.log(`Você moveu o mouse: ${JSON.stringify(res)}`)
        })
})

// Método para salvar os dados ou verificar
// canvas.addEventListener('mouseleave', async (event) => {
//     await window.paintapp.onMouseLeave(event.clientX, event.clientY)
//         .then((res) => {
//             console.log(`Você saiu do canvas: ${JSON.stringify(res)}`)
//         })
// })