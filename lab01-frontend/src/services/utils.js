import moment from "moment-timezone";

const formatValor = (valor) => {
  return "R$ " + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

const formatvalorNumeric = (valor) => {
  if (valor == 0) {
    return 0
  } else {
    return anuncio.valor = anuncio.valor.replace(/[^0-9,]*/g, '').replace(',', '.')
  }

}

const convertDateTimezoneAmericaSaoPaulo = (message) => {
  var date = moment(message[0].createdAt)
  return date.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss.SSS')

}
export { formatValor, convertDateTimezoneAmericaSaoPaulo, formatvalorNumeric }