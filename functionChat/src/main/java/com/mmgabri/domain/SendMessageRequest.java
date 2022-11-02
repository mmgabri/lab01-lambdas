package com.mmgabri.domain;

import lombok.Data;

@Data
public class SendMessageRequest {
    private String userIdFrom;
    private String userIdTo;
    private String userNameFrom;
    private String text;
    private String createdAt;
}
