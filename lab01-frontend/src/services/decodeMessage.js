const decodeMessage = (code) => {
    var message = '';
    switch (code) {
        case 470: message = "Email e senha não conferem. Tente novamente!"; break;
        case 471: message = "Código de confirmação inválido ou expirado. Tente novamente!"; break;
        case 472: message = "Este email já existe. Tente outro!"; break;
        case 401: message = "Necessário fazer login novamente."; break;
        default: message = "Algo deu errado. Tente novamente!"
    }
    return message;
}

export { decodeMessage }