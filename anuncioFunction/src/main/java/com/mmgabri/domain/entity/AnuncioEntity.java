package com.mmgabri.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@DynamoDBDocument
@Data
@SuperBuilder
public class AnuncioDocument {
    private String idMessage;
    private String text;
    private String userIdFrom;
    private String userNameFrom;
    private String userIdTo;
    private String userNameTo;
    private String createdAt;
}