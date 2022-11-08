package com.mmgabri.application;

import com.google.gson.Gson;
import com.mmgabri.adapter.database.RepositoryUserImpl;
import com.mmgabri.domain.Reponse;
import com.mmgabri.domain.Request;
import com.mmgabri.domain.entity.UserEntity;
import com.mmgabri.services.ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
public class UseCaseImpl {
    private static final Logger logger = LoggerFactory.getLogger(UseCaseImpl.class);
    private final ServiceImpl service;
    private final Gson gson;
    private final RepositoryUserImpl repo;

    public Reponse execute(Request request) {
        logger.info("User case - Request: " + gson.toJson(request));

        UserEntity user = repo.getById(request.getUserId());

        try {
            if (!isExistEndpoint(user) || !isEndpointValid(user)) {
                String endpoint = createAndUpdateEndpoint(user);
                service.publish(endpoint, request);
            } else
                service.publish(user.getUser().getEndpointNotification(), request);
        } catch (Exception e) {
            return builderResponse(400, "Error: " + e.getMessage());
        }

        return builderResponse(200, "Sucess!");
    }

    private String createAndUpdateEndpoint(UserEntity user) {
        String endpoint = service.createEndpoint(user.getUser().getTokenNotification());
        user.getUser().setEndpointNotification(endpoint);
        repo.save(user);

        return endpoint;
    }

    private boolean isExistEndpoint(UserEntity user) {
        return user.getUser().getEndpointNotification() != null;
    }

    private boolean isEndpointValid(UserEntity user) {
        return user.getUser().getEndpointNotification() != null;
        //service.isEndpointValid(user.getUser().getEndpointNotification()
    }

    private Reponse builderResponse(int statusCode, String message) {
        return Reponse.builder()
                .statusCode(statusCode)
                .message(message)
                .build();
    }
}
