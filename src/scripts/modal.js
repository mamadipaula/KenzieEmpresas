import { ApiRequests } from "./requests/requests.js"


export class Modal {
    static async modalTemplate(form) {
        const body = document.querySelector("body")
        const section = document.createElement("section")
        section.setAttribute("id","modalCadastro")
        section.classList.add("modal")
        const spanBackground = document.createElement("span")
        spanBackground.classList.add("modal_background")
        section.append(spanBackground,form)
        body.append(section)

    }

    static acessarConta() {
        const divHeader = document.createElement("div")
        divHeader.classList.add("modal_content")
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = "Cadastrar"
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        const form = document.createElement("form")
        const inputNome = document.createElement("input")
        inputNome.type ="text"
        inputNome.setAttribute("id","username")
        inputNome.placeholder = "Digite seu nome"
        const inputEmail = document.createElement("input")
        inputEmail.type = "email"
        inputEmail.setAttribute("id","email")
        inputEmail.placeholder = "Digite seu e-mail"
        const inputNivelProfissional = document.createElement("input")
        inputNivelProfissional.type = "text"
        inputNivelProfissional.setAttribute("id","profissional_level")
        inputNivelProfissional.placeholder = "Digite seu nível profissional"
        const inputPassword = document.createElement("input")
        inputPassword.type = "password"
        inputPassword.setAttribute("id","password")
        inputPassword.placeholder = "Digite sua senha"
        const btnCadastrar = document.createElement("button")
        btnCadastrar.type = "submit"
        btnCadastrar.innerText = "Cadastrar"

        btnCadastrar.addEventListener("click", async(event) => {
            event.preventDefault()
            const data = {
                password: inputPassword.value,
                email: inputEmail.value,
                professional_level: inputNivelProfissional.value,
                username: inputNome.value
              }

            await ApiRequests.criarUsuario(data)

            const section = document.getElementById("modalCadastro")
            section.remove()
        })

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalCadastro")
            section.remove()
         })

        form.append(inputNome,inputEmail,inputNivelProfissional,inputPassword,btnCadastrar)

        div.append(h2,btnFechar)

        divHeader.append(div,form)

        return divHeader

    }

    static editarInformacao() {
        const divHeader = document.createElement("div")
        divHeader.classList.add("modal_content")
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = "Editar Informação"
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        const inputNome = document.createElement("input")
        inputNome.type ="text"
        inputNome.setAttribute("id","inputName")
        inputNome.placeholder = "Digite seu novo nome"
        const inputEmail = document.createElement("input")
        inputEmail.type = "email"
        inputEmail.setAttribute("id","inputEmail")
        inputEmail.placeholder = "Digite seu novo e-mail"
        const inputPassword = document.createElement("input")
        inputPassword.type = "password"
        inputPassword.setAttribute("id","inputPassword")
        inputPassword.placeholder = "Digite sua nova senha"
        const btnAtualizar = document.createElement("button")
        btnAtualizar.setAttribute("id","btnAtualizar")
        btnAtualizar.innerText = "Atualizar informação"

        btnAtualizar.addEventListener("click", async(event) => {
            event.preventDefault()
            const data = {
                username: inputNome.value,
                email: inputEmail.value,
                password: inputPassword.value
              }

            await ApiRequests.atualizarDadosFuncionario(data)

            const section = document.getElementById("modalCadastro")
            section.remove()
        })

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalCadastro")
            section.remove()
         })

        div.append(h2,btnFechar)

        divHeader.append(div,inputNome,inputEmail,inputPassword,btnAtualizar)

        return divHeader
    }

    static cadastrarDepartamento(id) {
        const div = document.createElement("div")
        div.classList.add("modal_cadastrar-departamento")
        const divHeader = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = "Cadastrar novo departamento"
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        const inputNome = document.createElement("input")
        inputNome.type = "text"
        inputNome.setAttribute("id","inputNameDep")
        inputNome.placeholder = "Nome do departamento"
        const inputDescricao = document.createElement("input")
        inputDescricao.type = "text"
        inputDescricao.setAttribute("id","inputDescricaoDep")
        inputDescricao.placeholder = "Descrição do departamento"
        const btnCadastrar = document.createElement("button")
        btnCadastrar.setAttribute("id",id)
        btnCadastrar.innerText = "Cadastrar departamento"

        btnCadastrar.addEventListener("click", async(event) => {
            event.preventDefault()
            const data = {
                name: inputNome.value,
                description: inputDescricao.value,
                company_uuid: btnCadastrar.id
              }
              console.log(data)

            await ApiRequests.criarDepartamento(data)

            const section = document.getElementById("modalCadastro")
            section.remove()
        })

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalCadastro")
            section.remove()
         })

        divHeader.append(h2,btnFechar)

        div.append(divHeader,inputNome,inputDescricao,btnCadastrar)

        return div
    }

    static async mostrarDep(id) {
        const mostrar = await ApiRequests.mostrarDepartamentoEmpresa(id)
        const div = document.createElement("div")
        div.classList.add("modal_cadastrar-departamento")
        const divHeader = document.createElement("div")
        divHeader.classList.add("divHeader")
        const h2 = document.createElement("h2")
        h2.innerText = "Departamentos"
        const div2 = document.createElement("div")
        const pesquisaPorDep = document.createElement("input")
        pesquisaPorDep.type = "text"
        pesquisaPorDep.setAttribute("id","inputPesquisar")
        pesquisaPorDep.placeholder = "Pesquisar departemento"
        pesquisaPorDep.classList.add("inputPesquisaDep")
        const btnPesquisaPorDep = document.createElement("button")
        btnPesquisaPorDep.innerText = "Pesquisar"
        btnPesquisaPorDep.setAttribute("id",id)
        btnPesquisaPorDep.classList.add("btnPesquisaDep")
        div2.append(pesquisaPorDep,btnPesquisaPorDep)
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        const ul = document.createElement("ul") 
        ul.classList.add("ulPesquisa")
        mostrar.forEach(elem => {
            const li = document.createElement("li")
            const p = document.createElement("p")
            const span = document.createElement("span")
            const btnFuncionarios = document.createElement("button")
            const btnContratarFuncionario = document.createElement("button")
            const btnDemitir = document.createElement("button")
            btnDemitir.setAttribute("id", elem.uuid)
            btnDemitir.innerText = "Demitir Funcionário"
            btnDemitir.classList.add("btnDemitir")
            btnContratarFuncionario.innerText = "Contratar Funcionário"
            btnContratarFuncionario.setAttribute("id",elem.uuid)
            btnContratarFuncionario.classList.add("contratarFunc")
            btnFuncionarios.innerText = "Mostrar Funcionários"
            btnFuncionarios.setAttribute("id",elem.uuid)
            btnFuncionarios.classList.add("mostrarFunc")
            span.innerText = `Descrição: ${elem.description}`
            p.classList.add("PDep")
            p.innerText = elem.name
            li.append(p,span,btnFuncionarios,btnContratarFuncionario,btnDemitir)
            ul.append(li)
        })

        divHeader.append(h2,btnFechar,div2)
        div.append(divHeader,ul)


        btnPesquisaPorDep.addEventListener("click", () => {
            ul.innerHTML = ""
            mostrar.forEach(departamento => {
                const departamentoFormatado = departamento.name.toLowerCase()
                const pesquisaFormatada = pesquisaPorDep.value.toLowerCase() 
                if(departamentoFormatado.includes(pesquisaFormatada)) {
                    const liPesquisa = document.createElement("li")
                    const pPesquisa = document.createElement("p")
                    const descricao = document.createElement("span")
                    const btnFuncionarios = document.createElement("button")
                    btnFuncionarios.innerText = "Mostrar Funcionários"
                    btnFuncionarios.setAttribute("id",departamento.uuid)
                    btnFuncionarios.classList.add("mostrarFunc")
                    descricao.innerText = `Descrição: ${departamento.description}`
                    pPesquisa.innerText = departamento.name
                    liPesquisa.append(pPesquisa,descricao,btnFuncionarios)
                    ul.append(liPesquisa)
                }
            })
            pesquisaPorDep.value = ""
        })

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalCadastro")
            section.remove()
         })


        return div
    }

    static async mostrarFuncionarioPorDep(nome, nivel, tipo) {
        const div = document.createElement("div")
        div.classList.add("modal_cadastrar-departamento")
        const h2 = document.createElement("h2")
        h2.innerText = nome
        const nivelDep = document.createElement("p")
        nivelDep.innerText = nivel
        const tipoDep = document.createElement("p")
        tipoDep.innerText = `Admin: ${tipo}`
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"

        div.append(h2,nivelDep,tipoDep,btnFechar)

        const body = document.querySelector("body")
        const section = document.createElement("section")
        section.setAttribute("id","modalFuncionario")
        section.classList.add("modal")
        const spanBackground = document.createElement("span")
        spanBackground.classList.add("modal_background")
        section.append(spanBackground,div)
        body.append(section)

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalFuncionario")
            section.remove()
         })

    }

    static async contratarFuncionario(data) {
        const div = document.createElement("div")
        div.classList.add("modal_cadastrar-departamento")
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        const ul = document.createElement("ul")
        data.forEach(elem => {
            if(elem.department_uuid == null) {
                const li = document.createElement("li")
                const h3 = document.createElement("h3")
                h3.innerText = elem.username
                const button = document.createElement("button")
                button.setAttribute("id", elem.uuid)
                button.classList.add("btnContratar")
                button.innerText = "Contratar"
                
                li.append(h3,button)
                ul.append(li)
            }

        })

        

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalFuncionario")
            section.remove()
        })
        

        const body = document.querySelector("body")
        const section = document.createElement("section")
        section.setAttribute("id","modalFuncionario")
        section.classList.add("modal")
        const spanBackground = document.createElement("span")
        spanBackground.classList.add("modal_background")
        div.append(btnFechar,ul)
        section.append(spanBackground,div)
        body.append(section)
        
    }

    static async demitirFuncionario(data,id) {
        const div = document.createElement("div")
        div.classList.add("modal_cadastrar-departamento")
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        const ul = document.createElement("ul")
        data.forEach(elem => {
            if(elem.department_uuid == id) {
                const li = document.createElement("li")
                const h3 = document.createElement("h3")
                h3.innerText = elem.username
                const button = document.createElement("button")
                button.setAttribute("id", elem.uuid)
                button.classList.add("btnDemitirUsuario")
                button.innerText = "Demitir"
                
                li.append(h3,button)
                ul.append(li)
            }

        })

        

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalFuncionario")
            section.remove()
        })
        

        const body = document.querySelector("body")
        const section = document.createElement("section")
        section.setAttribute("id","modalFuncionario")
        section.classList.add("modal")
        const spanBackground = document.createElement("span")
        spanBackground.classList.add("modal_background")
        div.append(btnFechar,ul)
        section.append(spanBackground,div)
        body.append(section)
    }

    static editarFuncionario(id) {
        const div = document.createElement("div")
        div.classList.add("modal_cadastrar-departamento")
        const divHeader = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = "Editar informações de usuario"
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        divHeader.append(h2,btnFechar)
        const inputModalidade = document.createElement("input")
        inputModalidade.type = "text"
        inputModalidade.placeholder = "Digite a nova modalidade de Trabalho"
        inputModalidade.classList.add("inputModalidade")
        const inputCargo = document.createElement("input")
        inputCargo.type = "text"
        inputCargo.placeholder = "Digite o novo cargo"
        inputCargo.classList.add("inputCargo")
        const btnAtualizar = document.createElement("button")
        btnAtualizar.innerText = "Atualizar Cadastro"
        btnAtualizar.setAttribute("id", id)
        btnAtualizar.classList.add("btnAtualizar")
        div.append(divHeader,inputModalidade,inputCargo,btnAtualizar)

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalCadastro")
            section.remove()
        })

        return div
    }

    static mostrarFuncionarioDep (nome,email) {
        const div = document.createElement("div")
        div.classList.add("modal_content")
        const diHeader = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = "Funcionários"
        const btnFechar = document.createElement("button")
        btnFechar.setAttribute("id","btnFechar")
        btnFechar.innerText = "X"
        const divBody = document.createElement("div")
        const name = document.createElement("h3")
        name.innerText = `Nome: ${nome}`
        const emailFun = document.createElement("p")
        emailFun.innerText = `Email: ${email}`
        diHeader.append(h2,btnFechar)
        divBody.append(name,emailFun)
        div.append(diHeader,divBody)

        btnFechar.addEventListener("click", () => {
            const section = document.getElementById("modalCadastro")
            section.remove()
        })

        return div

    }

    static erro() {
        const div = document.createElement("div")
        const h2 = document.createElement("p")
        const p = document.createElement("p")

        div.classList.add("popup")
        h2.innerText = "Requisição incorreta"

        div.append(h2,p)

        return [div,p]
    }
}

