package mmgabri.adapter;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import lombok.AllArgsConstructor;
import mmgabri.domain.*;
import mmgabri.exceptions.RequestDeniedException;
import mmgabri.lambda.Handler;
import mmgabri.services.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.LinkedHashMap;
import java.util.Map;

import static mmgabri.domain.enuns.ExceptionsEnum.*;

@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
    private final String CLIENT_ID = System.getenv("CLIENT_ID");
    private final String USER_POOL = System.getenv("USER_POOL");
    private final String ACESS_KEY = System.getenv("ACESS_KEY");
    private final String SECRET_KEY = System.getenv("SECRET_KEY");

    private AWSCognitoIdentityProvider clientCognito;

    public AuthServiceImpl() {
        clientCognito = createCognitoClient();
    }

    private AWSCognitoIdentityProvider createCognitoClient() {
        AWSCredentials cred = new BasicAWSCredentials(ACESS_KEY, SECRET_KEY);
        AWSCredentialsProvider credProvider = new AWSStaticCredentialsProvider(cred);
        return AWSCognitoIdentityProviderClientBuilder.standard()
                .withCredentials(credProvider)
                .withRegion(Regions.US_EAST_1)
                .build();
    }

    @Override
    public SignupResponse signUp(SignupRequest request) {
        AttributeType i1 = new AttributeType();
        i1.setName("name");
        i1.setValue(request.getName());
        AttributeType i2 = new AttributeType();
        i2.setName("email");
        i2.setValue(request.getEmail());

        SignUpRequest response = new SignUpRequest().withClientId(CLIENT_ID)
                .withUsername(request.getEmail())
                .withPassword(request.getPassword())
                .withUserAttributes(i1)
                .withUserAttributes(i2);
        try {
            SignUpResult result = clientCognito.signUp(response);
            return new SignupResponse("Successfully signup", result.getUserSub());
        } catch (UsernameExistsException e) {
            logger.error("Erro client Cognito: " + e.getErrorMessage());
            throw new RequestDeniedException(USER_NAME_EXISTS.getDescricao());
        } catch (Exception e) {
            logger.error("Erro client Cognito: " + e.getCause());
            throw new RequestDeniedException(ERROR_SYSTEM.getDescricao());
        }
    }

    @Override
    public ConfirmSignupResponse confirmSignUp(ConfirmSignupRequest request) {
        ConfirmSignUpRequest confirmSignUpRequest = new ConfirmSignUpRequest()
                .withClientId(CLIENT_ID).withUsername(request.getEmail())
                .withConfirmationCode(request.getConfirmationCode());
        try {
            clientCognito.confirmSignUp(confirmSignUpRequest);
            return new ConfirmSignupResponse("Successfully confirm signup");
        } catch (CodeMismatchException e) {
            logger.error("Erro client Cognito: " + e.getCause());
            throw new RequestDeniedException(CODE_MISMATCH.getDescricao());
        } catch (ExpiredCodeException e) {
            logger.error("Erro client Cognito: " + e.getCause());
            throw new RequestDeniedException(EXPIRED_CODE.getDescricao());
        } catch (Exception e) {
            logger.error("Erro client Cognito: " + e.getCause());
            throw new RequestDeniedException(ERROR_SYSTEM.getDescricao());
        }
    }

    @Override
    public SigninResponse signin(SigninRequest request) {

        Map<String, String> authParams = new LinkedHashMap<String, String>() {{
            put("USERNAME", request.getEmail());
            put("PASSWORD", request.getPassword());
        }};

        AdminInitiateAuthRequest authRequest = new AdminInitiateAuthRequest()
                .withAuthFlow(AuthFlowType.ADMIN_NO_SRP_AUTH)
                .withUserPoolId(USER_POOL)
                .withClientId(CLIENT_ID)
                .withAuthParameters(authParams);
        try {
            AdminInitiateAuthResult authResult = clientCognito.adminInitiateAuth(authRequest);
            AuthenticationResultType resultType = authResult.getAuthenticationResult();
            return new SigninResponse(
                    resultType.getIdToken(),
                    resultType.getAccessToken(),
                    resultType.getRefreshToken(),
                    "Successfully signin");
        } catch (NotAuthorizedException e) {
            logger.error("Erro client Cognito: " + e.getCause());
            throw new RequestDeniedException(NOT_AUTHORIZED.getDescricao());
        } catch (Exception e) {
            logger.error("Erro client Cognito: " + e.getCause());
            throw new RequestDeniedException(ERROR_SYSTEM.getDescricao());
        }
    }
}
