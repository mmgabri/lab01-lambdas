package com.mmgabri.application;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.mmgabri.domain.BodyReponse;
import com.mmgabri.domain.ChatResponse;
import com.mmgabri.domain.MessageResponse;
import com.mmgabri.domain.SendMessageRequest;
import com.mmgabri.services.ChatServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RequiredArgsConstructor
public class UseCaseImpl implements UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(UseCaseImpl.class);
    private final ChatServiceImpl service;
    private final Gson gson;

    @Override
    public APIGatewayProxyResponseEvent execute(APIGatewayProxyRequestEvent event) {
        logger.info("Processando Method/Resource: " + event.getHttpMethod() + event.getResource());

        switch (event.getHttpMethod()) {
            case "POST":
                if ((event.getResource().equals("/chats"))) {
                    try {
                        service.sendMessage(gson.fromJson(event.getBody(), SendMessageRequest.class));
                        return builderResponse(200, gson.toJson(builderBodyResponse("Sucess!")));
                    } catch (Exception e) {
                        return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                    }
                }
                return builderResponse(400, gson.toJson(builderBodyResponse("Recurso nao previsto")));
            case "GET":
                switch (event.getResource()) {
                    case "/chats/user/{userId}":
                        try {
                            logger.info("userId:" + event.getPathParameters().get("userId"));
                            List<ChatResponse> resp = service.getChatsByUser(event.getPathParameters().get("userId"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (Exception e) {
                            return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                        }
                    case "/chats/messages":
                        try {
                            List<MessageResponse> resp = service.getMessages(
                                    event.getQueryStringParameters().get("chatId"),
                                    event.getQueryStringParameters().get("userIdLogged"),
                                    event.getQueryStringParameters().get("userIdConversation"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (Exception e) {
                            return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                        }
                    default:
                        return builderResponse(400, gson.toJson(builderBodyResponse("Recurso nao previsto")));
                }
            default:
                return builderResponse(400, gson.toJson(builderBodyResponse("Recurso nao previsto")));
        }
    }

    private APIGatewayProxyResponseEvent builderResponse(int statusCode, String message) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(statusCode);
        response.setBody(message);
        return response;
    }

    private BodyReponse builderBodyResponse(String message) {
        return BodyReponse.builder()
                .message(message)
                .build();
    }
}
