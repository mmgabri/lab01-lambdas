package com.mmgabri.domain;

import lombok.Builder;
import lombok.Data;

@Data
public class Request {
    private String userId;
    private String userName;
    private String chatId;
    private String message;
}
