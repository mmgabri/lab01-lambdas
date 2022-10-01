package com.mmgabri.application;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.mmgabri.adapter.files.S3FileServiceImpl;
import com.mmgabri.domain.AnuncioRequest;
import com.mmgabri.domain.BodyError;
import com.mmgabri.exceptions.RequestDeniedException;
import com.mmgabri.services.ParseBodyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
public class UseCaseImpl implements UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(UseCaseImpl.class);
    private final S3FileServiceImpl fileService;
    private final ParseBodyServiceImpl parseService;
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
                            List<URI> lisUri = fileService.uploadFile(request.getFiles());
                            return builderResponse(200, gson.toJson(builderBodyError("Sucess!")));
                        } catch (RequestDeniedException e) {
                            return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                        }
                    default:
                        return null;
                }
            case "GET":
                System.out.println("GET");
                return builderResponse(200, gson.toJson(builderBodyError("Sucess!")));
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
