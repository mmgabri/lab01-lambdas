package com.mmgabri.adapter.database;

import com.mmgabri.exceptions.BusinessException;
import com.mmgabri.services.NotificationService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.*;

@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);
    private final String PLATFORM_APPLICATION_ARN = System.getenv("PLATFORM_APPLICATION_ARN");
    private final SnsClient snsClient;

    @Override
    public String createEndpoint(String token) {
        CreatePlatformEndpointRequest endpointRequest = CreatePlatformEndpointRequest.builder()
                .token(token)
                .platformApplicationArn(PLATFORM_APPLICATION_ARN)
                .build();

        try {
            CreatePlatformEndpointResponse response = snsClient.createPlatformEndpoint(endpointRequest);
            return response.endpointArn();
        } catch (Exception e) {
            logger.error("Erro client SNS (createEndpoint) - Exception: " + e.getCause());
            throw new BusinessException("Erro no client SNS (createEndpoint) - Exception: " + e.getMessage());
        }
    }

    @Override
    public PublishResponse pubPush(String message, String endpoint) {

        PublishRequest request = PublishRequest.builder()
                .message(message)
                .targetArn(endpoint)
                .build();

        try {
            return snsClient.publish(request);
        } catch (Exception e) {
            logger.error("Erro client SNS (publish) - Exception: " + e.getCause());
            throw new BusinessException("Erro no client SNS (publish) - Exception: " + e.getMessage());
        }
    }

    @Override
    public GetEndpointAttributesResponse getEndpointAttributes(String endpoint) {

        GetEndpointAttributesRequest getEndpointAttributesRequest2 = GetEndpointAttributesRequest.builder()
                .endpointArn(endpoint)
                .build();

        try {
            return snsClient.getEndpointAttributes(getEndpointAttributesRequest2);
        } catch (Exception e) {
            logger.error("Erro client SNS (getEndpointAttributes) - Exception: " + e.getCause());
            throw new BusinessException("Erro no client SNS (getEndpointAttributes) - Exception: " + e.getMessage());
        }
    }

    @Override
    public void deleteEndpoint(String endpoint) {

        DeleteEndpointRequest deleteRequest = DeleteEndpointRequest.builder()
                .endpointArn(endpoint)
                .build();
        try {
            snsClient.deleteEndpoint(deleteRequest);
        } catch (Exception e) {
            logger.error("Erro client SNS (deleteEndpoint) - Exception: " + e.getCause());
            throw new BusinessException("Erro no client SNS (deleteEndpoint) - Exception: " + e.getMessage());
        }
    }
}
