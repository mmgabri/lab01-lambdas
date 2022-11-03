package mmgabri.lambda;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import mmgabri.adapter.AuthServiceImpl;
import mmgabri.adapter.RepositoryUser;
import mmgabri.application.UseCase;
import mmgabri.application.UseCaseImpl;
import mmgabri.services.Mapper;
import mmgabri.services.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Handler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
    private static final AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
    private final UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> useCase;

    public Handler() {
        useCase = new UseCaseImpl(
                new UserServiceImpl(
                        new AuthServiceImpl(),
                        new RepositoryUser(new DynamoDBMapper(client)),
                        new Mapper()),
                new Gson());
    }

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent event, final Context context) {
        logger.info("Iniciando processamento !");

        APIGatewayProxyResponseEvent response = useCase.execute(event);

        if (response.getStatusCode().equals(200)) {
            logger.info("Processamento finalizado com sucesso!");
        } else {
            logger.info("Processamento finalizado com erro:" + response.getStatusCode() + "-" + response.getBody());
        }

        return response;

    }
}
