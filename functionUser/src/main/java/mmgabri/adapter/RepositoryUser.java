package mmgabri.adapter;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import lombok.AllArgsConstructor;
import mmgabri.domain.entity.UserEntity;
import mmgabri.exceptions.BusinessException;
import mmgabri.services.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;

import static mmgabri.domain.enuns.ExceptionsEnum.ERROR_DYNAMODB;

@AllArgsConstructor
public class RepositoryUser implements Repository<UserEntity> {
    private static final Logger logger = LoggerFactory.getLogger(RepositoryUser.class);
    private final DynamoDBMapper mapper;

    @Override
    public void save(UserEntity user) {

        try {
            mapper.save(user);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (save) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }

    @Override
    public List<UserEntity> getById(String userId) {
        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(userId));

        DynamoDBQueryExpression<UserEntity> queryExpression = new DynamoDBQueryExpression<UserEntity>()
                .withConsistentRead(false)
                .withKeyConditionExpression("user_id = :value1")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false);

        try {
            return mapper.query(UserEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (getById) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }

    @Override
    public List<UserEntity> getByEmail(String email) {

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(email));

        DynamoDBQueryExpression<UserEntity> queryExpression = new DynamoDBQueryExpression<UserEntity>()
                .withIndexName("GSI_01")
                .withConsistentRead(false)
                .withKeyConditionExpression("email = :value1")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false);

        try {
            return mapper.query(UserEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (getByEmail - GSI_01) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }
}