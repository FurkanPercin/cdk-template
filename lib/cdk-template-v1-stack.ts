import { RemovalPolicy, Stack, StackProps,CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_s3
}from 'aws-cdk-lib';

export class CdkTemplateV1Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const buck = new aws_s3.Bucket(this,'MyFirstS3Bucket',{
        bucketName:'cdk-template-s3-1',
        removalPolicy:RemovalPolicy.DESTROY
    });
   new CfnOutput(this,'PatikaS3BucketARN',{
     value:buck.bucketArn,
     exportName:'PatikaS3BucketARN'
   })

  }
}
