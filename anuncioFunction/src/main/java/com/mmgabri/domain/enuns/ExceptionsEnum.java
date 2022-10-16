package com.mmgabri.domain.enuns;

public enum ExceptionsEnum {
    ERROR_DYNAMODB("ErrorDynamoDB", "Erro no acesso ao banco de dados DynamoDB"),
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

