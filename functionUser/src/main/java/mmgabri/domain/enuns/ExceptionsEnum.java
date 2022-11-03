package mmgabri.domain.enuns;

public enum ExceptionsEnum {
    USER_NAME_EXISTS("UsernameExistsException", "Este email ja existe."),
    CODE_MISMATCH("CodeMismatchException", "Codigo de confirmacao invalido ou expirado."),
    EXPIRED_CODE("ExpiredCodeException", "Codigo de confirmacao invalido ou expirado."),
    NOT_AUTHORIZED("NotAuthorizedException", "Email e senha nao conferem."),
    ERROR_SYSTEM("ErrorSystem", "Algo deu errado."),
    ERROR_DYNAMODB("ErrorDynamoDB", "Erro no acesso ao banco de dados DynamoDB"),
    ERROR_DYNAMODB_NOTFOUND("ErrorDynamoDB", "Registro nao encontrado"),
    USER_NOT_FOUND("ErrorDynamoDB", "usuario nao encontrado");

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

