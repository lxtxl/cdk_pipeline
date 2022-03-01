"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const constructs_1 = require("constructs");
const aws_budgets_1 = require("aws-cdk-lib/aws-budgets");
class Budget extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        new aws_budgets_1.CfnBudget(this, 'Budget', {
            budget: {
                budgetLimit: {
                    amount: 5,
                    unit: 'USD'
                },
                budgetName: 'Monthly Budget',
                budgetType: 'COST',
                timeUnit: 'MONTHLY',
            }
        });
    }
}
exports.Budget = Budget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUV2Qyx5REFBb0Q7QUFNcEQsTUFBYSxNQUFPLFNBQVEsc0JBQVM7SUFDbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzVCLE1BQU0sRUFBRTtnQkFDTixXQUFXLEVBQUU7b0JBQ1gsTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsVUFBVSxFQUFFLGdCQUFnQjtnQkFDNUIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFFBQVEsRUFBRSxTQUFTO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBaEJELHdCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcbmltcG9ydCAqIGFzIGJ1ZGdldHMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWJ1ZGdldHMnO1xyXG5pbXBvcnQgeyBDZm5CdWRnZXQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWJ1ZGdldHNcIjtcclxuXHJcbmludGVyZmFjZSBCdWRnZXRQcm9wcyB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnVkZ2V0IGV4dGVuZHMgQ29uc3RydWN0IHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQnVkZ2V0UHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgbmV3IENmbkJ1ZGdldCh0aGlzLCAnQnVkZ2V0Jywge1xyXG4gICAgICBidWRnZXQ6IHtcclxuICAgICAgICBidWRnZXRMaW1pdDoge1xyXG4gICAgICAgICAgYW1vdW50OiA1LFxyXG4gICAgICAgICAgdW5pdDogJ1VTRCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1ZGdldE5hbWU6ICdNb250aGx5IEJ1ZGdldCcsXHJcbiAgICAgICAgYnVkZ2V0VHlwZTogJ0NPU1QnLFxyXG4gICAgICAgIHRpbWVVbml0OiAnTU9OVEhMWScsXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59Il19