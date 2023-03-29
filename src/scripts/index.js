import { Modal } from "./modal.js"
import { ApiRequests } from "./requests/requests.js"

class RenderEmpresas {
    static async pegarEmpresas() {
        const data = await ApiRequests.listarEmpresas()
        Dom.renderEmpresas(data)
    }

    static async buscaPorSetor() {
        const selectSetor = document.getElementById("selectSetor")
        const btnBusca = document.getElementById("btnBuscaSetor")

        btnBusca.addEventListener("click", async() => {
            const setor = selectSetor.value
            const empresaSetor = await ApiRequests.listarEmpresaSetor(setor)
            
            Dom.renderEmpresas(empresaSetor)

        })
        
    }
}

class Dom {
    static renderEmpresas(arr) {
        const ul = document.getElementById("ulEmpresas")
        ul.innerHTML = ""
        arr.forEach(empresa => {
            const li = document.createElement("li")
            const nomeEmpresa = document.createElement("h3")
            nomeEmpresa.innerText = empresa.name
            const descricaoEmpresa = document.createElement("p")
            descricaoEmpresa.innerText = empresa.description
            const setorEmpresa = document.createElement("p")
            setorEmpresa.innerText = empresa.sectors.description

            li.append(nomeEmpresa,descricaoEmpresa,setorEmpresa)
            ul.append(li)
        })
    }
}

class Login {
    static loginUsuario() {
        const token = localStorage.getItem("@kenzieEmpresa:token")
        const admin = localStorage.getItem("@kenzieEmpresas:admin")
        

        if(token && admin == true) {
            window.location.assign("./src/pages/dashboard.html./src/pages/dashboardAdmin.html")
        } else if(token && admin == false) {
            window.location.assign("./src/pages/dashboard.html")
        }

        const emailInput = document.getElementById("inputEmail")
        const passwordInput = document.getElementById("inputPassword")
        const btnLogin = document.getElementById("btnEntrar")

        btnLogin.addEventListener("click", async(event) => {
            event.preventDefault()

            const data = {
                email: emailInput.value,
                password: passwordInput.value
            }

            await ApiRequests.login(data)

        })
    }

}

class Cadastrar {
    static modalCadastrar() {
        const btnCadastrarModal = document.getElementById("btnCadastrarModal")

        btnCadastrarModal.addEventListener("click",() => {
            const form = Modal.acessarConta()
            Modal.modalTemplate(form)   
        })
        
    }
}


RenderEmpresas.pegarEmpresas()
RenderEmpresas.buscaPorSetor()
Login.loginUsuario()

Cadastrar.modalCadastrar()





