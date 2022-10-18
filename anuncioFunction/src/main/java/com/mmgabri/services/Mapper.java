package com.mmgabri.services;

import com.mmgabri.domain.AnuncioRequest;
import com.mmgabri.domain.AnuncioResponse;
import com.mmgabri.domain.entity.AnuncioDocumentDB;
import com.mmgabri.domain.entity.AnuncioEntity;
import com.mmgabri.domain.enuns.CategoriaEnum;
import com.mmgabri.domain.enuns.StatusAnuncioEnum;
import com.mmgabri.domain.enuns.TipoAnuncioEnum;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.fasterxml.uuid.Generators.nameBasedGenerator;

public class Mapper {

    public AnuncioEntity mapRequestToEntity(AnuncioRequest request) {
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
                .valor(request.getAnuncio().getValor())
                .userId(request.getAnuncio().getUserId())
                .build();

        return AnuncioEntity.builder()
                .user(request.getAnuncio().getUserId())
                .anuncio("TIMESTAMP#" + createdAt + "#ID_ANUNCIO#" + anuncioId)
                .tipo(request.getAnuncio().getTipo().toString())
                .categoria(request.getAnuncio().getCategoria().toString())
                .statusAnuncio("ATIVO")
                .dados(document)
                .build();
    }

    public List<AnuncioResponse> entityToListResponse(List<AnuncioEntity> anuncio) {
        List<AnuncioResponse> resp = new ArrayList<>();

        for (AnuncioEntity item : anuncio) {
            AnuncioResponse i = AnuncioResponse.builder()
                    .id(item.getDados().getId())
                    .categoria(CategoriaEnum.valueOf(item.getDados().getCategoria()))
                    .tipo(TipoAnuncioEnum.valueOf(item.getDados().getTipo()))
                    .status(StatusAnuncioEnum.valueOf(item.getDados().getStatus()))
                    .titulo(item.getDados().getTitulo())
                    .descricao(item.getDados().getDescricao())
                    .cep(item.getDados().getCep())
                    .imagens(item.getDados().getImages())
                    .dataHoraCriacao(item.getDados().getCreatedAt())
                    .userId(item.getDados().getUserId())
                    .valor(Integer.parseInt(item.getDados().getValor()))
                    .build();

            resp.add(i);
        }
        return resp;
    }
}
