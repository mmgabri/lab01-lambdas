package mmgabri.domain;

import lombok.Data;

@Data
public class ConfirmSignupRequest {
    private String email;
    private String confirmationCode;
}
