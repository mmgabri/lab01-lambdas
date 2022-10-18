package com.mmgabri.application;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.mmgabri.domain.AnuncioRequest;
import com.mmgabri.domain.AnuncioResponse;
import com.mmgabri.domain.BodyError;
import com.mmgabri.exceptions.BusinessException;
import com.mmgabri.services.AnuncioServiceImpl;
import com.mmgabri.services.ParseBodyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RequiredArgsConstructor
public class UseCaseImpl implements UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(UseCaseImpl.class);
    private final ParseBodyServiceImpl parseService;
    private final AnuncioServiceImpl service;
    private final Gson gson;

    @Override
    public APIGatewayProxyResponseEvent execute(APIGatewayProxyRequestEvent event) {
        logger.info("Processando resource " + event.getResource());

        switch (event.getHttpMethod()) {
            case "POST":
                switch (event.getResource()) {
                    case "/anuncios":
                        try {
                            AnuncioRequest request = parseService.parse(event.getBody(), event.getHeaders());
                            service.create(request);
                            return builderResponse(200, gson.toJson(builderBodyError("Sucess!")));
                        } catch (BusinessException e) {
                            return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                        }
                    default:
                        return null;
                }
            case "GET":
                switch (event.getResource()) {
                    case "/anuncios":
                        try {
                            List<AnuncioResponse> resp = service.listAll();
                            return builderResponse(200, gson.toJson(resp));
                        } catch (BusinessException e) {
                            return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                        }
                    case "/anuncios/user/{userId}":
                        try {
                            List<AnuncioResponse> resp = service.listByUser(event.getPathParameters().get("userId"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (BusinessException e) {
                            return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                        }
                    case "/anuncios/tipo/{tipo}":
                        try {
                            List<AnuncioResponse> resp = service.listByTipo(event.getPathParameters().get("tipo"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (BusinessException e) {
                            return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                        }
                    case "/anuncios/categoria/{categoria}":
                        try {
                            List<AnuncioResponse> resp = service.listByCategoria(event.getPathParameters().get("categoria"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (BusinessException e) {
                            return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                        }
                    default:
                        return null;
                }
            default:
                return null;
        }
    }

    private APIGatewayProxyResponseEvent builderResponse(int statusCode, String message) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(statusCode);
        response.setBody(message);
        return response;
    }

    private BodyError builderBodyError(String message) {
        return BodyError.builder()
                .message(message)
                .build();
    }
}
