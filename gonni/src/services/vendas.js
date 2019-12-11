import { http } from './config'

export default {
  listar: () => {
    return http.get('api/vendas')
  },
  vender: (pedido) => {
    return http.post('api/vendas', pedido)
  },
}
