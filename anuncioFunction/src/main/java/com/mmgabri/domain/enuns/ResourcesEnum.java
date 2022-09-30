package com.mmgabri.domain.enuns;

public enum ResourcesEnum {
    SIGNUP("/signup"),
    SIGNIN("/signin"),
    CONFIRM_SIGNUP("/confirmsignup");

    private String value;

    ResourcesEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

