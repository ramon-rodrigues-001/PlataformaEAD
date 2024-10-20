import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cursos from "./components/curso/cursos/Cursos"
import "./index.css"
import CursosForm from './components/curso/cursos/CursosForm';
import Aulas from './components/curso/Aulas/Aulas';
import AulasForm from './components/curso/Aulas/AulasForm';
import Trilhas from './components/curso/trilhas/Trilhas';
import TrilhasForm from './components/curso/trilhas/TrilhasForm';


function App() {
  return (
    <div className="admin_page">
      <div className="sidebar">
          <h2>Administração</h2>
          <ul>
              <li><a href="/trilhas">Cursos</a></li>
              <li><a href="/users">Usuários</a></li>
              <li><a href="/reports">Relatórios</a></li>
              <li><a href="/settings">Configurações</a></li>
          </ul>
      </div>

      <div className="container_router_pages">
        <BrowserRouter>
          <Routes>
              <Route path="/trilhas" element={
                  < Trilhas />
              }/>
              <Route path="/trilha/criartrilha" element={
                  < TrilhasForm />
              }/>
              <Route path="/trilha/:id/cursos" element={
                  < Cursos />
              }/>
              <Route path="/curses/newCurse/:id" element={
                  < CursosForm />
              }/>
              <Route path="/aulas/:id" element={
                  < Aulas />
              }/>
              <Route path="/aulas/newAula/:id" element={
                  < AulasForm />
              }/>
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  )
}

export default App
