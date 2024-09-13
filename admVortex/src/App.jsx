import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cursos from "./components/curso/cursos"
import "./index.css"
import CursosForm from './components/curso/CursosForm';


function App() {
  return (
    <div className="admin_page">
      <div className="sidebar">
          <h2>Administração</h2>
          <ul>
              <li><a href="/curses">Cursos</a></li>
              <li><a href="/users">Usuários</a></li>
              <li><a href="/reports">Relatórios</a></li>
              <li><a href="/settings">Configurações</a></li>
          </ul>
      </div>

      <div className="container_router_pages">
        <BrowserRouter>
          <Routes>
              <Route path="/curses" element={
                  < Cursos />
              }/>
              <Route path="/curses/newCurse" element={
                  < CursosForm />
              }/>
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  )
}

export default App
