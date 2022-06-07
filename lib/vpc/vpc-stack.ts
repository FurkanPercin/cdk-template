import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_ec2
}from 'aws-cdk-lib';
//import { SubnetType } from 'aws-cdk-lib/aws-ec2';

export class PatikaVPCStack extends Stack {
  get availabilityZones(): string[] {// az'lerin hangisi olduğu belirlendi.
    return ['eu-central-1a','eu-central-1b']    
  }

    constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);



    new aws_ec2.Vpc(this,'PatikaVpc', {
        vpcName:'patika-cloud-vpc-name',
        cidr:'10.4.0.0/16',
        natGateways:1, //private subnet için 1 adet nat gateway oluştur
        maxAzs:2, //Sallama availability zone atmasın diye belirledik.
        subnetConfiguration:[
            {
                name: 'publicSubnet',
                subnetType:aws_ec2.SubnetType.PUBLIC,
                cidrMask:20,
            },
            {
                name: 'privateSubnet',
                subnetType:aws_ec2.SubnetType.PRIVATE_WITH_NAT,
                cidrMask:20,   
            }
        ]
        

})
   
  }
}
