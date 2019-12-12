import { http } from './config'

export default {
  listar: () => {
    return http.get('api/users')
  },
  cadastrar: (user) => {
    return http.post('api/users/actions/cadastrar', user)
  },
  excluir: (user) => {
    return http.post('api/users/actions/excluir', user)
  },
  editar: (user) => {
    return http.post('api/users/actions/editar', user)
  },
  buscar: (nome) => {
    return http.post('api/users/actions/buscar', nome)
  },
  relatorio01: () => {
    return http.get('api/users/actions/relatorio01')
  },
  top3: () => {
    return http.get('api/users/actions/top3')
  },
}
