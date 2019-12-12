import { http } from './config'

export default {
  listar: () => {
    return http.get('api/sorvete')
  },
  cadastrar: (sorvete) => {
    return http.post('api/sorvete/actions/cadastrar', sorvete)
  },
  excluir: (sorvete) => {
    return http.post('api/sorvete/actions/excluir', sorvete)
  },
  editar: (sorvete) => {
    return http.post('api/sorvete/actions/editar', sorvete)
  },
  buscar: (sabor) => {
    return http.post('api/sorvete/actions/buscar', sabor)
  },
  top3: (sabor) => {
    return http.get('/api/users/actions/top3Sorvetes')
  },
}
