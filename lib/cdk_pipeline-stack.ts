import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec, LinuxBuildImage, PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CloudFormationCreateUpdateStackAction, CodeBuildAction, GitHubSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const pipeline = new Pipeline(this, 'Pipeline', {
      pipelineName: 'Pipeline',
      crossAccountKeys: false
    });

    const sourceOutput = new Artifact('SourceOutput');
    // Github
    pipeline.addStage( {
      stageName: 'source',
      actions: [
        new GitHubSourceAction( {
          owner: 'lxtxl',
          repo: 'cdk_pipeline',
          branch: 'main',
          actionName: 'Pipeline_Source',
          oauthToken: SecretValue.secretsManager('github-token'),
          output: sourceOutput
        })
      ]
    });

    const cdkBuildOutput = new Artifact("CdkBuildOutput");

    pipeline.addStage( {
      stageName: "Build",
      actions: [
        new CodeBuildAction( {
          actionName: "CDK_Build",
          input: sourceOutput,
          outputs: [cdkBuildOutput],
          project: new PipelineProject(this, 'CdkBuildProject', {
            environment: {
              buildImage: LinuxBuildImage.STANDARD_5_0
            },
            buildSpec: BuildSpec.fromSourceFilename('build-specs/cdk-build-spec.yml')
          })
        })
      ]
    });

    pipeline.addStage( {
      stageName: "Pipeline_Update",
      actions: [
        new CloudFormationCreateUpdateStackAction( {
          actionName: "Pipeline_Update",
          stackName: "CdkPipelineStack",
          templatePath: cdkBuildOutput.atPath("CdkPipelineStack.template.json"),
          adminPermissions: true
        })
      ]
    });
  }
}
