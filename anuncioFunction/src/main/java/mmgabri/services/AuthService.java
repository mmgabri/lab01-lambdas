package mmgabri.services;

import mmgabri.domain.*;

public interface AuthService<A, O> {
    SignupResponse signUp(SignupRequest request);
    ConfirmSignupResponse confirmSignUp(ConfirmSignupRequest request);
    SigninResponse signin(SigninRequest request);
}