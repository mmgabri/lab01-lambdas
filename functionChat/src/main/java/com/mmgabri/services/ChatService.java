package com.mmgabri.services;

import java.util.List;

public interface ChatService<S, C, M> {
    void sendMessage (S request);
    List<C> getChatsByUser (String userId);
    List<M> getMessages (String chatId, String userIdLogged, String userIdConversation);
}
