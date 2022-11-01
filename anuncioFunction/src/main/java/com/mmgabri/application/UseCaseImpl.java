package com.mmgabri.application;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.mmgabri.domain.Anuncio;
import com.mmgabri.domain.AnuncioRequest;
import com.mmgabri.domain.AnuncioResponse;
import com.mmgabri.domain.BodyReponse;
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
        logger.info("Processando Method/Resource: " + event.getHttpMethod()  + event.getResource());

        switch (event.getHttpMethod()) {
            case "POST":
                if ((event.getResource().equals("/anuncios"))) {
                    try {
                        AnuncioRequest request = parseService.parse(event.getBody(), event.getHeaders());
                        service.create(request);
                        return builderResponse(200, gson.toJson(builderBodyResponse("Sucess!")));
                    } catch (Exception e) {
                        logger.info("Erro no processamento - Exception:" + e );
                        return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                    }
                }
                return builderResponse(400, gson.toJson(builderBodyResponse("Recurso nao previsto")));
            case "PUT":
                if ((event.getResource().equals("/anuncios"))) {
                    try {
                        AnuncioRequest request = parseService.parse(event.getBody(), event.getHeaders());
                        service.update(request);
                        return builderResponse(200, gson.toJson(builderBodyResponse("Sucess!")));
                    } catch (Exception e) {
                        logger.info("Erro no processamento - Exception:" + e );
                        return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                    }
                }
                return builderResponse(400, gson.toJson(builderBodyResponse("Recurso nao previsto")));
            case "DELETE":
                if ((event.getResource().equals("/anuncios"))) {
                    try {
                        AnuncioRequest request = new AnuncioRequest();
                        request.setAnuncio(gson.fromJson(event.getBody(), Anuncio.class));
                        logger.info("Request:" + gson.toJson(request));
                        service.delete(request);
                        return builderResponse(200, gson.toJson(builderBodyResponse("Sucess!")));
                    } catch (Exception e) {
                        logger.info("Erro no processamento - Exception:" + e );
                        return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                    }
                }
                return builderResponse(400, gson.toJson(builderBodyResponse("Recurso nao previsto")));
            case "GET":
                switch (event.getResource()) {
                    case "/anuncios":
                        try {
                            List<AnuncioResponse> resp = service.listAll();
                            return builderResponse(200, gson.toJson(resp));
                        } catch (Exception e) {
                            logger.info("Erro no processamento - Exception:" + e );
                            return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                        }
                    case "/anuncios/user/{userId}":
                        try {
                            logger.info("userId:" + event.getPathParameters().get("userId"));
                            List<AnuncioResponse> resp = service.listByUser(event.getPathParameters().get("userId"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (Exception e) {
                            logger.info("Erro no processamento - Exception:" + e );
                            return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                        }
                    case "/anuncios/tipo/{tipo}":
                        try {
                            List<AnuncioResponse> resp = service.listByTipo(event.getPathParameters().get("tipo"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (Exception e) {
                            logger.info("Erro no processamento - Exception:" + e );
                            return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                        }
                    case "/anuncios/categoria/{categoria}":
                        try {
                            List<AnuncioResponse> resp = service.listByCategoria(event.getPathParameters().get("categoria"));
                            return builderResponse(200, gson.toJson(resp));
                        } catch (Exception e) {
                            logger.info("Erro no processamento - Exception:" + e );
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
