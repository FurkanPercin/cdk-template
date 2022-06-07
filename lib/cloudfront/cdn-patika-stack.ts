import { RemovalPolicy, Stack, StackProps, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_s3,
  aws_cloudfront,
  aws_cloudfront_origins
}from 'aws-cdk-lib';

export class PatikaCloudStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const sharedResourceS3 = aws_s3.Bucket.fromBucketArn(this,'someName',Fn.importValue('PatikaS3BucketARN'));
    const cfOrigin=new aws_cloudfront_origins.S3Origin(sharedResourceS3);

  }
}
