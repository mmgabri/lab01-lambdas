package mmgabri.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BodyError {
    private String message;
}
