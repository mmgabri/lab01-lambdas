package mmgabri.domain.enuns;

public enum AccountStatusEnun {
    INACTIVE("Inativa"),
    ACTIVE("Ativa"),
    IN_REGISTRATION("Em registro");

    private String value;

    AccountStatusEnun(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
