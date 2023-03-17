import { Dialog } from 'quasar'

export default async({ app, Vue }) => {

    Vue.prototype.$dialog = {
        error: (message, title) => {
            Dialog.create({
                title: title || 'ERRO',
                color: 'red-14',
                html: true,
                message: (message || 'Ops, ocorreu um erro')
            })
        },

        confirm(title, message) {
            return Dialog.create({
                title: title || 'Confirmar!',
                message: message || '',
                cancel: {
                    label: 'Cancelar',
                    flat: true,
                    textColor: '#999',
                    color: 'white'
                },
                ok: {
                    label: 'Confirmar',
                    color: 'red-1',
                    flat: true,
                    textColor: 'primary'
                },
                html: true,
                persistent: true
            })
        }
    }
}