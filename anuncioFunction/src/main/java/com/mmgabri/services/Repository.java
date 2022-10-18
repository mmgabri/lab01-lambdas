package com.mmgabri.services;

import java.util.List;

public interface Repository <E> {
    void save(E entity);
    void delete(E entity);
    void update(E entity);
    List<E> getItem (String hashKey, String rangeKey);
    List<E> listAll();
    List<E> listByUser(String userId);
    List<E> listByTipo(String tipo);
    List<E> listByCategoria(String categoria);
}
