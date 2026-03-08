package org.sammancoaching.pipeline.service;

import org.sammancoaching.pipeline.util.Config;
import org.sammancoaching.pipeline.util.Emailer;
import org.sammancoaching.pipeline.util.Logger;
import org.sammancoaching.pipeline.data.PipelineExecution;

public class EmailNotificationService {
    private final Config config;
    private final Emailer emailer;
    private final Logger logger;

    public EmailNotificationService(Config config, Emailer emailer, Logger logger) {
        this.config = config;
        this.emailer = emailer;
        this.logger = logger;
    }

    public void sendSummaryNotification(PipelineExecution status) {
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

    private String buildNotificationMessage(PipelineExecution status) {
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