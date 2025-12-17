import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MapAuthorization } from './Map/MapAuthorization/MapAuthorization'
import { MapClient } from './Map/MapClient/MapClient'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MapAuthorization />} />
       <Route path="/map" element={<MapClient />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
