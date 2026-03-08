package org.sammancoaching.pipeline.data;

public class PipelineExecution {
    private final boolean testsPassed;
    private final boolean deploymentSuccessful;

    public PipelineExecution(boolean testsPassed, boolean deploymentSuccessful) {
        this.testsPassed = testsPassed;
        this.deploymentSuccessful = deploymentSuccessful;
    }

    public boolean isOverallSuccessful() {
        return testsPassed && deploymentSuccessful;
    }

    public boolean failedAtTestStage() {
        return !testsPassed;
    }

    public boolean failedAtDeploymentStage() {
        return testsPassed && !deploymentSuccessful;
    }
}
