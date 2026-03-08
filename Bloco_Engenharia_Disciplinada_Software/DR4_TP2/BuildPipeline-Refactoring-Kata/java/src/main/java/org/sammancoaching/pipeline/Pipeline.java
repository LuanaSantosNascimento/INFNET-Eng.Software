package org.sammancoaching.pipeline;

import org.sammancoaching.pipeline.config.Config;
import org.sammancoaching.pipeline.config.Emailer;
import org.sammancoaching.pipeline.config.Logger;
import org.sammancoaching.pipeline.data.Project;
import org.sammancoaching.pipeline.enums.DeploymentEnvironment;
import org.sammancoaching.pipeline.enums.ExecutionStatus;
import org.sammancoaching.pipeline.service.EmailNotificationService;
import org.sammancoaching.pipeline.service.PipelineExecutionService;

public class Pipeline {
    private final Logger logger;
    private final EmailNotificationService notificationService;

    public Pipeline(Config config, Emailer emailer, Logger logger) {
        this.logger = logger;
        this.notificationService = new EmailNotificationService(config, emailer, logger);
    }

    public void run(Project project) {
        run(project, DeploymentEnvironment.PRODUCTION);
    }

    public void run(Project project, DeploymentEnvironment environment) {
        boolean testsPassed = executeTestPhase(project);
        boolean deploymentSuccessful = executeDeploymentPhase(testsPassed, project, environment);

        PipelineExecutionService status = new PipelineExecutionService(testsPassed, deploymentSuccessful);
        notifyPipelineStatus(status);
    }

    private boolean executeTestPhase(Project project) {
        if (!project.hasTests()) {
            logger.info("No tests");
            return true;
        }

        return runProjectTests(project);
    }

    private boolean runProjectTests(Project project) {
        ExecutionStatus testResult = project.runTests();

        if (testResult.isSuccessful()) {
            logger.info("Tests passed");
            return true;
        } else {
            logger.error("Tests failed");
            return false;
        }
    }

    private boolean executeDeploymentPhase(boolean testsPassed, Project project, DeploymentEnvironment environment) {
        if (!testsPassed) {
            return false;
        }

        ExecutionStatus deploymentResult = project.deploy(environment);

        if (deploymentResult.isSuccessful()) {
            logger.info("Deployment successful");
            return true;
        } else {
            logger.error("Deployment failed");
            return false;
        }
    }

    private void notifyPipelineStatus(PipelineExecutionService status) {
        notificationService.sendSummaryNotification(status);
    }
}
