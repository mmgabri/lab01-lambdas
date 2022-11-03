package mmgabri.services;

import com.amazonaws.services.cognitoidp.model.AdminInitiateAuthResult;
import com.amazonaws.services.cognitoidp.model.GetUserResult;
import com.amazonaws.services.cognitoidp.model.SignUpResult;
import mmgabri.domain.*;
import mmgabri.domain.payload.*;

public interface AuthService<A, O> {
    SignUpResult signUp(SignupRequest request);
    void confirmSignUp(ConfirmSignupRequest request);
    AdminInitiateAuthResult signin(SigninRequest request);
}