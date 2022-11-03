package com.mmgabri.adapter.database;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.mmgabri.domain.entity.ChatEntity;
import com.mmgabri.exceptions.BusinessException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;

import static com.mmgabri.domain.enuns.ExceptionsEnum.ERROR_DYNAMODB;

@AllArgsConstructor
public class RepositoryChatImpl implements com.mmgabri.services.RepositoryChat<ChatEntity> {
    private static final Logger logger = LoggerFactory.getLogger(RepositoryChatImpl.class);
    private final DynamoDBMapper mapper;

    private static final String PREFIX_USER = "USER#";
    private static final String PREFIX_CHAT = "CHAT#";

    @Override
    public void sendMessage(List<ChatEntity> chats) {
        try {
            mapper.batchSave(chats);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (batchSave) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }

    }

    @Override
    public List<ChatEntity> getMesagesChat(String chatId) {

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(PREFIX_CHAT + chatId));

        DynamoDBQueryExpression<ChatEntity> queryExpression = new DynamoDBQueryExpression<ChatEntity>()
                .withConsistentRead(false)
                .withKeyConditionExpression("pk = :value1")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false);

        try {
            return mapper.query(ChatEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (query) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }

    @Override
    public List<ChatEntity> getChatsByUser(String userId) {

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(PREFIX_USER + userId));

        DynamoDBQueryExpression<ChatEntity> queryExpression = new DynamoDBQueryExpression<ChatEntity>()
                .withIndexName("GSI_01")
                .withConsistentRead(false)
                .withKeyConditionExpression("pk = :value1")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false);

        try {
            return mapper.query(ChatEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (query - GSI_01) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }
}