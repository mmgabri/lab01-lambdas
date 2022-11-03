package mmgabri.domain.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BodyResponse {
    private String message;
}
