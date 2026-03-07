package org.sammancoaching.pipeline.enums;

public enum ExecutionStatus {
    SUCCESS,
    FAILURE;

    ExecutionStatus(){}

    public boolean isSuccessful() {
        return this == SUCCESS;
    }
}
