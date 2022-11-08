package com.mmgabri.domain;

import lombok.Data;

@Data
public class Request {
    private String userId;
    private String chatId;
    private String message;
}
