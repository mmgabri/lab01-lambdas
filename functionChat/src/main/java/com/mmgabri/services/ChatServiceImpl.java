package com.mmgabri.services;

import com.google.gson.Gson;
import com.mmgabri.adapter.database.RepositoryChatImpl;
import com.mmgabri.domain.ChatResponse;
import com.mmgabri.domain.MessageResponse;
import com.mmgabri.domain.SendMessageRequest;
import com.mmgabri.domain.entity.ChatEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static com.mmgabri.utils.Utils.generateUUID;

@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService<SendMessageRequest, ChatResponse, MessageResponse> {
    private static final Logger logger = LoggerFactory.getLogger(ChatServiceImpl.class);

    private final RepositoryChatImpl repo;
    private final Mapper map;
    private final Gson gson;

    @Override
    public void sendMessage(SendMessageRequest request) {
        logger.info("Service sendMessage - Request:" + gson.toJson(request));

        repo.sendMessage(map.fromSendMessageRequestToEntity(request));

    }

    @Override
    public List<ChatResponse> getChatsByUser(String userId) {
        logger.info("Service getChatsByUser - userId:" + userId);
        List<ChatEntity> chats = repo.getChatsByUser(userId);
        return map.fromEntityToChatResponse(chats, userId);
    }

    @Override
    public List<MessageResponse> getMessages(String chatId, String userIdLogged, String userIdConversation) {
        logger.info("Service getMessages - chatId:" + chatId + " / userIdLogged: " + userIdLogged + " / userIdConversation: " + userIdConversation);

        String id;

        if (chatId == null) {
            if (userIdLogged == null || userIdConversation == null) {
                logger.error("Parâmetros invalildos: userIdLogged=+" + userIdLogged + ";  userIdConversation=" + userIdConversation);
                throw new RuntimeException("Parâmetros invalidos");
            }
            id = generateUUID(userIdLogged, userIdConversation).toString();
        } else {
            id = chatId;
        }

        logger.info("Service getMessages - chatId a processar:" + chatId);

        List<ChatEntity> chats = repo.getMesagesChat(id);

        return map.fromEntityToMessageResponse(chats);
    }
}