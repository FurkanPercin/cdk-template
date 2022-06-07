#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTemplateV1Stack } from '../lib/cdk-template-v1-stack';
import { PatikaVPCStack } from '../lib/vpc';
import {PatikaVPNServer} from '../lib/ec2';

const env={
  account:'010876915553',
  region:'eu-central-1'
}


const app = new cdk.App();
new CdkTemplateV1Stack(app, 'CdkTemplateV1Stack', {env}); 
new PatikaVPCStack(app,'PatikaVPCStack',{env});
new PatikaVPNServer(app,'PatikaVPNServer',{env});