package com.mmgabri.services;

import com.mmgabri.adapter.database.RepositoryDynamoDB;
import com.mmgabri.adapter.files.S3FileServiceImpl;
import com.mmgabri.domain.Anuncio;
import com.mmgabri.domain.AnuncioRequest;
import com.mmgabri.domain.AnuncioResponse;
import com.mmgabri.domain.entity.AnuncioEntity;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class AnuncioServiceImpl implements AnuncioService<AnuncioRequest, AnuncioResponse> {
    private final S3FileServiceImpl fileService;
    private final RepositoryDynamoDB repo;
    private final Mapper map;

    @Override
    public void create(AnuncioRequest request) {
        List<String> listUri = fileService.uploadFile(request.getFiles());
        request.getAnuncio().setImagens(listUri);
        repo.save(map.mapRequestToEntity(request));
    }

    @Override
    public void update(AnuncioRequest request) {
        repo.update(map.mapRequestToEntity(request));
    }

    @Override
    public void delete(AnuncioRequest request) {
        repo.delete(map.mapRequestToEntity(request));
    }

    @Override
    public List<AnuncioResponse> listAll() {
        List<AnuncioEntity> anuncios = repo.listAll();
        return map.entityToListResponse(anuncios);
    }

    @Override
    public List<AnuncioResponse> listByUser(String userID) {
        List<AnuncioEntity> anuncios = repo.listByUser(userID);
        return map.entityToListResponse(anuncios);
    }

    @Override
    public List<AnuncioResponse> listByTipo(String tipo) {
        List<AnuncioEntity> anuncios = repo.listByTipo(tipo);
        return map.entityToListResponse(anuncios);
    }

    @Override
    public List<AnuncioResponse> listByCategoria(String categoria) {
        List<AnuncioEntity> anuncios = repo.listByCategoria(categoria);
        return map.entityToListResponse(anuncios);
    }
}