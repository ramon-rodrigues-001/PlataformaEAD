import { redirect } from 'react-router-dom';
import styles from '../Formulario.module.scss'

export default function Login(props) {
    const tema = props.tema

    const handleSubmit = async ( event ) => {
        event.preventDefault()

        const email = event.target.email.value;
        const password = event.target.password.value;

        const formData = { email, password }

        try {
            const response = await fetch("https://plataformaead-2.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.status == 200) {
                alert('Login bem-sucedido')
                localStorage.setItem('userID', data.userID)
                localStorage.setItem('login', 'Logado')
            
                //   Redirecionando para a rota de perfil
                let currentURL = window.location.href;
                let newURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
                window.location.href = newURL;
            } else {
                alert('Credenciais inválidas')
            }
        }
        catch (err) {
            console.error("Erro ao fazer login:", err);
        }
    }

    return (
        <div className={styles.formulario} id={tema === 'Escuro' ? styles.temaDark : null}>


            <div className={styles.form_container}>
                    <form className={styles.registration_form} onSubmit={handleSubmit}>
                        <h2>Bem-vindo de volta</h2>
                        <div className={styles.form_group}>
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name='email' placeholder="Digite seu e-mail" required />
                        </div>
                        <div className={styles.form_group}>
                            <label for="password">Senha</label>
                            <input type="password" id="password" name='password' placeholder="Digite sua senha" required />
                        </div>
                        <button type="submit" className={styles.submit_btn}>Entrar</button>
                        <p className={styles.login_link}>Não tem uma conta? <a href="/perfil/register">Registre-se</a></p>
                    </form>
                </div>



            {/* <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Login</h1>

                <div className={styles.inputContainer}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required className={styles.input}/>
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input type="password" id="password" name="password" placeholder="Digite sua senha" required className={styles.input}/>
                </div>


                <button type="submit"  className={styles.buttonSubmit}>Entrar</button>
                <a href='/perfil/register' className={styles.buttonSubmit}>Não possuo uma conta</a>
            </form> */}
        </div>
    )
}