package com.mmgabri.lambda;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.DynamodbEvent;
import com.amazonaws.services.lambda.runtime.events.models.dynamodb.AttributeValue;
import com.google.gson.Gson;
import com.mmgabri.adapter.database.NotificationServiceImpl;
import com.mmgabri.adapter.database.RepositoryUserImpl;
import com.mmgabri.application.UseCaseImpl;
import com.mmgabri.domain.Request;
import com.mmgabri.domain.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.sns.SnsClient;

public class Handler implements RequestHandler<DynamodbEvent, Response> {
    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
    private static final Gson gson = new Gson();
    private static final AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
    private final SnsClient snsClient = SnsClient.builder().build();
    private final UseCaseImpl useCase;

    public Handler() {
        useCase = new UseCaseImpl(
                new NotificationServiceImpl(snsClient),
                new Gson(),
                new RepositoryUserImpl(new DynamoDBMapper(client)));
    }

    public Response handleRequest(final DynamodbEvent ddbEvent, final Context context) {

        logger.info("Iniciando processamento - Event : " + gson.toJson(ddbEvent));

        Request request = null;

        try {
            request = mapperRequest(ddbEvent);
        } catch (Exception e) {
            logger.info("Erro no mapper Request");
            return new Response(400, "Erro no mapper Request");
        }

        Response response = useCase.execute(request);

        if (response.getStatusCode() == 200) {
            logger.info("Successfully processed " + ddbEvent.getRecords().size() + " records.");
        } else {
            logger.info("Processamento finalizado com erro - statusCode = " + response.getStatusCode());
        }

        return response;
    }

    private Request mapperRequest(DynamodbEvent event) {
        Request request = new Request();

        request.setChatId(getField(event, "chatId"));
        request.setMessage(getField(event, "text"));
        request.setUserId(getField(event, "userIdTo"));
        request.setUserName(getField(event, "userNameTo"));

        return request;

    }

    private String getField(DynamodbEvent event, String field) {
        if (field.equals("chatId")) {
            AttributeValue av = event.getRecords().get(0).getDynamodb().getNewImage().get("pk");
            return av.getS().substring(5);
        } else {
            AttributeValue av = event.getRecords().get(0).getDynamodb().getNewImage().get("message").getM().get(field);
            return av.getS();
        }
    }
}
