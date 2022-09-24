version = 0.1
[y]
[y.deploy]
[y.deploy.parameters]
stack_name = "sam1"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-1qyeny3wwroei"
s3_prefix = "sam1"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
disable_rollback = true
parameter_overrides = "ParameterClientId=\"1dvekd807buibj92s4vn1jd901\" ParameterUserPool=\"us-east-1_MsqKPhJ3m\" ParameterAcessKey=\"AKIASEICDKSYQCQ22ONQ\" ParameterSecretKey=\"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\" ParameterTableNameAnuncio=\"anuncios\" apiGatewayName=\"my-api-v2\" apiGatewayStageName=\"Prod\" apiGatewayHTTPMethod=\"GET\" lambdaFunctionName=\"my-function\" CognitoUserPoolArn=\"arn:aws:cognito-idp:us-east-1:146570171569:userpool/us-east-1_MsqKPhJ3m\""
image_repositories = []

[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "sam5"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-1qyeny3wwroei"
s3_prefix = "sam5"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
parameter_overrides = "ParameterClientId=\"1dvekd807buibj92s4vn1jd901\" ParameterUserPool=\"us-east-1_MsqKPhJ3m\" ParameterAcessKey=\"AKIASEICDKSYQCQ22ONQ\" ParameterSecretKey=\"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\" ParameterTableNameAnuncio=\"anuncios\" apiGatewayName=\"my-api-v2\" apiGatewayStageName=\"Prod\" lambdaFunctionName=\"my-function\" CognitoUserPoolArn=\"arn:aws:cognito-idp:us-east-1:146570171569:userpool/us-east-1_MsqKPhJ3m\""
image_repositories = []
