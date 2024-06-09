import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Downloader from './downloader'
import Uploader from './uploader'

const App: React.FC = () => (
  <Router>
      <Routes>
        <Route path="/" element={<Uploader />} />
        <Route path="/download/:id/" element={<Downloader />} />
      </Routes>
  </Router>
)
export default App
