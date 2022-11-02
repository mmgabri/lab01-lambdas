package com.mmgabri.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBTable(tableName = "chat")
public class ChatEntity {
    @DynamoDBHashKey(attributeName = "pk")
    @DynamoDBIndexHashKey(attributeName = "pk", globalSecondaryIndexName = "GSI_01")
    private String pk;
    @DynamoDBRangeKey(attributeName = "sk")
    private String sk;
    @DynamoDBIndexRangeKey(attributeName = "date_time_created", globalSecondaryIndexName = "GSI_01")
    private String createdAt;
    private MessageDocumentDB message;
}
