import { Construct } from "constructs";
import * as budgets from 'aws-cdk-lib/aws-budgets';
import { CfnBudget } from "aws-cdk-lib/aws-budgets";

interface BudgetProps {

}

export class Budget extends Construct {
  constructor(scope: Construct, id: string, props: BudgetProps) {
    super(scope, id);

    new CfnBudget(this, 'Budget', {
      budget: {
        budgetLimit: {
          amount: 5,
          unit: 'USD'
        },
        budgetName: 'Monthly Budget',
        budgetType: 'COST',
        timeUnit: 'MONTHLY',
      }
    })
  }
}