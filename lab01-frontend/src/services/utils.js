import moment from "moment-timezone";

const formatValor = (valor) => {
    return "R$ " + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

const convertDateTimezoneAmericaSaoPaulo = (message) => {
    var date = moment(message[0].createdAt)
    return date.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss.SSS')

  }
export {formatValor, convertDateTimezoneAmericaSaoPaulo}