version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "stack-lab01-lambdas"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-1qyeny3wwroei"
s3_prefix = "stack-lab01-lambdas"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
parameter_overrides = "ParameterAcessKey=\"AKIASEICDKSYSBPV6UPE\" ParameterSecretKey=\"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\" ParameterClientId=\"1dvekd807buibj92s4vn1jd901\" ParameterUserPool=\"us-east-1_MsqKPhJ3m\" ParameterCognitoUserPoolArn=\"arn:aws:cognito-idp:us-east-1:146570171569:userpool/us-east-1_MsqKPhJ3m\" ParameterTableNameAnuncio=\"anuncio\" ParameterTableNameChat=\"chat\" ParameterTableNameUser=\"user\" ParameterLambdaAnuncioName=\"anuncio-function\" ParameterLambdaUserName=\"user-function\" ParameterLambdaChatName=\"chat-function\" ParameterApiGatewayName=\"lab01-lambdas\" ParameterApiGatewayStageName=\"Prod\" ParameterBucketName=\"mmgabri-aws3-lab01-images\""
image_repositories = []

[y]
[y.deploy]
[y.deploy.parameters]
stack_name = "stack-lab01-lambdas"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-1qyeny3wwroei"
s3_prefix = "stack-lab01-lambdas"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
parameter_overrides = "ParameterAcessKey=\"AKIASEICDKSYSBPV6UPE\" ParameterSecretKey=\"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\" ParameterClientId=\"1dvekd807buibj92s4vn1jd901\" ParameterUserPool=\"us-east-1_MsqKPhJ3m\" ParameterCognitoUserPoolArn=\"arn:aws:cognito-idp:us-east-1:146570171569:userpool/us-east-1_MsqKPhJ3m\" ParameterTableNameAnuncio=\"anuncio\" ParameterTableNameChat=\"chat\" ParameterTableNameUser=\"user\" ParameterLambdaAnuncioName=\"anuncio-function\" ParameterLambdaUserName=\"user-function\" ParameterLambdaChatName=\"chat-function\" ParameterLambdaStreamDBName=\"StreamDB\" ParameterApiGatewayName=\"lab01-lambdas\" ParameterApiGatewayStageName=\"Prod\" ParameterBucketName=\"mmgabri-aws3-lab01-images\""
image_repositories = []
