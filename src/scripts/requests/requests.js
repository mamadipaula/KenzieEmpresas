import { Modal } from "../modal.js"


export class ApiRequests {
    static baseUrl = "http://localhost:6278"
    static token = localStorage.getItem("@kenzieEmpresa:token") || null
    static headers = {
        "Content-type": "application/json",
        Authorization: `Token ${this.token}`
    }

    static async listarEmpresas() {
        const listar = await fetch(`${this.baseUrl}/companies`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))


        return listar
    }

    static async listarEmpresaSetor(setor) {
        const listarPorSetor = await fetch(`${this.baseUrl}/companies/${setor}`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return listarPorSetor
    }

    static async login(body) {
        const logar = await fetch(`${this.baseUrl}/auth/login`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(async res => {
            return {res: await res.json(), ok:res.ok}
        })
        .then(res => {
            console.log(res)
            if(!res.ok) {
                const popup = Modal.erro()
                popup[1].innerText = res.res.error;
                const body = document.querySelector("body")
                body.append(popup[0])
            } 
            if(res.res.token) {
                localStorage.setItem("@kenzieEmpresa:token", res.res.token)
                localStorage.setItem("@kenzieEmpresas:user_id", res.res.uuid)
                if(res.is_admin) {
                    localStorage.setItem("@kenzieEmpresas:admin", true)
                } else {
                    localStorage.setItem("@kenzieEmpresas:admin", false)
                }
                    
                if(res.res.is_admin) {
                    window.location.assign("./src/pages/dashboardAdmin.html")
                } else {
                    window.location.assign("./src/pages/dashboard.html")
                }
                    
                return res 
            }
            
            
        })
        .catch(err => console.log(err))

        return logar
    }

    static async criarUsuario(body) {
        const novoUsuario = await fetch(`${this.baseUrl}/auth/register/user`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(async res => {
            return {res: await res.json(), ok:res.ok}
        })
        .then(res => {
            if(!res.ok) {
                const popup = Modal.erro()
                popup[1].innerText = res.res.error;
                const body = document.querySelector("body")
                body.append(popup[0])
            }})
        .catch(err => console.log(err))

        return novoUsuario
    }

    static async listarTodosFuncionariosDepartamento () {
        const listarFuncionarios = await fetch(`${this.baseUrl}/users/departments/coworkers`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return listarFuncionarios
    }

    static async departamentoDoFuncionarioLogado() {
        const departamento = await fetch(`${this.baseUrl}/users/departments`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return departamento
    }

    static async atualizarDadosFuncionario(body) {
        const atualizar = await fetch (`${this.baseUrl}/users`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return atualizar
    }

    static async listarTodosSetores() {
        const setores = await fetch(`${this.baseUrl}/sectors`, {
            method: "GET",
            headers:this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return setores
    }

    static async cadastrarEmpresa(body) {
        const novaEmpresa = await fetch(`${this.baseUrl}/companies`, {
            method: "POST",
            headers:this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return novaEmpresa
    }

    static async criarDepartamento(body) {
        const novoDepartamento = await fetch(`${this.baseUrl}/departments`, {
            method: "POST",
            headers:this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return novoDepartamento
    }

    static async mostrarDepartamentoEmpresa(id) {
        const mostrarDep = await fetch(`${this.baseUrl}/departments/${id}`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return mostrarDep

    }

    static async listarDepartamentoFuncionarioLogado() {
        const mostrarDep = await fetch(`${this.baseUrl}/users/departments` , {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return mostrarDep
    }

    static async listarTodosUsuarios() {
        const usuarios = await fetch(`${this.baseUrl}/users` , {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return usuarios
    }

    static async contratarFuncionario(body) {
        const contratar = await fetch(`${this.baseUrl}/departments/hire/` , {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return contratar

    }

    static async usuariosSemDep() {
        const usuario = await fetch(`${this.baseUrl}/admin/out_of_work` , {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return usuario
    }

    static async demitirFuncionario(id) {
        const demitir = await fetch(`${this.baseUrl}/departments/dismiss/${id}` , {
            method: "PATCH",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => cpncole.log(err))

        return demitir
    }

    static async atualizarFuncionario(body,id) {
        const atualizar = await fetch(`${this.baseUrl}/admin/update_user/${id}` , {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return atualizar

    }
    static async usuariosDesempregados() {
        const usuarios = await fetch(`${this.baseUrl}/admin/out_of_work` , {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return usuarios
    }
    static async mostrarFuncionariosDepartamentoLogado() {
        const funcionario = await fetch(`${this.baseUrl}/users/departments/coworkers` , {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return funcionario
    }
}

