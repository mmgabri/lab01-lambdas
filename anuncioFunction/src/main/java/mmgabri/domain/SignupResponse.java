package mmgabri.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupResponse {
    private String message;
    private String idUser;
}
