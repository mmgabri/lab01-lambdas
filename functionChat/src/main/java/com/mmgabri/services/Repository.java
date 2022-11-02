package com.mmgabri.services;

import java.util.List;

public interface Repository <E> {
    void sendMessage(List<E> entity);
    List<E> getMesagesChat(String s);
    List<E> getChatsByUser(String s);
}
