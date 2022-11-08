package mmgabri.domain.payload;

import lombok.Data;

@Data
public class RegisterAdviceRequest {
    private String userId;
    private String tokenNotification;
}
