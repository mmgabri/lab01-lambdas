package com.mmgabri.adapter.database;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.mmgabri.domain.entity.UserEntity;
import com.mmgabri.exceptions.BusinessException;
import com.mmgabri.services.RepositoryUser;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;

import static com.mmgabri.domain.enuns.ExceptionsEnum.ERROR_DYNAMODB;

@AllArgsConstructor
public class RepositoryUserImpl implements RepositoryUser<UserEntity> {
    private static final Logger logger = LoggerFactory.getLogger(RepositoryUserImpl.class);
    private final DynamoDBMapper mapper;

    @Override
    public UserEntity getById(String userId) {

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(userId));

        DynamoDBQueryExpression<UserEntity> queryExpression = new DynamoDBQueryExpression<UserEntity>()
                .withConsistentRead(false)
                .withKeyConditionExpression("user_id = :value1")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false);

        try {
            return mapper.query(UserEntity.class, queryExpression).get(0);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (query) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }
}