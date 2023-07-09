#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { OrderStack } from '../lib/order-stack';
import { CustomerStack } from '../lib/customer-stack';
import { DeliveryStack } from '../lib/delivery-stack';
import { ItemStack } from '../lib/item-stack';
import { ProductStack } from '../lib/product-stack';
import { PaymentStack } from '../lib/payment-stack';
import { DriverStack } from '../lib/driver-stack';

const app = new cdk.App();
new OrderStack(app, 'OrderStack', {});
new CustomerStack(app, 'CustomerStack', {});
new DeliveryStack(app, 'DeliveryStack', {});
new ItemStack(app, 'ItemStack', {});
new ProductStack(app, 'ProductStack', {});
new PaymentStack(app, 'PaymentStack', {});
new DriverStack(app, 'DriverStack', {});
