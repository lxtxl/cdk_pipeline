"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkPipelineStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_codebuild_1 = require("aws-cdk-lib/aws-codebuild");
const aws_codepipeline_1 = require("aws-cdk-lib/aws-codepipeline");
const aws_codepipeline_actions_1 = require("aws-cdk-lib/aws-codepipeline-actions");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class CdkPipelineStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        const pipeline = new aws_codepipeline_1.Pipeline(this, 'Pipeline', {
            pipelineName: 'Pipeline',
            crossAccountKeys: false
        });
        const sourceOutput = new aws_codepipeline_1.Artifact('SourceOutput');
        // Github
        pipeline.addStage({
            stageName: 'source',
            actions: [
                new aws_codepipeline_actions_1.GitHubSourceAction({
                    owner: 'lxtxl',
                    repo: 'cdk_pipeline',
                    branch: 'main',
                    actionName: 'Pipeline_Source',
                    oauthToken: aws_cdk_lib_1.SecretValue.secretsManager('github-token'),
                    output: sourceOutput
                })
            ]
        });
        const cdkBuildOutput = new aws_codepipeline_1.Artifact("CdkBuildOutput");
        pipeline.addStage({
            stageName: "Build",
            actions: [
                new aws_codepipeline_actions_1.CodeBuildAction({
                    actionName: "CDK_Build",
                    input: sourceOutput,
                    outputs: [cdkBuildOutput],
                    project: new aws_codebuild_1.PipelineProject(this, 'CdkBuildProject', {
                        environment: {
                            buildImage: aws_codebuild_1.LinuxBuildImage.STANDARD_5_0
                        },
                        buildSpec: aws_codebuild_1.BuildSpec.fromSourceFilename('build-specs/cdk-build-spec.yml')
                    })
                })
            ]
        });
        pipeline.addStage({
            stageName: "Pipeline_Update",
            actions: [
                new aws_codepipeline_actions_1.CloudFormationCreateUpdateStackAction({
                    actionName: "Pipeline_Update",
                    stackName: "CdkPipelineStack",
                    templatePath: cdkBuildOutput.atPath("CdkPipelineStack.template.json"),
                    adminPermissions: true
                })
            ]
        });
    }
}
exports.CdkPipelineStack = CdkPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrX3BpcGVsaW5lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrX3BpcGVsaW5lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE2RDtBQUM3RCw2REFBd0Y7QUFDeEYsbUVBQWtFO0FBQ2xFLG1GQUFrSTtBQUVsSSw4Q0FBOEM7QUFFOUMsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLDJCQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUM5QyxZQUFZLEVBQUUsVUFBVTtZQUN4QixnQkFBZ0IsRUFBRSxLQUFLO1NBQ3hCLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksMkJBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxTQUFTO1FBQ1QsUUFBUSxDQUFDLFFBQVEsQ0FBRTtZQUNqQixTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSw2Q0FBa0IsQ0FBRTtvQkFDdEIsS0FBSyxFQUFFLE9BQU87b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLE1BQU0sRUFBRSxNQUFNO29CQUNkLFVBQVUsRUFBRSxpQkFBaUI7b0JBQzdCLFVBQVUsRUFBRSx5QkFBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7b0JBQ3RELE1BQU0sRUFBRSxZQUFZO2lCQUNyQixDQUFDO2FBQ0g7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLGNBQWMsR0FBRyxJQUFJLDJCQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV0RCxRQUFRLENBQUMsUUFBUSxDQUFFO1lBQ2pCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLE9BQU8sRUFBRTtnQkFDUCxJQUFJLDBDQUFlLENBQUU7b0JBQ25CLFVBQVUsRUFBRSxXQUFXO29CQUN2QixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUN6QixPQUFPLEVBQUUsSUFBSSwrQkFBZSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTt3QkFDcEQsV0FBVyxFQUFFOzRCQUNYLFVBQVUsRUFBRSwrQkFBZSxDQUFDLFlBQVk7eUJBQ3pDO3dCQUNELFNBQVMsRUFBRSx5QkFBUyxDQUFDLGtCQUFrQixDQUFDLGdDQUFnQyxDQUFDO3FCQUMxRSxDQUFDO2lCQUNILENBQUM7YUFDSDtTQUNGLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLENBQUU7WUFDakIsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxnRUFBcUMsQ0FBRTtvQkFDekMsVUFBVSxFQUFFLGlCQUFpQjtvQkFDN0IsU0FBUyxFQUFFLGtCQUFrQjtvQkFDN0IsWUFBWSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUM7b0JBQ3JFLGdCQUFnQixFQUFFLElBQUk7aUJBQ3ZCLENBQUM7YUFDSDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXpERCw0Q0F5REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWNyZXRWYWx1ZSwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBCdWlsZFNwZWMsIExpbnV4QnVpbGRJbWFnZSwgUGlwZWxpbmVQcm9qZWN0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVidWlsZCc7XG5pbXBvcnQgeyBBcnRpZmFjdCwgUGlwZWxpbmUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZXBpcGVsaW5lJztcbmltcG9ydCB7IENsb3VkRm9ybWF0aW9uQ3JlYXRlVXBkYXRlU3RhY2tBY3Rpb24sIENvZGVCdWlsZEFjdGlvbiwgR2l0SHViU291cmNlQWN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuXG5leHBvcnQgY2xhc3MgQ2RrUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcbiAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICBwaXBlbGluZU5hbWU6ICdQaXBlbGluZScsXG4gICAgICBjcm9zc0FjY291bnRLZXlzOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc291cmNlT3V0cHV0ID0gbmV3IEFydGlmYWN0KCdTb3VyY2VPdXRwdXQnKTtcbiAgICAvLyBHaXRodWJcbiAgICBwaXBlbGluZS5hZGRTdGFnZSgge1xuICAgICAgc3RhZ2VOYW1lOiAnc291cmNlJyxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgbmV3IEdpdEh1YlNvdXJjZUFjdGlvbigge1xuICAgICAgICAgIG93bmVyOiAnbHh0eGwnLFxuICAgICAgICAgIHJlcG86ICdjZGtfcGlwZWxpbmUnLFxuICAgICAgICAgIGJyYW5jaDogJ21haW4nLFxuICAgICAgICAgIGFjdGlvbk5hbWU6ICdQaXBlbGluZV9Tb3VyY2UnLFxuICAgICAgICAgIG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdnaXRodWItdG9rZW4nKSxcbiAgICAgICAgICBvdXRwdXQ6IHNvdXJjZU91dHB1dFxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2RrQnVpbGRPdXRwdXQgPSBuZXcgQXJ0aWZhY3QoXCJDZGtCdWlsZE91dHB1dFwiKTtcblxuICAgIHBpcGVsaW5lLmFkZFN0YWdlKCB7XG4gICAgICBzdGFnZU5hbWU6IFwiQnVpbGRcIixcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgbmV3IENvZGVCdWlsZEFjdGlvbigge1xuICAgICAgICAgIGFjdGlvbk5hbWU6IFwiQ0RLX0J1aWxkXCIsXG4gICAgICAgICAgaW5wdXQ6IHNvdXJjZU91dHB1dCxcbiAgICAgICAgICBvdXRwdXRzOiBbY2RrQnVpbGRPdXRwdXRdLFxuICAgICAgICAgIHByb2plY3Q6IG5ldyBQaXBlbGluZVByb2plY3QodGhpcywgJ0Nka0J1aWxkUHJvamVjdCcsIHtcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgIGJ1aWxkSW1hZ2U6IExpbnV4QnVpbGRJbWFnZS5TVEFOREFSRF81XzBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWlsZFNwZWM6IEJ1aWxkU3BlYy5mcm9tU291cmNlRmlsZW5hbWUoJ2J1aWxkLXNwZWNzL2Nkay1idWlsZC1zcGVjLnltbCcpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHBpcGVsaW5lLmFkZFN0YWdlKCB7XG4gICAgICBzdGFnZU5hbWU6IFwiUGlwZWxpbmVfVXBkYXRlXCIsXG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgIG5ldyBDbG91ZEZvcm1hdGlvbkNyZWF0ZVVwZGF0ZVN0YWNrQWN0aW9uKCB7XG4gICAgICAgICAgYWN0aW9uTmFtZTogXCJQaXBlbGluZV9VcGRhdGVcIixcbiAgICAgICAgICBzdGFja05hbWU6IFwiQ2RrUGlwZWxpbmVTdGFja1wiLFxuICAgICAgICAgIHRlbXBsYXRlUGF0aDogY2RrQnVpbGRPdXRwdXQuYXRQYXRoKFwiQ2RrUGlwZWxpbmVTdGFjay50ZW1wbGF0ZS5qc29uXCIpLFxuICAgICAgICAgIGFkbWluUGVybWlzc2lvbnM6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufVxuIl19