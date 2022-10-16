package com.mmgabri.adapter.database;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.mmgabri.domain.AnuncioRequest;
import com.mmgabri.domain.AnuncioResponse;
import com.mmgabri.domain.entity.AnuncioDocumentDB;
import com.mmgabri.domain.entity.AnuncioEntity;
import com.mmgabri.services.Repository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

import static com.fasterxml.uuid.Generators.nameBasedGenerator;

@AllArgsConstructor
public class RepoDynamoDB implements Repository<AnuncioRequest, AnuncioResponse> {
    private static final Logger logger = LoggerFactory.getLogger(RepoDynamoDB.class);
    private final DynamoDBMapper mapper;

    @Override
    public void save(AnuncioRequest request) {
        System.out.println("save");

        String createdAt = LocalDateTime.now().toString();
        String anuncioId = nameBasedGenerator().generate(createdAt).toString();

        AnuncioDocumentDB document = AnuncioDocumentDB.builder()
                .id(anuncioId)
                .cep(request.getAnuncio().getCep())
                .descricao(request.getAnuncio().getDescricao())
                .categoria(request.getAnuncio().getCategoria().toString())
                .tipo(request.getAnuncio().getTipo().toString())
                .status("ATIVO")
                .images(request.getAnuncio().getImagens())
                .titulo(request.getAnuncio().getTitulo())
                .createdAt(createdAt)
                .build();

        AnuncioEntity anuncio = AnuncioEntity.builder()
                .user("USER#" + request.getAnuncio().getUserId())
                .anuncio("TIMESTAMP#" + createdAt + "#ID_ANUNCIO#" + anuncioId)
                .tipo(request.getAnuncio().getTipo().toString())
                .categoria(request.getAnuncio().getCategoria().toString())
                .dados(document)
                .build();

        try {
            mapper.save(anuncio);
        } catch (Exception e) {
            logger.error("Erro DynamoDb - " + e);
        }
    }

    @Override
    public void delete(AnuncioRequest request) {

    }

    @Override
    public void update(AnuncioRequest request) {

    }

    @Override
    public List<AnuncioResponse> listAll() {
        return null;
    }

    @Override
    public List<AnuncioResponse> listByUser(String userId) {
        return null;
    }

    @Override
    public List<AnuncioResponse> listByTipo(String tipo) {
        return null;
    }

    @Override
    public List<AnuncioResponse> listByCategoria(String categoria) {
        return null;
    }
}
