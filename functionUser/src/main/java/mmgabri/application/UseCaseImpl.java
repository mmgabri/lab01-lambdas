package mmgabri.application;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import mmgabri.domain.payload.*;
import mmgabri.exceptions.ConfirmationCodeInvalildException;
import mmgabri.exceptions.InvalidPasswordException;
import mmgabri.exceptions.UserAlreadyExistsException;
import mmgabri.exceptions.UserNotFoundException;
import mmgabri.services.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
public class UseCaseImpl implements UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger logger = LoggerFactory.getLogger(UseCaseImpl.class);
    private final UserServiceImpl service;
    private final Gson gson;

    @Override
    @SneakyThrows
    public APIGatewayProxyResponseEvent execute(APIGatewayProxyRequestEvent event) {
        logger.info("Processando resource " + event.getResource());

        switch (event.getResource()) {
            case "/users/signup":
                try {
                    SignupResponse resp = service.signUp(gson.fromJson(event.getBody(), SignupRequest.class));
                    return builderResponse(200, gson.toJson(resp));
                }catch (UserAlreadyExistsException e) {
                    return builderResponse(472, gson.toJson(builderBodyResponse(e.getMessage())));
                } catch (Exception e) {
                    return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                }
            case "/users/confirmsignup":
                try {
                    ConfirmSignupResponse resp = service.confirmSignUp(gson.fromJson(event.getBody(), ConfirmSignupRequest.class));
                    return builderResponse(200, gson.toJson(resp));
                }catch (ConfirmationCodeInvalildException e) {
                    return builderResponse(471, gson.toJson(builderBodyResponse(e.getMessage())));
                }catch (UserNotFoundException e) {
                    return builderResponse(404, gson.toJson(builderBodyResponse(e.getMessage())));
                } catch (Exception e) {
                    return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                }
            case "/users/signin":
                try {
                    SigninResponse resp = service.signin(gson.fromJson(event.getBody(), SigninRequest.class));
                    return builderResponse(200, gson.toJson(resp));
                }catch (InvalidPasswordException e) {
                    return builderResponse(470, gson.toJson(builderBodyResponse(e.getMessage())));
                }catch (UserNotFoundException e) {
                    return builderResponse(404, gson.toJson(builderBodyResponse(e.getMessage())));
                }catch (Exception e) {
                    return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
                }
            case "/users/registeradvice":
                try {
                    service.registerAdvice(gson.fromJson(event.getBody(), RegisterAdviceRequest.class));
                    return builderResponse(200, gson.toJson(builderBodyResponse("Sucess!")));
                }catch (Exception e) {
                    return builderResponse(400, gson.toJson(builderBodyResponse(e.getMessage())));
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

    private BodyResponse builderBodyResponse(String message) {
        return BodyResponse.builder()
                .message(message)
                .build();
    }
}
