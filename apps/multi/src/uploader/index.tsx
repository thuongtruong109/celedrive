import React, { useCallback, useState } from 'react'
import {
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FileUploader from './FileUploader'
import WebrtcClient from './WebrtcClient'
import { formatSize, getFileIcon, splitFileExtension } from '../utils'

const Uploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [start, setStart] = useState(false)

  const handleReset = useCallback(() => {
    setFile(null)
    setStart(false)
  }, [setFile, setStart])

  const handleStartWebrtcClient = useCallback(() => {
    setStart(true)
  }, [setStart])

  const [filename, extension] = splitFileExtension(file?.name || '')
  const fileIcon = getFileIcon(file?.type || '')

  return (
      <section>
        {!file && <FileUploader onFileSelected={setFile} />}
        {file && (
          <div>
            <div className="uploaded-file">
              <FontAwesomeIcon className="file-icon" icon={fileIcon} />
              <span className="file-name">{filename}</span>
              <span className="file-extension">{extension}</span>
              <span className="file-size"> - {formatSize(file.size)}</span>
            </div>
            <div className="btn_area">
              {!start && (
                <button
                  className="start_button"
                  onClick={handleStartWebrtcClient}
                >
                  Start sharing
                </button>
              )}
              <button type="button" className={`cancel_btn ${start ? 'hidden' : ''}`} onClick={handleReset}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        )}
        {start && file && <WebrtcClient file={file} />}
      </section>
  )
}

export default Uploader