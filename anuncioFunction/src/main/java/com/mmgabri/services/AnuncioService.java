package com.mmgabri.services;

import java.util.List;

public interface AnuncioService <I, O> {
    void create (I request);
    void update (I request);
    List<O> listAll ();
    List<O> listByUser (String userID);
    List<O> listByTipo (String tipo);
    List<O> listByCategoria (String categoria);
}
