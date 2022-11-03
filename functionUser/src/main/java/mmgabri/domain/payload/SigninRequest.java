package mmgabri.domain.payload;

import lombok.Data;

@Data
public class SigninRequest {
    private String email;
    private String password;
}
