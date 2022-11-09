package com.mmgabri.application;

import com.google.gson.Gson;
import com.mmgabri.adapter.database.NotificationServiceImpl;
import com.mmgabri.adapter.database.RepositoryUserImpl;
import com.mmgabri.domain.Request;
import com.mmgabri.domain.Response;
import com.mmgabri.domain.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.sns.model.GetEndpointAttributesResponse;

@RequiredArgsConstructor
public class UseCaseImpl {
    private static final Logger logger = LoggerFactory.getLogger(UseCaseImpl.class);
    private final NotificationServiceImpl notificationService;
    private final Gson gson;
    private final RepositoryUserImpl repo;


    public Response execute(Request request) {
        logger.info("Use case - Request: " + gson.toJson(request));

        UserEntity user = repo.getById(request.getUserId());

        if (user.getUser().getTokenNotification() == null) {
            logger.error("Token device not registered - userId: " + user.getUserId());
            return builderResponse(400, "Token device not registered - userId: " + user.getUserId());
        }

        try {
            String endpoint = validedAndGetEndpoint(user);
            notificationService.pubPush(request.getMessage(), endpoint);
            return builderResponse(200, "Sucess!");
        } catch (Exception e) {
            return builderResponse(400, "Error: " + e.getMessage());
        }
    }

    private String validedAndGetEndpoint(UserEntity user) {
        if (user.getUser().getEndpointNotification() == null) {
            return createAndUpdateEndpoint(user);
        } else {
            if (isEndpointValid(user.getUser().getEndpointNotification())) {
                return user.getUser().getEndpointNotification();
            } else {
                notificationService.deleteEndpoint(user.getUser().getEndpointNotification());
                return createAndUpdateEndpoint(user);
            }
        }
    }

    private String createAndUpdateEndpoint(UserEntity user) {
        String endpoint = notificationService.createEndpoint(user.getUser().getTokenNotification());
        user.getUser().setEndpointNotification(endpoint);
        repo.save(user);

        return endpoint;
    }

    private boolean isEndpointValid(String endpoint) {
        GetEndpointAttributesResponse response = notificationService.getEndpointAttributes(endpoint);

        return Boolean.parseBoolean(response.attributes().get("Enabled"));

    }

    private Response builderResponse(int statusCode, String message) {
        return Response.builder()
                .statusCode(statusCode)
                .message(message)
                .build();
    }
}
