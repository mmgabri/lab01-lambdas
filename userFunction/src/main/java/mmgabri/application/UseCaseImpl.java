package mmgabri.application;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mmgabri.adapter.AuthServiceImpl;
import mmgabri.domain.*;
import mmgabri.exceptions.RequestDeniedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
public class UseCaseImpl implements UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(UseCaseImpl.class);
    private final AuthServiceImpl auth;
    private final Gson gson;

    @Override
    public APIGatewayProxyResponseEvent execute(APIGatewayProxyRequestEvent event) {
        logger.info("Processando resource " + event.getResource());

        switch (event.getResource()) {
            case "/signup":
                try {
                    SignupResponse resp = auth.signUp(gson.fromJson(event.getBody(), SignupRequest.class));
                    return builderResponse(200, gson.toJson(resp));
                } catch (RequestDeniedException e) {
                    return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                }
            case "/confirmsignup":
                try {
                    ConfirmSignupResponse resp = auth.confirmSignUp(gson.fromJson(event.getBody(), ConfirmSignupRequest.class));
                    return builderResponse(200, gson.toJson(resp));
                } catch (RequestDeniedException e) {
                    return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                }
            case "/signin":
                try {
                    SigninResponse resp = auth.signin(gson.fromJson(event.getBody(), SigninRequest.class));
                    return builderResponse(200, gson.toJson(resp));
                } catch (RequestDeniedException e) {
                    return builderResponse(400, gson.toJson(builderBodyError(e.getMessage())));
                }
            default:
                break;
        }
        return null;
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
