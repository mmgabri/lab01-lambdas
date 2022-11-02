package com.mmgabri.services;

import com.mmgabri.domain.ChatResponse;
import com.mmgabri.domain.MessageResponse;
import com.mmgabri.domain.SendMessageRequest;
import com.mmgabri.domain.UserPayload;
import com.mmgabri.domain.entity.ChatEntity;
import com.mmgabri.domain.entity.MessageDocumentDB;
import lombok.SneakyThrows;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.mmgabri.utils.Utils.generateUUID;

public class Mapper {
    private static final String PREFIX_USER = "USER#";
    private static final String PREFIX_CHAT = "CHAT#";
    private static final String PREFIX_MESSAGE = "MESSAGE#";

    public List<ChatEntity> fromSendMessageRequestToEntity(SendMessageRequest request) {

        if (request.getCreatedAt() == null) {
            request.setCreatedAt(LocalDateTime.now().toString());
        }

        String chatId = generateUUID(request.getUserIdFrom(), request.getUserIdTo()).toString();
        MessageDocumentDB message = formatMessage(request, request.getCreatedAt());

        List<ChatEntity> chats = new ArrayList<>();

        chats.add(formatChat(PREFIX_USER + request.getUserIdFrom(),  PREFIX_CHAT + chatId, message, request.getCreatedAt()));
        chats.add(formatChat(PREFIX_USER + request.getUserIdTo(), PREFIX_CHAT + chatId, message, request.getCreatedAt()));
        chats.add(formatChat(PREFIX_CHAT + chatId, PREFIX_MESSAGE + request.getCreatedAt(), message, request.getCreatedAt()));

        return chats;

    }

    public List<ChatResponse> fromEntityToChatResponse(List<ChatEntity> listChat, String userId) {

        List<ChatResponse> chats = new ArrayList<>();

        listChat.forEach(chat -> {
            chats.add(formatChatResponse(chat, userId));
        });

        return chats;

    }

    public List<MessageResponse> fromEntityToMessageResponse(List<ChatEntity> listChat) {

        List<MessageResponse> messages = new ArrayList<>();

        listChat.forEach(message -> {
            messages.add(formatMessageResponse(message));
        });

        return messages;
    }

    @SneakyThrows
    private UserPayload formartUser(ChatEntity chat, String userId) {

        UserPayload userConversation = new UserPayload();

        String userIdFrom = chat.getMessage().getUserIdFrom();

        if (userId.equals(userIdFrom)) {
            userConversation.setName(chat.getMessage().getUserNameTo());
            userConversation.set_id(chat.getMessage().getUserIdTo());
        } else {
            userConversation.setName(chat.getMessage().getUserNameFrom());
            userConversation.set_id(chat.getMessage().getUserIdFrom());
        }

        userConversation.setAvatar("");

        return userConversation;
    }

    @SneakyThrows
    private ChatResponse formatChatResponse(ChatEntity chat, String userId) {

        return ChatResponse.builder()
                .chatId(chat.getPk().substring(5))
                .createdAt(chat.getCreatedAt())
                .text(chat.getMessage().getText())
                .userConversation(formartUser(chat, userId))
                .build();
    }

    @SneakyThrows
    private MessageResponse formatMessageResponse(ChatEntity chat) {

        MessageResponse msg = new MessageResponse();

        UserPayload userPostMessage = UserPayload.builder()
                ._id(chat.getMessage().getUserIdFrom())
                .name(chat.getMessage().getUserNameFrom())
                .avatar("")
                .build();

        msg.set_id(chat.getMessage().getIdMessage());
        msg.setCreatedAt(chat.getMessage().getCreatedAt());
        msg.setText(chat.getMessage().getText());
        msg.setUser(userPostMessage);

        return msg;
    }

    private MessageDocumentDB formatMessage(SendMessageRequest request, String dateTime) {

        return MessageDocumentDB.builder()
                .idMessage(dateTime)
                .text(request.getText())
                .userIdFrom(String.valueOf(request.getUserIdFrom()))
                .userNameFrom(request.getUserNameFrom())
                .userIdTo(String.valueOf(request.getUserIdTo()))
                //TODO - Obter nome do UserNameTo acessando a tabela user
                .userNameTo("TODO")
                //.userNameTo(getNameUser(request.getUserIdTo()))
                .createdAt(dateTime)
                .build();
    }

    private ChatEntity formatChat(String pk, String sk, MessageDocumentDB message, String createdAt) {

        return ChatEntity.builder()
                .pk(pk)
                .sk(sk)
                .createdAt(createdAt)
                .message(message)
                .build();
    }
}