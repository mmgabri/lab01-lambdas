package mmgabri.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import mmgabri.adapter.AuthServiceImpl;
import mmgabri.application.UseCase;
import mmgabri.application.UseCaseImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Handler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
    private final UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> useCase;

    public Handler() {
        useCase = new UseCaseImpl(new Gson());
    }

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent event, final Context context) {
        logger.info("Iniciando processamento !");

        APIGatewayProxyResponseEvent response = useCase.execute(event);

        logger.info("Processamento finalizado com sucesso!");

        return response;
    }
}
