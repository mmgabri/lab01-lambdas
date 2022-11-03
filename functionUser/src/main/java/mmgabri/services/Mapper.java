package mmgabri.services;

import com.amazonaws.services.cognitoidp.model.AuthenticationResultType;
import com.amazonaws.services.cognitoidp.model.SignUpResult;
import mmgabri.domain.entity.UserDocumentDB;
import mmgabri.domain.entity.UserEntity;
import mmgabri.domain.payload.SigninResponse;
import mmgabri.domain.payload.SignupRequest;

import java.time.LocalDateTime;

import static mmgabri.domain.enuns.AccountStatusEnun.IN_REGISTRATION;

public class Mapper {

    public UserEntity mapUserEntity(SignupRequest request, SignUpResult result) {
        UserDocumentDB document = UserDocumentDB.builder()
                .userId(result.getUserSub())
                .email(request.getEmail())
                .isUserConfirmed(result.isUserConfirmed())
                .name(request.getName())
                .email(request.getEmail())
                .accountStatus(IN_REGISTRATION.toString())
                .lastModified(LocalDateTime.now().toString())
                .createdAt(LocalDateTime.now().toString())
                .build();

        return UserEntity.builder()
                .userId(result.getUserSub())
                .email(request.getEmail())
                .createAt(LocalDateTime.now().toString())
                .user(document)
                .build();
    }

    public SigninResponse mapSigninResponse(UserEntity user, AuthenticationResultType resultType) {

        SigninResponse signinResponse = new SigninResponse();

        signinResponse.setId(user.getUser().getUserId());
        signinResponse.setEmail(user.getEmail());
        signinResponse.setUserName(user.getUser().getName());
        signinResponse.setAccessToken(resultType.getAccessToken());
        signinResponse.setIdToken(resultType.getIdToken());
        signinResponse.setRefreshToken(resultType.getRefreshToken());
        signinResponse.setMessage("Successfully signin");

        return signinResponse;
    }
}
