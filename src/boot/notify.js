import Vue from 'vue'
import { Notify } from 'quasar'

Vue.prototype.$notify = {
    validation: (message) => {
        Notify.create({
            color: 'red-14',
            textColor: 'white',
            html: true,
            message: message || 'Dados enviados são inválidos, verifique os campos marcados em vermelho'
        })
    },

    error: (message) => {
        Notify.create({
            color: 'red-14',
            textColor: 'white',
            html: true,
            message: message || 'Oops, ocorreu um erro inesperado'
        })
    },

    alert: (message) => {
        Notify.create({
            color: 'grey-10',
            textColor: 'white',
            html: true,
            message: message || 'Aguarde ...'
        })
    },

    warning: (message) => {
        Notify.create({
            color: 'amber-10',
            textColor: 'white',
            html: true,
            message: message || 'ATENÇÃO'
        })
    },

    success: (message) => {
        Notify.create({
            color: 'green-10',
            textColor: 'white',
            position: 'top',
            html: true,
            message: message || 'Sucesso'
        })
    }
}