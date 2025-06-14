(function(){
	let socket = io()
  
	function generateID() {
	  return `${Math.trunc(Math.random() * 999)}-${Math.trunc(
		Math.random() * 999,
	  )}-${Math.trunc(Math.random() * 999)}`
	}
  
	let sender_uid
  
	let inputVal = document.querySelector('#join-id')
  
	document
	  .querySelector('#receiver-start-con-btn')
	  .addEventListener('click', function () {
		sender_uid = inputVal.value
		if (sender_uid.length == 0) {
		  return
		}
		let joinID = generateID()
		socket.emit('receiver-join', {
		  sender_uid: sender_uid,
		  uid: joinID,
		})
  
		document.querySelector('.join-screen').classList.remove('active')
		document.querySelector('.fs-screen').classList.add('active')
	  })

    async function paste(input) {
        const text = await navigator.clipboard.readText();
        input.value = text;
    }

    document.querySelector('#paste-join-code-con-btn').addEventListener('click', function () {
        paste(inputVal);
    })
    
  
	let fileShare = {}
  
	socket.on('fs-meta', function (metadata) {
	  fileShare.metadata = metadata
	  fileShare.transmitted = 0
	  fileShare.buffer = []
  
	  let el = document.createElement('div')
	  el.classList.add('item')
	  el.innerHTML = `
		  <div class="progress">0%</div>
		  <div class="filename">${metadata.filename}</div>
	  `
	  document.querySelector('.files-list').appendChild(el)
  
	  fileShare.progrss_node = el.querySelector('.progress')
  
	  socket.emit('fs-start', {
		uid: sender_uid,
	  })
	})
  
	socket.on('fs-share', function (buffer) {
	  console.log('Buffer', buffer)
	  fileShare.buffer.push(buffer)
	  fileShare.transmitted += buffer.byteLength
	  fileShare.progrss_node.innerText = Math.trunc(
		(fileShare.transmitted / fileShare.metadata.total_buffer_size) * 100,
	  )
	  if (fileShare.transmitted == fileShare.metadata.total_buffer_size) {
		console.log('Download file: ', fileShare)
		download(new Blob(fileShare.buffer), fileShare.metadata.filename)
		fileShare = {}
	  } else {
		socket.emit('fs-start', {
		  uid: sender_uid,
		})
	  }
	})
  }());
  1