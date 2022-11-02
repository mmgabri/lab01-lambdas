package com.mmgabri.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBDocument
public class MessageDocumentDB {
    private String idMessage;
    private String text;
    private String userIdFrom;
    private String userNameFrom;
    private String userIdTo;
    private String userNameTo;
    private String createdAt;
}