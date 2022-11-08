package com.mmgabri.services;

import com.fasterxml.uuid.Generators;
import com.mmgabri.adapter.database.RepositoryUserImpl;
import com.mmgabri.domain.Request;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.apache.commons.lang3.RandomStringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.mmgabri.utils.Utils.generateUUID;

@AllArgsConstructor
public class Mapper {
    private final RepositoryUserImpl repositoryUser;
    private static final String PREFIX_USER = "USER#";
    private static final String PREFIX_CHAT = "CHAT#";
    private static final String PREFIX_MESSAGE = "MESSAGE#";

    public List<ChatEntity> fromSendMessageRequestToEntity(Request request) {

        if (request.getCreatedAt() == null) {
            request.setCreatedAt(LocalDateTime.now().toString());
        }

        String chatId = generateUUID(request.getUserIdFrom(), request.getUserIdTo()).toString();
        MessageDocumentDB message = formatMessage(request);

        List<ChatEntity> chats = new ArrayList<>();

        chats.add(formatChat(PREFIX_USER + request.getUserIdFrom(),  PREFIX_CHAT + chatId, message, request.getCreatedAt()));
        chats.add(formatChat(PREFIX_USER + request.getUserIdTo(), PREFIX_CHAT + chatId, message, request.getCreatedAt()));
        chats.add(formatChat(PREFIX_CHAT + chatId, PREFIX_MESSAGE + message.getIdMessage(), message, request.getCreatedAt()));

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
                .chatId(chat.getSk().substring(5))
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

    private MessageDocumentDB formatMessage(Request request) {

        return MessageDocumentDB.builder()
                .idMessage(generateMessageId())
                .text(request.getText())
                .userIdFrom(String.valueOf(request.getUserIdFrom()))
                .userNameFrom(request.getUserNameFrom())
                .userIdTo(String.valueOf(request.getUserIdTo()))
                .userNameTo(repositoryUser.getById(request.getUserIdTo()).getUser().getName())
                .createdAt(request.getCreatedAt())
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

    private String generateMessageId () {
        UUID uuid= Generators.timeBasedGenerator().generate();
        Long ts = uuid.timestamp();
        String randomizedString = RandomStringUtils.randomAlphanumeric(5);
        return  ts + "-" + randomizedString;
    }
}