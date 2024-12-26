import { useState } from 'react'
import styles from '../Formulario.module.scss'
 

export default function Register(props) {
    const tema = props.tema
    const [buttonSubmit, setButtonSubimit] = useState(false)


    const verificarSenhaIguais = () => {
        const Password = document.querySelector('#password').value
        const confirmPassword = document.querySelector('#confirm-password').value

        Password !== confirmPassword || Password == '' || confirmPassword == '' ? 
        setButtonSubimit(false) : setButtonSubimit(true)
    }



    const handleSubmit = async ( event ) => {
        event.preventDefault()

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const formData = {username, email, password}
        console.log(formData)
    
        try {
            // MUDAR URL ABAIXO
            const response = await fetch("https://plataformaead-2.onrender.com/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json()

            if (response.ok) {
              alert("Registro bem-sucedido")
              localStorage.setItem('userID', responseData.userID)
              localStorage.setItem('login', 'Logado')

            //   Redirecionando para a rota de perfil
              let currentURL = window.location.href;
              let newURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
              window.location.href = newURL;
            } 

            if (response.status === 400) {
                alert(responseData.message)
            }
            else if (response.status === 409) {
                alert(responseData.message)
            }
        } 
        catch (error) {
            console.error("Erro ao fazer registro:", error);
        }
    }




    return (
        <div className={styles.formulario} id={tema === 'Escuro' ? styles.temaDark : null}>
            {/* <form onSubmit={handleSubmit} className={styles.registration_form}> */}



                <div className={styles.form_container}>
                    <form onSubmit={handleSubmit} className={styles.registration_form}>
                        <h2>Crie sua conta</h2>
                        <div className={styles.form_group}>
                            <label for="username">Nome</label>
                            <input type="text" id="username" name='username' placeholder="Digite seu nome" required />
                        </div>
                        <div className={styles.form_group}>
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name='email' placeholder="Digite seu e-mail" required />
                        </div>
                        <div className={styles.form_group}>
                            <label for="password">Senha</label>
                            <input type="password" id="password" name='password' placeholder="Digite sua senha" onChange={verificarSenhaIguais} required />
                        </div>

                        <div className={styles.form_group}>
                            <label for="confirm-password">Confirmar Senha</label>
                            <input type="password" id="confirm-password" placeholder="Confirme sua senha" onChange={verificarSenhaIguais} required />
                        </div>

                        {buttonSubmit ? (
                            <button type="submit" className={styles.submit_btn}>
                                Registrar
                            </button>
                        ) : (
                            <button disabled style={{ backgroundColor: "gray", cursor: "not-allowed" }} type="submit" className={styles.submit_btn}>
                                Registrar
                            </button>
                        )}
                        
                        <p className={styles.login_link}>Já tem uma conta? <a href="/perfil/login">Faça login</a></p>
                        </form>
                </div>






                
                {/* <h1 className={styles.title}>Welcome</h1>
                <div className={styles.inputContainer}>
                    <label htmlFor="username" className={styles.label}>Nome completo</label>
                    <input type="text" id="username" name="username" placeholder="Ramon Rodrigues Cordeiro" required className={styles.input}/>
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" name="email" placeholder="ramon@gmail.com" required className={styles.input}/>
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input type="password" id="password" name="password" placeholder="12345678" min={8} required className={styles.input}/>
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="telefone" className={styles.label}>Telefone</label>
                    <input type="text" id="telefone" name="telefone" placeholder="(99) 99999-9999" required className={styles.input}/>
                </div>


                <button type="submit"  className={styles.buttonSubmit}>Entrar</button>
                
                <a href='/perfil/login' className={styles.buttonSubmit}>Já tenho uma conta</a> */}
            {/* </form> */} 
        </div>
    )
}
