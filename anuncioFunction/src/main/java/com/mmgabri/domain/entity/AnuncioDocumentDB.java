package com.mmgabri.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.mmgabri.domain.enuns.CategoriaEnum;
import com.mmgabri.domain.enuns.StatusAnuncioEnum;
import com.mmgabri.domain.enuns.TipoAnuncioEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBDocument
public class AnuncioDocumentDB {
    private String id;
    private String userId;
    private String tipo;
    private String categoria;
    private String status;
    private String titulo;
    private String descricao;
    private String valor;
    private String cep;
    private String createdAt;
    private List<String> images;
}
