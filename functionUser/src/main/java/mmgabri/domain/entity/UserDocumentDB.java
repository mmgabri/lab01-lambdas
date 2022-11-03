package mmgabri.domain.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import mmgabri.domain.enuns.AccountStatusEnun;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBDocument
public class UserDocumentDB {
    private String userId;
    private String name;
    private String email;
    private boolean isUserConfirmed;
    private String accountStatus;
    private String createdAt;
    private String lastModified;
    }