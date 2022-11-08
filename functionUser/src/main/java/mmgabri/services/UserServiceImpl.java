package mmgabri.services;

import com.amazonaws.services.cognitoidp.model.AdminInitiateAuthResult;
import com.amazonaws.services.cognitoidp.model.AuthenticationResultType;
import com.amazonaws.services.cognitoidp.model.SignUpResult;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import mmgabri.adapter.AuthServiceImpl;
import mmgabri.adapter.RepositoryUser;
import mmgabri.domain.entity.UserEntity;
import mmgabri.domain.payload.*;
import mmgabri.exceptions.UserAlreadyExistsException;
import mmgabri.exceptions.UserNotFoundException;
import mmgabri.lambda.Handler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

import static mmgabri.domain.enuns.AccountStatusEnun.ACTIVE;
import static mmgabri.domain.enuns.ExceptionsEnum.*;

@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
    private final AuthServiceImpl auth;
    private final RepositoryUser repo;
    private final Mapper mapper;

    @Override
    public SignupResponse signUp(SignupRequest request) {

        List<UserEntity> listUser = repo.getByEmail(request.getEmail());

        if (listUser.size() > 0) {
            logger.error(ERROR_DYNAMODB.getDescricao() + "Email já existente - " + request.getEmail());
            throw new UserAlreadyExistsException(USER_NAME_EXISTS.getDescricao());
        }

        SignUpResult result = auth.signUp(request);

        repo.save(mapper.mapUserEntity(request, result));

        return new SignupResponse("Sucess", result.getUserSub());
    }

    @Override
    public ConfirmSignupResponse confirmSignUp(ConfirmSignupRequest request) {

        List<UserEntity> listUser = repo.getByEmail(request.getEmail());
        UserEntity user = validAndGetReturn(listUser);

        auth.confirmSignUp(request);

        user.getUser().setUserConfirmed(true);
        user.getUser().setAccountStatus(ACTIVE.toString());
        user.getUser().setLastModified(LocalDateTime.now().toString());

        repo.save(user);

        return new ConfirmSignupResponse("Successfully confirm signup");
    }

    @Override
    @SneakyThrows
    public SigninResponse signin(SigninRequest request) {

        List<UserEntity> listUser = repo.getByEmail(request.getEmail());
        UserEntity user = validAndGetReturn(listUser);

        AdminInitiateAuthResult authResult = auth.signin(request);

        AuthenticationResultType resultType = authResult.getAuthenticationResult();

        return mapper.mapSigninResponse(user, resultType);
    }

    @Override
    public void registerAdvice(RegisterAdviceRequest request) {
        List<UserEntity> listUser = repo.getById(request.getUserId());
        UserEntity user = validAndGetReturn(listUser);

        user.getUser().setTokenNotification(request.getTokenNotification());

        repo.save(user);
    }

    private UserEntity validAndGetReturn(List<UserEntity> listUser) {
        if (listUser.size() != 1) {
            logger.error(ERROR_DYNAMODB.getDescricao() + "Email não encontrado ou Existe mais de um registro para email" + listUser.size());
            throw new UserNotFoundException(USER_NOT_FOUND.getDescricao());
        } else {
            return listUser.get(0);
        }
    }
}
