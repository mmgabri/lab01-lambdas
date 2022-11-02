package mmgabri.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SigninResponse extends UserDomain{
    private String idToken;
    private String accessToken;
    private String refreshToken;
    private String message;
}


