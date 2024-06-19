import React from 'react'
import Dropzone from 'react-dropzone'

const FileUploader: React.FC<{
  onFileSelected: (file: File) => void
}> = ({ onFileSelected }) => (
  <Dropzone onDropAccepted={(files) => onFileSelected(files[0])}>
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div>
          <p>Drag the file you want to share or...</p>
          <button>Upload a file</button>
        </div>
      </div>
    )}
  </Dropzone>
)

export default FileUploader
