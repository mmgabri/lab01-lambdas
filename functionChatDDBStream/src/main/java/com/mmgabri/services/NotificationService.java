package com.mmgabri.services;

import software.amazon.awssdk.services.sns.model.GetEndpointAttributesRequest;
import software.amazon.awssdk.services.sns.model.GetEndpointAttributesResponse;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;


public interface NotificationService {
    String createEndpoint(String token);

    void deleteEndpoint(String endpoint);

    PublishResponse pubPush(String message, String endpoint);

    GetEndpointAttributesResponse getEndpointAttributes(String endpoint);

}
