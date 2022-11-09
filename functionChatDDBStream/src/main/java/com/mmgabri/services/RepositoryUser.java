package com.mmgabri.services;

public interface RepositoryUser<E> {
    void save(E entity);
    E getById(String s);
}
