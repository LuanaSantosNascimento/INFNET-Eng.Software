package org.sammancoaching.pipeline;

import org.approvaltests.combinations.CombinationApprovals;
import org.junit.jupiter.api.Test;
import org.sammancoaching.pipeline.config.CapturingEmailer;
import org.sammancoaching.pipeline.config.CapturingLogger;
import org.sammancoaching.pipeline.config.DefaultConfig;
import org.sammancoaching.pipeline.data.Project;
import org.sammancoaching.pipeline.enums.TestStatus;

/**
 * This is a different style of test, an Approval test, to illustrate another way to do this.
 * The overall coverage should be similar to PipelineTest but with less code.
 */
public class PipelineApprovalTest {

    @Test
    void pipeline() {
        TestStatus[] testStatuses = {TestStatus.PASSING_TESTS, TestStatus.NO_TESTS, TestStatus.FAILING_TESTS};
        Boolean[] sendSummaries = {true, false};
        Boolean[] buildsSuccessfullies = {true, false};

        CombinationApprovals.verifyAllCombinations(
                this::doPipelineRun,
                testStatuses,
                sendSummaries,
                buildsSuccessfullies
        );
    }

    private String doPipelineRun(TestStatus testStatus, boolean sendSummary, boolean buildsSuccessfully) {
        StringBuilder spy = new StringBuilder("\n");
        DefaultConfig config = new DefaultConfig(sendSummary);
        CapturingEmailer emailer = new CapturingEmailer(spy);
        CapturingLogger log = new CapturingLogger(spy);
        Pipeline pipeline = new Pipeline(config, emailer, log);

        Project project = Project.builder()
                .setTestStatus(testStatus)
                .setDeploysSuccessfully(buildsSuccessfully)
                .build();

        pipeline.run(project);
        return spy.toString();
    }

}