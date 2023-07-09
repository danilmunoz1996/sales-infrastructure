import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';

const model_lower = 'order';
const model = 'Order'

const TABLE_NAME = model;
const TABLE_PK = model_lower + 'Id';
const TABLE_SK = 'createdAt';

export class OrderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // model's table
    const table = new dynamodb.Table(this, TABLE_NAME, {
      partitionKey: { name: TABLE_PK, type: dynamodb.AttributeType.STRING },
      sortKey: { name: TABLE_SK, type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // generate exports names for table
  
    new cdk.CfnOutput(this, model + 'TableName', {
      value: table.tableName,
      exportName: model + 'TableName'
    });

    new cdk.CfnOutput(this, model + 'TableArn', { 
      value: table.tableArn,
      exportName: model + 'TableArn'
    });

    const customerIdIndexName = 'customerId-index';
    table.addGlobalSecondaryIndex({
      indexName: customerIdIndexName,
      partitionKey: { name: 'customerId', type: dynamodb.AttributeType.STRING },
    });

    new cdk.CfnOutput(this, 'customerIdIndexArn', {
      value: table.tableArn + "/index/" + customerIdIndexName,
      exportName: 'customerIdIndexArn'
    });

    const statusIndexName = 'status-index';
    table.addGlobalSecondaryIndex({
      indexName: statusIndexName,
      partitionKey: { name: 'status', type: dynamodb.AttributeType.STRING },
    });

    new cdk.CfnOutput(this, 'statusIndexArn', {
      value: table.tableArn + "/index/" + statusIndexName,
      exportName: 'statusIndexArn'
    });

  }
}
