#!/bin/bash
set -ev

PLATFORM=amd64
DOCKERFILE_LOCATION="./docker/Dockerfile.amd64"
DOCKER_USER="xiovv"
DOCKER_IMAGE="go-auto-yt"
DOCKER_TAG="stable"

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    docker login -u $DOCKER_USER -p $DOCKER_PASSWORD

    buildctl build --frontend dockerfile.v0 \
        --progress=plain \
        --opt platform=linux/${PLATFORM} \
        --opt filename=${DOCKERFILE_LOCATION} \
        --opt build-arg:TRAVIS_PULL_REQUEST=false
        --output type=image \
        --output name=docker.io/${DOCKER_USER}/${IMAGE}:${TAG}-${PLATFORM} \
        --output push=true \
        --local dockerfile=. \
        --local context=.
else
    buildctl build --frontend dockerfile.v0 \
        --progress=plain \
        --opt platform=linux/${PLATFORM} \
        --opt filename=${DOCKERFILE_LOCATION} \
        --opt build-arg:TRAVIS_PULL_REQUEST=true
        --output type=image \
        --local dockerfile=. \
        --local context=.
fi