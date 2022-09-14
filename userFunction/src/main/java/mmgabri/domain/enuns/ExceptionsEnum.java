package mmgabri.domain.enuns;

public enum ExceptionsEnum {
    USER_NAME_EXISTS("UsernameExistsException", "Email existente, tente outro email"),
    CODE_MISMATCH("CodeMismatchException", "Codigo invalido. Tente novamente."),
    EXPIRED_CODE("ExpiredCodeException", "Codigo expirado!"),
    NOT_AUTHORIZED("NotAuthorizedException", "Email ou Senha invalida. Tente novamente."),
    ERROR_SYSTEM("ErrorSystem", "Ooops, algo deu errado. Tente novamente.");

    private String exception;
    private String descricao;

    ExceptionsEnum(String exception, String descricao) {
        this.exception = exception;
        this.descricao = descricao;
    }

    public String getCod() {
        return exception;
    }

    public String getDescricao() {
        return descricao;
    }
}

