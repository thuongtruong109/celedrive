let receiverID
let socket = io()

function generateID() {
  return `${Math.trunc(Math.random() * 999)}-${Math.trunc(
    Math.random() * 999,
  )}-${Math.trunc(Math.random() * 999)}`
}

// let currentTab = 0;

// let btnTab = document.querySelectorAll("body nav button")
// btnTab[0].classList.add("active")

// for (let i = 0; i < btnTab.length; i++) {
//   btnTab[i].addEventListener("click", function () {
//     if (i == 0) {
//       x[0].style.display = "block";
//       x[1].style.display = "none";

//       btnTab[1].classList.remove("active")
//       btnTab[0].classList.add("active")
//     }
//     else {
//       x[0].style.display = "none";
//       x[1].style.display = "block";

//       btnTab[0].classList.remove("active")
//       btnTab[1].classList.add("active")
//     }
//   })
// }

document
  .querySelector('#sender-start-con-btn')
  .addEventListener('click', function () {
    let joinID = generateID()
    document.querySelector('#join-id').innerText = joinID;
    document.querySelector('.form-btn').style.display = 'flex';

    socket.emit('sender-join', {
      uid: joinID,
    })
  })

socket.on('init', function (uid) {
  receiverID = uid
  console.log('Receiver UID: ', uid)
  document.querySelector('.join-screen').classList.remove('active')
  document.querySelector('.fs-screen').classList.add('active')
})

document.querySelector('#file-input').addEventListener('change', function (e) {
  let file = e.target.files[0]
  if (!file) {
    return
  }
  let reader = new FileReader()
  reader.onload = function (e) {
    let buffer = new Uint8Array(reader.result)

    let el = document.createElement('div')
    el.classList.add('item')
    el.innerHTML = `
					<div class="progress">0%</div>
					<div class="filename">${file.name}</div>
			`
    document.querySelector('.files-list').appendChild(el)
    shareFile(
      {
        filename: file.name,
        total_buffer_size: buffer.length,
        buffer_size: 1024,
      },
      buffer,
      el.querySelector('.progress'),
    )
  }
  reader.readAsArrayBuffer(file)
})

function shareFile(metadata, buffer, progress_node) {
  socket.emit('file-meta', {
    uid: receiverID,
    metadata: metadata,
  })

  socket.on('fs-share', function () {
    let chunk = buffer.slice(0, metadata.buffer_size)
    buffer = buffer.slice(metadata.buffer_size, buffer.length)
    progress_node.innerText = Math.trunc(
      ((metadata.total_buffer_size - buffer.length) /
        metadata.total_buffer_size) *
        100,
    )
    if (chunk.length != 0) {
      socket.emit('file-raw', {
        uid: receiverID,
        buffer: chunk,
      })
    } else {
      console.log('Sent file successfully')
    }
  })
}
1