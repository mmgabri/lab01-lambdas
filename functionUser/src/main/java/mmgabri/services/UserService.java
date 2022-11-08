package mmgabri.services;

import mmgabri.domain.payload.*;

public interface UserService {
    SignupResponse signUp(SignupRequest request);

    ConfirmSignupResponse confirmSignUp(ConfirmSignupRequest request);

    SigninResponse signin(SigninRequest request);

    void registerAdvice(RegisterAdviceRequest request);
}
