import { Modal } from "./modal.js"
import { ApiRequests } from "./requests/requests.js"

class EditarInformacoes {
    static async editar() {
        const btnEditar = document.getElementById("btnEditarInformacao")
        btnEditar.addEventListener("click", () => {
            const form = Modal.editarInformacao()
            Modal.modalTemplate(form)
        })
    }
}

class RenderEmpresa {
    static async render() {
        const ul = document.getElementById("empresa")
        const departamento = await ApiRequests.departamentoDoFuncionarioLogado()
        
        const li = document.createElement("li")

        const h3 = document.createElement("h3")
        h3.innerText = departamento.name
        const descricao = document.createElement("p")
        descricao.innerText = departamento.description

        const divDep = document.createElement("div")
        

        departamento.departments.forEach(element => {
        
            const departamento = document.createElement("p")
            departamento.innerText = `Departamento: ${element.description}`
            divDep.append(departamento)  
        });
        
        const btnMostrar = document.createElement("button")
        btnMostrar.innerText = "Mostrar funcionários"
        btnMostrar.setAttribute("id","btnMostrar")

        li.append(h3,descricao,divDep,btnMostrar)
        ul.append(li)

        btnMostrar.addEventListener("click",async() => {
            const data = await ApiRequests.mostrarFuncionariosDepartamentoLogado()
            
            data.forEach(elem => {
                
                elem.users.forEach(funcionario => {
                    const form = Modal.mostrarFuncionarioDep(funcionario.username, funcionario.email)
                    Modal.modalTemplate(form)
                })
            })

        })
    }

    
}

class Logout {
    static logout() {
        const btnLogout = document.getElementById("btnLogout")
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("@kenzieEmpresa:token")
            localStorage.removeItem("@kenzieEmpresas:user_id")
            localStorage.removeItem("@kenzieEmpresas:admin")
            window.location.assign("../../index.html")
        })
    }
}

EditarInformacoes.editar()
RenderEmpresa.render()
Logout.logout()


