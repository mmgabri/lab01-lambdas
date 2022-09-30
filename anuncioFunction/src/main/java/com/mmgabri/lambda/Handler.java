package com.mmgabri.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.google.gson.Gson;
import com.mmgabri.adapter.files.S3FileServiceImpl;
import com.mmgabri.application.UseCase;
import com.mmgabri.application.UseCaseImpl;
import com.mmgabri.services.ParseBodyServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Handler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
    private final UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> useCase;

    public Handler() {
        useCase = new UseCaseImpl(
                new ParseBodyServiceImpl(),
                new Gson(),
                new S3FileServiceImpl(AmazonS3ClientBuilder.standard().build(), "mmgabri-aws3-lab01"));
    }

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent event, final Context context) {
        logger.info("Iniciando processamento !");

        APIGatewayProxyResponseEvent response = useCase.execute(event);

        logger.info("Processamento finalizado com sucesso!");

        return response;
    }
}
