package mmgabri.domain.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mmgabri.domain.UserDomain;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SigninResponse extends UserDomain {
    private String idToken;
    private String accessToken;
    private String refreshToken;
    private String message;
}


