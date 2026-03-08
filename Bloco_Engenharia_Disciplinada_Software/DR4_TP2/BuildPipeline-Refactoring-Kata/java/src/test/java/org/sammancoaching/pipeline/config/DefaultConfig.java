package org.sammancoaching.pipeline.config;

import org.sammancoaching.pipeline.util.Config;

public class DefaultConfig implements Config {

    private final boolean shouldSendSummary;

    public DefaultConfig(boolean sendSummary) {
        shouldSendSummary = sendSummary;
    }

    @Override
    public boolean sendEmailSummary() {
        return shouldSendSummary;
    }
}