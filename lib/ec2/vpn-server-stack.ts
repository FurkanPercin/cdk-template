import { RemovalPolicy, Stack, StackProps,CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_ec2
}from 'aws-cdk-lib';

export class PatikaVPNServer extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const vpcId=scope.node.tryGetContext('vpcId');//Hard code yazmamak için context dosyasına yazdık VPC ID'yi oradan çektik.
    
    const vpc = aws_ec2.Vpc.fromVpcAttributes(this, 'PatikaCloudVPC', {
        availabilityZones: ['eu-central-1a', 'eu-central-1b'],
        vpcId: vpcId,//contextten gelen değeri atatık 11. satır
        publicSubnetIds: ['subnet-0993ac7458e35d1c9', 'subnet-0c7b07099c286f535'], //VPC'nin public subnetleri eklenir 
      });
    
      //Create Securit Group to VPC
      const machineSg = new aws_ec2.SecurityGroup(this, 'PatikaVPNServerSG', {
        vpc,
        allowAllOutbound: true,
        securityGroupName: 'patika-vpn-server-sg',
      });
      //içeriye gelen trafik
      machineSg.addIngressRule(aws_ec2.Peer.anyIpv4(), aws_ec2.Port.tcp(22), 'allow access to ssh port anywhere');
      machineSg.addIngressRule(aws_ec2.Peer.anyIpv4(), aws_ec2.Port.tcp(8080), 'allow access to node app');

    const myInstance = new aws_ec2.Instance(this, 'PatikaVPNServer', {
        instanceType: aws_ec2.InstanceType.of(aws_ec2.InstanceClass.T3, aws_ec2.InstanceSize.MICRO),
        vpc,
        machineImage: aws_ec2.MachineImage.latestAmazonLinux({}),
        keyName: 'patika-vpn', // instance'a bağlanmak için key-pair
        securityGroup: machineSg,
    });

  }
}
