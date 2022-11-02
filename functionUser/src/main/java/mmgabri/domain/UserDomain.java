package mmgabri.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDomain {
    private String id;
    private String userName;
    private String email;
}
