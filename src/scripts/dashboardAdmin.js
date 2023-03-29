import { Modal } from "./modal.js";
import { ApiRequests } from "./requests/requests.js";

class RenderTodosSetores {
    static async renderSetores() {
        const setores = await ApiRequests.listarTodosSetores()
        const ul = document.getElementById("setores")
        setores.forEach(setor => {
            const li = document.createElement("li")
            const descricao = document.createElement("h3")
            descricao.innerText = setor.description
            li.append(descricao)
            ul.append(li) 
        });
    }
    static async setoresOptions() {
        const setores = await ApiRequests.listarTodosSetores()
        const select = document.getElementById("setoresOption")
        setores.forEach(setor => {
            const option = document.createElement("option")
            option.innerText = setor.description
            option.setAttribute("id", setor.uuid)
            select.append(option)
        })
    }
}

class NovaEmpresa {
    static async cadastrarNovaEmpresa() {
        const nome = document.getElementById("inputNomeNovaEmpresa")
        const hora = document.getElementById("inputHoraAbertura")
        const descricao = document.getElementById("inputDescricao")
        const setor = document.getElementById("setoresOption")
        const btnCadastrar = document.getElementById("btnCadastrarEmpresa")

        btnCadastrar.addEventListener("click", async(event) => {
            event.preventDefault()
            const data = {
                name: nome.value,
                opening_hours: hora.value,
                description: descricao.value,
                sector_uuid: setor.options[setor.selectedIndex].id
            }
            await ApiRequests.cadastrarEmpresa(data)
        })
    }
}

class RenderEmpresasDashboard {
    static async pegarEmpresas() {
        const data = await ApiRequests.listarEmpresas()
        const ul = document.getElementById("listaEmpresasCadastradas")
        data.forEach(empresa => {
            const elemento = RenderEmpresasDashboard.renderEmpresa(empresa)
            ul.append(elemento)
        })
    }
    static renderEmpresa(elem) {
        const li = document.createElement("li")
        li.setAttribute("id", elem.uuid)
        const nomeEmpresa = document.createElement("h3")
        nomeEmpresa.innerText = `Nome: ${elem.name}`
        const descricaoEmpresa = document.createElement("p")
        descricaoEmpresa.innerText = `Descrição: ${elem.description}`
        const setorEmpresa = document.createElement("p")
        setorEmpresa.innerText = `Setor: ${elem.sectors.description}`
        const criarDepartamento = document.createElement("button")
        criarDepartamento.classList.add("btnModalNovoDep")
        criarDepartamento.setAttribute("id",elem.uuid)
        criarDepartamento.innerText = "Criar departamento"
        const mostrarDepartamentoEmpresa = document.createElement("button")
        mostrarDepartamentoEmpresa.classList.add("btnMostrarDepart")
        mostrarDepartamentoEmpresa.innerText = "Mostrar departamentos"
        mostrarDepartamentoEmpresa.setAttribute("id",elem.uuid)
        

        li.append(nomeEmpresa,descricaoEmpresa,setorEmpresa,criarDepartamento,mostrarDepartamentoEmpresa)

        return li
    }
    static async pesquisarEmpresaPorNome() {
        const data = await ApiRequests.listarEmpresas()
        const inputPesquisa = document.getElementById("inputBuscar")
        const ul = document.getElementById("listaEmpresasCadastradas")
        const btnProcura = document.getElementById("btnProcura")

        btnProcura.addEventListener("click", () => {
            ul.innerHTML = ""
            const pesquisa = inputPesquisa.value.toLowerCase()
            data.forEach(elem => {
                const nome = elem.name.toLowerCase()
                if(nome.includes(pesquisa)) {
                    const elemento = RenderEmpresasDashboard.renderEmpresa(elem)
                    ul.append(elemento)
                }
            })
            inputPesquisa.value = ""  
        })
    }
    static async pesquisarEmpresaPorSetor() {
        const data = await ApiRequests.listarEmpresas()
        const ul = document.getElementById("listaEmpresasCadastradas")
        const select = document.getElementById("selectSetor")
        const btnBuscar = document.getElementById("btnBuscaSetor")

        btnBuscar.addEventListener("click", () => {
            ul.innerHTML = ""
            const filtro = select.value.toLowerCase()
            data.forEach(elem => {
                const setor = elem.sectors.description.toLowerCase()
                if(setor == filtro) {
                    const elemento = RenderEmpresasDashboard.renderEmpresa(elem)
                    ul.append(elemento)
                }
            })
        })
    }
}

class Departamento {
    static async criarNovoDep() {
        await RenderEmpresasDashboard.pegarEmpresas()
        const btnModalNovoDep = document.querySelectorAll(".btnModalNovoDep")
        btnModalNovoDep.forEach(elem => {
            elem.addEventListener("click", () => {
                const form = Modal.cadastrarDepartamento(elem.id)
                Modal.modalTemplate(form) 
            })
        })
    }
    static async mostrarDep() {
        await RenderEmpresasDashboard.pegarEmpresas()
        const btnMostrarDepart = document.querySelectorAll(".btnMostrarDepart")
        btnMostrarDepart.forEach(async(elem) => {
            elem.addEventListener("click", async() => {
                const form = await Modal.mostrarDep(elem.id)
                Modal.modalTemplate(form)
                
                const btnMostrarUsuarios = document.querySelectorAll(".mostrarFunc")
                
                btnMostrarUsuarios.forEach(async(dep) => {
                    
                    const data = await ApiRequests.listarTodosUsuarios()
            
                    data.forEach(usuario => {
                        if(usuario.department_uuid == dep.id){
                            dep.addEventListener("click", () => {
                                Modal.mostrarFuncionarioPorDep(usuario.username, usuario.professional_level, usuario.is_admin)

                            })
                        }
                    })
                })

                const btnContratarFuncionario = document.querySelectorAll(".contratarFunc")
                btnContratarFuncionario.forEach(btn => {
                    
                    btn.addEventListener("click", async() => {
                        const data = await ApiRequests.usuariosSemDep()
                        await Modal.contratarFuncionario(data)
                        

                        const btnContratar = document.querySelectorAll(".btnContratar")

                        btnContratar.forEach(elem => {
                            
                            elem.addEventListener("click", async() => {
                                const body = {
                                    user_uuid: elem.id,department_uuid: btn.id
                                }

                                await ApiRequests.contratarFuncionario(body)
                            })
                        })
                    })
                })

                const btnDemitirFuncionario = document.querySelectorAll(".btnDemitir")
                
                btnDemitirFuncionario.forEach(btn => {
                    
                    btn.addEventListener("click", async() => {
                        
                        const data = await ApiRequests.listarTodosUsuarios()
                        await Modal.demitirFuncionario(data,btn.id)

                        const btnDemitir = document.querySelectorAll(".btnDemitirUsuario")
                        
                        btnDemitir.forEach(elem => {
                            
                            elem.addEventListener("click", async() => {
                                await ApiRequests.demitirFuncionario(elem.id)
                            })
                        })

                    })
                })

            })
    
        })
         
    }
    
}

class Funcionarios {
    static async renderTodosFuncionarios() {
        const data = await ApiRequests.listarTodosUsuarios()
        const ul = document.getElementById("todosFuncionarios")
    
        data.forEach(elem => {
        
            const li = document.createElement("li")
            const h3 = document.createElement("h3")
            h3.innerText = `Nome: ${elem.username}`
            const email = document.createElement("p")
            email.innerText = `Email: ${elem.email}`
            const modalidade = document.createElement("p")
            modalidade.innerText = `Modalidade de Trabalho: ${elem.kind_of_work}`
            const cargo = document.createElement("p")
            cargo.innerText = `Cargo: ${elem.professional_level}`
            const btnModificar = document.createElement("button")
            btnModificar.setAttribute("id",elem.uuid)
            btnModificar.classList.add("btnModificar")
            btnModificar.innerText = "Editar"

            li.append(h3,email,modalidade,cargo,btnModificar)
            ul.append(li)
 
        })

        const btnModificarFunc = document.querySelectorAll(".btnModificar")
        
        btnModificarFunc.forEach(btn => {
            
            btn.addEventListener("click",() => {
                const form = Modal.editarFuncionario(btn.id)
                Modal.modalTemplate(form)

                const btnEnviarModificacoes = document.querySelector(".btnAtualizar")
                
                btnEnviarModificacoes.addEventListener("click", async() => {
                    const modalidade = document.querySelector(".inputModalidade")
                    const cargo = document.querySelector(".inputCargo")
                    console.log(modalidade.value)
                    console.log(cargo.value)
                    const data = {
                        kind_of_work: modalidade.value,
                        professional_level: cargo.value

                    }

                    console.log(await ApiRequests.atualizarFuncionario(data,btnEnviarModificacoes.id))
                })
            })
        })    
    }
    static async usuarioDesempregado() {
        const data = await ApiRequests.usuariosDesempregados()
        const ul = document.getElementById("funcionariosDesempregados")
        data.forEach(ele => {
            const li = document.createElement("li")
            const h3 = document.createElement("h3")
            h3.innerText = `Nome: ${ele.username}`
            const email = document.createElement("p")
            email.innerText = `Email: ${ele.email}`
            const modo = document.createElement("p")
            modo.innerText = `Modo de Trabalho: ${ele.kind_of_work}`
            const nivel = document.createElement("p")
            nivel.innerText = `Level Profissional: ${ele.professional_level}`
            li.append(h3,email,modo,nivel)
            ul.append(li)
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



RenderTodosSetores.renderSetores()
RenderTodosSetores.setoresOptions()
NovaEmpresa.cadastrarNovaEmpresa()
RenderEmpresasDashboard.pegarEmpresas()
RenderEmpresasDashboard.pesquisarEmpresaPorNome()
RenderEmpresasDashboard.pesquisarEmpresaPorSetor()
Departamento.criarNovoDep()
Departamento.mostrarDep()
Funcionarios.renderTodosFuncionarios()
Funcionarios.usuarioDesempregado()



Logout.logout()








