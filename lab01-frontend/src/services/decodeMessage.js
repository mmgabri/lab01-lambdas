const decodeMessage = (code) => {
    var message = '';
    switch (code) {
        case 401: message = "Email e senha não conferem"; break;
        default: message = ""
    }
    return message;
}

export { decodeMessage }