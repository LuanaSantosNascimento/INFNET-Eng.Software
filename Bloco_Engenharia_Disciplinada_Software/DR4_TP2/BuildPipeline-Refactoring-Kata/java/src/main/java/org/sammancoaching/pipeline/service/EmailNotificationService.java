package org.sammancoaching.pipeline.service;

import org.sammancoaching.pipeline.config.Config;
import org.sammancoaching.pipeline.config.Emailer;
import org.sammancoaching.pipeline.config.Logger;

public class EmailNotificationService {
    private final Config config;
    private final Emailer emailer;
    private final Logger logger;

    public EmailNotificationService(Config config, Emailer emailer, Logger logger) {
        this.config = config;
        this.emailer = emailer;
        this.logger = logger;
    }

    public void sendSummaryNotification(PipelineExecutionService status) {
        if (!shouldSendNotification()) {
            logger.info("Email disabled");
            return;
        }

        logger.info("Sending email");
        String message = buildNotificationMessage(status);
        emailer.send(message);
    }

    private boolean shouldSendNotification() {
        return config.sendEmailSummary();
    }

    private String buildNotificationMessage(PipelineExecutionService status) {
        if (status.failedAtTestStage()) {
            return "Tests failed";
        }

        if (status.failedAtDeploymentStage()) {
            return "Deployment failed";
        }

        if (status.isOverallSuccessful()) {
            return "Deployment completed successfully";
        }

        throw new IllegalStateException("Unexpected error ocurred. Pipeline status: " + status);
    }
}