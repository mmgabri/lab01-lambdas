package mmgabri.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SigninResponse {
    private String idToken;
    private String accessToken;
    private String refreshToken;
    private String message;
}


