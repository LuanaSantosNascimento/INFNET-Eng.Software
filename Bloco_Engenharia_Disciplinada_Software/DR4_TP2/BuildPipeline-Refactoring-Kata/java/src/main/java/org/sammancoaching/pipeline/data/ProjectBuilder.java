package org.sammancoaching.pipeline.data;

import org.sammancoaching.pipeline.enums.TestStatus;

import static org.sammancoaching.pipeline.enums.TestStatus.NO_TESTS;

public class ProjectBuilder {
    private boolean deploysSuccessfully;
    private TestStatus testStatus = NO_TESTS;
    private boolean deploysSuccessfullyToStaging = false;
    private TestStatus smokeTestStatus = NO_TESTS;

    public ProjectBuilder setTestStatus(TestStatus testStatus) {
        this.testStatus = testStatus;
        return this;
    }

    public ProjectBuilder setSmokeTestStatus(TestStatus smokeTestStatus) {
        this.smokeTestStatus = smokeTestStatus;
        return this;
    }

    public ProjectBuilder setDeploysSuccessfully(boolean deploysSuccessfully) {
        this.deploysSuccessfully = deploysSuccessfully;
        return this;
    }

    public ProjectBuilder setDeploysSuccessfullyToStaging(boolean deploysSuccessfully) {
        this.deploysSuccessfullyToStaging = deploysSuccessfully;
        return this;
    }

    public Project build() {
        return new Project(deploysSuccessfully, testStatus, deploysSuccessfullyToStaging, smokeTestStatus);
    }
}
