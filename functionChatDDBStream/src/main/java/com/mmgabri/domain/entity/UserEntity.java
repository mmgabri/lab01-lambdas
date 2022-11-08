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
@DynamoDBTable(tableName = "user")
public class UserEntity {
    @DynamoDBHashKey(attributeName = "user_id")
    private String userId;
    @DynamoDBIndexHashKey(attributeName = "email", globalSecondaryIndexName = "GSI_01")
    private String email;
    @DynamoDBRangeKey(attributeName = "date_time_created")
    @DynamoDBIndexRangeKey(attributeName = "date_time_created", globalSecondaryIndexName = "GSI_01")
    private String createAt;
    private UserDocumentDB user;
}
