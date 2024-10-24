import styles from '../Formulario.module.scss'


export default function Register(props) {
    const tema = props.tema

    const handleSubmit = async ( event ) => {
        event.preventDefault()

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const telefone = event.target.telefone.value

        const formData = {username, email, password, telefone}
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

      
            if (response.status === 200) {
              alert("Registro bem-sucedido")
              localStorage.setItem('userID', responseData.userID)
              localStorage.setItem('login', 'Logado')

            //   Redirecionando para a rota de perfil
              let currentURL = window.location.href;
              let newURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
              window.location.href = newURL;
            } 
            else {
                
                if (responseData.message === "o apelido do usuário já existe") {
                    alert('Apelido repetido')
                }
                else if (responseData.message === "o email do usuário já existe") {
                    alert('Email repetido')
                }
                else if (responseData.message === "requisito minimo de caracteres") {
                    alert('Senha sem requisito minimo de caracteres')
                }
                else {
                    alert('Erro desconhecido')
                }
            }
        } 
        catch (error) {
            console.error("Erro ao fazer registro:", error);
        }
    }




    return (
        <div className={styles.formulario} id={tema === 'Escuro' ? styles.temaDark : null}>
            <form onSubmit={handleSubmit}>
                
                <h1 className={styles.title}>Welcome</h1>
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
                
                <a href='/perfil/login' className={styles.buttonSubmit}>Já tenho uma conta</a>
            </form>
        </div>
    )
}
