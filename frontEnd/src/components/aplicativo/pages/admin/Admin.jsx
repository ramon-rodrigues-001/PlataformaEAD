import React, { useState } from 'react';
import styles from './Admin.module.scss';

const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);

    const handleAddCourse = (e) => {
        e.preventDefault();
        const courseName = e.target.courseName.value;
        const courseCategory = e.target.courseCategory.value;
        setCourses([...courses, { name: courseName, category: courseCategory }]);
        setIsModalOpen(false);
    };

    return (
        <div className={styles.admin_page}>
            <div className={styles.sidebar}>
                <h2>Administração</h2>
                <ul>
                    <li><a href="#courses">Cursos</a></li>
                    <li><a href="#users">Usuários</a></li>
                    <li><a href="#reports">Relatórios</a></li>
                    <li><a href="#settings">Configurações</a></li>
                </ul>
            </div>

            <div className={styles.course}>
                <h2>Adicionar Curso</h2>
                <form onSubmit={handleAddCourse} className={styles.form}>
                    <input type="text" value="Javascript II" disabled className={styles.inputModule} />

                    <div className={styles.form_group}>
                        <label htmlFor="aulaName">Nome da aula</label>
                        <input type="text" id="aulaName" name="aulaName" placeholder="Digite o nome da aula" required />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="urlAula">URL da aula</label>
                        <input type="text" id="urlAula" name="urlAula" placeholder="Cole https://aula-1" required />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="nomeProfessor">Nome do professor</label>
                        <input type="text" id="nomeProfessor" name="nomeProfessor" placeholder="Digite o nome do professor" required />
                    </div>
                    <button type="submit" className={styles.submit_btn}>Adicionar Curso</button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
