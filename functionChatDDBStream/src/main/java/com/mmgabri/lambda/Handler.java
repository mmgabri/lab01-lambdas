package com.mmgabri.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.DynamodbEvent;
import com.amazonaws.services.lambda.runtime.events.DynamodbEvent.DynamodbStreamRecord;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.*;


import java.util.HashMap;
import java.util.List;

public class Handler implements RequestHandler<HashMap, String> {
    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
    Gson gson = new Gson();


    //public String handleRequest(DynamodbEvent ddbEvent, Context context) {
    public String handleRequest(HashMap ddbEvent, Context context) {
        DynamodbEvent event = new DynamodbEvent();

        event.setRecords((List<DynamodbStreamRecord>) ddbEvent.get("records"));

        logger.info("Iniciando processamento !");

        logger.info("ddbEvent: " + gson.toJson(event));

//verificar se existe endpoint
//obter atributios


        String token = "token2";
        String platformApplicationArn = "arn:aws:sns:us-east-1:146570171569:app/GCM/PushNotificationsLab01";
        SnsClient snsClient = SnsClient.builder()
                .region(Region.US_EAST_1)
           //     .credentialsProvider(ProfileCredentialsProvider.create())
                .build();

        createEndpoint(snsClient, token, platformApplicationArn);

        return"Successfully processed ";

    }

    public static void createEndpoint(SnsClient snsClient, String token, String platformApplicationArn) {

        System.out.println("Creating platform endpoint with token " + token);

        try {


//            GetEndpointAttributesRequest getEndpointAttributesRequest = GetEndpointAttributesRequest.builder()
//                    .endpointArn("arn:aws:sns:us-east-1:146570171569:endpoint/GCM/PushNotificationsLab01/39d95e79-b127-3f63-95d8-924834b878ec")
//                    .build();
//            GetEndpointAttributesResponse device1 = snsClient.getEndpointAttributes(getEndpointAttributesRequest);
//
//
//            GetEndpointAttributesRequest getEndpointAttributesRequest2 = GetEndpointAttributesRequest.builder()
//                    .endpointArn("arn:aws:sns:us-east-1:146570171569:endpoint/GCM/PushNotificationsLab01/3d335ed3-b275-3bef-a716-d4e0c146cd61")
//                    .build();
//            GetEndpointAttributesResponse device2 = snsClient.getEndpointAttributes(getEndpointAttributesRequest2);
//
//
//
//            GetEndpointAttributesRequest getEndpointAttributesRequest3 = GetEndpointAttributesRequest.builder()
//                    .endpointArn("arn:aws:sns:us-east-1:146570171569:endpoint/GCM/PushNotificationsLab01/59ed0335-82a2-3bd3-871d-8e7613fc2e9a")
//                    .build();
//            GetEndpointAttributesResponse device3 = snsClient.getEndpointAttributes(getEndpointAttributesRequest3);
//
//
//            CreatePlatformEndpointRequest endpointRequest = CreatePlatformEndpointRequest.builder()
//                    .token(token)
//                    .platformApplicationArn(platformApplicationArn)
//                    .build();
//
//            CreatePlatformEndpointResponse response = snsClient.createPlatformEndpoint(endpointRequest);
//            System.out.println("The ARN of the endpoint is " + response.endpointArn());

            PublishRequest request = PublishRequest.builder()
                    .message("Mensagem enviada via lambda java")
                    .targetArn("arn:aws:sns:us-east-1:146570171569:endpoint/GCM/PushNotificationsLab01/3d335ed3-b275-3bef-a716-d4e0c146cd61")
                    .build();

            PublishResponse result = snsClient.publish(request);
            System.out.println(result.messageId() + " Message sent. Status is " + result.sdkHttpResponse().statusCode());


        } catch (SnsException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
    }
}

//import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
//import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
//import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
//import com.amazonaws.services.lambda.runtime.Context;
//import com.amazonaws.services.lambda.runtime.RequestHandler;
//import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
//import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
//import com.google.gson.Gson;
//import com.mmgabri.adapter.database.RepositoryChatImpl;
//import com.mmgabri.adapter.database.RepositoryUserImpl;
//import com.mmgabri.application.UseCase;
//import com.mmgabri.application.UseCaseImpl;
//import com.mmgabri.services.ChatServiceImpl;
//import com.mmgabri.services.Mapper;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//public class Handler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
//    private static final Logger logger = LoggerFactory.getLogger(Handler.class);
//    private static final AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
//    private final UseCase<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> useCase;
//
//    public Handler() {
//        useCase = new UseCaseImpl(
//                new ChatServiceImpl(
//                        new RepositoryChatImpl(new DynamoDBMapper(client)),
//                        new Mapper(new RepositoryUserImpl(new DynamoDBMapper(client))),
//                        new Gson()),
//                new Gson());
//    }
//
//    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent event, final Context context) {
//        logger.info("Iniciando processamento !");
//
//        APIGatewayProxyResponseEvent response = useCase.execute(event);
//
//        if (response.getStatusCode().equals(200)) {
//            logger.info("Processamento finalizado com sucesso!");
//        } else {
//            logger.info("Processamento finalizado com erro - statusCode = " + response.getStatusCode());
//        }
//
//        return response;
//    }
//}
