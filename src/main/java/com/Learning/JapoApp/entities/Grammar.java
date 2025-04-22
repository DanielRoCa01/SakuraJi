package com.Learning.JapoApp.entities;

import lombok.Data;

@Data
public class Grammar {
    private String structure;
    private String explanation;
    private String example;

    public Grammar() {
    }

    public Grammar(String structure, String explanation, String example) {
        this.structure = structure;
        this.explanation = explanation;
        this.example = example;
    }

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }
}
