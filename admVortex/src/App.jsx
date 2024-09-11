import "./index.css"

function App() {
  return (
    <div className="admin_page">
      <div className="sidebar">
          <h2>Administração</h2>
          <ul>
              <li><a href="#courses">Cursos</a></li>
              <li><a href="#users">Usuários</a></li>
              <li><a href="#reports">Relatórios</a></li>
              <li><a href="#settings">Configurações</a></li>
          </ul>
      </div>

      <div className="container_router_pages">
          
      </div>
    </div>
  )
}

export default App
