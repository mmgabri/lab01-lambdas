package com.mmgabri.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DynamoDBTable(tableName = "anuncios")
public class AnuncioEntity {
    @DynamoDBHashKey(attributeName = "pk_user")
    private String user;
    @DynamoDBRangeKey(attributeName = "sk_anuncio")
    private String anuncio;
    @DynamoDBAttribute(attributeName = "status_anuncio")
    private String statusAnuncio;
    @DynamoDBAttribute(attributeName = "tipo_pk_index")
    private String tipo;
    @DynamoDBAttribute(attributeName = "categoria_pk_index")
    private String categoria;
    @DynamoDBAttribute(attributeName = "dados")
    private AnuncioDocumentDB dados;
}
