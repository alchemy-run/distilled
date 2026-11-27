#!/bin/sh
# Regenerates Distilled/AWS/Services/*.lean from the AWS Smithy models in the
# spec mirror (git submodule update --init --depth 1 packages/aws/specs/spec-mirror-aws).
set -eu
cd "$(dirname "$0")"
models=../packages/aws/specs/spec-mirror-aws/specs/models
lake build distilled-gen
gen() {
  model=$(ls "$models/$1"/service/*/*.json | tail -1)
  lake exe distilled-gen "$model" "Distilled.AWS.$2" "Distilled/AWS/Services/$2.lean"
}
gen sqs SQS
gen sns SNS
gen lambda Lambda
gen s3 S3
gen dynamodb DynamoDB
gen ec2 EC2
