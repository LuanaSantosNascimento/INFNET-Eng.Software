package org.sammancoaching.pipeline.data;

import org.sammancoaching.pipeline.enums.DeploymentEnvironment;
import org.sammancoaching.pipeline.enums.ExecutionStatus;
import org.sammancoaching.pipeline.enums.TestStatus;

import static org.sammancoaching.pipeline.enums.TestStatus.NO_TESTS;
import static org.sammancoaching.pipeline.enums.TestStatus.PASSING_TESTS;

public class Project {
    private final boolean deploysSuccessfully;
    private final boolean deploysSuccessfullyToStaging;
    private final TestStatus testStatus;
    private final TestStatus smokeTestStatus;

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    Project(boolean deploysSuccessfully,
            TestStatus testStatus,
            boolean deploysSuccessfullyToStaging,
            TestStatus smokeTestStatus) {
        this.deploysSuccessfully = deploysSuccessfully;
        this.testStatus = testStatus;
        this.deploysSuccessfullyToStaging = deploysSuccessfullyToStaging;
        this.smokeTestStatus = smokeTestStatus;
    }

    public boolean hasTests() {
        return testStatus != NO_TESTS;
    }

    public ExecutionStatus runTests() {
        return resultFor(testStatus == PASSING_TESTS);
    }

    public ExecutionStatus deploy(DeploymentEnvironment environment) {
        switch (environment) {
            case STAGING:
                return resultFor(deploysSuccessfullyToStaging);
            case PRODUCTION:
                return resultFor(deploysSuccessfully);
            default:
                return ExecutionStatus.FAILURE;
        }
    }

    public TestStatus runSmokeTests() {
        return smokeTestStatus;
    }

    private ExecutionStatus resultFor(boolean success) {
        return success ? ExecutionStatus.SUCCESS : ExecutionStatus.FAILURE;
    }

}
