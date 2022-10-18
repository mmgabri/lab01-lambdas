package com.mmgabri.adapter.database;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.mmgabri.domain.entity.AnuncioEntity;
import com.mmgabri.exceptions.BusinessException;
import com.mmgabri.services.Repository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;

import static com.mmgabri.domain.enuns.ExceptionsEnum.ERROR_DYNAMODB;

@AllArgsConstructor
public class RepositoryDynamoDB implements Repository<AnuncioEntity> {
    private static final Logger logger = LoggerFactory.getLogger(RepositoryDynamoDB.class);
    private final DynamoDBMapper mapper;

    @Override
    public void save(AnuncioEntity anuncio) {
        try {
            mapper.save(anuncio);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (save) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }

    @Override
    public void delete(AnuncioEntity anuncio) {
        List<AnuncioEntity> anuncios = getItem(anuncio.getDados().getUserId(), anuncio.getDados().getId());

        if (anuncios.size() > 0){
            mapper.delete(anuncios.get(0));
        }
    }


    @Override
    public void update(AnuncioEntity anuncio) {

    }

    @Override
    public List<AnuncioEntity> getItem(String hashKey, String rangeKey) {
        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(hashKey));
        eav.put(":value2", new AttributeValue().withS(rangeKey));

        DynamoDBQueryExpression<AnuncioEntity> queryExpression = new DynamoDBQueryExpression<AnuncioEntity>()
                .withConsistentRead(false)
                .withKeyConditionExpression("pk_user = :value1 and contains(sk_anuncio, :value2)")
                .withExpressionAttributeValues(eav);

        try {
            return mapper.query(AnuncioEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (query) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }


    @Override
    public List<AnuncioEntity> listAll() {

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS("ATIVO"));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("status_anuncio = :value1")
                .withExpressionAttributeValues(eav);

        try {
            return mapper.scan(AnuncioEntity.class, scanExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (scan) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }

    @Override
    public List<AnuncioEntity> listByUser(String userId) {

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS("USER#" + userId));

        DynamoDBQueryExpression<AnuncioEntity> queryExpression = new DynamoDBQueryExpression<AnuncioEntity>()
                .withConsistentRead(false)
                .withKeyConditionExpression("pk_user = :value1")
                .withExpressionAttributeValues(eav);

        try {
            return mapper.query(AnuncioEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (query) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }

    @Override
    public List<AnuncioEntity> listByTipo(String tipo) {
        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(tipo));

        DynamoDBQueryExpression<AnuncioEntity> queryExpression = new DynamoDBQueryExpression<AnuncioEntity>()
                .withIndexName("GSI_TIPO")
                .withConsistentRead(false)
                .withKeyConditionExpression("tipo_pk_index = :value1")
                .withExpressionAttributeValues(eav);

        try {
            return mapper.query(AnuncioEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (query GSI_TIPO) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }

    @Override
    public List<AnuncioEntity> listByCategoria(String categoria) {
        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":value1", new AttributeValue().withS(categoria));

        DynamoDBQueryExpression<AnuncioEntity> queryExpression = new DynamoDBQueryExpression<AnuncioEntity>()
                .withIndexName("GSI_CATEGORIA")
                .withConsistentRead(false)
                .withKeyConditionExpression("categoria_pk_index = :value1")
                .withExpressionAttributeValues(eav);

        try {
            return mapper.query(AnuncioEntity.class, queryExpression);
        } catch (Exception e) {
            logger.error(ERROR_DYNAMODB.getDescricao() + " (query GSI_CATEGORIA) Exception:" + e);
            throw new BusinessException(ERROR_DYNAMODB.getDescricao());
        }
    }
}